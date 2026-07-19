export type Language = 'pt' | 'es' | 'en';
export type UiLanguage = 'zh' | 'en' | 'pt';

export interface OrderItem {
  id: string;
  model: string;
  quantity: string;
  price: string;
}

export interface HistoryRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  language: Language;
  title: string;
  items: OrderItem[];
  totalQuantity: number;
  totalAmount: number;
}

export interface OrderFormState {
  title: string;
  language: Language;
  items: OrderItem[];
}

export interface ValidationError {
  itemId?: string;
  message: string;
}

export interface ModelHistoryEntry {
  model: string;
  normalizedModel: string;
  useCount: number;
  lastUsedAt: string;
}
