import os
import base64
import streamlit as st
from github import Github, BadCredentialsException
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
import openai
import json
import math
import re
import requests

from dotenv import load_dotenv
load_dotenv()
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def authenticate_user():
    st.markdown(
        """
        <style>
        /* Increase sidebar width */
        [data-testid="stSidebar"] {
            min-width: 450px;
            max-width: 500px;
            width: 450px;
        }
        </style>
        """,
        unsafe_allow_html=True,
    )

    # --- GitHub Connector ---
    st.sidebar.title("GitHub Connector")
    token = st.sidebar.text_input(
        "GitHub Personal Access Token",
        type="password",
        help="Create one at github.com/settings/tokens"
    )
    if st.sidebar.button("Connect"):
        if not token:
            st.sidebar.error("Token required")
        else:
            try:
                gh = Github(token)
                user = gh.get_user()
                st.session_state.user = user
                st.sidebar.success(f"Hi, {user.login}!")
            except BadCredentialsException:
                st.sidebar.error("Invalid token")

    st.sidebar.markdown("---")

    
    with st.sidebar.expander("Personal Info", expanded=True):
           # — Make personal info fully session‐driven —
        st.text_input(
            "Full Name",
            key="name",
            value=st.session_state.get("name", "Kabirvansh Singh Chadha")
        )
        st.text_input(
            "Email",
            key="email",
            value=st.session_state.get("email", "kabirvansh1912@gmail.com")
        )
        st.text_input(
            "Phone Number",
            key="phone",
            value=st.session_state.get("phone", "587-***-****")
        )
        st.text_input(
            "LinkedIn URL",
            key="linkedin",
            value=st.session_state.get("linkedin", "linkedin.com/in/kabirvansh")
        )
        st.text_input(
            "GitHub URL (optional)",
            key="github",
            value=st.session_state.get("github", "github.com/Kabirvansh")
        )


    with st.sidebar.expander("Education", expanded=False):
        university = st.text_input("University", value=st.session_state.get("university", "University of Alberta"))
        degree = st.text_input("Degree", value=st.session_state.get("degree", "Bachelor of Science in Computing Science - Specialization"))
        edu_location = st.text_input("Education Location", value=st.session_state.get("edu_location", "Edmonton, Alberta"))
        edu_dates = st.text_input("Education Dates", value=st.session_state.get("edu_dates", "September 2022 - April 2026"))
        coursework = st.text_area(
            "Relevant Coursework (comma separated)",
            value=st.session_state.get(
                "coursework",
                "Object-oriented programming, Data Structures and Algorithms, File and Database Management, Machine Learning, Visual Recognition, Statistics, Search and Planning in AI, Reinforcement Learning, Object-oriented design and analysis, Unified Modeling Language (UML), Software architecture, Design patterns, Frameworks, Unit testing, and Economics."
            )
        )

    with st.sidebar.expander("Experience 1", expanded=False):
        exp1_title = st.text_input("Title", value=st.session_state.get("exp1_title", "Lead Student Instructor (LSI)"))
        exp1_org = st.text_input("Organization", value=st.session_state.get("exp1_org", "University of Alberta"))
        exp1_loc = st.text_input("Location", value=st.session_state.get("exp1_loc", "Edmonton, Alberta"))
        exp1_dates = st.text_input("Dates", value=st.session_state.get("exp1_dates", "January 2025 - Present"))
        exp1_items = st.text_area(
            "Description (one per line)",
            value=st.session_state.get(
                "exp1_items",
                "Guiding students in mastering advanced topics such as objects, functional programming, and Abstract Data Types (ADTs).\n"
                "Facilitating learning of algorithms, including popular searching and sorting techniques, focusing on time and space efficiency.\n"
                "Managed a team of TAs for course content development, resource creation, and assignment marking."
            )
        )

    with st.sidebar.expander("Experience 2", expanded=False):
        exp2_title = st.text_input("Title ", value=st.session_state.get("exp2_title", "Undergraduate Research Assistant"))
        exp2_org = st.text_input("Organization ", value=st.session_state.get("exp2_org", "University of Alberta"))
        exp2_loc = st.text_input("Location ", value=st.session_state.get("exp2_loc", "Edmonton, Alberta"))
        exp2_dates = st.text_input("Dates ", value=st.session_state.get("exp2_dates", "October 2024 - December 2024"))
        exp2_items = st.text_area(
            "Description (one per line) ",
            value=st.session_state.get(
                "exp2_items",
                "Designed engaging and educational assignments to enhance student understanding of key concepts such as data structures, algorithms, etc.\n"
                "Collaborated with instructors to refine course materials and improve student engagement.\n"
                "Integrated third-party services like Kritik to streamline peer-review workflows."
            )
        )

    # ---- Projects go here, above Technical Skills ----
    projects_sidebar = st.session_state.get("projects_sidebar", [
        {
            "name": "Compressor Station SCADA Demo",
            "techs": "Ignition, OPC UA, Wireshark, Streamlit, Python, Git",
            "date": "May 2025",
            "items": [
                "Designed and implemented an Ignition Vision HMI with OPC UA-backed tags …",
                "Captured and decoded OPC UA SecureChannel traffic …",
                "Developed a Streamlit dashboard to visualize historical pressure data …"
            ]
        },
        {
            "name": "OT Cybersecurity Lab Projects",
            "techs": "Modbus TCP, ModSim, WinLog Lite, Wireshark",
            "date": "May 2025",
            "items": [
                "Configured a Modbus-TCP channel & device in ModSim …",
                "Defined discrete (“Coil1”) and analog (“Pressure”) tags in WinLog Lite …",
                "Captured live Modbus-TCP traffic in Wireshark …"
            ]
        }
    ])
    updated_projects = []
    for idx, proj in enumerate(projects_sidebar):
        with st.sidebar.expander(f"Project {idx+1}", expanded=False):
            name = st.text_input(f"Project Name {idx+1}", value=proj["name"], key=f"sidebar_proj_name_{idx}")
            techs = st.text_input(f"Technologies Used {idx+1}", value=proj["techs"], key=f"sidebar_proj_techs_{idx}")
            date = st.text_input(f"Completion Month & Year {idx+1}", value=proj["date"], key=f"sidebar_proj_date_{idx}")
            bullets = []
            for j, item in enumerate(proj["items"]):
                bullets.append(
                    st.text_input(f"• Point {j+1} (Project {idx+1})", value=item, key=f"sidebar_proj_bullet_{idx}_{j}")
                )
            updated_projects.append({
                "name": name,
                "techs": techs,
                "date": date,
                "items": bullets
            })
    st.session_state["projects_sidebar"] = updated_projects

    # ---- Technical Skills and below remain unchanged ----
    with st.sidebar.expander("Technical Skills", expanded=False):
        skills_languages = st.text_input(
            "Languages",
            value=st.session_state.get("skills_languages", "Java, Python, SQL, JavaScript/TypeScript, C, HTML, Flask, React, Next.js, TailwindCSS, Bootstrap")
        )
        skills_backend = st.text_input(
            "Back-End & APIs",
            value=st.session_state.get("skills_backend", "Django, Flask, FastAPI, PostgreSQL, MongoDB")
        )
        skills_bi = st.text_input(
            "Data Visualization",
            value=st.session_state.get("skills_bi", "Plotly Dash, Streamlit, Power BI, Tableau")
        )
        skills_cloud = st.text_input(
            "Cloud & DevOps",
            value=st.session_state.get("skills_cloud", "Microsoft Azure, Firebase, Supabase, Amazon S3, Docker, Git/GitHub, Postman, Splunk, Hadoop")
        )

    with st.sidebar.expander("Availability", expanded=False):
        availability = st.text_area(
            "Availability (one per line)",
            value=st.session_state.get("availability", "Available for 4, 8, or 12-month work terms, starting September 2025")
        )

    # st.session_state.name = name
    # st.session_state.email = email
    # st.session_state.phone = phone
    # st.session_state.linkedin = linkedin
    # st.session_state.github = github_url
    st.session_state.university = university
    st.session_state.degree = degree
    st.session_state.edu_location = edu_location
    st.session_state.edu_dates = edu_dates
    st.session_state.coursework = coursework

    st.session_state.exp1_title = exp1_title
    st.session_state.exp1_org = exp1_org
    st.session_state.exp1_loc = exp1_loc
    st.session_state.exp1_dates = exp1_dates
    st.session_state.exp1_items = exp1_items

    st.session_state.exp2_title = exp2_title
    st.session_state.exp2_org = exp2_org
    st.session_state.exp2_loc = exp2_loc
    st.session_state.exp2_dates = exp2_dates
    st.session_state.exp2_items = exp2_items

    st.session_state.skills_languages = skills_languages
    st.session_state.skills_backend = skills_backend
    st.session_state.skills_bi = skills_bi
    st.session_state.skills_cloud = skills_cloud
    st.session_state.availability = availability

    st.sidebar.markdown(
        """
        <div style='position: absolute; bottom: -100px; left: 8px; font-size: 14px; color: #888;'>
            Developed by 
            <a href="https://www.linkedin.com/in/kabirvansh" target="_blank" style="color:#2986cc;text-decoration:underline;">
                Kabirvansh
            </a>
        </div>
        """,
        unsafe_allow_html=True
    )


