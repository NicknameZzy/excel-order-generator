import type { ModelHistoryEntry } from '../types';
import type { UiLabels } from '../i18n/uiTranslations';

interface ModelHistoryPanelProps {
  ui: UiLabels;
  entries: ModelHistoryEntry[];
  onRemove: (normalizedModel: string) => void;
}

export function ModelHistoryPanel({
  ui,
  entries,
  onRemove,
}: ModelHistoryPanelProps) {
  return (
    <section className="panel p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <h2 className="panel-title">{ui.modelHistory}</h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          {entries.length}
        </span>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">
        {ui.modelHistoryHint}
      </p>

      {entries.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          {ui.emptyModelHistory}
        </div>
      ) : (
        <ul className="mt-4 max-h-72 space-y-2 overflow-y-auto overscroll-contain pr-0.5">
          {entries.map((entry) => (
            <li
              key={entry.normalizedModel}
              className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">
                  {entry.model}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {ui.usageCount.replace('{n}', String(entry.useCount))}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(entry.normalizedModel)}
                className="shrink-0 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                aria-label={`${ui.removeModel}: ${entry.model}`}
              >
                {ui.delete}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
