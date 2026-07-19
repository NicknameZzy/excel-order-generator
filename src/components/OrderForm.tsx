<<<<<<< HEAD
import type { ModelHistoryEntry, OrderItem } from '../types';
import type { UiLabels } from '../i18n/uiTranslations';
import { ItemsTable } from './ItemsTable';

interface OrderFormProps {
  ui: UiLabels;
  title: string;
  items: OrderItem[];
  modelHistory: ModelHistoryEntry[];
=======
import type { OrderItem } from '../types';
import { ui } from '../i18n/translations';
import { ItemsTable } from './ItemsTable';

interface OrderFormProps {
  title: string;
  items: OrderItem[];
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
  errorMessage?: string | null;
  errorItemId?: string | null;
  editingLabel?: string | null;
  onTitleChange: (title: string) => void;
  onChangeItem: (
    id: string,
    field: keyof Pick<OrderItem, 'model' | 'quantity' | 'price'>,
    value: string,
  ) => void;
  onAddRow: () => void;
  onCopyRow: (id: string) => void;
  onDeleteRow: (id: string) => void;
  onSave: () => void;
  onClear: () => void;
  showDesktopActions?: boolean;
}

export function OrderForm({
<<<<<<< HEAD
  ui,
  title,
  items,
  modelHistory,
=======
  title,
  items,
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
  errorMessage,
  errorItemId,
  editingLabel,
  onTitleChange,
  onChangeItem,
  onAddRow,
  onCopyRow,
  onDeleteRow,
  onSave,
  onClear,
  showDesktopActions = true,
}: OrderFormProps) {
  return (
<<<<<<< HEAD
    <section className="panel p-4 sm:p-6">
      <div className="mb-5 border-b border-slate-100 pb-4">
        <h2 className="panel-title">{ui.items}</h2>
        {editingLabel ? (
          <p className="mt-1 text-sm text-blue-600">{editingLabel}</p>
        ) : (
          <p className="mt-1 text-sm text-slate-500">{ui.newOrder}</p>
        )}
      </div>

      <label className="mb-5 block">
        <span className="field-label">{ui.orderTitle}</span>
=======
    <section className="panel p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">{ui.items}</h2>
        {editingLabel ? (
          <p className="mt-1 text-xs text-blue-600">{editingLabel}</p>
        ) : (
          <p className="mt-1 text-xs text-slate-500">{ui.newOrder}</p>
        )}
      </div>

      <label className="mb-4 block">
        <span className="mb-1.5 block text-sm font-medium text-slate-700">
          {ui.orderTitle}
        </span>
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder={ui.orderTitlePlaceholder}
          className="field-input"
          autoComplete="off"
        />
      </label>

      <ItemsTable
<<<<<<< HEAD
        ui={ui}
        items={items}
        modelHistory={modelHistory}
=======
        items={items}
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
        errorItemId={errorItemId}
        onChangeItem={onChangeItem}
        onAddRow={onAddRow}
        onCopyRow={onCopyRow}
        onDeleteRow={onDeleteRow}
      />

      {errorMessage ? (
        <p
          id="form-error"
          role="alert"
<<<<<<< HEAD
          className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
=======
          className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
        >
          {errorMessage}
        </p>
      ) : null}

      {showDesktopActions ? (
<<<<<<< HEAD
        <div className="mt-6 flex flex-wrap gap-2.5 border-t border-slate-100 pt-5 sm:flex">
=======
        <div className="mt-5 hidden flex-wrap gap-2 sm:flex">
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
          <button type="button" onClick={onSave} className="btn btn-success">
            {ui.saveDraft}
          </button>
          <button type="button" onClick={onClear} className="btn btn-ghost">
            {ui.clearForm}
          </button>
        </div>
      ) : null}
    </section>
  );
}
