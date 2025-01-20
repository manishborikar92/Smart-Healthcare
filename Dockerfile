# Stage 1: Build the Node.js app
FROM node:20-alpine AS node-builder

# Set working directory for Node.js
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./ 

# Install Node.js dependencies (production only)
RUN npm install --production

# Copy the rest of the application files
COPY . . 

# Stage 2: Setup Python environment (with necessary shared libraries)
FROM python:3.10-alpine AS python-builder

# Install required dependencies for TensorFlow and compiling Python packages
RUN apk add --no-cache gcc musl-dev libffi-dev openblas-dev python3-dev

# Set working directory for Python
WORKDIR /usr/src/app

# Copy Python dependencies
COPY requirements.txt ./ 

# Upgrade pip and install dependencies with increased timeout and alternate mirror
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Stage 3: Final stage (combining Node.js and Python)
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install Python in the final container to make sure `python` is available
RUN apk add --no-cache python3 py3-pip libpython3.10

# Copy Node.js app from the build stage
COPY --from=node-builder /usr/src/app /usr/src/app

# Copy Python environment and dependencies from python-builder stage
COPY --from=python-builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=python-builder /usr/local/bin /usr/local/bin

# Expose the port where Node.js app will listen (e.g., 3000)
EXPOSE 3000

# Start the Node.js app directly
CMD ["node", "app.js"]
