import React, { useState } from 'react'
import { Plus, X, Code } from 'lucide-react'

function SkillsSection({ data, onChange }) {
  const [newSkill, setNewSkill] = useState('')
  const [skillCategory, setSkillCategory] = useState('')

  const skillCategories = [
    'Programming Languages',
    'Web Technologies', 
    'Frameworks & Libraries',
    'Databases',
    'Tools & Platforms',
    'Cloud Services',
    'Other Skills'
  ]

  const addSkill = () => {
    if (!newSkill.trim()) return
    
    const category = skillCategory || 'Other Skills'
    const updatedData = { ...data }
    
    if (!updatedData[category]) {
      updatedData[category] = []
    }
    
    updatedData[category].push(newSkill.trim())
    onChange('skills', updatedData)
    setNewSkill('')
    setSkillCategory('')
  }

  const removeSkill = (category, skillIndex) => {
    const updatedData = { ...data }
    updatedData[category] = updatedData[category].filter((_, index) => index !== skillIndex)
    
    // Remove category if empty
    if (updatedData[category].length === 0) {
      delete updatedData[category]
    }
    
    onChange('skills', updatedData)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  const hasSkills = Object.keys(data).length > 0

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Skills</h2>

      {/* Add New Skill */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-700 mb-3">Add New Skill</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={skillCategory}
            onChange={(e) => setSkillCategory(e.target.value)}
            className="input-primary sm:w-48"
          >
            <option value="">Select Category</option>
            {skillCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-primary flex-1"
            placeholder="e.g., React, Python, AWS, etc."
          />
          
          <button
            onClick={addSkill}
            className="btn-primary flex items-center justify-center px-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </button>
        </div>
      </div>

      {/* Skills Display */}
      {!hasSkills ? (
        <div className="text-center py-8 text-gray-500">
          <Code className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No skills added yet</p>
          <p className="text-sm mt-1">Add your technical skills to showcase your expertise</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(data).map(([category, skills]) => (
            <div key={category} className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(category, index)}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                      title="Remove skill"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Add Common Skills */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-3">Quick Add Popular Skills</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {[
            'JavaScript', 'Python', 'React', 'Node.js', 
            'TypeScript', 'SQL', 'Git', 'AWS',
            'MongoDB', 'Express', 'HTML/CSS', 'Docker'
          ].map(skill => (
            <button
              key={skill}
              onClick={() => {
                setNewSkill(skill)
                setSkillCategory('Programming Languages')
              }}
              className="text-left text-sm text-blue-700 hover:text-blue-900 hover:underline p-2 rounded hover:bg-blue-100"
            >
              + {skill}
            </button>
          ))}
        </div>
        <p className="text-xs text-blue-600 mt-2">
          Click to pre-fill, then adjust category and add
        </p>
      </div>
    </div>
  )
}

export default SkillsSection
