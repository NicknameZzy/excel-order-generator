import type { Language, OrderItem, ValidationError } from '../types';
import type { UiLabels } from '../i18n/uiTranslations';

/** Create a unique id for list items / history records */
export function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Create an empty product row */
export function createEmptyItem(): OrderItem {
  return {
    id: createId(),
    model: '',
    quantity: '',
    price: '',
  };
}

/** Default form starts with 3 blank rows */
export function createDefaultItems(count = 3): OrderItem[] {
  return Array.from({ length: count }, () => createEmptyItem());
}

/** Parse quantity / price strings into numbers (null if invalid) */
export function parseNumber(value: string): number | null {
  const trimmed = value.trim().replace(',', '.');
  if (trimmed === '') return null;
  const num = Number(trimmed);
  return Number.isFinite(num) ? num : null;
}

/** Whether a row is completely empty and can be skipped on export */
export function isEmptyRow(item: OrderItem): boolean {
  return (
    item.model.trim() === '' &&
    item.quantity.trim() === '' &&
    item.price.trim() === ''
  );
}

/** Rows that have at least some content */
export function getFilledItems(items: OrderItem[]): OrderItem[] {
  return items.filter((item) => !isEmptyRow(item));
}

/** Validate form before save / export */
export function validateItems(
  items: OrderItem[],
  ui: UiLabels,
): ValidationError | null {
  const filled = getFilledItems(items);

  if (filled.length === 0) {
    return { message: ui.validationNoItems };
  }

  for (const item of filled) {
    const hasModel = item.model.trim() !== '';
    const qty = parseNumber(item.quantity);
    const price = parseNumber(item.price);

    // Partial row: some fields filled but incomplete
    if (!hasModel || qty === null || price === null) {
      return { itemId: item.id, message: ui.validationEmptyModel };
    }

    if (qty <= 0) {
      return { itemId: item.id, message: ui.validationQuantity };
    }

    if (price < 0) {
      return { itemId: item.id, message: ui.validationPrice };
    }
  }

  return null;
}

export function calcLineTotal(quantity: string, price: string): number {
  const q = parseNumber(quantity);
  const p = parseNumber(price);
  if (q === null || p === null) return 0;
  return q * p;
}

export function calcTotals(items: OrderItem[]): {
  totalQuantity: number;
  totalAmount: number;
} {
  const filled = getFilledItems(items);
  let totalQuantity = 0;
  let totalAmount = 0;

  for (const item of filled) {
    const q = parseNumber(item.quantity) ?? 0;
    const p = parseNumber(item.price) ?? 0;
    totalQuantity += q;
    totalAmount += q * p;
  }

  return { totalQuantity, totalAmount };
}

/** Format price for UI preview (PT shows RS prefix) */
export function formatPrice(value: number, language: Language): string {
  const num = value.toFixed(2);
  if (language === 'pt') {
    return `RS ${num}`;
  }
  return num;
}

/** Format integer quantity for preview */
export function formatQuantity(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

/** Sanitize title for Excel filename */
export function sanitizeFilename(name: string): string {
  return name
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^\.+/, '')
    .slice(0, 80);
}

/** YYYY-MM-DD for filenames */
export function formatDateForFilename(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Locale-aware datetime for history list */
export function formatDateTime(iso: string, locale: string): string {
  return new Date(iso).toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
