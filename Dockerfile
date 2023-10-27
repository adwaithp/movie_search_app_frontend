# Use an official Node.js runtime as a parent image
FROM node:16.14.2

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all files from your local directory to the container
COPY . .

# Build the Vue.js app
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Define the command to start your app
CMD [ "npm", "run", "serve" ]
