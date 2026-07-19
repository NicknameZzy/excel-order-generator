import { useEffect, useId, useMemo, useState } from 'react';
import type { ModelHistoryEntry } from '../types';
import type { UiLabels } from '../i18n/uiTranslations';
import { getModelSuggestions } from '../utils/modelHistory';

interface ModelInputProps {
  value: string;
  history: ModelHistoryEntry[];
  ui: UiLabels;
  className?: string;
  onChange: (value: string) => void;
}

export function ModelInput({
  value,
  history,
  ui,
  className = 'field-input',
  onChange,
}: ModelInputProps) {
  const listId = useId();
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const suggestions = useMemo(
    () => getModelSuggestions(history, value, 3),
    [history, value],
  );
  const isOpen = isFocused && suggestions.length > 0;

  useEffect(() => {
    setActiveIndex(0);
  }, [value]);

  function chooseModel(model: string) {
    onChange(model);
    setIsFocused(false);
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(event) => {
          if (!isOpen) return;

          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((current) => (current + 1) % suggestions.length);
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex(
              (current) =>
                (current - 1 + suggestions.length) % suggestions.length,
            );
          } else if (event.key === 'Enter') {
            event.preventDefault();
            chooseModel(suggestions[activeIndex].model);
          } else if (event.key === 'Escape') {
            setIsFocused(false);
          }
        }}
        placeholder={ui.model}
        className={className}
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        aria-activedescendant={
          isOpen ? `${listId}-option-${activeIndex}` : undefined
        }
      />

      {isOpen ? (
        <div
          id={listId}
          role="listbox"
          aria-label={ui.modelSuggestions}
          className="absolute inset-x-0 top-full z-30 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.normalizedModel}
              id={`${listId}-option-${index}`}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => chooseModel(suggestion.model)}
              className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm ${
                index === activeIndex
                  ? 'bg-blue-50 text-blue-800'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="truncate font-medium">{suggestion.model}</span>
              <span className="shrink-0 text-xs text-slate-400">
                {ui.usageCount.replace('{n}', String(suggestion.useCount))}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
