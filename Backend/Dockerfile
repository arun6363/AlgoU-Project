# FROM node:24-alpine

# # Install compilers & runtimes
# RUN apt-get update && apt-get install -y \
#     build-essential \
#     python3 \
#     openjdk-17-jdk \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/*

# # App directory
# WORKDIR /app

# # Install backend deps
# COPY package*.json ./
# RUN npm install

# # Copy backend source
# COPY . .

# # Create temp directory for code execution
# # RUN mkdir -p /app/temp

# # Expose backend port
# EXPOSE 4000

# # Start compiler backend
# CMD ["node", "server.js"]




FROM node:24-alpine

# Install compilers & runtimes
# RUN apk update && apk add --no-cache \
#     build-base \
#     python3 \
#     openjdk17 \
#     bash

# Verify installations (optional but useful)
# RUN gcc --version && \
#     g++ --version && \
#     python3 --version && \
#     java -version && \
#     javac -version

# App directory
WORKDIR /app

# Install backend dependencies
COPY package*.json ./
RUN npm install

# Copy backend source
COPY . .

# Create temp directory for code execution
# RUN mkdir -p /app/temp

# Expose backend port
# EXPOSE 4000

# Start backend
CMD ["node", "server.js"]

