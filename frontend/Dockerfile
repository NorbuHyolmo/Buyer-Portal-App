# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . /app/

# Build the React app
RUN npm run build

# Serve the app using a simple web server
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Command to run the frontend
CMD ["serve", "-s", "build", "-l", "3000", "--single"]