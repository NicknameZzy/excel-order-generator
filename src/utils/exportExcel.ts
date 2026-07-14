import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import type { Language, OrderItem } from '../types';
import { getExcelLabels, LANGUAGE_CODE } from '../i18n/translations';
import {
  getFilledItems,
  parseNumber,
  sanitizeFilename,
  formatDateForFilename,
} from './format';

const HEADER_ROW = 9;
const DATA_START_ROW = 10;
const TITLE_ROW = 3;

const THIN_BORDER: Partial<ExcelJS.Borders> = {
  top: { style: 'thin', color: { argb: 'FF000000' } },
  left: { style: 'thin', color: { argb: 'FF000000' } },
  bottom: { style: 'thin', color: { argb: 'FF000000' } },
  right: { style: 'thin', color: { argb: 'FF000000' } },
};

const CENTER: Partial<ExcelJS.Alignment> = {
  horizontal: 'center',
  vertical: 'middle',
  wrapText: true,
};

/** Number format: PT uses RS prefix via Excel custom format (still numeric/formula-friendly) */
function priceNumFmt(language: Language): string {
  return language === 'pt' ? '"RS "#,##0.00' : '#,##0.00';
}

function applyCellBorder(cell: ExcelJS.Cell): void {
  cell.border = THIN_BORDER;
  cell.alignment = CENTER;
}

export interface ExportOptions {
  title: string;
  language: Language;
  items: OrderItem[];
}

/**
 * Build and download an .xlsx order sheet with live Excel formulas.
 * Row Total: =A{n}*C{n}
 * Order Total: =SUM(D10:D{last})
 */
export async function exportOrderExcel(options: ExportOptions): Promise<void> {
  const { title, language, items } = options;
  const filled = getFilledItems(items);
  if (filled.length === 0) {
    throw new Error('No items to export');
  }

  const labels = getExcelLabels(language);
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Excel Order Generator';
  workbook.created = new Date();
  // Force recalculation when opened in Excel / WPS / Sheets
  workbook.calcProperties.fullCalcOnLoad = true;

  const sheet = workbook.addWorksheet('Order', {
    views: [{ state: 'frozen', ySplit: HEADER_ROW }],
    pageSetup: {
      orientation: 'portrait',
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      printArea: 'A1:D200',
    },
  });

  sheet.columns = [
    { key: 'qty', width: 15 },
    { key: 'model', width: 55 },
    { key: 'price', width: 25 },
    { key: 'total', width: 25 },
  ];

  // --- Title (merged A3:D3) ---
  sheet.mergeCells(`A${TITLE_ROW}:D${TITLE_ROW}`);
  const titleCell = sheet.getCell(`A${TITLE_ROW}`);
  titleCell.value = title.trim() || labels.fallbackTitle;
  titleCell.font = {
    name: 'Times New Roman',
    bold: true,
    size: 16,
  };
  titleCell.alignment = CENTER;
  sheet.getRow(TITLE_ROW).height = 28;

  // --- Header row 9 ---
  const headers = [labels.quantity, labels.model, labels.price, labels.total];
  const headerRow = sheet.getRow(HEADER_ROW);
  headers.forEach((label, index) => {
    const cell = headerRow.getCell(index + 1);
    cell.value = label;
    cell.font = { name: 'Times New Roman', bold: true, size: 12 };
    applyCellBorder(cell);
  });
  headerRow.height = 22;

  // --- Data rows starting at 10 ---
  const numFmt = priceNumFmt(language);
  filled.forEach((item, index) => {
    const rowNumber = DATA_START_ROW + index;
    const row = sheet.getRow(rowNumber);
    const qty = parseNumber(item.quantity) ?? 0;
    const price = parseNumber(item.price) ?? 0;

    const qtyCell = row.getCell(1);
    qtyCell.value = qty;
    qtyCell.numFmt = '0';
    qtyCell.font = { name: 'Times New Roman', size: 11 };
    applyCellBorder(qtyCell);

    const modelCell = row.getCell(2);
    modelCell.value = item.model.trim();
    modelCell.font = { name: 'Times New Roman', size: 11 };
    applyCellBorder(modelCell);

    const priceCell = row.getCell(3);
    priceCell.value = price;
    priceCell.numFmt = numFmt;
    priceCell.font = { name: 'Times New Roman', size: 11 };
    applyCellBorder(priceCell);

    // Formula: Total = Quantity × Price (recalculates when user edits A or C)
    const totalCell = row.getCell(4);
    totalCell.value = { formula: `A${rowNumber}*C${rowNumber}` };
    totalCell.numFmt = numFmt;
    totalCell.font = { name: 'Times New Roman', size: 11 };
    applyCellBorder(totalCell);

    row.height = 20;
  });

  const dataEndRow = DATA_START_ROW + filled.length - 1;
  // Leave a few blank rows then show order total (mirrors sample layout)
  const totalLabelRow = dataEndRow + 4;

  const labelCell = sheet.getCell(`B${totalLabelRow}`);
  labelCell.value = labels.orderTotal;
  labelCell.font = { name: 'Times New Roman', bold: true, size: 12 };
  labelCell.alignment = CENTER;
  labelCell.border = THIN_BORDER;

  // SUM formula over all line totals
  sheet.mergeCells(`C${totalLabelRow}:D${totalLabelRow}`);
  const sumCell = sheet.getCell(`C${totalLabelRow}`);
  sumCell.value = {
    formula: `SUM(D${DATA_START_ROW}:D${dataEndRow})`,
  };
  sumCell.numFmt = numFmt;
  sumCell.font = { name: 'Times New Roman', bold: true, size: 12 };
  sumCell.alignment = CENTER;
  sumCell.border = THIN_BORDER;
  sheet.getCell(`D${totalLabelRow}`).border = THIN_BORDER;

  // Optional total quantity (column A label area)
  const qtyLabelCell = sheet.getCell(`A${totalLabelRow}`);
  qtyLabelCell.value = { formula: `SUM(A${DATA_START_ROW}:A${dataEndRow})` };
  qtyLabelCell.numFmt = '0';
  qtyLabelCell.font = { name: 'Times New Roman', bold: true, size: 11 };
  qtyLabelCell.alignment = CENTER;
  qtyLabelCell.border = THIN_BORDER;

  sheet.getRow(totalLabelRow).height = 24;

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const dateStr = formatDateForFilename();
  const langCode = LANGUAGE_CODE[language];
  const safeTitle = sanitizeFilename(title);
  const filename = safeTitle
    ? `${safeTitle}_${dateStr}_${langCode}.xlsx`
    : `order_${dateStr}.xlsx`;

  saveAs(blob, filename);
}
