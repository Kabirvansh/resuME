import React, { useState } from 'react'
import { Plus, Trash2, Calendar } from 'lucide-react'

function ExperienceSection({ data, onChange }) {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const addExperience = () => {
    const newExperience = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
    onChange('experience', [...data, newExperience])
    setExpandedIndex(data.length)
  }

  const updateExperience = (index, field, value) => {
    const updated = data.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    )
    onChange('experience', updated)
  }

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index)
    onChange('experience', updated)
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
          <button
            onClick={addExperience}
            className="btn-primary mt-4"
          >
            Add Your First Job
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div 
                className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleExpanded(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {experience.position || 'New Position'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {experience.company || 'Company Name'}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {experience.startDate || 'Start'} - {experience.current ? 'Present' : experience.endDate || 'End'}
                    </p>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeExperience(index)
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
                        Position Title *
                      </label>
                      <input
                        type="text"
                        value={experience.position}
                        onChange={(e) => updateExperience(index, 'position', e.target.value)}
                        className="input-primary"
                        placeholder="Software Engineer"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company *
                      </label>
                      <input
                        type="text"
                        value={experience.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        className="input-primary"
                        placeholder="Tech Company Pvt Ltd"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={experience.startDate}
                        onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                        className="input-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <div className="space-y-2">
                        <input
                          type="month"
                          value={experience.endDate}
                          onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                          className="input-primary"
                          disabled={experience.current}
                        />
                        <label className="flex items-center text-sm text-gray-600">
                          <input
                            type="checkbox"
                            checked={experience.current}
                            onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                            className="mr-2"
                          />
                          Currently working here
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Description
                    </label>
                    <textarea
                      value={experience.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      rows={4}
                      className="input-primary resize-vertical"
                      placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver high-quality software solutions&#10;• Improved application performance by 30% through code optimization"
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

export default ExperienceSection
