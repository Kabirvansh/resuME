import React, { useState } from "react";
import { Plus, Trash2, Code2, ExternalLink } from "lucide-react";

function ProjectsSection({ data, onChange }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const addProject = () => {
    const newProject = {
      name: "",
      techs: "",
      date: "",
      items: [],
    };
    onChange("projects", [...data, newProject]);
    setExpandedIndex(data.length);
  };

  const updateProject = (index, field, value) => {
    const updated = data.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    onChange("projects", updated);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange("projects", updated);
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
        <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
        <button
          onClick={addProject}
          className="btn-secondary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Code2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No projects added yet</p>
          <button onClick={addProject} className="btn-primary mt-4">
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
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
                      {project.name || "New Project"}
                    </h3>
                    {project.techs && (
                      <p className="text-gray-600 text-sm">{project.techs}</p>
                    )}
                    <p className="text-gray-500 text-xs mt-1">
                      {project.date || "Date"}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProject(index);
                    }}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Remove project"
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
                        Project Name *
                      </label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) =>
                          updateProject(index, "name", e.target.value)
                        }
                        className="input-primary"
                        placeholder="Compressor Station SCADA Demo"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Completion Month & Year
                      </label>
                      <input
                        type="text"
                        value={project.date}
                        onChange={(e) =>
                          updateProject(index, "date", e.target.value)
                        }
                        className="input-primary"
                        placeholder="May 2025"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Technologies Used (comma separated)
                    </label>
                    <input
                      type="text"
                      value={project.techs}
                      onChange={(e) =>
                        updateProject(index, "techs", e.target.value)
                      }
                      className="input-primary"
                      placeholder="Ignition, OPC UA, Wireshark, Streamlit, Python, Git"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Description (one point per line)
                    </label>
                    <textarea
                      value={
                        Array.isArray(project.items)
                          ? project.items.join("\n")
                          : project.items || ""
                      }
                      onChange={(e) => {
                        const items = e.target.value
                          .split("\n")
                          .filter((line) => line.trim());
                        updateProject(index, "items", items);
                      }}
                      rows={5}
                      className="input-primary resize-vertical"
                      placeholder="Designed and implemented an Ignition Vision HMI with OPC UA-backed tags …&#10;Captured and decoded OPC UA SecureChannel traffic …&#10;Developed a Streamlit dashboard to visualize historical pressure data …"
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

export default ProjectsSection;
