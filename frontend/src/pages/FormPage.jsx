import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume, useResumeDispatch } from "../context/ResumeContext";
import { useTheme } from "../context/ThemeContext";
import Card from "../assets/components/Card";
import LiveResumePreview from "../components/LiveResumePreview";
import JobDescriptionCard from "../assets/components/JobDescriptionCard";
import PersonalInfoSection from "../components/PersonalInfoSection";
import EducationSection from "../components/EducationSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";

function FormPage() {
  const resume = useResume();
  const dispatch = useResumeDispatch();
  const navigate = useNavigate();
  const { lightMode } = useTheme();

  // Local UI
  const [jobDescription, setJobDescription] = useState("");
  const [githubToken, setGithubToken] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  // Theming helpers (same scheme as landing)
  const labelText = lightMode ? "text-gray-700" : "text-gray-300";
  const inputBg = lightMode ? "bg-white" : "bg-gray-800";
  const inputBorder = lightMode ? "border-gray-300" : "border-gray-700";
  const inputText = lightMode ? "text-black" : "text-white";
  const placeholder = lightMode
    ? "placeholder-gray-500"
    : "placeholder-gray-400";
  const buttonPrimaryText = lightMode ? "text-black" : "text-white";
  const gradient =
    "linear-gradient(90deg, rgba(42,123,155,1) 0%, rgba(87,199,133,1) 50%, rgba(237,221,83,1) 100%)";

  const onConnectGithub = () => setIsConnected(Boolean(githubToken));

  const handleSectionChange = (section, value) => {
    const actionTypes = {
      personalInfo: "UPDATE_PERSONAL_INFO",
      education: "UPDATE_EDUCATION",
      experience: "UPDATE_EXPERIENCE",
      projects: "UPDATE_PROJECTS",
      skills: "UPDATE_SKILLS",
      availability: "UPDATE_AVAILABILITY",
    };
    dispatch({ type: actionTypes[section], payload: value });
  };

  return (
    <div className="space-y-6">
      {/* 1) Job Description card (top) */}
      <JobDescriptionCard
        value={jobDescription}
        onChange={setJobDescription}
        onClear={() => setJobDescription("")}
        onSubmit={(jd) => console.log("Submitted JD:", jd)}
      />

      {/* 2) GitHub Connect card (under JD) */}
      <Card
        title="GitHub Connector"
        subtitle="Connect your GitHub to auto-fill projects and experience."
      >
        <div className="space-y-3">
          <label className={`block text-sm ${labelText}`}>
            GitHub Personal Access Token
          </label>
          <input
            type="password"
            value={githubToken}
            onChange={(e) => setGithubToken(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${inputBg} ${inputBorder} ${inputText} ${placeholder}`}
            placeholder="Enter your GitHub token"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onConnectGithub}
              disabled={!githubToken}
              className={`px-4 py-2 rounded-md text-sm font-medium disabled:opacity-60 ${
                lightMode
                  ? "bg-gray-900 text-white hover:bg-black"
                  : "bg-gray-600 text-white hover:bg-gray-500"
              }`}
            >
              {isConnected ? "Connected ✓" : "Connect"}
            </button>
          </div>
        </div>
      </Card>

      {/* 3) Two-column area: left form editor, right live preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Edit Resume form with all sections */}
        <div className="space-y-6">
          <Card title="Personal Information">
            <PersonalInfoSection
              data={resume.personalInfo}
              onChange={handleSectionChange}
            />
          </Card>

          <Card title="Education">
            <EducationSection
              data={resume.education}
              onChange={handleSectionChange}
            />
          </Card>

          <Card title="Experience">
            <ExperienceSection
              data={resume.experience}
              onChange={handleSectionChange}
            />
          </Card>

          <Card title="Projects">
            <ProjectsSection
              data={resume.projects}
              onChange={handleSectionChange}
            />
          </Card>

          <Card title="Technical Skills">
            <SkillsSection
              data={resume.skills}
              onChange={handleSectionChange}
            />
          </Card>

          {/* Action buttons */}
          <Card>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className={`px-4 py-2 rounded-md ${
                  lightMode
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
                onClick={() => navigate("/preview")}
                title="Open full preview"
              >
                Full Preview
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md font-medium ${buttonPrimaryText}`}
                style={{ background: gradient }}
                onClick={() => alert("ATS analysis coming soon")}
              >
                Analyze with ATS
              </button>
            </div>
          </Card>
        </div>

        {/* Right: Live Preview */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <Card title="Live Preview">
            <div
              className={`overflow-auto max-h-[800px] rounded-md border ${
                lightMode
                  ? "border-slate-200 bg-white"
                  : "border-gray-800 bg-gray-900"
              }`}
            >
              <LiveResumePreview />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FormPage;
