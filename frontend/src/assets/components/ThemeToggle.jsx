import React from "react";
import IconSun from "../icons/Sun";
import IconMoon from "../icons/Moon";

export default function ThemeToggle({ lightMode, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={lightMode ? "Switch to dark mode" : "Switch to light mode"}
      title={lightMode ? "Dark mode" : "Light mode"}
      className={`absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 transition
        ${
          lightMode
            ? "bg-white text-gray-800 ring-gray-300 hover:bg-gray-50"
            : "bg-white/10 text-white ring-white/20 hover:bg-white/15"
        }`}
    >
      {lightMode ? (
        <IconMoon className="h-5 w-5" />
      ) : (
        <IconSun className="h-5 w-5" />
      )}
    </button>
  );
}
