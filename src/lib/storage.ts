const key = (name: string) => `aiforge:${name}`;

export function readStorage<T>(name: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key(name));
    return value ? JSON.parse(value) as T : fallback;
  } catch { return fallback; }
}

export function writeStorage<T>(name: string, value: T) {
  localStorage.setItem(key(name), JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("aiforge-storage", { detail: name }));
}
