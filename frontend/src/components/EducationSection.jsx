import React, { useState } from 'react'
import { Plus, Trash2, GraduationCap } from 'lucide-react'

function EducationSection({ data, onChange }) {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const addEducation = () => {
    const newEducation = {
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    }
    onChange('education', [...data, newEducation])
    setExpandedIndex(data.length)
  }

  const updateEducation = (index, field, value) => {
    const updated = data.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    )
    onChange('education', updated)
  }

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index)
    onChange('education', updated)
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
          <button
            onClick={addEducation}
            className="btn-primary mt-4"
          >
            Add Your Education
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div 
                className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleExpanded(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {education.degree || 'Degree'} {education.field && `in ${education.field}`}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {education.institution || 'Institution Name'}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {education.startDate || 'Start'} - {education.endDate || 'End'}
                      {education.gpa && ` • GPA: ${education.gpa}`}
                    </p>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeEducation(index)
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
                        Institution *
                      </label>
                      <input
                        type="text"
                        value={education.institution}
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        className="input-primary"
                        placeholder="University of Punjab"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Degree *
                      </label>
                      <input
                        type="text"
                        value={education.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        className="input-primary"
                        placeholder="Bachelor of Technology"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        value={education.field}
                        onChange={(e) => updateEducation(index, 'field', e.target.value)}
                        className="input-primary"
                        placeholder="Computer Science Engineering"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        GPA/CGPA
                      </label>
                      <input
                        type="text"
                        value={education.gpa}
                        onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                        className="input-primary"
                        placeholder="8.5/10 or 3.8/4.0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={education.startDate}
                        onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                        className="input-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="month"
                        value={education.endDate}
                        onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                        className="input-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Details
                    </label>
                    <textarea
                      value={education.description}
                      onChange={(e) => updateEducation(index, 'description', e.target.value)}
                      rows={3}
                      className="input-primary resize-vertical"
                      placeholder="• Relevant coursework, achievements, honors, or activities&#10;• Dean's List, scholarships, academic projects&#10;• Leadership roles or extracurricular activities"
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

export default EducationSection
