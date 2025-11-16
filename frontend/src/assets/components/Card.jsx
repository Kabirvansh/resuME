import React from "react";
import { useTheme } from "../../context/ThemeContext";

/**
 * Card: padded, bordered surface that adapts to theme.
 * - Light: soft off-white surfaces (bg-slate-50) with slate borders.
 * - Dark: translucent dark surfaces with gray borders.
 */
export default function Card({
  className = "",
  children,
  title,
  subtitle,
  actions,
}) {
  const { lightMode } = useTheme();
  const surface = lightMode
    ? "bg-slate-50 border-slate-200"
    : "bg-gray-900/60 border-gray-800";
  const titleClr = lightMode ? "text-gray-900" : "text-white";
  const subtitleClr = lightMode ? "text-gray-700" : "text-gray-300";

  return (
    <div className={`rounded-2xl border p-6 sm:p-8 ${surface} ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className={`text-xl font-semibold ${titleClr}`}>{title}</h3>
          )}
          {subtitle && (
            <p className={`mt-1 text-sm ${subtitleClr}`}>{subtitle}</p>
          )}
        </div>
      )}
      {children}
      {actions && <div className="mt-6">{actions}</div>}
    </div>
  );
}
