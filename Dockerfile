FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY backend/ .

# Create .env file from example if it doesn't exist
COPY backend/.env.example .env

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
