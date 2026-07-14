import type { HistoryRecord } from '../types';

const STORAGE_KEY = 'excel-order-generator-history';

export function loadHistory(): HistoryRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryRecord[];
    if (!Array.isArray(parsed)) return [];
    return parsed.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  } catch {
    return [];
  }
}

export function saveHistory(records: HistoryRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function upsertHistoryRecord(
  records: HistoryRecord[],
  record: HistoryRecord,
): HistoryRecord[] {
  const index = records.findIndex((r) => r.id === record.id);
  let next: HistoryRecord[];
  if (index >= 0) {
    next = [...records];
    next[index] = record;
  } else {
    next = [record, ...records];
  }
  saveHistory(next);
  return next.sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function removeHistoryRecord(
  records: HistoryRecord[],
  id: string,
): HistoryRecord[] {
  const next = records.filter((r) => r.id !== id);
  saveHistory(next);
  return next;
}
