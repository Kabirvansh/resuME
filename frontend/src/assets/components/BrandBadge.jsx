import React from "react";

export default function BrandBadge({ children }) {
  return (
    <div
      className="h-12 w-12 shrink-0 rounded-xl grid place-items-center"
      style={{
        // background: "darkgrey",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
