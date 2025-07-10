import os
import subprocess
import shutil
from jinja2 import Environment, FileSystemLoader

# 1) Set up Jinja environment pointing at the templates directory
env = Environment(
    loader=FileSystemLoader('templates')
)

def render_latex(context, template_name='resume_template.tex', output_tex='output_resume.tex'):
    """
    Renders the LaTeX Jinja template with the provided context and writes to output_tex.
    """
    template = env.get_template(template_name)
    rendered = template.render(context)
    with open(output_tex, 'w', encoding='utf-8') as f:
        f.write(rendered)
    print(f"[+] LaTeX source written to {output_tex}")
    return output_tex


def compile_pdf(tex_path, output_dir='build'):
    """
    Compiles the given .tex file into PDF using pdflatex or xelatex, placing results in output_dir.
    Returns path to the generated PDF.
    """
    # Locate LaTeX engine
    engine = shutil.which('pdflatex') or shutil.which('xelatex')
    if not engine:
        raise RuntimeError(
            'No LaTeX engine found. Please install a TeX distribution (e.g. TeX Live, MacTeX) so pdflatex or xelatex is available.'
        )
    os.makedirs(output_dir, exist_ok=True)
    cmd = [
        engine,
        '-interaction=batchmode',
        f'-output-directory={output_dir}',
        tex_path
    ]
    print(f"[+] Running: {' '.join(cmd)}")
    proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if proc.returncode != 0:
        print("[!] LaTeX compilation failed:")
        out = proc.stdout.decode(errors='ignore')
        err = proc.stderr.decode(errors='ignore')
        print(out)
        print(err)
        raise RuntimeError('LaTeX compilation error')
    pdf_name = os.path.splitext(os.path.basename(tex_path))[0] + '.pdf'
    pdf_path = os.path.join(output_dir, pdf_name)
    print(f"[+] PDF generated at {pdf_path}")
    return pdf_path


def main():
    # Example context -- replace with real data or load from JSON
    context = {
        'name': 'Kabirvansh Singh Chadha',
        'phone': '587-937-5582',
        'email': 'kabirvansh1912@gmail.com',
        'linkedin': 'https://www.linkedin.com/in/kabirvansh-singh-chadha-9a8570259/',
        'github': 'https://github.com/Kabirvansh',
        'education': {
            'university': 'University of Alberta',
            'dates': 'September 2022 -- April 2026',
            'degree': 'Bachelor of Science in Computing Science - Specialization',
            'location': 'Edmonton, Alberta'
        },
        'experience': [
            {
                'title': 'Lead Student Instructor (LSI)',
                'dates': 'January 2025 -- Present',
                'organization': 'University of Alberta',
                'location': 'Edmonton, Alberta',
                'items': [
                    'Guiding students in mastering advanced topics such as objects, functional programming, and Abstract Data Types (ADTs).',
                    'Facilitating learning of algorithms, including popular searching and sorting techniques, focusing on time and space efficiency.',
                    'Managed a team of TAs for course content development, resource creation, and assignment marking.'
                ]
            }
        ],
        'projects': [
            {
                'name': 'Compressor Station SCADA Demo',
                'techs': 'Ignition, OPC UA, Wireshark, Streamlit, Python, Git',
                'date': 'May 2025',
                'items': [
                    'Designed and implemented an Ignition Vision HMI with OPC UA–backed tags for inlet/outlet pressure, compressor control, and alarm indication',
                    'Captured and decoded OPC UA SecureChannel traffic in Wireshark for network forensics',
                    'Developed a Streamlit dashboard to visualize historical pressure data, complete with interactive time-window slider'
                ]
            }
        ],
        'skills': [
            'Python (pandas, Dash, Streamlit), SQL, JavaScript/TypeScript, C, HTML/CSS',
            'Ignition Vision & OPC UA, Modbus TCP, DNP3, ModSim PLC Simulator',
            'Wireshark packet analysis, OPC UA SecureChannel, ICS security fundamentals'
        ],
        'certifications': [
            'Certified in Cyber Security (CC)',
            'JPMorgan Chase Cybersecurity Simulation'
        ],
        'availability': [
            'Available for 4, 8, or 12-month work terms, starting September 2025'
        ]
    }

    # 1) Render the LaTeX
    tex_file = render_latex(context)
    # 2) Compile to PDF
    pdf_file = compile_pdf(tex_file)
    print(f"Done! PDF located at: {pdf_file}")

if __name__ == '__main__':
    main()

