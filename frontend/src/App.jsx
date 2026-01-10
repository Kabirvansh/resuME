import React from "react";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ResumeProvider } from "./context/ResumeContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import FormPage from "./pages/FormPage";
import ATSAnalyzer from "./pages/ATSAnalyzer";
import JobsApplied from "./pages/JobsApplied";
import LandingPage from "./pages/LandingPage";
import Header from "./assets/components/Header";
import GlobalBackground from "./assets/components/GlobalBackground";

// App.jsx = Global shell of the frontend.
// - Provides the site-wide header and navigation bar
// - Defines routes (/form, /ats, /jobs)
// - Wraps everything in ResumeProvider so all pages can read/write resume data
//
// Styling notes:
// - We use Tailwind utility classes (e.g., bg-gray-900, text-white, px-4).
// - To change colors, spacing, or typography, edit the className strings below.
// - Header brand text "ResuME" can be changed directly in the <h1>.
// - To add a new top-level page, create a file in src/pages and add a <Route> + <NavLink>.

function Shell() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const { lightMode } = useTheme();

  return (
    // No bg-* here; let GlobalBackground control page background.
    <div className={`min-h-screen ${lightMode ? "text-black" : "text-white"}`}>
      <GlobalBackground />
      {!isLanding && <Header />}

      <main className={isLanding ? "" : "max-w-6xl mx-auto px-4 py-6"}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/ats" element={<ATSAnalyzer />} />
          <Route path="/jobs" element={<JobsApplied />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <Shell />
      </ResumeProvider>
    </ThemeProvider>
  );
}