@st.cache_resource
def get_jinja_env():
    return Environment(loader=FileSystemLoader("templates"))

def render_html(context):
    env = get_jinja_env()
    tpl = env.get_template("resume_template.html")
    return tpl.render(**context)

def html_to_pdf_bytes(html: str) -> bytes:
    return HTML(string=html, base_url=os.getcwd()).write_pdf()

def build_context():
    context = {
        "name": st.session_state.get("name", "Kabirvansh Singh Chadha"),
        "phone": st.session_state.get("phone", "587-937-5582"),
        "email": st.session_state.get("email", "kabirvansh1912@gmail.com"),
        "linkedin": st.session_state.get("linkedin", "linkedin.com/in/kabirvansh"),
        "github": st.session_state.get("github", "github.com/Kabirvansh"),
        "education": {
            "university": st.session_state.get("university", "University of Alberta"),
            "degree": st.session_state.get("degree", "Bachelor of Science in Computing Science - Specialization"),
            "location": st.session_state.get("edu_location", "Edmonton, Alberta"),
            "dates": st.session_state.get("edu_dates", "September 2022 - April 2026"),
            "coursework": st.session_state.get("coursework", "")
        },
        "experience": [
            {
                "title": st.session_state.get("exp1_title", ""),
                "organization": st.session_state.get("exp1_org", ""),
                "location": st.session_state.get("exp1_loc", ""),
                "dates": st.session_state.get("exp1_dates", ""),
                "items": [
                    item.strip() for item in st.session_state.get("exp1_items", "").split("\n") if item.strip()
                ]
            },
            {
                "title": st.session_state.get("exp2_title", ""),
                "organization": st.session_state.get("exp2_org", ""),
                "location": st.session_state.get("exp2_loc", ""),
                "dates": st.session_state.get("exp2_dates", ""),
                "items": [
                    item.strip() for item in st.session_state.get("exp2_items", "").split("\n") if item.strip()
                ]
            }
        ],
        "skills": {
            "Languages": st.session_state.get("skills_languages", ""),
            "Back-End & APIs": st.session_state.get("skills_backend", ""),
            "Data Visualization & BI": st.session_state.get("skills_bi", ""),
            "Cloud & DevOps": st.session_state.get("skills_cloud", "")
        },
        "availability": [
            a.strip() for a in st.session_state.get("availability", "").split("\n") if a.strip()
        ],
    }

    # Projects: either user-selected or fallback to sidebar
    selected = st.session_state.get("selected_projects")
    if selected and len(selected) > 0:
        context["projects"] = [
            {
                "name": proj.get("name", ""),
                "techs": proj.get("techs", ""),
                "date": proj.get("date", ""),
                "items": proj.get("bullets", proj.get("items", [])),  # Prefer 'bullets', fallback to 'items'
            }
            for proj in selected
        ]
    else:
        context["projects"] = st.session_state.get("projects_sidebar", [])

    return context

