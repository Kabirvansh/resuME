import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ResumeProvider } from './context/ResumeContext'
import FormPage from './pages/FormPage'
import PreviewPage from './pages/PreviewPage'

function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Resu<span className="text-blue-600">ME</span>
                  </h1>
                  <span className="ml-3 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Jatt Da
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Developed by{' '}
                    <a
                      href="https://www.linkedin.com/in/kabirvansh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      Kabirvansh
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/form" replace />} />
              <Route path="/form" element={<FormPage />} />
              <Route path="/preview" element={<PreviewPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ResumeProvider>
  )
}

export default App
