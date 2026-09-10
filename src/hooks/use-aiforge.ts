import { useCallback, useEffect, useState } from "react";
import { readStorage, writeStorage } from "@/lib/storage";

export function useStoredList(name: string) {
  const [items, setItems] = useState<string[]>(() => readStorage(name, []));
  useEffect(() => {
    const sync = () => setItems(readStorage(name, []));
    window.addEventListener("aiforge-storage", sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("aiforge-storage", sync); window.removeEventListener("storage", sync); };
  }, [name]);
  const toggle = useCallback((id: string) => {
    setItems(current => {
      const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
      writeStorage(name, next);
      return next;
    });
  }, [name]);
  const clear = useCallback(() => { writeStorage(name, []); setItems([]); }, [name]);
  return { items, toggle, clear };
}

export function usePreference(name: string, fallback: string) {
  const [value, setValue] = useState(() => readStorage(name, fallback));
  const update = useCallback((next: string) => { setValue(next); writeStorage(name, next); }, [name]);
  return [value, update] as const;
}