def fetch_user_repos(user):
    repos = user.get_repos()
    projects = []
    for repo in repos:
        try:
            readme = repo.get_readme().decoded_content.decode()
        except:
            readme = ""
        projects.append({
            "name": repo.name,
            "description": repo.description or "No description available",
            "readme": readme if readme else "No README available",
            "url": repo.html_url
        })
    return projects
def rank_projects_openai(projects, job_description):
    MODEL = "gpt-4o"
    print(f"Using model: {MODEL}")

    prompt = f"""
You are a resume assistant. Below is a job description followed by a list of GitHub repositories.

Some repositories may have incomplete descriptions or messy README files. Try to infer what each project is about, even if documentation is poor or minimal.

Your task: **Rank these repositories from most relevant to least relevant** for the job. Use your best judgment.

Job Description:
{job_description}

--- REPOSITORIES ---
"""

    for i, project in enumerate(projects):
        prompt += f"""
{i+1}. Repository: {project['name']}
Description: {project['description']}
README (first 1000 characters): 
{project['readme'][:1000]}
"""

    prompt += "\nReturn only a numbered list with the repository names, ranked by relevance.\n"

    response = openai.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.0
    )
    print("Model returned by OpenAI:", response.model)
    return response.choices[0].message.content.strip()

def extract_json(text):
    """Extract and clean JSON from text, handling comments and malformed JSON"""
    # Try to find JSON object or array
    json_match = re.search(r'(\{[\s\S]*\}|\[[\s\S]*\])', text)
    if not json_match:
        return None
    
    json_str = json_match.group(1)
    
    # Clean up JSON by removing comments
    # Remove single-line comments like // comment
    json_str = re.sub(r'//.*?(?=\n|$)', '', json_str)
    
    # Remove multi-line comments like /* comment */
    json_str = re.sub(r'/\*.*?\*/', '', json_str, flags=re.DOTALL)
    
    # Remove trailing commas before closing brackets/braces
    json_str = re.sub(r',(\s*[}\]])', r'\1', json_str)
    
    # Clean up extra whitespace
    json_str = re.sub(r'\n\s*\n', '\n', json_str)
    
    return json_str.strip()

