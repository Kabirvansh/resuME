import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// main.jsx = Frontend entry point.
// - Imports global CSS (Tailwind + custom styles)
// - Mounts the React app and sets up routing (BrowserRouter)
// - Includes simple error surfacing to help debug blank screens quickly

// Surface any runtime errors directly in the page so we don't miss them
function showErrorOnPage(err) {
  const root = document.getElementById("root");
  if (!root) return;
  const message = (err && (err.stack || err.message)) || String(err);
  root.innerHTML = `<div style="padding:16px;background:#ef4444;color:white;font-family:monospace;white-space:pre-wrap">
    <strong>React boot error</strong>\n${message}
  </div>`;
}

window.addEventListener("error", (e) => {
  console.error("Global error:", e.error || e.message);
  showErrorOnPage(e.error || e.message);
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason);
  showErrorOnPage(e.reason);
});

try {
  console.log("main.jsx: mounting React app");
  const status = document.getElementById("status");
  if (status) status.textContent = "Stage: main.jsx executing";
  const rootEl = document.getElementById("root");
  if (!rootEl) throw new Error('Root element with id="root" not found');
  const root = createRoot(rootEl);
  if (status) status.textContent = "Stage: ReactDOM.createRoot created";
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  if (status) status.textContent = "Stage: root.render called";
  console.log("main.jsx: mount requested");
} catch (err) {
  console.error("Failed to mount React app:", err);
  showErrorOnPage(err);
}
