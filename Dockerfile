# Use the official lightweight Python image
FROM python:3.10-slim

# Install system dependencies for required libraries
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libsndfile1 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy dependency file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port 8080 to match Cloud Run requirements
EXPOSE 8080

# Set environment variable to ensure Flask listens on all interfaces
ENV PYTHONUNBUFFERED True
ENV PORT 8080

# Start the Flask application using Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]