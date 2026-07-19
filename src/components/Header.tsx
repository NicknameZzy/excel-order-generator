<<<<<<< HEAD
import type { Language, UiLanguage } from '../types';
import { LANGUAGE_OPTIONS } from '../i18n/translations';
import {
  UI_LANGUAGE_OPTIONS,
  type UiLabels,
} from '../i18n/uiTranslations';

interface HeaderProps {
  ui: UiLabels;
  uiLanguage: UiLanguage;
  onUiLanguageChange: (language: UiLanguage) => void;
=======
import type { Language } from '../types';
import { LANGUAGE_OPTIONS, ui } from '../i18n/translations';

interface HeaderProps {
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
  language: Language;
  onLanguageChange: (language: Language) => void;
  onExport: () => void;
  exporting?: boolean;
}

export function Header({
<<<<<<< HEAD
  ui,
  uiLanguage,
  onUiLanguageChange,
=======
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
  language,
  onLanguageChange,
  onExport,
  exporting = false,
}: HeaderProps) {
  return (
<<<<<<< HEAD
    <header className="panel px-4 py-5 sm:px-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="panel-kicker">Order · Excel</p>
          <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.75rem]">
            {ui.appTitle}
          </h1>
          <p className="mt-1.5 max-w-xl text-[0.95rem] leading-relaxed text-slate-500">
            {ui.appSubtitle}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-start lg:w-auto">
          <label className="flex min-w-0 flex-col sm:w-[210px]">
            <span className="field-label">{ui.uiLanguage}</span>
            <select
              value={uiLanguage}
              onChange={(e) =>
                onUiLanguageChange(e.target.value as UiLanguage)
              }
              className="field-input"
            >
              {UI_LANGUAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="mt-1 min-h-[1rem] text-xs text-transparent select-none">
              .
            </span>
          </label>

          <label className="flex min-w-0 flex-col sm:w-[210px]">
            <span className="field-label">{ui.exportLanguage}</span>
=======
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
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
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
<<<<<<< HEAD
            <span id="lang-hint" className="mt-1 min-h-[1rem] text-xs text-slate-400">
=======
            <span id="lang-hint" className="text-xs text-slate-400">
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
              {ui.languageHint}
            </span>
          </label>

          <button
            type="button"
            onClick={onExport}
            disabled={exporting}
<<<<<<< HEAD
            className="btn btn-primary hidden h-[46px] min-w-[148px] sm:mt-[1.625rem] sm:inline-flex"
=======
            className="btn btn-primary hidden h-[42px] min-w-[128px] sm:inline-flex"
>>>>>>> 2e8b9ae (Ready for Vercel: Excel order generator web app.)
          >
            {exporting ? ui.exporting : ui.generateExcel}
          </button>
        </div>
      </div>
    </header>
  );
}
