import React from "react";
import Card from "./Card";
import { useTheme } from "../../context/ThemeContext";

export default function JobDescriptionCard({
  value,
  onChange,
  onSubmit,
  onClear,
  rows = 8,
}) {
  const { lightMode } = useTheme();

  // Theme-aware styles
  const inputBg = lightMode ? "bg-white" : "bg-gray-800";
  const inputBorder = lightMode ? "border-gray-300" : "border-gray-700";
  const inputText = lightMode ? "text-black" : "text-white";
  const placeholder = lightMode
    ? "placeholder-gray-500"
    : "placeholder-gray-400";
  const buttonPrimaryText = lightMode ? "text-black" : "text-white";
  const gradient =
    "linear-gradient(90deg, rgba(42,123,155,1) 0%, rgba(87,199,133,1) 50%, rgba(237,221,83,1) 100%)";

  return (
    <Card
      title="Paste the job description"
      subtitle="We’ll use this to tailor your resume and improve ATS match."
    >
      <div className="space-y-4">
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`w-full px-4 py-3 border rounded-md ${inputBg} ${inputBorder} ${inputText} ${placeholder} resize-y`}
          placeholder="Paste the complete job description here..."
        />
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClear}
            className={`px-4 py-2 rounded-md ${
              lightMode
                ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => onSubmit?.(value)}
            className={`px-4 py-2 rounded-md font-medium ${buttonPrimaryText}`}
            style={{ background: gradient }}
          >
            Submit Description
          </button>
        </div>
      </div>
    </Card>
  );
}
