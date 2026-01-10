**Docker deployment (recommended for Streamlit + WeasyPrint)**

- Build the image locally:

```bash
docker build -t resume-app .
```

- Run the container locally:

```bash
docker run -p 8501:8501 resume-app
```

- Notes:
  - The Dockerfile installs `libcairo2`, `libpango-1.0-0`, `libgdk-pixbuf2.0-0`, and other native deps required by WeasyPrint.
  - If you want Playwright fallback, add `playwright` to `requirements.txt` and the Dockerfile will run `playwright install` during build.
  - For cloud deployments, push the image to your container registry (Docker Hub, GitHub Container Registry, etc.) and use your hosting provider's container service.

**Alternative (no Docker)**

- Use an external HTML→PDF API (PDFShift, PDFCrowd) to avoid native library installs.
- Or deploy to a host that allows installing apt packages during build.
