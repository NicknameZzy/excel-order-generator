import type { ModelHistoryEntry, OrderItem } from '../types';
import { getFilledItems } from './format';

const MODEL_HISTORY_KEY = 'excel-order-generator-model-history-v1';

export function normalizeModel(model: string): string {
  return model.trim().replace(/\s+/g, ' ').toLocaleLowerCase();
}

export function loadModelHistory(): ModelHistoryEntry[] {
  try {
    const raw = localStorage.getItem(MODEL_HISTORY_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as ModelHistoryEntry[];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (entry) =>
          typeof entry.model === 'string' &&
          typeof entry.normalizedModel === 'string' &&
          typeof entry.useCount === 'number' &&
          typeof entry.lastUsedAt === 'string',
      )
      .sort(sortModelHistory);
  } catch {
    return [];
  }
}

function saveModelHistory(entries: ModelHistoryEntry[]): void {
  localStorage.setItem(MODEL_HISTORY_KEY, JSON.stringify(entries));
}

export function clearModelHistory(): void {
  localStorage.removeItem(MODEL_HISTORY_KEY);
}

export function recordModels(
  current: ModelHistoryEntry[],
  items: OrderItem[],
): ModelHistoryEntry[] {
  const next = new Map(
    current.map((entry) => [entry.normalizedModel, { ...entry }]),
  );
  const now = new Date().toISOString();

  for (const item of getFilledItems(items)) {
    const model = item.model.trim().replace(/\s+/g, ' ');
    const normalizedModel = normalizeModel(model);
    if (!normalizedModel) continue;

    const existing = next.get(normalizedModel);
    next.set(normalizedModel, {
      model,
      normalizedModel,
      useCount: (existing?.useCount ?? 0) + 1,
      lastUsedAt: now,
    });
  }

  const result = [...next.values()].sort(sortModelHistory);
  saveModelHistory(result);
  return result;
}

export function removeModelHistoryEntry(
  current: ModelHistoryEntry[],
  normalizedModel: string,
): ModelHistoryEntry[] {
  const next = current.filter(
    (entry) => entry.normalizedModel !== normalizedModel,
  );
  saveModelHistory(next);
  return next;
}

export function getModelSuggestions(
  history: ModelHistoryEntry[],
  query: string,
  limit = 3,
): ModelHistoryEntry[] {
  const normalizedQuery = normalizeModel(query);
  const now = Date.now();

  return history
    .map((entry) => {
      const matchIndex = normalizedQuery
        ? entry.normalizedModel.indexOf(normalizedQuery)
        : 0;
      if (normalizedQuery && matchIndex < 0) return null;

      const prefixScore =
        normalizedQuery && entry.normalizedModel.startsWith(normalizedQuery)
          ? 1_000
          : normalizedQuery
            ? 500 - matchIndex * 10
            : 0;
      const frequencyScore = Math.log2(entry.useCount + 1) * 50;
      const ageDays = Math.max(
        0,
        (now - new Date(entry.lastUsedAt).getTime()) / 86_400_000,
      );
      const recencyScore = Math.max(0, 100 - ageDays);

      return {
        entry,
        score: prefixScore + frequencyScore + recencyScore,
      };
    })
    .filter(
      (
        result,
      ): result is {
        entry: ModelHistoryEntry;
        score: number;
      } => result !== null,
    )
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.entry.useCount - a.entry.useCount ||
        b.entry.lastUsedAt.localeCompare(a.entry.lastUsedAt),
    )
    .slice(0, limit)
    .map(({ entry }) => entry);
}

function sortModelHistory(
  a: ModelHistoryEntry,
  b: ModelHistoryEntry,
): number {
  return (
    b.useCount - a.useCount ||
    b.lastUsedAt.localeCompare(a.lastUsedAt) ||
    a.model.localeCompare(b.model)
  );
}
