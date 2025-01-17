# Stage 1: Build the Node.js app
FROM node:20-alpine AS node-builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Stage 2: Setup Python environment
FROM python:3.9-slim AS python-builder

# Set working directory
WORKDIR /usr/src/app

# Copy Python dependencies
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Stage 3: Final stage (combining Node.js and Python)
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy Node.js app from the build stage
COPY --from=node-builder /usr/src/app /usr/src/app

# Copy Python environment and dependencies
COPY --from=python-builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=python-builder /usr/local/bin /usr/local/bin

# Expose ports for Node.js and Python servers
EXPOSE 3000 8000

# Start the Node.js app
CMD ["npm", "start"]
