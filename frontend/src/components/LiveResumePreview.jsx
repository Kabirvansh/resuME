import React, { useEffect } from "react";
import { useResume } from "../context/ResumeContext";

// LiveResumePreview.jsx
// =====================
// This component renders the on-screen resume preview that EXACTLY matches
// the templates/resume_template.html file used by the Streamlit backend for PDF generation.
//
// IMPORTANT: This uses the SAME fonts (Latin Modern Roman, Computer Modern Sans),
// SAME styling, and SAME HTML structure as the Jinja2 template.
//
// DO NOT change the template structure here unless you also update templates/resume_template.html
// to ensure the PDF and live preview remain identical.
//
// Font files are loaded from /static/fonts/ and must match the paths in the template.
//
// How to restyle the resume (BOTH places):
// 1. Edit templates/resume_template.html (for PDF generation)
// 2. Edit this component (for live preview)
// Keep both in sync!

const LiveResumePreview = () => {
  const resume = useResume();

  // Inject font-face declarations into document head (matching template exactly)
  useEffect(() => {
    const styleId = "resume-fonts";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @font-face {
          font-family: "Latin Modern Roman";
          src: url("/static/fonts/lmroman10-regular.otf") format("opentype");
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: "Latin Modern Roman";
          src: url("/static/fonts/lmroman10-bold.otf") format("opentype");
          font-weight: 700;
          font-style: normal;
        }
        @font-face {
          font-family: "Latin Modern Roman";
          src: url("/static/fonts/lmroman10-italic.otf") format("opentype");
          font-weight: 400;
          font-style: italic;
        }
        @font-face {
          font-family: "Latin Modern Roman";
          src: url("/static/fonts/lmroman10-bolditalic.otf") format("opentype");
          font-weight: 700;
          font-style: italic;
        }
        @font-face {
          font-family: "Computer Modern Sans";
          src: url("/static/fonts/computer-modern/cmunbx.ttf") format("truetype");
          font-weight: bold;
          font-style: normal;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Helper function to clean URLs for display (matching Jinja2 template logic)
  const cleanUrl = (url) => {
    if (!url) return "";
    return url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .replace(/\/$/, "");
  };

  // Styles object matching templates/resume_template.html exactly
  const styles = {
    body: {
      margin: "0 auto",
      padding: "0.5in",
      fontFamily: '"Latin Modern Roman", serif',
      lineHeight: "1.15",
      fontSize: "11pt",
      textAlign: "left",
      backgroundColor: "white",
      minHeight: "11in",
      width: "8.5in",
      color: "black",
      border: "1px solid #ddd",
      boxSizing: "border-box",
    },
    h1: {
      fontSize: "23pt",
      textAlign: "center",
      marginTop: 0,
      marginBottom: "4px",
      fontVariant: "small-caps",
      fontWeight: "bold",
      letterSpacing: "1px",
    },
    contact: {
      fontSize: "10pt",
      textAlign: "center",
      marginBottom: "12px",
    },
    sectionTitle: {
      fontFamily:
        '"Computer Modern Sans", Arial, "Helvetica Neue", Helvetica, sans-serif',
      fontSize: "12pt",
      marginTop: "15px",
      marginBottom: "4px",
      borderBottom: "1px solid #000",
      paddingBottom: "2px",
      fontWeight: "normal",
      letterSpacing: "1px",
    },
    subheading: {
      display: "flex",
      justifyContent: "space-between",
      fontWeight: "bold",
      marginTop: "6px",
      marginBottom: "2px",
      fontSize: "11pt",
    },
    subheadingEm: {
      fontStyle: "italic",
      fontWeight: "normal",
      fontSize: "11pt",
    },
    itemList: {
      margin: 0,
      paddingLeft: "0.25in",
      marginBottom: "8px",
      fontSize: "11pt",
      listStyleType: "disc",
      listStylePosition: "outside",
    },
    itemListLi: {
      marginBottom: "4px",
      display: "list-item",
    },
    link: {
      color: "black",
      textDecoration: "none",
    },
    emailLink: {
      color: "black",
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.body}>
      {/* Name - matching h1 from template */}
      <h1 style={styles.h1}>{resume?.personalInfo?.name || "Your Name"}</h1>

      {/* Contact Information - matching .contact div from template */}
      <div style={styles.contact}>
        {resume?.personalInfo?.phone || "Your Phone"} |{" "}
        <a
          href={`mailto:${resume?.personalInfo?.email || ""}`}
          style={styles.emailLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {resume?.personalInfo?.email || "your.email@example.com"}
        </a>
        {resume?.personalInfo?.linkedin && (
          <>
            {" | "}
            <a
              href={
                resume.personalInfo.linkedin.startsWith("http")
                  ? resume.personalInfo.linkedin
                  : `https://${resume.personalInfo.linkedin}`
              }
              style={styles.emailLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cleanUrl(resume.personalInfo.linkedin)}
            </a>
          </>
        )}
        {resume?.personalInfo?.github && (
          <>
            {" | "}
            <a
              href={
                resume.personalInfo.github.startsWith("http")
                  ? resume.personalInfo.github
                  : `https://${resume.personalInfo.github}`
              }
              style={styles.emailLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cleanUrl(resume.personalInfo.github)}
            </a>
          </>
        )}
      </div>

      {/* Education Section - matching template structure */}
      <h2 style={styles.sectionTitle}>Education</h2>
      <div style={{ marginLeft: "0.15in", marginBottom: "8px" }}>
        {resume?.education && resume.education.length > 0 ? (
          resume.education.map((edu, index) => (
            <div key={index}>
              <div style={styles.subheading}>
                <span>{edu.university}</span>
                <span style={{ fontWeight: "normal" }}>{edu.location}</span>
              </div>
              <div style={styles.subheading}>
                <span>
                  <em>{edu.degree}</em>
                </span>
                <span>
                  <em>{edu.dates}</em>
                </span>
              </div>
              {edu.coursework && (
                <div style={{ marginBottom: "8px", fontSize: "11pt" }}>
                  • <strong>Relevant Coursework:</strong> {edu.coursework}
                </div>
              )}
            </div>
          ))
        ) : (
          <div>
            <div style={styles.subheading}>
              <span>Your University</span>
              <span style={{ fontWeight: "normal" }}>City, State</span>
            </div>
          </div>
        )}
      </div>

      {/* Experience Section - matching template structure */}
      <h2 style={styles.sectionTitle}>Experience</h2>
      <div style={{ marginLeft: "0.15in", marginBottom: "8px" }}>
        {resume?.experience && resume.experience.length > 0 ? (
          resume.experience.map((exp, index) => (
            <div key={index}>
              <div style={styles.subheading}>
                <span>{exp.title}</span>
                <span style={{ fontWeight: "normal" }}>{exp.dates}</span>
              </div>
              <div style={styles.subheading}>
                <span>
                  <em>{exp.organization || exp.company}</em>
                </span>
                <span>
                  <em>{exp.location}</em>
                </span>
              </div>
              {exp.items && exp.items.length > 0 && (
                <ul style={styles.itemList}>
                  {exp.items.map((item, itemIndex) => (
                    <li key={itemIndex} style={styles.itemListLi}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <div>
            <div style={styles.subheading}>
              <span>Job Title</span>
              <span style={{ fontWeight: "normal" }}>Date Range</span>
            </div>
          </div>
        )}
      </div>

      {/* Projects Section - matching template structure */}
      <h2 style={styles.sectionTitle}>Projects</h2>
      <div style={{ marginLeft: "0.15in", marginBottom: "8px" }}>
        {resume?.projects && resume.projects.length > 0 ? (
          resume.projects.map((proj, index) => (
            <div key={index}>
              <div style={styles.subheading}>
                <span>
                  {proj.name} | <em>{proj.techs || proj.tech}</em>
                </span>
                <span style={{ fontWeight: "normal" }}>{proj.date}</span>
              </div>
              {proj.items && proj.items.length > 0 && (
                <ul style={styles.itemList}>
                  {proj.items.map((item, itemIndex) => (
                    <li key={itemIndex} style={styles.itemListLi}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <div>
            <div style={styles.subheading}>
              <span>
                Project Name | <em>Technologies Used</em>
              </span>
              <span style={{ fontWeight: "normal" }}>Date</span>
            </div>
          </div>
        )}
      </div>

      {/* Technical Skills Section - matching template structure */}
      <h2 style={styles.sectionTitle}>Technical Skills</h2>
      <div style={{ marginLeft: "0.15in", marginBottom: "8px" }}>
        {resume?.skills && Object.keys(resume.skills).length > 0 ? (
          Object.entries(resume.skills).map(([category, items]) => (
            <p key={category} style={{ margin: "0 0 4px 0" }}>
              <strong>{category}:</strong>{" "}
              {Array.isArray(items) ? items.join(", ") : items}
            </p>
          ))
        ) : (
          <p style={{ margin: "0 0 4px 0" }}>
            <strong>Programming Languages:</strong> Add your skills here
          </p>
        )}
      </div>

      {/* Availability Section - matching template structure */}
      <h2 style={styles.sectionTitle}>Availability</h2>
      <ul
        style={{
          marginLeft: "0.15in",
          marginBottom: "8px",
          paddingLeft: "0.15in",
          fontSize: "11pt",
        }}
      >
        {resume?.availability && resume.availability.length > 0 ? (
          resume.availability.map((item, index) => (
            <li key={index} style={styles.itemListLi}>
              {item}
            </li>
          ))
        ) : (
          <li style={styles.itemListLi}>Available for full-time positions</li>
        )}
      </ul>
    </div>
  );
};

export default LiveResumePreview;
