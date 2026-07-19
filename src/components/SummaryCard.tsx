import type { Language } from '../types';
import type { UiLabels } from '../i18n/uiTranslations';
import { formatPrice, formatQuantity } from '../utils/format';

interface SummaryCardProps {
  ui: UiLabels;
  language: Language;
  totalQuantity: number;
  totalAmount: number;
  itemCount: number;
}

export function SummaryCard({
  ui,
  language,
  totalQuantity,
  totalAmount,
  itemCount,
}: SummaryCardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-3 sm:px-3">
        <p className="text-[11px] text-slate-500 sm:text-xs">{ui.itemCount}</p>
        <p className="mt-1 text-base font-semibold text-slate-900 sm:text-lg">
          {itemCount}
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-3 sm:px-3">
        <p className="text-[11px] text-slate-500 sm:text-xs">
          {ui.totalQuantity}
        </p>
        <p className="mt-1 text-base font-semibold text-slate-900 sm:text-lg">
          {formatQuantity(totalQuantity)}
        </p>
      </div>
      <div className="rounded-xl border border-blue-100 bg-blue-50 px-2.5 py-3 sm:px-3">
        <p className="text-[11px] text-blue-600 sm:text-xs">{ui.orderTotal}</p>
        <p className="mt-1 break-all text-base font-semibold text-blue-700 sm:text-lg">
          {formatPrice(totalAmount, language)}
        </p>
      </div>
    </div>
  );
}
