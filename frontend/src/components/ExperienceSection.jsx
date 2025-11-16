import React, { useState } from "react";
import { Plus, Trash2, Calendar } from "lucide-react";

function ExperienceSection({ data, onChange }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const addExperience = () => {
    const newExperience = {
      title: "",
      organization: "",
      location: "",
      dates: "",
      items: [],
    };
    onChange("experience", [...data, newExperience]);
    setExpandedIndex(data.length);
  };

  const updateExperience = (index, field, value) => {
    const updated = data.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    onChange("experience", updated);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange("experience", updated);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else if (expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
        <button
          onClick={addExperience}
          className="btn-secondary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No work experience added yet</p>
          <button onClick={addExperience} className="btn-primary mt-4">
            Add Your First Job
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div
                className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleExpanded(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {experience.title || "New Position"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {experience.organization || "Organization"}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {experience.location || "Location"} •{" "}
                      {experience.dates || "Dates"}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeExperience(index);
                    }}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Remove experience"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {expandedIndex === index && (
                <div className="p-4 bg-white space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={experience.title}
                        onChange={(e) =>
                          updateExperience(index, "title", e.target.value)
                        }
                        className="input-primary"
                        placeholder="Lead Student Instructor (LSI)"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Organization *
                      </label>
                      <input
                        type="text"
                        value={experience.organization}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            "organization",
                            e.target.value
                          )
                        }
                        className="input-primary"
                        placeholder="University of Alberta"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={experience.location}
                        onChange={(e) =>
                          updateExperience(index, "location", e.target.value)
                        }
                        className="input-primary"
                        placeholder="Edmonton, Alberta"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dates
                      </label>
                      <input
                        type="text"
                        value={experience.dates}
                        onChange={(e) =>
                          updateExperience(index, "dates", e.target.value)
                        }
                        className="input-primary"
                        placeholder="January 2025 - Present"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (one per line)
                    </label>
                    <textarea
                      value={
                        Array.isArray(experience.items)
                          ? experience.items.join("\n")
                          : experience.items || ""
                      }
                      onChange={(e) => {
                        const items = e.target.value
                          .split("\n")
                          .filter((line) => line.trim());
                        updateExperience(index, "items", items);
                      }}
                      rows={5}
                      className="input-primary resize-vertical"
                      placeholder="Guiding students in mastering advanced topics such as objects, functional programming, and Abstract Data Types (ADTs).&#10;Facilitating learning of algorithms, including popular searching and sorting techniques, focusing on time and space efficiency.&#10;Managed a team of TAs for course content development, resource creation, and assignment marking."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter one bullet point per line (no bullet symbols needed)
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExperienceSection;
