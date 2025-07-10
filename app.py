from flask import Flask, render_template, make_response, request
from weasyprint import HTML
app = Flask(__name__)

def resume():
    # hard-coded initial data; your Python job-analysis step will replace 'projects'
    context = {
        "name": "Kabirvansh Singh Chadha",
        "phone": "587-937-5582",
        "email": "kabirvansh1912@gmail.com",
        "linkedin": "linkedin.com/in/kabirvansh",
        "github": "github.com/Kabirvansh",
        "education": {
            "university": "University of Alberta, Edmonton, Alberta",
            "degree": "Bachelor of Science in Computing Science - Specialization",
            "location": "Edmonton, Alberta",
            "dates": "September 2022 - April 2026"
        },
        "experience": [
            {
                "title": "Lead Student Instructor (LSI)",
                "organization": "University of Alberta",
                "location": "Edmonton, Alberta",
                "dates": "January 2025 - Present",
                "items": [
                    "Guiding students in mastering advanced topics such as objects, functional programming, and Abstract Data Types (ADTs).",
                    "Facilitating learning of algorithms, including popular searching and sorting techniques, focusing on time and space efficiency.",
                    "Managed a team of TAs for course content development, resource creation, and assignment marking."
                ]
            },
            {
                "title": "Undergraduate Research Assistant",
                "organization": "University of Alberta",
                "location": "Edmonton, Alberta",
                "dates": "October 2024 - December 2024",
                "items": [
                    "Designed engaging and educational assignments to enhance student understanding of key concepts such as data structures, algorithms, etc.",
                    "Collaborated with instructors to refine course materials and improve student engagement.",
                    "Integrated third-party services like Kritik to streamline peer-review workflows."
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
        "skills": [
            "Python (pandas, Dash, Streamlit), SQL, JavaScript/TypeScript, C, HTML/CSS",
            "Ignition Vision & OPC UA, Modbus TCP, DNP3, ModSim PLC Simulator",
            "Wireshark packet analysis, OPC UA SecureChannel, ICS security fundamentals",
            "Django, Flask, FastAPI, PostgreSQL, MongoDB",
            "Plotly Dash, Streamlit, Power BI, Tableau",
            "Microsoft Azure, Firebase, Supabase, Amazon S3, Docker, Git/GitHub, Postman, Splunk, Hadoop"
        ],
        "certifications": [
            "Certified in Cyber Security (CC)",
            "JPMorgan Chase Cybersecurity Simulation",
            "Deep Web and Cybersecurity",
            "Cybersecurity for Robotics"
        ],
        "availability": [
            "Available for 4, 8, or 12-month work terms, starting September 2025"
        ]
    }
    return context
# @app.route('/')
# def resume_html():
#     return render_template('resume_template.html', **resume())

@app.route('/')
def resume_pdf():
    rendered_html = render_template('resume_template.html', **resume())
    pdf = HTML(string=rendered_html, base_url=request.base_url).write_pdf()
    response = make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'inline; filename=resume.pdf'
    return response
if __name__ == '__main__':
    app.run(debug=True)
