import type { HistoryRecord, Language } from '../types';
import { LANGUAGE_OPTIONS, LANGUAGE_CODE, ui } from '../i18n/translations';
import { formatDateTime, formatPrice } from '../utils/format';

interface HistoryPanelProps {
  records: HistoryRecord[];
  activeId?: string | null;
  onLoad: (record: HistoryRecord) => void;
  onExport: (record: HistoryRecord) => void;
  onDuplicate: (record: HistoryRecord) => void;
  onDelete: (record: HistoryRecord) => void;
}

function languageLabel(code: Language): string {
  return (
    LANGUAGE_OPTIONS.find((o) => o.value === code)?.label ??
    LANGUAGE_CODE[code]
  );
}

export function HistoryPanel({
  records,
  activeId,
  onLoad,
  onExport,
  onDuplicate,
  onDelete,
}: HistoryPanelProps) {
  return (
    <section className="panel p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">{ui.history}</h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          {records.length}
        </span>
      </div>

      {records.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center">
          <p className="font-medium text-slate-700">{ui.emptyHistory}</p>
          <p className="mt-1 text-sm text-slate-500">{ui.emptyHistoryHint}</p>
        </div>
      ) : (
        <ul className="max-h-[min(520px,55vh)] space-y-3 overflow-y-auto overscroll-contain pr-0.5">
          {records.map((record) => {
            const isActive = activeId === record.id;
            const productCount = record.items.filter((i) =>
              i.model.trim(),
            ).length;
            return (
              <li
                key={record.id}
                className={`rounded-xl border p-3 transition ${
                  isActive
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {record.title.trim() || ui.appTitle}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {ui.createdAt}：{formatDateTime(record.createdAt)}
                    </p>
                  </div>
                  <span
                    className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600"
                    title={languageLabel(record.language)}
                  >
                    {LANGUAGE_CODE[record.language]}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600">
                  <span>
                    {productCount} {ui.products}
                  </span>
                  <span>
                    {formatPrice(record.totalAmount, record.language)}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => onLoad(record)}
                    className="rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
                  >
                    {ui.load}
                  </button>
                  <button
                    type="button"
                    onClick={() => onExport(record)}
                    className="rounded-md border border-blue-200 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50"
                  >
                    {ui.export}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDuplicate(record)}
                    className="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {ui.duplicate}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(record)}
                    className="rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    {ui.delete}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
