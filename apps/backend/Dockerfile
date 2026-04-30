FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Build the backend
RUN npm run build

EXPOSE 9000

# Start the Medusa production server
CMD ["npm", "run", "start"]
