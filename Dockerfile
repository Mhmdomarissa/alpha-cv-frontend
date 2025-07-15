# Use official Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build Next.js frontend
RUN npm run build

# Expose port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
