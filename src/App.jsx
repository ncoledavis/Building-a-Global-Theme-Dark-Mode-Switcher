import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Gallery from "./routes/Gallery";
import RecipeDetail from "./routes/RecipeDetail";

/**
 * App is the shell component — it renders the persistent Navbar and then
 * delegates to the correct route component via React Router's <Routes>.
 *
 * ThemeProvider (in main.tsx) sits above this, so every component here
 * can call useTheme() to read or toggle the current theme.
 */
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </>
  );
}
