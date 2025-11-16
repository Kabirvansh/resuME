import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ResumeProvider } from "./context/ResumeContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FormPage from "./pages/FormPage";
import PreviewPage from "./pages/PreviewPage";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error('Root element with id="root" not found');

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ResumeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/form" replace />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="*" element={<Navigate to="/form" replace />} />
        </Routes>
      </BrowserRouter>
    </ResumeProvider>
  </React.StrictMode>
);
