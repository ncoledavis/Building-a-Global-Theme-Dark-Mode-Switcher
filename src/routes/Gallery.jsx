import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { recipes } from "../data/recipes";

/**
 * Gallery page — full recipe grid.
 *
 * useTheme() is called to get the current `theme` string from ThemeContext.
 * Inline styles reference CSS variables (set by ThemeProvider on <html>)
 * so colours update automatically when the theme toggles.
 */
export default function Gallery() {
  // ── Read theme from Context ──────────────────────────────────────────────
  const { theme } = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        // CSS variable resolves to the correct colour for the active theme
        backgroundColor: "var(--bg-page)",
        padding: "2.5rem 1.5rem",
        transition: "background-color 0.25s ease",
      }}
    >
      {/* Page header */}
      <div style={{ maxWidth: "80rem", margin: "0 auto 2.5rem" }}>
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.025em",
          }}
        >
          Recipe Gallery
        </h1>
        <p
          style={{
            marginTop: "0.5rem",
            color: "var(--text-secondary)",
            fontSize: "1.125rem",
          }}
        >
          {recipes.length} recipes to explore
        </p>
      </div>

      {/* Recipe grid */}
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "2rem",
        }}
      >
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            style={{
              display: "block",
              borderRadius: "1rem",
              overflow: "hidden",
              textDecoration: "none",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
              // Dynamic card background based on Context value
              backgroundColor: theme === "dark" ? "var(--bg-card)" : "#ffffff",
              transition:
                "box-shadow 0.3s ease, background-color 0.25s ease",
            }}
          >
            {/* Thumbnail */}
            <div style={{ overflow: "hidden", height: "14rem" }}>
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                }}
              />
            </div>

            {/* Card body */}
            <div style={{ padding: "1.25rem" }}>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "0.25rem",
                  transition: "color 0.2s",
                }}
              >
                {recipe.title}
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                }}
              >
                {recipe.description}
              </p>
              <span
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--accent)",
                }}
              >
                View Recipe →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