def generate_top_project_summaries_json(projects, job_description):
    MODEL = "gpt-4o"
    print(f"Using model: {MODEL} for summary generation")

    # ATS-optimized prompt
    prompt = f"""
You are a resume assistant. Below is a job description followed by a list of GitHub repositories.
Some repos may have incomplete descriptions or messy READMEs—infer what each project is about.

Task:
1. Identify the top 5 repos most relevant to the job.
2. For each, output a JSON object with:
   - name        (string)
   - techs       (list of strings)
   - date        (string, e.g. "May 2025")
   - description (short paragraph)
   - bullets     (list of 3 strings, each a resume bullet point)

**For the 3 bullets, write them to be highly effective for Applicant Tracking Systems (ATS):**
- Start each bullet with a strong action verb.
- Use clear, concise, and keyword-rich language relevant to the job description.
- Quantify results or impact where possible (e.g., "Reduced latency by 30%").
- Focus on technologies used, core responsibilities, and measurable achievements.
- Avoid personal pronouns and keep each bullet under 30 words.

Job Description:
{job_description}

--- REPOSITORIES ---
"""
    for i, project in enumerate(projects):
        prompt += f"""
{i+1}. Repository: {project['name']}
Description: {project['description']}
README (first 1000 chars):
{project['readme'][:1000]}
"""

    prompt += "\nReturn ONLY the JSON list of 5 objects.\n"

    response = client.chat.completions.create(  # CHANGED: use client instead of openai
        model=MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.0
    )
    print("Model used:", response.model)

    raw = response.choices[0].message.content.strip()
    json_str = extract_json(raw)
    if not json_str:
        st.error("❌ Failed to find JSON in model output. See terminal for raw output.")
        print("RAW RESPONSE:", raw)
        return []
    try:
        return json.loads(json_str)
    except json.JSONDecodeError:
        st.error("❌ Failed to parse project summaries. See terminal for raw output.")
        print("RAW RESPONSE:", raw)
        return []

# Add these functions after your existing functions

def get_ats_response_format():
    """Define the expected JSON response format for ATS analysis"""
    return """
    {
      "overallScore": number, // max 100
      "ATS": {
        "score": number, // rate based on ATS suitability
        "tips": [
          {
            "type": "good" | "improve",
            "tip": string // give 3-4 tips
          }
        ]
      },
      "toneAndStyle": {
        "score": number, // max 100
        "tips": [
          {
            "type": "good" | "improve",
            "tip": string, // make it a short "title" for the actual explanation
            "explanation": string // explain in detail here
          }
        ] // give 3-4 tips
      },
      "content": {
        "score": number, // max 100
        "tips": [
          {
            "type": "good" | "improve",
            "tip": string, // make it a short "title" for the actual explanation
            "explanation": string // explain in detail here
          }
        ] // give 3-4 tips
      },
      "structure": {
        "score": number, // max 100
        "tips": [
          {
            "type": "good" | "improve",
            "tip": string, // make it a short "title" for the actual explanation
            "explanation": string // explain in detail here
          }
        ] // give 3-4 tips
      },
      "skills": {
        "score": number, // max 100
        "tips": [
          {
            "type": "good" | "improve",
            "tip": string, // make it a short "title" for the actual explanation
            "explanation": string // explain in detail here
          }
        ] // give 3-4 tips
      }
    }
    """

def prepare_ats_analysis_instructions(job_title, job_description):
    """Prepare the instruction prompt for ATS analysis"""
    ats_format = get_ats_response_format()
    
    return f"""You are an expert in ATS (Applicant Tracking System) and resume analysis.
Please analyze and rate this resume and suggest how to improve it.
The rating can be low if the resume is bad.
Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
If available, use the job description for the job user is applying to to give more detailed feedback.
If provided, take the job description into consideration.

The job title is: {job_title}
The job description is: {job_description}

Provide the feedback using the following format: {ats_format}

IMPORTANT: Return ONLY valid JSON without any comments, backticks, or additional text.
Do not include // comments or any other text outside the JSON object.
Ensure all strings are properly quoted and all objects are properly closed."""

