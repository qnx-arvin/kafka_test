# Use an official node image as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package*.json /frontend/

# Install dependencies
RUN npm config set strict-ssl=false
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]