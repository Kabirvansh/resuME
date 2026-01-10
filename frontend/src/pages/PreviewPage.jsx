import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import { buildResumeContext } from "../context/ResumeContext";
import LiveResumePreview from "../components/LiveResumePreview";

function PreviewPage() {
  const resume = useResume();
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Build the context for the Flask API
      const contextData = buildResumeContext({
        personalInfo: resume.personalInfo,
        education: resume.education,
        experience: resume.experience,
        projects: resume.projects,
        skills: resume.skills,
        availability: resume.availability,
      });

      console.log("Sending to API:", contextData); // Debug log

      // Send request to Flask API
      const response = await fetch("http://localhost:5001/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contextData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      // Convert base64 to blob and download
      const byteCharacters = atob(result.pdf_base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${resume.personalInfo.name}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert(`Error downloading PDF: ${error.message}`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/form")}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Edit
          </button>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {downloading ? "Downloading..." : "📄 Download PDF"}
            </button>
          </div>
        </div>

        {/* Full Resume Preview using template */}
        <LiveResumePreview resume={resume} />

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => navigate("/form")}
            className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            ← Edit Resume
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {downloading ? "Preparing Download..." : "📄 Download PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;
