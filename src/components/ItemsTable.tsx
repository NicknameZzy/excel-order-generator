import type { ModelHistoryEntry, OrderItem } from '../types';
import type { UiLabels } from '../i18n/uiTranslations';
import { ModelInput } from './ModelInput';

interface ItemsTableProps {
  ui: UiLabels;
  items: OrderItem[];
  modelHistory: ModelHistoryEntry[];
  errorItemId?: string | null;
  onChangeItem: (
    id: string,
    field: keyof Pick<OrderItem, 'model' | 'quantity' | 'price'>,
    value: string,
  ) => void;
  onAddRow: () => void;
  onCopyRow: (id: string) => void;
  onDeleteRow: (id: string) => void;
}

export function ItemsTable({
  ui,
  items,
  modelHistory,
  errorItemId,
  onChangeItem,
  onAddRow,
  onCopyRow,
  onDeleteRow,
}: ItemsTableProps) {
  return (
    <div className="space-y-3">
      {/* Mobile: card list */}
      <div className="space-y-3 md:hidden">
        {items.map((item, index) => {
          const isError = errorItemId === item.id;
          return (
            <div
              key={item.id}
              data-error-row={isError ? 'true' : undefined}
              className={`rounded-xl border p-3 ${
                isError
                  ? 'border-red-300 bg-red-50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {ui.rowLabel.replace('{n}', String(index + 1))}
                </span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => onCopyRow(item.id)}
                    className="btn btn-ghost !px-2 !py-1 !text-xs"
                  >
                    {ui.copyRow}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteRow(item.id)}
                    disabled={items.length <= 1}
                    className="btn btn-danger !px-2 !py-1 !text-xs"
                  >
                    {ui.deleteRow}
                  </button>
                </div>
              </div>

              <label className="mb-2 block">
                <span className="mb-1 block text-xs text-slate-500">
                  {ui.model}
                </span>
                <ModelInput
                  value={item.model}
                  history={modelHistory}
                  ui={ui}
                  onChange={(value) =>
                    onChangeItem(item.id, 'model', value)
                  }
                />
              </label>

              <div className="grid grid-cols-2 gap-2">
                <label>
                  <span className="mb-1 block text-xs text-slate-500">
                    {ui.quantity}
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    value={item.quantity}
                    onChange={(e) =>
                      onChangeItem(item.id, 'quantity', e.target.value)
                    }
                    placeholder="0"
                    className="field-input"
                  />
                </label>
                <label>
                  <span className="mb-1 block text-xs text-slate-500">
                    {ui.price}
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    value={item.price}
                    onChange={(e) =>
                      onChangeItem(item.id, 'price', e.target.value)
                    }
                    placeholder="0.00"
                    className="field-input"
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 md:block">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="w-12 px-3 py-2.5 font-medium">#</th>
              <th className="min-w-[200px] px-3 py-2.5 font-medium">
                {ui.model}
              </th>
              <th className="w-28 px-3 py-2.5 font-medium">{ui.quantity}</th>
              <th className="w-32 px-3 py-2.5 font-medium">{ui.price}</th>
              <th className="w-36 px-3 py-2.5 font-medium">{ui.actions}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const isError = errorItemId === item.id;
              return (
                <tr
                  key={item.id}
                  data-error-row={isError ? 'true' : undefined}
                  className={`border-t border-slate-100 ${
                    isError ? 'bg-red-50' : 'bg-white'
                  }`}
                >
                  <td className="px-3 py-2 text-slate-400">{index + 1}</td>
                  <td className="px-2 py-1.5">
                    <ModelInput
                      value={item.model}
                      history={modelHistory}
                      ui={ui}
                      onChange={(value) =>
                        onChangeItem(item.id, 'model', value)
                      }
                      className="field-input !py-1.5"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={item.quantity}
                      onChange={(e) =>
                        onChangeItem(item.id, 'quantity', e.target.value)
                      }
                      placeholder="0"
                      className="field-input !py-1.5"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) =>
                        onChangeItem(item.id, 'price', e.target.value)
                      }
                      placeholder="0.00"
                      className="field-input !py-1.5"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => onCopyRow(item.id)}
                        className="btn btn-ghost !px-2 !py-1 !text-xs"
                      >
                        {ui.copyRow}
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteRow(item.id)}
                        disabled={items.length <= 1}
                        className="btn btn-danger !px-2 !py-1 !text-xs"
                      >
                        {ui.deleteRow}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={onAddRow}
        className="btn btn-ghost w-full border-dashed border-slate-300 sm:w-auto"
      >
        + {ui.addRow}
      </button>
    </div>
  );
}
