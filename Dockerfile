# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Expo CLI sometimes needs this
ENV CI=true

# Expose Expo Web port
EXPOSE 19006

# Start Expo in web-only mode
CMD ["npx", "expo", "start", "--web", "--non-interactive"]
