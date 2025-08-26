import React, { useState } from 'react'
import { Plus, Trash2, Code2, ExternalLink } from 'lucide-react'

function ProjectsSection({ data, onChange }) {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const addProject = () => {
    const newProject = {
      name: '',
      description: '',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      highlights: ''
    }
    onChange('projects', [...data, newProject])
    setExpandedIndex(data.length)
  }

  const updateProject = (index, field, value) => {
    const updated = data.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    )
    onChange('projects', updated)
  }

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index)
    onChange('projects', updated)
    if (expandedIndex === index) {
      setExpandedIndex(null)
    } else if (expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1)
    }
  }

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

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
          <button
            onClick={addProject}
            className="btn-primary mt-4"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div 
                className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleExpanded(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {project.name || 'New Project'}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {project.description || 'Project description'}
                    </p>
                    {project.technologies && (
                      <p className="text-gray-500 text-xs mt-1">
                        Technologies: {project.technologies}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-500 hover:text-gray-700 p-1"
                        title="GitHub Repository"
                      >
                        <Code2 className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-500 hover:text-gray-700 p-1"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeProject(index)
                      }}
                      className="text-red-500 hover:text-red-700 p-2"
                      title="Remove project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {expandedIndex === index && (
                <div className="p-4 bg-white space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => updateProject(index, 'name', e.target.value)}
                      className="input-primary"
                      placeholder="Awesome Project"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      rows={3}
                      className="input-primary resize-vertical"
                      placeholder="A brief description of what this project does and its key features..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Technologies Used
                    </label>
                    <input
                      type="text"
                      value={project.technologies}
                      onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                      className="input-primary"
                      placeholder="React, Node.js, MongoDB, Express"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        value={project.githubUrl}
                        onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                        className="input-primary"
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Live Demo URL
                      </label>
                      <input
                        type="url"
                        value={project.liveUrl}
                        onChange={(e) => updateProject(index, 'liveUrl', e.target.value)}
                        className="input-primary"
                        placeholder="https://yourproject.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key Highlights
                    </label>
                    <textarea
                      value={project.highlights}
                      onChange={(e) => updateProject(index, 'highlights', e.target.value)}
                      rows={3}
                      className="input-primary resize-vertical"
                      placeholder="• Achieved 99% uptime with robust error handling&#10;• Implemented user authentication with JWT&#10;• Built responsive UI with modern design principles"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use bullet points (•) for better formatting
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectsSection
