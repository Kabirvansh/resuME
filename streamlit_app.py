import os
import base64
import streamlit as st
from github import Github, BadCredentialsException
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML

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
        name = st.text_input("Full Name", value=st.session_state.get("name", "Kabirvansh Singh Chadha"))
        email = st.text_input("Email", value=st.session_state.get("email", "kabirvansh1912@gmail.com"))
        phone = st.text_input("Phone Number", value=st.session_state.get("phone", "587-937-5582"))
        linkedin = st.text_input("LinkedIn URL", value=st.session_state.get("linkedin", "linkedin.com/in/kabirvansh"))
        github_url = st.text_input("GitHub URL (optional)", value=st.session_state.get("github", "github.com/Kabirvansh"))

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

    st.session_state.name = name
    st.session_state.email = email
    st.session_state.phone = phone
    st.session_state.linkedin = linkedin
    st.session_state.github = github_url
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

    # Add developer credit at the bottom of the sidebar
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
        "projects": [
            {
                "name": "Compressor Station SCADA Demo",
                "techs": "Ignition, OPC UA, Wireshark, Streamlit, Python, Git",
                "date": "May 2025",
                "items": [
                    "Designed and implemented an Ignition Vision HMI with OPC UA-backed tags for inlet/outlet pressure, compressor control, and alarm indication",
                    "Captured and decoded OPC UA SecureChannel traffic in Wireshark for network forensics",
                    "Developed a Streamlit dashboard to visualize historical pressure data, complete with interactive time-window slider"
                ]
            },
            {
                "name": "OT Cybersecurity Lab Projects",
                "techs": "Modbus TCP, ModSim, WinLog Lite, Wireshark",
                "date": "May 2025",
                "items": [
                    "Configured a Modbus-TCP channel & device in ModSim with 2 s polling intervals",
                    "Defined discrete (“Coil1”) and analog (“Pressure”) tags in WinLog Lite HMI for read/write control",
                    "Captured live Modbus-TCP traffic in Wireshark and dissected function codes and payload values"
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
    return context

def main():
    authenticate_user()

    st.title("ResuMe Jatt Da")
    job_desc = st.text_area(
        "Paste the job description here:",
        height=200,
        placeholder="ethe paa:\n• 20% gas poori"
    )

    submitted = st.button("Submit Description")  

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
        file_name="tailored_resume.pdf",
        mime="application/pdf"
    )

    if submitted:
        if job_desc.strip():
            st.success("Job description received. (Resume tailoring not yet implemented.)")
        else:
            st.warning("Please enter a job description before submitting.")

if __name__ == "__main__":
    main()
