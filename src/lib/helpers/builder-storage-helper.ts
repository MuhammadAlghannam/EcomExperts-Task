import type { BuilderState } from "@/lib/types/builder";

const STORAGE_KEY = "wyze-builder-system";

export function saveBuilderState(steps: BuilderState["steps"]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ steps }));
}

export function loadBuilderState(): BuilderState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return null;

    const parsed = JSON.parse(raw) as BuilderState;

    if (!Array.isArray(parsed.steps)) return null;

    return parsed;
  } catch {
    return null;
  }
}
