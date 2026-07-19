import type { Language, OrderItem } from '../types';
import { getExcelLabels } from '../i18n/translations';
import type { UiLabels } from '../i18n/uiTranslations';
import {
  calcLineTotal,
  formatPrice,
  formatQuantity,
  getFilledItems,
  parseNumber,
} from '../utils/format';
import { SummaryCard } from './SummaryCard';

interface PreviewTableProps {
  ui: UiLabels;
  language: Language;
  title: string;
  items: OrderItem[];
  totalQuantity: number;
  totalAmount: number;
}

export function PreviewTable({
  ui,
  language,
  title,
  items,
  totalQuantity,
  totalAmount,
}: PreviewTableProps) {
  const labels = getExcelLabels(language);
  const filled = getFilledItems(items);

  return (
    <section className="panel p-4 sm:p-6">
      <div className="mb-4 border-b border-slate-100 pb-4">
        <h2 className="panel-title">{ui.preview}</h2>
        <p className="mt-1 text-sm text-slate-500">{ui.previewHint}</p>
      </div>

      <div className="mt-4">
        <SummaryCard
          ui={ui}
          totalQuantity={totalQuantity}
          totalAmount={totalAmount}
          itemCount={filled.length}
          language={language}
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-300 bg-white">
        <div className="border-b border-slate-200 px-3 py-3 text-center sm:px-4 sm:py-4">
          <p className="break-words text-sm font-bold text-slate-900 sm:text-base">
            {title.trim() || '—'}
          </p>
        </div>

        <table className="min-w-[480px] w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="border border-slate-300 px-2 py-2 font-bold sm:px-3">
                {labels.quantity}
              </th>
              <th className="border border-slate-300 px-2 py-2 font-bold sm:px-3">
                {labels.model}
              </th>
              <th className="border border-slate-300 px-2 py-2 font-bold sm:px-3">
                {labels.price}
              </th>
              <th className="border border-slate-300 px-2 py-2 font-bold sm:px-3">
                {labels.total}
              </th>
            </tr>
          </thead>
          <tbody>
            {filled.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="border border-slate-300 px-3 py-8 text-center text-slate-400"
                >
                  {ui.noPreviewItems}
                </td>
              </tr>
            ) : (
              filled.map((item) => {
                const qty = parseNumber(item.quantity) ?? 0;
                const price = parseNumber(item.price) ?? 0;
                const lineTotal = calcLineTotal(item.quantity, item.price);
                return (
                  <tr key={item.id}>
                    <td className="border border-slate-300 px-2 py-2 text-center sm:px-3">
                      {formatQuantity(qty)}
                    </td>
                    <td className="border border-slate-300 px-2 py-2 text-center sm:px-3">
                      {item.model.trim()}
                    </td>
                    <td className="border border-slate-300 px-2 py-2 text-center sm:px-3">
                      {formatPrice(price, language)}
                    </td>
                    <td className="border border-slate-300 px-2 py-2 text-center sm:px-3">
                      {formatPrice(lineTotal, language)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 px-3 py-3 sm:gap-6 sm:px-4 sm:py-4">
          <span className="font-bold text-slate-800">{labels.orderTotal}</span>
          <span className="min-w-[110px] rounded border border-slate-300 px-3 py-1.5 text-center font-bold text-slate-900">
            {formatPrice(totalAmount, language)}
          </span>
        </div>
      </div>
    </section>
  );
}
