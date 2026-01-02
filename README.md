# resuME - Professional Resume Builder 🎯

A full-stack resume builder application with React frontend and Flask backend for generating professional PDFs.

## Features ✨

- **Modern React Frontend**: Clean, responsive UI built with Vite, React Router, and Tailwind CSS
- **PDF Generation**: High-quality PDF generation using WeasyPrint and Jinja2 templates
- **Real-time Preview**: Live preview of your resume as you edit
- **Section Management**: Add/edit/remove experience, education, projects, and skills
- **Professional Templates**: Beautiful, ATS-friendly resume layouts
- **Download Ready**: One-click PDF download with professional formatting

## Tech Stack 🛠️

### Frontend

- **React** 18.2+ with hooks and context
- **Vite** for fast development and building
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **JavaScript ES6+**

### Backend

- **Flask** Python web framework
- **Jinja2** for HTML templating
- **WeasyPrint** for PDF generation
- **Flask-CORS** for cross-origin requests

## Quick Start 🚀

### Prerequisites

- Node.js (v18+ recommended)
- Python 3.8+
- pip (Python package manager)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd resuME
```

### 2. Setup Backend (Flask API)

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install Python dependencies
pip install flask flask-cors jinja2 weasyprint

# Start Flask API server
python -c "from pdf_api import app; app.run(debug=True, port=5001)"
```

The Flask API will be running at `http://localhost:5001`

### 3. Setup Frontend (React App)

```bash
# Navigate to frontend directory
cd frontend

# Start development server (Vite will auto-install dependencies)
npx vite dev --host --port 3000
```

The React app will be running at `http://localhost:3000`

### 4. Open Application

Navigate to `http://localhost:3000` in your browser to start building your resume!

## Project Structure 📁

```
resuME/
├── README.md
├── requirements.txt          # Python dependencies
├── pdf_api.py               # Flask API server
├── templates/               # Jinja2 HTML templates
│   └── resume_template.html
├── static/                  # Static assets (fonts, etc.)
├── frontend/                # React application
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── main.jsx         # React entry point
│   │   ├── index.css        # Global styles
│   │   ├── components/      # React components
│   │   │   ├── PersonalInfoSection.jsx
│   │   │   ├── ExperienceSection.jsx
│   │   │   ├── EducationSection.jsx
│   │   │   ├── ProjectsSection.jsx
│   │   │   └── SkillsSection.jsx
│   │   ├── context/         # React context
│   │   │   └── ResumeContext.jsx
│   │   ├── lib/             # Utilities
│   │   │   └── downloadPdf.js
│   │   └── pages/           # React pages
│   │       ├── FormPage.jsx
│   │       └── PreviewPage.jsx
└── venv/                    # Python virtual environment
```

## API Endpoints 🔌

### POST `/generate-pdf`

Generates and returns a PDF file from resume data.

**Request Body:**

```json
{
  "personalInfo": {
    /* personal details */
  },
  "experience": [
    /* work experience array */
  ],
  "education": [
    /* education array */
  ],
  "projects": [
    /* projects array */
  ],
  "skills": {
    /* skills by category */
  }
}
```

**Response:** PDF file download

### POST `/preview-pdf`

Generates a base64-encoded PDF for browser preview.

**Request Body:** Same as above

**Response:**

```json
{
  "pdf": "base64-encoded-pdf-data"
}
```

## Development Notes 📝

### Port Configuration

- **Frontend (React):** Port 3000
- **Backend (Flask):** Port 5001 (5000 is often used by macOS AirPlay)

### CORS Setup

The Flask API includes CORS headers to allow requests from the React frontend during development.

### Environment Variables

Create a `.env` file in the root directory for any environment-specific configurations.

## Troubleshooting 🔧

### Port 5000 Already in Use

On macOS, port 5000 is often used by AirPlay Receiver. The Flask app is configured to use port 5001. If you need to change this, update both:

1. `pdf_api.py` - Change the port in the run command
2. `frontend/src/lib/downloadPdf.js` - Update the API URLs

### PDF Generation Issues

If PDF generation fails, ensure:

1. WeasyPrint is properly installed
2. Font files exist in the `static/fonts/` directory
3. HTML template is valid

### React Development Issues

If the frontend doesn't start:

1. Ensure Node.js v18+ is installed
2. Try clearing npm cache: `npm cache clean --force`
3. Use `npx vite dev` directly if npm scripts fail

## Contributing 🤝

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test both frontend and backend
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License 📄

This project is open source and available under the [MIT License](LICENSE).

---

**Happy Resume Building!** 🎉

Built with ❤️ for the dev community
