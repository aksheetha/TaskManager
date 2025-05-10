# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy all files from the current directory to the container's working directory
COPY . .

# Install project dependencies
RUN npm install

# Set environment variables
ENV NODE_ENV=development
ENV CI=1

# Expose ports for the application
EXPOSE 19006  
EXPOSE 8081   

# Define the command to run the application
CMD ["npx", "expo", "start", "--web", "--port", "19006", "--dev-client"]