import React from "react";

function PersonalInfoSection({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange("personalInfo", { ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="input-primary"
            placeholder="Kabirvansh Singh Chadha"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="input-primary"
            placeholder="kabirvansh1912@gmail.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="input-primary"
            placeholder="587-***-****"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn URL
          </label>
          <input
            type="text"
            value={data.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            className="input-primary"
            placeholder="linkedin.com/in/kabirvansh"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GitHub URL (optional)
          </label>
          <input
            type="text"
            value={data.github}
            onChange={(e) => handleChange("github", e.target.value)}
            className="input-primary"
            placeholder="github.com/Kabirvansh"
          />
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoSection;
