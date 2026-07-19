import { useEffect, useMemo, useState } from 'react';
<<<<<<< HEAD
import type {
  HistoryRecord,
  Language,
  ModelHistoryEntry,
  OrderItem,
  UiLanguage,
} from './types';
import {
  detectUiLanguage,
  exportLanguageToUiLanguage,
  getUiLabels,
  uiLanguageToExportLanguage,
  UI_LOCALES,
} from './i18n/uiTranslations';
=======
import type { HistoryRecord, Language, OrderItem } from './types';
import { ui } from './i18n/translations';
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
import { Header } from './components/Header';
import { OrderForm } from './components/OrderForm';
import { PreviewTable } from './components/PreviewTable';
import { HistoryPanel } from './components/HistoryPanel';
<<<<<<< HEAD
import { ModelHistoryPanel } from './components/ModelHistoryPanel';
import { ConfirmModal } from './components/ConfirmModal';
import { exportOrderExcel } from './utils/exportExcel';
import {
  clearHistory,
=======
import { ConfirmModal } from './components/ConfirmModal';
import { exportOrderExcel } from './utils/exportExcel';
import {
  loadHistory,
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
  removeHistoryRecord,
  upsertHistoryRecord,
} from './utils/storage';
import {
  calcTotals,
  createDefaultItems,
  createEmptyItem,
  createId,
  getFilledItems,
  validateItems,
} from './utils/format';
<<<<<<< HEAD
import {
  clearModelHistory,
  recordModels,
  removeModelHistoryEntry,
} from './utils/modelHistory';
=======
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)

type MobileTab = 'edit' | 'preview' | 'history';
type ConfirmKind = 'delete' | 'clear' | null;

