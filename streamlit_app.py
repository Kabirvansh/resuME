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
openai.api_key = os.getenv("OPENAI_API_KEY")

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
    # This will extract the first JSON array found in the text
    match = re.search(r'(\[\s*{.*?}\s*\])', text, re.DOTALL)
    if match:
        return match.group(1)
    return None

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

    response = openai.chat.completions.create(
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


def main():
    authenticate_user()

    st.title("ResuMe Jatt Da")
    job_desc = st.text_area(
        "Paste the job description here:",
        height=200,
        placeholder="ethe paa:\n• 20% gas poori"
    )
    # Use only session_state or manual entry for personal info
    # name  = st.text_input("Full Name",  value=st.session_state.get("name", ""))
    # email = st.text_input("Email addr", value=st.session_state.get("email", ""))
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

    # --- Always show project selection UI if top_projects exist ---
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

    context = build_context()
    html = render_html(context)
    pdf_bytes = html_to_pdf_bytes(html)

    st.markdown("### Theek aa sub?")
    b64 = base64.b64encode(pdf_bytes).decode("utf-8")
    pdf_display = f'<iframe src="data:application/pdf;base64,{b64}" width="100%" height="850"></iframe>'
    st.markdown(pdf_display, unsafe_allow_html=True)

    st.download_button(
        "Download PDF",
        data=pdf_bytes,
        file_name="jatt_da_resume.pdf",
        mime="application/pdf"
    )

if __name__ == "__main__":
    main()