def analyze_resume_with_ats(resume_text, job_title="", job_description=""):
    """
    Analyze resume content and provide ATS scoring and suggestions
    
    Args:
        resume_text (str): The text content of the resume
        job_title (str): The job title being applied for
        job_description (str): The job description
    
    Returns:
        dict: ATS analysis results with scores and tips
    """
    MODEL = "gpt-4o"
    print(f"Using model: {MODEL} for ATS analysis")
    
    instructions = prepare_ats_analysis_instructions(job_title, job_description)
    
    prompt = f"""
{instructions}

RESUME CONTENT TO ANALYZE:
{resume_text}
"""
    
    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.1
        )
        
        raw_response = response.choices[0].message.content.strip()
        print("ATS Analysis Model used:", response.model)
        
        # Try to extract and clean JSON from the response
        json_str = extract_json(raw_response)
        if not json_str:
            print("RAW ATS RESPONSE:", raw_response)
            return get_default_ats_feedback()
        
        # Debug: Print cleaned JSON
        print("CLEANED JSON:", json_str[:200] + "..." if len(json_str) > 200 else json_str)
        
        return json.loads(json_str)
        
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        print("RAW ATS RESPONSE:", raw_response if 'raw_response' in locals() else "N/A")
        print("CLEANED JSON:", json_str if 'json_str' in locals() else "N/A")
        return get_default_ats_feedback()
    except Exception as e:
        print(f"ATS analysis error: {e}")
        return get_default_ats_feedback()

def get_default_ats_feedback():
    """Return default feedback structure if API call fails"""
    return {
        "overallScore": 70,
        "ATS": {
            "score": 70,
            "tips": [
                {
                    "type": "improve",
                    "tip": "Unable to perform detailed ATS analysis. Please try again."
                }
            ]
        },
        "toneAndStyle": {
            "score": 70,
            "tips": [
                {
                    "type": "improve",
                    "tip": "Analysis unavailable",
                    "explanation": "Unable to analyze tone and style at this time."
                }
            ]
        },
        "content": {
            "score": 70,
            "tips": [
                {
                    "type": "improve",
                    "tip": "Analysis unavailable",
                    "explanation": "Unable to analyze content at this time."
                }
            ]
        },
        "structure": {
            "score": 70,
            "tips": [
                {
                    "type": "improve",
                    "tip": "Analysis unavailable",
                    "explanation": "Unable to analyze structure at this time."
                }
            ]
        },
        "skills": {
            "score": 70,
            "tips": [
                {
                    "type": "improve",
                    "tip": "Analysis unavailable",
                    "explanation": "Unable to analyze skills at this time."
                }
            ]
        }
    }

def extract_resume_text_from_context(context):
    """Extract plain text from resume context for ATS analysis"""
    text_parts = []
    
    # Personal info
    if context.get("name"):
        text_parts.append(f"Name: {context['name']}")
    if context.get("email"):
        text_parts.append(f"Email: {context['email']}")
    if context.get("phone"):
        text_parts.append(f"Phone: {context['phone']}")
    
    # Education
    if context.get("education"):
        edu = context["education"]
        text_parts.append(f"Education: {edu.get('degree', '')} at {edu.get('university', '')}")
        if edu.get("coursework"):
            text_parts.append(f"Coursework: {edu['coursework']}")
    
    # Experience
    if context.get("experience"):
        text_parts.append("Experience:")
        for exp in context["experience"]:
            if exp.get("title") and exp.get("organization"):
                text_parts.append(f"- {exp['title']} at {exp['organization']}")
                for item in exp.get("items", []):
                    text_parts.append(f"  • {item}")
    
    # Projects
    if context.get("projects"):
        text_parts.append("Projects:")
        for proj in context["projects"]:
            if proj.get("name"):
                text_parts.append(f"- {proj['name']}")
                if proj.get("techs"):
                    text_parts.append(f"  Technologies: {proj['techs']}")
                for item in proj.get("items", []):
                    text_parts.append(f"  • {item}")
    
    # Skills
    if context.get("skills"):
        text_parts.append("Skills:")
        for category, skills in context["skills"].items():
            if skills:
                text_parts.append(f"- {category}: {skills}")
    
    return "\n".join(text_parts)

def display_ats_analysis(analysis_results):
    """Display ATS analysis results in Streamlit"""
    if not analysis_results:
        st.error("No analysis results available.")
        return
    
    # Handle case where results might be a list instead of dict
    if isinstance(analysis_results, list):
        st.error("Invalid analysis results format. Expected a single analysis object.")
        return
    
    if not isinstance(analysis_results, dict):
        st.error("Invalid analysis results format.")
        return
    
    st.markdown("## 📊 ATS Analysis & Resume Feedback")
    
    # Overall Score
    overall_score = analysis_results.get("overallScore", 0)
    st.metric("Overall Score", f"{overall_score}/100")
    
    # Create tabs for different analysis categories
    tabs = st.tabs(["ATS Score", "Tone & Style", "Content", "Structure", "Skills"])
    
    categories = ["ATS", "toneAndStyle", "content", "structure", "skills"]
    
    for i, (tab, category) in enumerate(zip(tabs, categories)):
        with tab:
            category_data = analysis_results.get(category, {})
            score = category_data.get("score", 0)
            tips = category_data.get("tips", [])
            
            st.metric(f"{category.replace('ATS', 'ATS').replace('toneAndStyle', 'Tone & Style').title()} Score", f"{score}/100")
            
            if tips:
                st.subheader("💡 Tips for Improvement")
                for tip in tips:
                    tip_type = tip.get("type", "improve")
                    tip_text = tip.get("tip", "")
                    explanation = tip.get("explanation", "")
                    
                    if tip_type == "good":
                        st.success(f"✅ **{tip_text}**")
                        if explanation:
                            st.write(explanation)
                    else:
                        st.warning(f"⚠️ **{tip_text}**")
                        if explanation:
                            st.write(explanation)
            else:
                st.info("No specific tips available for this category.")

