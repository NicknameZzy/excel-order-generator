import type { Language } from '../types';
import { LANGUAGE_OPTIONS, ui } from '../i18n/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onExport: () => void;
  exporting?: boolean;
}

export function Header({
  language,
  onLanguageChange,
  onExport,
  exporting = false,
}: HeaderProps) {
  return (
    <header className="panel px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.16em] text-blue-600">
            ORDER · EXCEL
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {ui.appTitle}
          </h1>
          <p className="mt-1 max-w-xl text-sm text-slate-500">{ui.appSubtitle}</p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end lg:w-auto">
          <label className="flex min-w-0 flex-1 flex-col gap-1.5 text-sm text-slate-600 sm:max-w-[260px]">
            <span className="font-medium text-slate-700">{ui.language}</span>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="field-input"
              aria-describedby="lang-hint"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span id="lang-hint" className="text-xs text-slate-400">
              {ui.languageHint}
            </span>
          </label>

          <button
            type="button"
            onClick={onExport}
            disabled={exporting}
            className="btn btn-primary hidden h-[42px] min-w-[128px] sm:inline-flex"
          >
            {exporting ? ui.exporting : ui.generateExcel}
          </button>
        </div>
      </div>
    </header>
  );
}
