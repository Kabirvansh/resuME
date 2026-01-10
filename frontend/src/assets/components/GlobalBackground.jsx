import React from "react";
import { useTheme } from "../../context/ThemeContext";

export default function GlobalBackground() {
  const { lightMode } = useTheme();

  return (
    <div
      className={`fixed inset-0 -z-10 ${lightMode ? "bg-white" : "bg-black"}`}
    >
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full blur-3xl"
        style={{
          background: lightMode
            ? "radial-gradient(closest-side, rgba(42,123,155,.18), transparent)"
            : "radial-gradient(closest-side, rgba(42,123,155,.35), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full blur-3xl"
        style={{
          background: lightMode
            ? "radial-gradient(closest-side, rgba(237,221,83,.18), transparent)"
            : "radial-gradient(closest-side, rgba(237,221,83,.25), transparent)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
