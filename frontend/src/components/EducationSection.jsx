import React, { useState } from "react";
import { Plus, Trash2, GraduationCap } from "lucide-react";

function EducationSection({ data, onChange }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const addEducation = () => {
    const newEducation = {
      university: "",
      degree: "",
      location: "",
      dates: "",
      coursework: "",
    };
    onChange("education", [...data, newEducation]);
    setExpandedIndex(data.length);
  };

  const updateEducation = (index, field, value) => {
    const updated = data.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    onChange("education", updated);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange("education", updated);
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
        <h2 className="text-xl font-semibold text-gray-900">Education</h2>
        <button
          onClick={addEducation}
          className="btn-secondary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No education added yet</p>
          <button onClick={addEducation} className="btn-primary mt-4">
            Add Your Education
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
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
                      {education.university || "University"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {education.degree || "Degree"}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {education.location || "Location"} •{" "}
                      {education.dates || "Dates"}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeEducation(index);
                    }}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Remove education"
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
                        University *
                      </label>
                      <input
                        type="text"
                        value={education.university}
                        onChange={(e) =>
                          updateEducation(index, "university", e.target.value)
                        }
                        className="input-primary"
                        placeholder="University of Alberta"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Education Location
                      </label>
                      <input
                        type="text"
                        value={education.location}
                        onChange={(e) =>
                          updateEducation(index, "location", e.target.value)
                        }
                        className="input-primary"
                        placeholder="Edmonton, Alberta"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Degree *
                      </label>
                      <input
                        type="text"
                        value={education.degree}
                        onChange={(e) =>
                          updateEducation(index, "degree", e.target.value)
                        }
                        className="input-primary"
                        placeholder="Bachelor of Science in Computing Science - Specialization"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Education Dates
                      </label>
                      <input
                        type="text"
                        value={education.dates}
                        onChange={(e) =>
                          updateEducation(index, "dates", e.target.value)
                        }
                        className="input-primary"
                        placeholder="September 2022 - April 2026"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Relevant Coursework (comma separated)
                    </label>
                    <textarea
                      value={education.coursework}
                      onChange={(e) =>
                        updateEducation(index, "coursework", e.target.value)
                      }
                      rows={4}
                      className="input-primary resize-vertical"
                      placeholder="Object-oriented programming, Data Structures and Algorithms, File and Database Management, Machine Learning, Visual Recognition, Statistics, Search and Planning in AI, Reinforcement Learning, Object-oriented design and analysis, Unified Modeling Language (UML), Software architecture, Design patterns, Frameworks, Unit testing, and Economics."
                    />
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

export default EducationSection;
