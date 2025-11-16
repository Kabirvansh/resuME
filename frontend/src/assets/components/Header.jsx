import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../../context/ThemeContext";

export default function Header() {
  const { lightMode, toggleLightMode } = useTheme();

  // Link styles adapt to theme so the transparent header has good contrast
  const active = lightMode
    ? "bg-gray-200 text-black"
    : "bg-gray-800 text-white";
  const idle = lightMode
    ? "text-gray-700 hover:text-black hover:bg-gray-100"
    : "text-gray-300 hover:text-white hover:bg-gray-800/60";

  return (
    <header className=" top-0 z-10 bg-transparent">
      {" "}
      {/* transparent header */}
      <div className="relative max-w-6xl mx-auto px-4 py-4 flex flex-col items-center justify-center text-center">
        {/* Theme toggle in header (top-right) */}
        <div className="absolute right-4 top-4">
          <ThemeToggle lightMode={lightMode} onToggle={toggleLightMode} />
        </div>

        {/* Brand */}
        <h1 className="text-3xl sm:text-6xl font-extrabold leading-tight">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
            }}
          >
            ResuME
          </span>
        </h1>

        {/* Nav */}
        <nav className="mt-3 self-end flex flex-wrap items-center justify-end gap-2 text-sm">
          <NavLink
            to="/form"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md ${isActive ? active : idle}`
            }
          >
            Resume Builder
          </NavLink>
          <NavLink
            to="/ats"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md ${isActive ? active : idle}`
            }
          >
            ATS Analyzer
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md ${isActive ? active : idle}`
            }
          >
            Jobs Applied
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
