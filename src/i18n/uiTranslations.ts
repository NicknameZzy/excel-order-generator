import type { Language, UiLanguage } from '../types';

export interface UiLabels {
  appTitle: string;
  appSubtitle: string;
  uiLanguage: string;
  exportLanguage: string;
  languageHint: string;
  orderTitle: string;
  orderTitlePlaceholder: string;
  quantity: string;
  model: string;
  price: string;
  orderTotal: string;
  totalQuantity: string;
  itemCount: string;
  addRow: string;
  generateExcel: string;
  exporting: string;
  saveDraft: string;
  clearForm: string;
  history: string;
  emptyHistory: string;
  emptyHistoryHint: string;
  load: string;
  export: string;
  duplicate: string;
  delete: string;
  confirmDelete: string;
  confirmDeleteMessage: string;
  confirmClear: string;
  confirmClearMessage: string;
  cancel: string;
  confirm: string;
  preview: string;
  previewHint: string;
  items: string;
  products: string;
  actions: string;
  copyRow: string;
  deleteRow: string;
  saved: string;
  exported: string;
  validationEmptyModel: string;
  validationQuantity: string;
  validationPrice: string;
  validationNoItems: string;
  exportFailed: string;
  createdAt: string;
  noPreviewItems: string;
  editingDraft: string;
  newOrder: string;
  tabEdit: string;
  tabPreview: string;
  tabHistory: string;
  rowLabel: string;
  localNote: string;
  footer: string;
  copySuffix: string;
  modelSuggestions: string;
  modelHistory: string;
  modelHistoryHint: string;
  emptyModelHistory: string;
  usageCount: string;
  removeModel: string;
}