def apply_ats_suggestion(suggestion_type, field_path, new_value, current_context):
    """Apply ATS suggestion to the resume context"""
    
    # Parse field path (e.g., "experience.0.items.1" or "skills.Languages")
    path_parts = field_path.split('.')
    
    # Navigate to the correct field and update it
    target = current_context
    for part in path_parts[:-1]:
        if part.isdigit():
            target = target[int(part)]
        else:
            if part not in target:
                target[part] = {}
            target = target[part]
    
    # Update the final field
    final_key = path_parts[-1]
    if final_key.isdigit():
        target[int(final_key)] = new_value
    else:
        target[final_key] = new_value
    
    return current_context

def generate_specific_suggestions(analysis_results, context):
    """Generate specific actionable suggestions based on ATS analysis"""
    suggestions = []
    
    # Example suggestions based on common ATS feedback
    for category, data in analysis_results.items():
        if category in ["ATS", "content", "skills"] and isinstance(data, dict):
            tips = data.get("tips", [])
            for tip in tips:
                if tip.get("type") == "improve":
                    tip_text = tip.get("tip", "")
                    
                    # Generate specific suggestions based on tip content
                    if "keyword" in tip_text.lower() or "skill" in tip_text.lower():
                        suggestions.extend(generate_skill_suggestions(context, tip))
                    elif "metric" in tip_text.lower() or "quantif" in tip_text.lower():
                        suggestions.extend(generate_metric_suggestions(context, tip))
                    elif "action verb" in tip_text.lower():
                        suggestions.extend(generate_action_verb_suggestions(context, tip))
    
    return suggestions

def generate_skill_suggestions(context, tip):
    """Generate suggestions for improving skills section"""
    suggestions = []
    job_desc = st.session_state.get("job_description", "")
    
    # Extract missing keywords from job description
    common_tech_keywords = ["Python", "JavaScript", "React", "Node.js", "AWS", "Docker", "Kubernetes", 
                           "SQL", "MongoDB", "Git", "Agile", "Scrum", "Machine Learning", "Data Science"]
    
    current_skills = " ".join(context.get("skills", {}).values()).lower()
    missing_skills = [skill for skill in common_tech_keywords 
                     if skill.lower() in job_desc.lower() and skill.lower() not in current_skills]
    
    if missing_skills:
        suggestions.append({
            "type": "skills_addition",
            "title": f"Add Missing Keywords: {', '.join(missing_skills[:3])}",
            "description": f"Add these job-relevant skills: {', '.join(missing_skills[:3])}",
            "field_path": "skills.Languages",  # or appropriate category
            "current_value": context.get("skills", {}).get("Languages", ""),
            "suggested_value": context.get("skills", {}).get("Languages", "") + f", {', '.join(missing_skills[:3])}"
        })
    
    return suggestions

def generate_metric_suggestions(context, tip):
    """Generate suggestions for adding metrics to experience"""
    suggestions = []
    
    for i, exp in enumerate(context.get("experience", [])):
        for j, item in enumerate(exp.get("items", [])):
            if not any(char.isdigit() for char in item):
                # Suggest adding metrics to bullet points without numbers
                suggestions.append({
                    "type": "add_metrics",
                    "title": f"Add Metrics to: {item[:50]}...",
                    "description": "Add quantifiable results to make this bullet point more impactful",
                    "field_path": f"experience.{i}.items.{j}",
                    "current_value": item,
                    "suggested_value": f"Improved {item.lower()} by X% through optimization and implementation"
                })
                if len(suggestions) >= 3:  # Limit suggestions
                    break
        if len(suggestions) >= 3:
            break
    
    return suggestions

def generate_action_verb_suggestions(context, tip):
    """Generate suggestions for improving action verbs"""
    suggestions = []
    
    weak_verbs = ["worked", "helped", "did", "made", "got", "used"]
    strong_verbs = ["developed", "implemented", "optimized", "designed", "led", "achieved"]
    
    for i, exp in enumerate(context.get("experience", [])):
        for j, item in enumerate(exp.get("items", [])):
            first_word = item.split()[0].lower() if item.split() else ""
            if first_word in weak_verbs:
                replacement = strong_verbs[weak_verbs.index(first_word)]
                new_item = replacement.capitalize() + item[len(first_word):]
                suggestions.append({
                    "type": "action_verb",
                    "title": f"Replace '{first_word}' with '{replacement}'",
                    "description": f"Use stronger action verb in: {item[:50]}...",
                    "field_path": f"experience.{i}.items.{j}",
                    "current_value": item,
                    "suggested_value": new_item
                })
                if len(suggestions) >= 2:
                    break
        if len(suggestions) >= 2:
            break
    
    return suggestions

