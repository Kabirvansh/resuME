import React from "react";

function SkillsSection({ data, onChange }) {
  const handleChange = (category, value) => {
    onChange("skills", { ...data, [category]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Technical Skills
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Languages
          </label>
          <input
            type="text"
            value={data.Languages || ""}
            onChange={(e) => handleChange("Languages", e.target.value)}
            className="input-primary"
            placeholder="Java, Python, SQL, JavaScript/TypeScript, C, HTML, Flask, React, Next.js, TailwindCSS, Bootstrap"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Back-End & APIs
          </label>
          <input
            type="text"
            value={data["Back-End & APIs"] || ""}
            onChange={(e) => handleChange("Back-End & APIs", e.target.value)}
            className="input-primary"
            placeholder="Django, Flask, FastAPI, PostgreSQL, MongoDB"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Visualization & BI
          </label>
          <input
            type="text"
            value={data["Data Visualization & BI"] || ""}
            onChange={(e) =>
              handleChange("Data Visualization & BI", e.target.value)
            }
            className="input-primary"
            placeholder="Plotly Dash, Streamlit, Power BI, Tableau"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cloud & DevOps
          </label>
          <input
            type="text"
            value={data["Cloud & DevOps"] || ""}
            onChange={(e) => handleChange("Cloud & DevOps", e.target.value)}
            className="input-primary"
            placeholder="Microsoft Azure, Firebase, Supabase, Amazon S3, Docker, Git/GitHub, Postman, Splunk, Hadoop"
          />
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Enter skills separated by commas for each category
      </p>
    </div>
  );
}

export default SkillsSection;
