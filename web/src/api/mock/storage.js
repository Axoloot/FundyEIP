// Kept separate from adapter.js so the demo banner can reset the demo without
// pulling the whole mock (and its dataset) into non-demo bundles.
export const STORAGE_KEY = 'fundy-demo-state-v1';

export function clearDemoState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // storage unavailable: nothing persisted, nothing to clear
  }
}
