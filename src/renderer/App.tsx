import { BrowserRouter, Link, Route, Routes } from "react-router";
import { Home } from "./routes/Home.tsx";
import { Settings } from "./routes/Settings.tsx";

// Root component: a minimal nav + client-side routing shell. The Deno server's
// SPA fallback serves index.html for any path, so deep links/reloads work.
export function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/settings">Settings</Link>
      </nav>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