const uiTranslations: Record<UiLanguage, UiLabels> = {
  zh: {
    appTitle: 'Excel 订单表格生成器',
    appSubtitle: '快速填写产品明细，一键导出带公式的报价单',
    uiLanguage: '系统语言',
    exportLanguage: 'Excel 导出语言',
    languageHint: '导出语言仅影响 Excel 表头与价格格式',
    orderTitle: '表格标题',
    orderTitlePlaceholder: '例如：Andar-1j.126-shop 2026.07.11',
    quantity: '数量',
    model: '产品型号',
    price: '单价',
    orderTotal: '订单总金额',
    totalQuantity: '订单总数量',
    itemCount: '产品行数',
    addRow: '添加行',
    generateExcel: '导出 Excel',
    exporting: '导出中…',
    saveDraft: '保存记录',
    clearForm: '新建订单',
    history: '历史记录',
    emptyHistory: '暂无历史记录',
    emptyHistoryHint: '点击“保存记录”后，订单会出现在这里。',
    load: '编辑',
    export: '导出',
    duplicate: '复制',
    delete: '删除',
    confirmDelete: '确认删除？',
    confirmDeleteMessage: '删除后无法恢复，确定要删除这条记录吗？',
    confirmClear: '开始新订单？',
    confirmClearMessage: '将清空当前标题和所有产品行，未保存的内容会丢失。历史记录不会受影响。',
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
    validationEmptyModel: '该行内容不完整，请补充型号、数量和单价，或删除该行。',
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
    localNote: '历史仅在本次打开期间有效，刷新或重新打开后会自动清空。',
    footer: 'Excel 订单表格生成器 · 本地保存 · 支持公式导出',
    copySuffix: '（副本）',
    modelSuggestions: '常用型号建议',
    modelHistory: '产品型号历史',
    modelHistoryHint: '保存或导出订单后自动记录，刷新或重新打开后自动清空。',
    emptyModelHistory: '暂无产品型号历史',
    usageCount: '使用 {n} 次',
    removeModel: '移除型号',
  },
  en: {
    appTitle: 'Excel Order Generator',
    appSubtitle: 'Enter product details and export a quotation with live formulas',
    uiLanguage: 'Interface language',
    exportLanguage: 'Excel language',
    languageHint: 'This only changes Excel headers and price formatting',
    orderTitle: 'Spreadsheet title',
    orderTitlePlaceholder: 'e.g. Andar-1j.126-shop 2026.07.11',
    quantity: 'Quantity',
    model: 'Product model',
    price: 'Unit price',
    orderTotal: 'Order total',
    totalQuantity: 'Total quantity',
    itemCount: 'Product rows',
    addRow: 'Add row',
    generateExcel: 'Export Excel',
    exporting: 'Exporting…',
    saveDraft: 'Save record',
    clearForm: 'New order',
    history: 'History',
    emptyHistory: 'No saved records',
    emptyHistoryHint: 'Saved orders will appear here.',
    load: 'Edit',
    export: 'Export',
    duplicate: 'Duplicate',
    delete: 'Delete',
    confirmDelete: 'Delete this record?',
    confirmDeleteMessage: 'This action cannot be undone.',
    confirmClear: 'Start a new order?',
    confirmClearMessage: 'The current title and product rows will be cleared. Unsaved changes will be lost. History will remain.',
    cancel: 'Cancel',
    confirm: 'Confirm',
    preview: 'Live preview',
    previewHint: 'Headers follow the selected Excel language',
    items: 'Product details',
    products: 'products',
    actions: 'Actions',
    copyRow: 'Copy',
    deleteRow: 'Delete',
    saved: 'Saved',
    exported: 'Excel exported',
    validationEmptyModel: 'This row is incomplete. Complete the model, quantity and price, or delete it.',
    validationQuantity: 'Quantity must be greater than 0.',
    validationPrice: 'Unit price must be 0 or greater.',
    validationNoItems: 'Enter at least one valid product before continuing.',
    exportFailed: 'Excel export failed. Please try again.',
    createdAt: 'Created',
    noPreviewItems: 'No products to preview. Add product details first.',
    editingDraft: 'Editing a saved record',
    newOrder: 'New order',
    tabEdit: 'Edit',
    tabPreview: 'Preview',
    tabHistory: 'History',
    rowLabel: 'Row {n}',
    localNote: 'History is available only during this session and is cleared on reload.',
    footer: 'Excel Order Generator · Local storage · Formula export',
    copySuffix: ' (copy)',
    modelSuggestions: 'Frequent model suggestions',
    modelHistory: 'Product model history',
    modelHistoryHint: 'Learned when an order is saved or exported and cleared on reload.',
    emptyModelHistory: 'No product model history',
    usageCount: 'Used {n} times',
    removeModel: 'Remove model',
  },
  pt: {
    appTitle: 'Gerador de Pedidos Excel',
    appSubtitle: 'Preencha os produtos e exporte uma cotação com fórmulas',
    uiLanguage: 'Idioma da interface',
    exportLanguage: 'Idioma do Excel',
    languageHint: 'Altera apenas os cabeçalhos e o formato de preços do Excel',
    orderTitle: 'Título da planilha',
    orderTitlePlaceholder: 'Ex.: Andar-1j.126-shop 2026.07.11',
    quantity: 'Quantidade',
    model: 'Modelo do produto',
    price: 'Preço unitário',
    orderTotal: 'Total do pedido',
    totalQuantity: 'Quantidade total',
    itemCount: 'Linhas de produtos',
    addRow: 'Adicionar linha',
    generateExcel: 'Exportar Excel',
    exporting: 'Exportando…',
    saveDraft: 'Salvar registro',
    clearForm: 'Novo pedido',
    history: 'Histórico',
    emptyHistory: 'Nenhum registro salvo',
    emptyHistoryHint: 'Os pedidos salvos aparecerão aqui.',
    load: 'Editar',
    export: 'Exportar',
    duplicate: 'Duplicar',
    delete: 'Excluir',
    confirmDelete: 'Excluir este registro?',
    confirmDeleteMessage: 'Esta ação não pode ser desfeita.',
    confirmClear: 'Iniciar um novo pedido?',
    confirmClearMessage: 'O título e as linhas atuais serão limpos. Alterações não salvas serão perdidas. O histórico permanecerá.',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    preview: 'Pré-visualização',
    previewHint: 'Os cabeçalhos seguem o idioma selecionado para o Excel',
    items: 'Detalhes dos produtos',
    products: 'produtos',
    actions: 'Ações',
    copyRow: 'Copiar',
    deleteRow: 'Excluir',
    saved: 'Salvo',
    exported: 'Excel exportado',
    validationEmptyModel: 'Esta linha está incompleta. Preencha modelo, quantidade e preço, ou exclua a linha.',
    validationQuantity: 'A quantidade deve ser maior que 0.',
    validationPrice: 'O preço deve ser maior ou igual a 0.',
    validationNoItems: 'Adicione pelo menos um produto válido antes de continuar.',
    exportFailed: 'Falha ao exportar o Excel. Tente novamente.',
    createdAt: 'Criado em',
    noPreviewItems: 'Nenhum produto para visualizar. Preencha os detalhes primeiro.',
    editingDraft: 'Editando um registro salvo',
    newOrder: 'Novo pedido',
    tabEdit: 'Editar',
    tabPreview: 'Prévia',
    tabHistory: 'Histórico',
    rowLabel: 'Linha {n}',
    localNote: 'O histórico vale apenas nesta sessão e é apagado ao recarregar.',
    footer: 'Gerador de Pedidos Excel · Armazenamento local · Exportação com fórmulas',
    copySuffix: ' (cópia)',
    modelSuggestions: 'Sugestões de modelos frequentes',
    modelHistory: 'Histórico de modelos',
    modelHistoryHint: 'Registrado ao salvar ou exportar e apagado ao recarregar.',
    emptyModelHistory: 'Nenhum modelo no histórico',
    usageCount: 'Usado {n} vezes',
    removeModel: 'Remover modelo',
  },
};

export const UI_LANGUAGE_OPTIONS: { value: UiLanguage; label: string }[] = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'English' },
  { value: 'pt', label: 'Português' },
];

export const UI_LOCALES: Record<UiLanguage, string> = {
  zh: 'zh-CN',
  en: 'en-US',
  pt: 'pt-BR',
};

export function getUiLabels(language: UiLanguage): UiLabels {
  return uiTranslations[language];
}

export function detectUiLanguage(): UiLanguage {
  const stored = localStorage.getItem('excel-order-generator-ui-language');
  if (stored === 'zh' || stored === 'en' || stored === 'pt') return stored;

  const browserLanguage = navigator.language.toLowerCase();
  if (browserLanguage.startsWith('pt')) return 'pt';
  if (browserLanguage.startsWith('en')) return 'en';
  return 'zh';
}

/** Map UI language to Excel export language when they overlap */
export function uiLanguageToExportLanguage(uiLanguage: UiLanguage): Language {
  if (uiLanguage === 'en') return 'en';
  if (uiLanguage === 'pt') return 'pt';
  // Chinese UI has no Chinese Excel headers; keep Portuguese as default export
  return 'pt';
}

/** Map Excel export language to UI language when they overlap */
export function exportLanguageToUiLanguage(
  language: Language,
): UiLanguage | null {
  if (language === 'en') return 'en';
  if (language === 'pt') return 'pt';
  return null;
}
