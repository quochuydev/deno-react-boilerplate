import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./styles/global.css";

// Renderer entry. esbuild bundles this (and everything it imports, including
// React and the CSS) into dist/renderer.js + dist/renderer.css, which the
// Deno server serves to the webview.
const root = document.getElementById("root");
if (!root) throw new Error("#root element not found");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