def display_ats_analysis_with_suggestions(analysis_results):
    """Enhanced display with interactive suggestions"""
    if not analysis_results:
        st.error("No analysis results available.")
        return
    
    # Handle case where results might be a list instead of dict
    if isinstance(analysis_results, list):
        st.error("Invalid analysis results format. Expected a single analysis object.")
        return
    
    if not isinstance(analysis_results, dict):
        st.error("Invalid analysis results format.")
        return
    
    st.markdown("## 📊 ATS Analysis & Resume Feedback")
    
    # Overall Score
    overall_score = analysis_results.get("overallScore", 0)
    st.metric("Overall Score", f"{overall_score}/100")
    
    # Create main tabs
    analysis_tab, suggestions_tab = st.tabs(["📊 Analysis Results", "🔧 Suggested Improvements"])
    
    with analysis_tab:
        # Original analysis display
        tabs = st.tabs(["ATS Score", "Tone & Style", "Content", "Structure", "Skills"])
        categories = ["ATS", "toneAndStyle", "content", "structure", "skills"]
        
        for i, (tab, category) in enumerate(zip(tabs, categories)):
            with tab:
                category_data = analysis_results.get(category, {})
                score = category_data.get("score", 0)
                tips = category_data.get("tips", [])
                
                st.metric(f"{category.replace('ATS', 'ATS').replace('toneAndStyle', 'Tone & Style').title()} Score", f"{score}/100")
                
                if tips:
                    st.subheader("💡 Tips for Improvement")
                    for tip in tips:
                        tip_type = tip.get("type", "improve")
                        tip_text = tip.get("tip", "")
                        explanation = tip.get("explanation", "")
                        
                        if tip_type == "good":
                            st.success(f"✅ **{tip_text}**")
                            if explanation:
                                st.write(explanation)
                        else:
                            st.warning(f"⚠️ **{tip_text}**")
                            if explanation:
                                st.write(explanation)
                else:
                    st.info("No specific tips available for this category.")
    
    with suggestions_tab:
        st.markdown("### 🔧 Apply Suggestions Automatically")
        st.info("Review and apply these AI-generated improvements to your resume:")
        
        # Generate specific suggestions
        current_context = build_context()
        suggestions = generate_specific_suggestions(analysis_results, current_context)
        
        if suggestions:
            for i, suggestion in enumerate(suggestions):
                with st.expander(f"💡 {suggestion['title']}", expanded=False):
                    st.write(f"**Current:** {suggestion['current_value'][:100]}...")
                    st.write(f"**Suggested:** {suggestion['suggested_value'][:100]}...")
                    st.write(f"**Why:** {suggestion['description']}")
                    
                    col1, col2 = st.columns(2)
                    with col1:
                        if st.button(f"✅ Apply This Change", key=f"apply_{i}"):
                            # Apply the suggestion
                            apply_suggestion_to_session_state(suggestion)
                            st.success("✅ Applied! Your resume has been updated.")
                            st.rerun()  # CHANGED: from st.experimental_rerun()
                    
                    with col2:
                        if st.button(f"❌ Skip", key=f"skip_{i}"):
                            st.info("Skipped this suggestion.")
        else:
            st.success("🎉 Great! No specific improvements needed. Your resume looks good!")
            
        # Bulk apply button
        if suggestions:
            st.markdown("---")
            if st.button("🚀 Apply All Suggestions", type="primary"):
                for suggestion in suggestions:
                    apply_suggestion_to_session_state(suggestion)
                st.success(f"✅ Applied all {len(suggestions)} suggestions! Your resume has been updated.")
                st.rerun()  # CHANGED: from st.experimental_rerun()

def apply_suggestion_to_session_state(suggestion):
    """Apply suggestion directly to Streamlit session state"""
    field_path = suggestion["field_path"]
    new_value = suggestion["suggested_value"]
    suggestion_type = suggestion["type"]
    
    if suggestion_type == "skills_addition":
        # Update skills in session state
        category = field_path.split(".")[-1]  # e.g., "Languages"
        current_skills = st.session_state.get(f"skills_{category.lower()}", "")
        st.session_state[f"skills_{category.lower()}"] = new_value
    
    elif suggestion_type in ["add_metrics", "action_verb"]:
        # Update experience items
        path_parts = field_path.split(".")
        if path_parts[0] == "experience":
            exp_index = int(path_parts[1])
            item_index = int(path_parts[3])
            
            # Update the specific experience item
            if exp_index == 0:
                current_items = st.session_state.get("exp1_items", "").split("\n")
                if item_index < len(current_items):
                    current_items[item_index] = new_value
                    st.session_state["exp1_items"] = "\n".join(current_items)
            elif exp_index == 1:
                current_items = st.session_state.get("exp2_items", "").split("\n")
                if item_index < len(current_items):
                    current_items[item_index] = new_value
                    st.session_state["exp2_items"] = "\n".join(current_items)

