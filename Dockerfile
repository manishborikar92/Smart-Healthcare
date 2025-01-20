# Stage 1: Build the Node.js app
FROM node:20-slim AS node-builder

# Set working directory for Node.js
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./ 

# Install Node.js dependencies (production only)
RUN npm install --production

# Copy the rest of the application files
COPY . . 

# Stage 2: Setup Python environment
FROM python:3.10-slim AS python-builder

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libffi-dev \
    libssl-dev \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set working directory for Python
WORKDIR /usr/src/app

# Copy Python dependencies
COPY requirements.txt ./ 

# Upgrade pip and install dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Stage 3: Final stage (combining Node.js and Python)
FROM node:20-slim

# Set working directory
WORKDIR /usr/src/app

# Install Python and required system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Copy Node.js app from the build stage
COPY --from=node-builder /usr/src/app /usr/src/app

# Copy Python environment and dependencies from python-builder stage
COPY --from=python-builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=python-builder /usr/local/bin /usr/local/bin

# Expose the port where Node.js app will listen (e.g., 3000)
EXPOSE 3000

# Start the Node.js app directly
CMD ["node", "app.js"]
