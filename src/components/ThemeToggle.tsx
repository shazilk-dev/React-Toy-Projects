import { useTheme } from "../hooks/useTheme";
import { clsx } from "clsx";

export function ThemeToggle() {
  const { resolvedTheme, toggle, theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggle}
        className={clsx(
          "rounded-md border px-3 py-1 text-sm font-medium transition-colors",
          "bg-card hover:bg-muted",
        )}
        title="Toggle light/dark"
      >
        {resolvedTheme === "dark" ? "🌙" : "☀️"}
      </button>
      <select
        aria-label="Theme"
        className="bg-card rounded-md border px-2 py-1 text-xs transition-colors"
        value={theme}
        onChange={(e) =>
          setTheme(e.target.value as "light" | "dark" | "system")
        }
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
}
