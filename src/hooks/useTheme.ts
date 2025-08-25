import { useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark" | "system";

function getSystemPreference(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(resolved: "light" | "dark") {
  const root = document.documentElement;
  if (resolved === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    getSystemPreference(),
  );

  // Load from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
      const res = stored === "system" ? getSystemPreference() : stored;
      setResolvedTheme(res);
      applyTheme(res);
    } else {
      // default system
      const res = getSystemPreference();
      setResolvedTheme(res);
      applyTheme(res);
    }
  }, []);

  // Respond to system changes when in system mode
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      const res = getSystemPreference();
      setResolvedTheme(res);
      applyTheme(res);
    };
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, [theme]);

  const setAndStore = useCallback((t: Theme) => {
    setTheme(t);
    localStorage.setItem("theme", t);
    const res = t === "system" ? getSystemPreference() : t;
    setResolvedTheme(res);
    applyTheme(res);
  }, []);

  const toggle = useCallback(() => {
    setAndStore(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setAndStore]);

  return { theme, resolvedTheme, setTheme: setAndStore, toggle };
}
