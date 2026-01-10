FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive

# Install system libraries required by WeasyPrint (cairo, pango, gdk-pixbuf, etc.)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       build-essential \
       libcairo2 \
       libpango-1.0-0 \
       libgdk-pixbuf2.0-0 \
       libffi-dev \
       shared-mime-info \
       wget \
       ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install Python deps
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Optional: if `playwright` is present in requirements, install browsers
RUN if python -c "import importlib,sys
try:\n    importlib.import_module('playwright')\n    sys.exit(0)\nexcept Exception:\n    sys.exit(1)"; then \
      playwright install --with-deps || true; \
    true

# Copy app source
COPY . /app

ENV STREAMLIT_SERVER_HEADLESS=true
EXPOSE 8501

CMD ["streamlit", "run", "streamlit_app.py", "--server.port=8501", "--server.address=0.0.0.0"]
