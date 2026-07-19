import type { Language } from '../types';

<<<<<<< HEAD
=======
/** 界面固定中文；导出语言不影响页面文案 */
export const ui = {
  appTitle: 'Excel 订单表格生成器',
  appSubtitle: '快速填写产品明细，一键导出带公式的报价单',
  language: '导出语言',
  languageHint: '仅影响 Excel 表头与价格格式',
  orderTitle: '表格标题',
  orderTitlePlaceholder: '例如：Andar-1j.126-shop 2026.07.11',
  quantity: '数量',
  model: '产品型号',
  price: '单价',
  total: '总价',
  orderTotal: '订单总金额',
  totalQuantity: '订单总数量',
  itemCount: '产品行数',
  addRow: '添加行',
  generateExcel: '导出 Excel',
  exporting: '导出中…',
  saveDraft: '保存记录',
  clearForm: '清空',
  history: '历史记录',
  emptyHistory: '暂无历史记录',
  emptyHistoryHint: '点击「保存记录」后，订单会出现在这里。',
  load: '编辑',
  export: '导出',
  duplicate: '复制',
  delete: '删除',
  confirmDelete: '确认删除？',
  confirmDeleteMessage: '删除后无法恢复，确定要删除这条记录吗？',
  confirmClear: '确认清空？',
  confirmClearMessage: '将清空当前标题和所有产品行，未保存的内容会丢失。',
  cancel: '取消',
  confirm: '确认',
  preview: '实时预览',
  previewHint: '表头随导出语言变化，与最终 Excel 一致',
  items: '产品明细',
  products: '个产品',
  actions: '操作',
  copyRow: '复制',
  deleteRow: '删除',
  saved: '已保存',
  exported: 'Excel 已导出',
  validationEmptyModel: '该行已填写部分内容，请补充型号、数量和单价，或删除该行。',
  validationQuantity: '数量必须为大于 0 的数字。',
  validationPrice: '单价必须为大于或等于 0 的数字。',
  validationNoItems: '请至少填写一条有效的产品数据后再操作。',
  exportFailed: '导出 Excel 失败，请重试。',
  createdAt: '创建时间',
  noPreviewItems: '暂无产品可预览，请先填写产品明细。',
  editingDraft: '正在编辑已保存记录',
  newOrder: '新建订单',
  tabEdit: '编辑',
  tabPreview: '预览',
  tabHistory: '历史',
  rowLabel: '第 {n} 行',
  localNote: '数据仅保存在本机浏览器，不会上传到服务器。',
  footer: 'Excel 订单表格生成器 · 本地运行 · 支持公式导出',
} as const;

>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
export interface ExcelLabels {
  quantity: string;
  model: string;
  price: string;
  total: string;
  orderTotal: string;
  fallbackTitle: string;
}

export const excelLabels: Record<Language, ExcelLabels> = {
  pt: {
    quantity: 'Quantidade',
    model: 'Modelo',
    price: 'Preço (RS)',
    total: 'Total (RS)',
    orderTotal: 'Total Do Pedido',
    fallbackTitle: 'Pedido',
  },
  es: {
    quantity: 'Cantidad',
    model: 'Modelo',
    price: 'Precio',
    total: 'Total',
    orderTotal: 'Total del Pedido',
    fallbackTitle: 'Pedido',
  },
  en: {
    quantity: 'Quantity',
    model: 'Model',
    price: 'Price',
    total: 'Total',
    orderTotal: 'Order Total',
    fallbackTitle: 'Order',
  },
};

export const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
<<<<<<< HEAD
  { value: 'pt', label: 'Português' },
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
=======
  { value: 'pt', label: '葡萄牙语 / Português' },
  { value: 'es', label: '西班牙语 / Español' },
  { value: 'en', label: '英语 / English' },
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
];

export const LANGUAGE_CODE: Record<Language, string> = {
  pt: 'PT',
  es: 'ES',
  en: 'EN',
};

export function getExcelLabels(language: Language): ExcelLabels {
  return excelLabels[language];
}