def main():
    authenticate_user()

    st.title("ResuMe Jatt Da")
    job_desc = st.text_area(
        "Paste the job description here:",
        height=200,
        placeholder="ethe paa:\n• 20% gas poori"
    )
    
    # Store job description in session state
    if job_desc.strip():
        st.session_state["job_description"] = job_desc
    
    submitted = st.button("Submit Description")
    if submitted:
        if "user" in st.session_state and job_desc.strip():
            with st.spinner("Generating top 5 project summaries... this may take a moment"):
                repos = fetch_user_repos(st.session_state.user)
                st.session_state["top_projects"] = generate_top_project_summaries_json(repos, job_desc)
            st.success("Here are your top 5 projects—edit fields and select those you want for your resume.")
        elif not job_desc.strip():
            st.warning("Please enter a job description before submitting.")
        elif "user" not in st.session_state:
            st.warning("Please authenticate your GitHub token before matching projects.")

    # Project selection logic (unchanged)
    top_projects = st.session_state.get("top_projects", [])
    if top_projects:
        st.info("Edit and select your projects, then click 'Add Selected Projects to Resume'.")
        for idx, proj in enumerate(top_projects):
            with st.expander(f"{proj['name']}  |  {proj['date']}"):
                st.text_input("Project Name", value=proj["name"], key=f"name_{idx}")
                st.text_input("Technologies Used (comma)", value=",".join(proj["techs"]), key=f"techs_{idx}")
                st.text_input("Completion Month & Year", value=proj["date"], key=f"date_{idx}")
                st.text_area("Project Description", value=proj["description"], key=f"desc_{idx}")

                st.markdown("**Resume Bullet Points**")
                for j, b in enumerate(proj["bullets"]):
                    st.text_input(f"• Point {j+1}", value=b, key=f"bullet_{idx}_{j}")

                st.checkbox("Include this project", key=f"include_{idx}")

        if st.button("Add Selected Projects to Resume"):
            selected = []
            updated_projects = []
            for idx, proj in enumerate(top_projects):
                if st.session_state.get(f"include_{idx}", False):
                    selected.append({
                        "name":    st.session_state[f"name_{idx}"],
                        "techs":   st.session_state[f"techs_{idx}"],
                        "date":    st.session_state[f"date_{idx}"],
                        "bullets": [st.session_state[f"bullet_{idx}_{j}"] for j in range(3)]
                    })
                updated_projects.append({
                    "name":    st.session_state[f"name_{idx}"],
                    "techs":   st.session_state[f"techs_{idx}"],
                    "date":    st.session_state[f"date_{idx}"],
                    "items":   [st.session_state[f"bullet_{idx}_{j}"] for j in range(3)]
                })
            st.session_state["selected_projects"] = selected
            st.session_state["projects_sidebar"] = updated_projects
            st.success(f"✅ Added {len(selected)} project(s) to your resume")

    # Build context and render PDF
    context = build_context()
    html = render_html(context)
    pdf_bytes = html_to_pdf_bytes(html)

    st.markdown("### Theek aa sub? (Live Resume Preview)")
    b64 = base64.b64encode(pdf_bytes).decode("utf-8")
    pdf_display = f'<iframe src="data:application/pdf;base64,{b64}" width="100%" height="850"></iframe>'
    st.markdown(pdf_display, unsafe_allow_html=True)

    st.download_button(
        "Download PDF",
        data=pdf_bytes,
        file_name="jatt_da_resume.pdf",
        mime="application/pdf"
    )

    # ATS Analysis Section
    st.markdown("---")
    
    if st.button("🔍 Analyze Resume with ATS"):
        stored_job_desc = st.session_state.get("job_description", "")
        if not stored_job_desc:
            st.warning("Please enter a job description first to get tailored ATS analysis.")
            return
            
        with st.spinner("Analyzing your resume for ATS compatibility..."):
            resume_text = extract_resume_text_from_context(context)
            job_title = ""
            analysis_results = analyze_resume_with_ats(resume_text, job_title, stored_job_desc)
            st.session_state["ats_analysis"] = analysis_results
    
    # Display enhanced analysis with suggestions
    if "ats_analysis" in st.session_state:
        display_ats_analysis_with_suggestions(st.session_state["ats_analysis"])

if __name__ == "__main__":
    main()
