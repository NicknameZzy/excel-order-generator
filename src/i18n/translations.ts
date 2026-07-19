import type { Language } from '../types';

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
  { value: 'pt', label: 'Português' },
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
];

export const LANGUAGE_CODE: Record<Language, string> = {
  pt: 'PT',
  es: 'ES',
  en: 'EN',
};

export function getExcelLabels(language: Language): ExcelLabels {
  return excelLabels[language];
}
