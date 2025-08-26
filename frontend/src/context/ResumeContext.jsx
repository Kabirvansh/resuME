import React, { createContext, useContext, useReducer } from 'react'

// Initial state matching your Streamlit app structure
const initialState = {
  personalInfo: {
    name: 'Kabirvansh Singh Chadha',
    email: 'kabirvansh1912@gmail.com',
    phone: '587-***-****',
    linkedin: 'linkedin.com/in/kabirvansh',
    github: 'github.com/Kabirvansh',
  },
  education: {
    university: 'University of Alberta',
    degree: 'Bachelor of Science in Computing Science - Specialization',
    location: 'Edmonton, Alberta',
    dates: 'September 2022 - April 2026',
    coursework: 'Object-oriented programming, Data Structures and Algorithms, File and Database Management, Machine Learning, Visual Recognition, Statistics, Search and Planning in AI, Reinforcement Learning, Object-oriented design and analysis, Unified Modeling Language (UML), Software architecture, Design patterns, Frameworks, Unit testing, and Economics.',
  },
  experience: [
    {
      title: 'Lead Student Instructor (LSI)',
      organization: 'University of Alberta',
      location: 'Edmonton, Alberta',
      dates: 'January 2025 - Present',
      items: [
        'Guiding students in mastering advanced topics such as objects, functional programming, and Abstract Data Types (ADTs).',
        'Facilitating learning of algorithms, including popular searching and sorting techniques, focusing on time and space efficiency.',
        'Managed a team of TAs for course content development, resource creation, and assignment marking.'
      ]
    },
    {
      title: 'Undergraduate Research Assistant',
      organization: 'University of Alberta',
      location: 'Edmonton, Alberta',
      dates: 'October 2024 - December 2024',
      items: [
        'Designed engaging and educational assignments to enhance student understanding of key concepts such as data structures, algorithms, etc.',
        'Collaborated with instructors to refine course materials and improve student engagement.',
        'Integrated third-party services like Kritik to streamline peer-review workflows.'
      ]
    }
  ],
  projects: [
    {
      name: 'Compressor Station SCADA Demo',
      techs: 'Ignition, OPC UA, Wireshark, Streamlit, Python, Git',
      date: 'May 2025',
      items: [
        'Designed and implemented an Ignition Vision HMI with OPC UA-backed tags …',
        'Captured and decoded OPC UA SecureChannel traffic …',
        'Developed a Streamlit dashboard to visualize historical pressure data …'
      ]
    },
    {
      name: 'OT Cybersecurity Lab Projects',
      techs: 'Modbus TCP, ModSim, WinLog Lite, Wireshark',
      date: 'May 2025',
      items: [
        'Configured a Modbus-TCP channel & device in ModSim …',
        'Defined discrete ("Coil1") and analog ("Pressure") tags in WinLog Lite …',
        'Captured live Modbus-TCP traffic in Wireshark …'
      ]
    }
  ],
  skills: {
    'Languages': 'Java, Python, SQL, JavaScript/TypeScript, C, HTML, Flask, React, Next.js, TailwindCSS, Bootstrap',
    'Back-End & APIs': 'Django, Flask, FastAPI, PostgreSQL, MongoDB',
    'Data Visualization & BI': 'Plotly Dash, Streamlit, Power BI, Tableau',
    'Cloud & DevOps': 'Microsoft Azure, Firebase, Supabase, Amazon S3, Docker, Git/GitHub, Postman, Splunk, Hadoop'
  },
  availability: ['Available for 4, 8, or 12-month work terms, starting September 2025']
}

// Reducer function
function resumeReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          ...action.payload
        }
      }
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: {
          ...state.education,
          ...action.payload
        }
      }
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: action.payload
      }
    case 'UPDATE_PROJECTS':
      return {
        ...state,
        projects: action.payload
      }
    case 'UPDATE_SKILLS':
      return {
        ...state,
        skills: {
          ...state.skills,
          ...action.payload
        }
      }
    case 'UPDATE_AVAILABILITY':
      return {
        ...state,
        availability: action.payload
      }
    case 'SET_FULL_CONTEXT':
      return action.payload
    default:
      return state
  }
}

// Create contexts
const ResumeContext = createContext()
const ResumeDispatchContext = createContext()

// Provider component
export function ResumeProvider({ children }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState)

  return (
    <ResumeContext.Provider value={state}>
      <ResumeDispatchContext.Provider value={dispatch}>
        {children}
      </ResumeDispatchContext.Provider>
    </ResumeContext.Provider>
  )
}

// Custom hooks
export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}

export function useResumeDispatch() {
  const context = useContext(ResumeDispatchContext)
  if (context === undefined) {
    throw new Error('useResumeDispatch must be used within a ResumeProvider')
  }
  return context
}

// Helper function to build context for PDF generation
export function buildResumeContext(state) {
  return {
    name: state.personalInfo.name,
    phone: state.personalInfo.phone,
    email: state.personalInfo.email,
    linkedin: state.personalInfo.linkedin,
    github: state.personalInfo.github,
    education: {
      university: state.education.university,
      degree: state.education.degree,
      location: state.education.location,
      dates: state.education.dates,
      coursework: state.education.coursework
    },
    experience: state.experience,
    projects: state.projects,
    skills: state.skills,
    availability: state.availability
  }
}
