import React from "react";
export default function IconSun({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 2v2.2M12 19.8V22M22 12h-2.2M4.2 12H2M18.36 5.64l-1.56 1.56M7.2 16.8l-1.56 1.56M18.36 18.36l-1.56-1.56M7.2 7.2 5.64 5.64"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}