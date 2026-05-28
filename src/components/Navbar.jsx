import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

/**
 * Navbar reads `theme` and `toggleTheme` from ThemeContext.
 *
 * - The nav background uses the --bg-nav CSS variable (defined in app.css),
 *   so it automatically reflects the active theme.
 * - The toggle button shows a sun ☀️ or moon 🌙 icon and calls toggleTheme()
 *   on click — no prop drilling needed.
 */
export default function Navbar() {
  // ── Consume the context ──────────────────────────────────────────────────
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        padding: "1rem 1.5rem",
        backgroundColor: "var(--bg-nav)",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.4)",
        transition: "background-color 0.25s ease",
      }}
    >
      {/* Brand */}
      <span
        style={{
          color: "var(--accent-text)",
          fontWeight: 700,
          fontSize: "1.125rem",
          marginRight: "auto",
          letterSpacing: "-0.025em",
        }}
      >
        🍴 Recipe Gallery
      </span>

      {/* Nav links */}
      <NavLink to="/" end style={navLinkStyle}>
        {({ isActive }) => (
          <span style={isActive ? activeLinkStyle : inactiveLinkStyle}>Home</span>
        )}
      </NavLink>

      <NavLink to="/gallery" style={navLinkStyle}>
        {({ isActive }) => (
          <span style={isActive ? activeLinkStyle : inactiveLinkStyle}>Gallery</span>
        )}
      </NavLink>

      {/* ── Theme toggle button ──────────────────────────────────────────── */}
      {/* Reads `theme` from context to show the correct icon,
          calls `toggleTheme` to flip the global state */}
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.375rem 0.75rem",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          fontSize: "0.875rem",
          fontWeight: 500,
          backgroundColor: "var(--toggle-bg)",
          color: "var(--toggle-text)",
          transition: "background-color 0.25s ease, color 0.25s ease",
        }}
      >
        {/* Dynamic icon based on current theme value from Context */}
        <span style={{ fontSize: "1rem" }}>
          {theme === "light" ? "🌙" : "☀️"}
        </span>
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </nav>
  );
}

// ── Shared link styles ────────────────────────────────────────────────────────
const navLinkStyle = { textDecoration: "none" };

const activeLinkStyle = {
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "var(--accent-text)",
  borderBottom: "2px solid var(--accent-text)",
  paddingBottom: "2px",
  transition: "color 0.2s",
};

const inactiveLinkStyle = {
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "var(--text-nav)",
  borderBottom: "2px solid transparent",
  paddingBottom: "2px",
  transition: "color 0.2s",
};
