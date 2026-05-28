import { createContext, useContext, useState, useEffect } from "react";

// ─── 1. Create the Context ────────────────────────────────────────────────────
// Default value shape matches what the Provider will supply.
export const ThemeContext = createContext({
  theme: "light",       // current theme string: "light" | "dark"
  toggleTheme: () => {}, // function to flip between themes
});

// ─── 2. Custom Provider Component ────────────────────────────────────────────
// Owns the theme state and exposes it + the toggle to the whole tree.
export function ThemeProvider({ children }) {
  // Initialise from localStorage so the preference survives page refreshes.
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") ?? "light";
  });

  // Whenever theme changes, persist it and update the <html> data attribute.
  // The data-theme attribute is what our CSS variables key off of.
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Toggle logic lives here — components never need to know the details.
  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── 3. Convenience hook ─────────────────────────────────────────────────────
// Any component can call useTheme() instead of importing both useContext
// and ThemeContext separately.
export function useTheme() {
  return useContext(ThemeContext);
}
