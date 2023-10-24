# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the SvelteKit application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Env variables
ARG PUBLIC_POCKETBASE_URL
ENV PUBLIC_POCKETBASE_URL $PUBLIC_POCKETBASE_URL
ARG PUBLIC_SOCKETIO_URL
ENV PUBLIC_SOCKETIO_URL $PUBLIC_SOCKETIO_URL

# Start the SvelteKit application
CMD [ "node", "/app/build/server.js" ]