function App() {
<<<<<<< HEAD
  const [uiLanguage, setUiLanguage] = useState<UiLanguage>(detectUiLanguage);
  const [language, setLanguage] = useState<Language>(() =>
    uiLanguageToExportLanguage(detectUiLanguage()),
  );
  const [title, setTitle] = useState('');
  const [items, setItems] = useState<OrderItem[]>(() => createDefaultItems(3));
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [modelHistory, setModelHistory] = useState<ModelHistoryEntry[]>([]);
=======
  const [language, setLanguage] = useState<Language>('pt');
  const [title, setTitle] = useState('');
  const [items, setItems] = useState<OrderItem[]>(() => createDefaultItems(3));
  const [history, setHistory] = useState<HistoryRecord[]>([]);
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorItemId, setErrorItemId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<HistoryRecord | null>(null);
  const [confirmKind, setConfirmKind] = useState<ConfirmKind>(null);
  const [mobileTab, setMobileTab] = useState<MobileTab>('edit');
<<<<<<< HEAD
  const ui = getUiLabels(uiLanguage);
=======
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)

  const { totalQuantity, totalAmount } = useMemo(
    () => calcTotals(items),
    [items],
  );

  useEffect(() => {
<<<<<<< HEAD
    clearHistory();
    clearModelHistory();
    setHistory([]);
    setModelHistory([]);
  }, []);

  useEffect(() => {
    localStorage.setItem('excel-order-generator-ui-language', uiLanguage);
    document.documentElement.lang = UI_LOCALES[uiLanguage];
    document.title = ui.appTitle;
  }, [ui.appTitle, uiLanguage]);

  useEffect(() => {
=======
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!errorMessage) return;
    requestAnimationFrame(() => {
      document
        .querySelector('[data-error-row="true"]')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document
        .getElementById('form-error')
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }, [errorMessage, errorItemId]);

  function showToast(message: string) {
    setToast(message);
  }

  function clearValidation() {
    setErrorMessage(null);
    setErrorItemId(null);
  }

  function applyValidation(validation: ReturnType<typeof validateItems>) {
    if (!validation) return false;
    setErrorMessage(validation.message);
    setErrorItemId(validation.itemId ?? null);
    setMobileTab('edit');
    return true;
  }

  function handleChangeItem(
    id: string,
    field: keyof Pick<OrderItem, 'model' | 'quantity' | 'price'>,
    value: string,
  ) {
    clearValidation();
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  }

  function handleAddRow() {
    setItems((prev) => [...prev, createEmptyItem()]);
  }

  function handleCopyRow(id: string) {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index < 0) return prev;
      const source = prev[index];
      const copy: OrderItem = { ...source, id: createId() };
      const next = [...prev];
      next.splice(index + 1, 0, copy);
      return next;
    });
  }

  function handleDeleteRow(id: string) {
    setItems((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((item) => item.id !== id);
    });
  }

  function resetForm() {
    setTitle('');
    setItems(createDefaultItems(3));
    setActiveDraftId(null);
    clearValidation();
    setMobileTab('edit');
  }

  function buildRecord(existingId?: string | null): HistoryRecord | null {
<<<<<<< HEAD
    const validation = validateItems(items, ui);
=======
    const validation = validateItems(items);
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
    if (applyValidation(validation)) return null;

    const now = new Date().toISOString();
    const filled = getFilledItems(items).map((item) => ({
      ...item,
      model: item.model.trim(),
    }));
    const totals = calcTotals(filled);
    const id = existingId ?? createId();
    const existing = history.find((r) => r.id === id);

    return {
      id,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      language,
      title: title.trim(),
      items: filled.length > 0 ? filled : createDefaultItems(1),
      totalQuantity: totals.totalQuantity,
      totalAmount: totals.totalAmount,
    };
  }

  function handleSave() {
    const record = buildRecord(activeDraftId);
    if (!record) return;
    setHistory((prev) => upsertHistoryRecord(prev, record));
<<<<<<< HEAD
    setModelHistory(recordModels(modelHistory, record.items));
=======
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
    setActiveDraftId(record.id);
    clearValidation();
    showToast(ui.saved);
  }

  async function handleExportCurrent() {
<<<<<<< HEAD
    if (applyValidation(validateItems(items, ui))) return;
=======
    if (applyValidation(validateItems(items))) return;
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)

    setExporting(true);
    try {
      await exportOrderExcel({ title, language, items });
<<<<<<< HEAD
      setModelHistory(recordModels(modelHistory, items));
=======
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
      showToast(ui.exported);
    } catch (error) {
      console.error(error);
      setErrorMessage(ui.exportFailed);
      setMobileTab('edit');
    } finally {
      setExporting(false);
    }
  }

  async function handleExportRecord(record: HistoryRecord) {
    setExporting(true);
    try {
      await exportOrderExcel({
        title: record.title,
        language: record.language,
        items: record.items,
      });
<<<<<<< HEAD
      setModelHistory(recordModels(modelHistory, record.items));
=======
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
      showToast(ui.exported);
    } catch (error) {
      console.error(error);
      setErrorMessage(ui.exportFailed);
    } finally {
      setExporting(false);
    }
  }

  function handleLoad(record: HistoryRecord) {
    setLanguage(record.language);
<<<<<<< HEAD
    const matchedUi = exportLanguageToUiLanguage(record.language);
    if (matchedUi) setUiLanguage(matchedUi);
=======
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
    setTitle(record.title);
    setItems(
      record.items.length > 0
        ? record.items.map((item) => ({ ...item }))
        : createDefaultItems(3),
    );
    setActiveDraftId(record.id);
    clearValidation();
    setMobileTab('edit');
  }

  function handleDuplicate(record: HistoryRecord) {
    const now = new Date().toISOString();
    const copy: HistoryRecord = {
      ...record,
      id: createId(),
      createdAt: now,
      updatedAt: now,
<<<<<<< HEAD
      title: record.title ? `${record.title}${ui.copySuffix}` : '',
=======
      title: record.title ? `${record.title}（副本）` : '',
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
      items: record.items.map((item) => ({ ...item, id: createId() })),
    };
    setHistory((prev) => upsertHistoryRecord(prev, copy));
    handleLoad(copy);
    showToast(ui.saved);
  }

  function openDeleteConfirm(record: HistoryRecord) {
    setDeleteTarget(record);
    setConfirmKind('delete');
  }

  function handleConfirmModal() {
    if (confirmKind === 'delete' && deleteTarget) {
      setHistory((prev) => removeHistoryRecord(prev, deleteTarget.id));
      if (activeDraftId === deleteTarget.id) {
        setActiveDraftId(null);
      }
    }
    if (confirmKind === 'clear') {
      resetForm();
    }
    setDeleteTarget(null);
    setConfirmKind(null);
  }

  function closeConfirm() {
    setDeleteTarget(null);
    setConfirmKind(null);
  }

  const tabs: { id: MobileTab; label: string }[] = [
    { id: 'edit', label: ui.tabEdit },
    { id: 'preview', label: ui.tabPreview },
    { id: 'history', label: ui.tabHistory },
  ];

  return (
<<<<<<< HEAD
    <div className="mx-auto min-h-screen max-w-7xl px-3 pb-28 pt-5 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8">
      <Header
        ui={ui}
        uiLanguage={uiLanguage}
        onUiLanguageChange={(nextLanguage) => {
          setUiLanguage(nextLanguage);
          setLanguage(uiLanguageToExportLanguage(nextLanguage));
          clearValidation();
          setToast(null);
        }}
        language={language}
        onLanguageChange={(lang) => {
          setLanguage(lang);
          const matchedUi = exportLanguageToUiLanguage(lang);
          if (matchedUi) setUiLanguage(matchedUi);
=======
    <div className="mx-auto min-h-screen max-w-7xl px-3 pb-28 pt-4 sm:px-6 sm:pb-10 sm:pt-6 lg:px-8">
      <Header
        language={language}
        onLanguageChange={(lang) => {
          setLanguage(lang);
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
          clearValidation();
        }}
        onExport={handleExportCurrent}
        exporting={exporting}
      />

      {/* Mobile tabs */}
      <div className="mt-4 grid grid-cols-3 gap-1 rounded-xl border border-slate-200 bg-white p-1 lg:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMobileTab(tab.id)}
            className={`rounded-lg px-2 py-2.5 text-sm font-medium transition ${
              mobileTab === tab.id
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
            {tab.id === 'history' && history.length > 0
              ? ` (${history.length})`
              : ''}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-5 lg:mt-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
        <div
          className={`${mobileTab === 'edit' ? 'block' : 'hidden'} lg:block`}
        >
          <OrderForm
<<<<<<< HEAD
            ui={ui}
            title={title}
            items={items}
            modelHistory={modelHistory}
=======
            title={title}
            items={items}
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
            errorMessage={errorMessage}
            errorItemId={errorItemId}
            editingLabel={activeDraftId ? ui.editingDraft : null}
            onTitleChange={(value) => {
              setTitle(value);
              clearValidation();
            }}
            onChangeItem={handleChangeItem}
            onAddRow={handleAddRow}
            onCopyRow={handleCopyRow}
            onDeleteRow={handleDeleteRow}
            onSave={handleSave}
            onClear={() => setConfirmKind('clear')}
          />
        </div>

        <div className="space-y-5 lg:space-y-6">
          <div
            className={`${mobileTab === 'preview' ? 'block' : 'hidden'} lg:block`}
          >
            <PreviewTable
<<<<<<< HEAD
              ui={ui}
=======
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
              language={language}
              title={title}
              items={items}
              totalQuantity={totalQuantity}
              totalAmount={totalAmount}
            />
          </div>
          <div
            className={`${mobileTab === 'history' ? 'block' : 'hidden'} lg:block`}
          >
<<<<<<< HEAD
            <div className="space-y-5 lg:space-y-6">
              <HistoryPanel
                ui={ui}
                locale={UI_LOCALES[uiLanguage]}
                records={history}
                activeId={activeDraftId}
                onLoad={handleLoad}
                onExport={handleExportRecord}
                onDuplicate={handleDuplicate}
                onDelete={openDeleteConfirm}
              />
              <ModelHistoryPanel
                ui={ui}
                entries={modelHistory}
                onRemove={(normalizedModel) =>
                  setModelHistory(
                    removeModelHistoryEntry(modelHistory, normalizedModel),
                  )
                }
              />
            </div>
=======
            <HistoryPanel
              records={history}
              activeId={activeDraftId}
              onLoad={handleLoad}
              onExport={handleExportRecord}
              onDuplicate={handleDuplicate}
              onDelete={openDeleteConfirm}
            />
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
          </div>
        </div>
      </div>

      <p className="mt-6 hidden text-center text-xs text-slate-400 sm:block">
        {ui.localNote}
      </p>
      <p className="mt-2 hidden text-center text-xs text-slate-400 sm:block">
        {ui.footer}
      </p>

      {/* Mobile sticky actions */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 pt-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur sm:hidden"
        style={{ paddingBottom: 'calc(0.75rem + var(--safe-bottom))' }}
      >
        <div className="mx-auto flex max-w-7xl gap-2">
          <button
            type="button"
            onClick={() => setConfirmKind('clear')}
            className="btn btn-ghost flex-1"
          >
            {ui.clearForm}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn btn-success flex-1"
          >
            {ui.saveDraft}
          </button>
          <button
            type="button"
            onClick={handleExportCurrent}
            disabled={exporting}
            className="btn btn-primary flex-[1.2]"
          >
            {exporting ? ui.exporting : ui.generateExcel}
          </button>
        </div>
      </div>

      <ConfirmModal
        open={confirmKind !== null}
        title={
          confirmKind === 'clear' ? ui.confirmClear : ui.confirmDelete
        }
        message={
          confirmKind === 'clear'
            ? ui.confirmClearMessage
            : ui.confirmDeleteMessage
        }
        confirmLabel={ui.confirm}
        cancelLabel={ui.cancel}
<<<<<<< HEAD
        danger={confirmKind !== 'clear'}
=======
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
        onConfirm={handleConfirmModal}
        onCancel={closeConfirm}
      />

      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  );
}

export default App;
