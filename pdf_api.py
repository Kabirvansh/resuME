from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
import os
import tempfile
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Jinja2 environment setup
jinja_env = Environment(loader=FileSystemLoader("templates"))

def render_html(context):
    """Render HTML from Jinja2 template"""
    template = jinja_env.get_template("resume_template.html")
    return template.render(**context)

def html_to_pdf_bytes(html_content):
    """Convert HTML to PDF bytes"""
    return HTML(string=html_content, base_url=os.getcwd()).write_pdf()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "service": "PDF API"})

@app.route('/generate-pdf', methods=['POST'])
def generate_pdf():
    """Generate PDF from resume context"""
    try:
        # Get resume context from request
        context = request.get_json()
        
        if not context:
            return jsonify({"error": "No context provided"}), 400
        
        # Render HTML from template
        html_content = render_html(context)
        
        # Generate PDF
        pdf_bytes = html_to_pdf_bytes(html_content)
        
        # Create temporary file for PDF
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
            tmp_file.write(pdf_bytes)
            tmp_file_path = tmp_file.name
        
        # Return PDF file
        return send_file(
            tmp_file_path,
            as_attachment=True,
            download_name="resume.pdf",
            mimetype="application/pdf"
        )
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/preview-pdf', methods=['POST'])
def preview_pdf():
    """Generate PDF preview (returns base64 encoded PDF)"""
    try:
        # Get resume context from request
        context = request.get_json()
        
        if not context:
            return jsonify({"error": "No context provided"}), 400
        
        # Render HTML from template
        html_content = render_html(context)
        
        # Generate PDF
        pdf_bytes = html_to_pdf_bytes(html_content)
        
        # Convert to base64 for embedding
        import base64
        pdf_b64 = base64.b64encode(pdf_bytes).decode('utf-8')
        
        return jsonify({
            "pdf_base64": pdf_b64,
            "mime_type": "application/pdf"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
