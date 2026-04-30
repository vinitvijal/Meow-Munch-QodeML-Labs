FROM node:24-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm config set strict-ssl false 
RUN npm install --force

# Copy the rest of the backend source code
COPY . .

# Build the backend
RUN npm run build

EXPOSE 9000

# CD to .medusa/server
WORKDIR /app/.medusa/server

# Copy .env
COPY ../../../.env ./.env.production


# Start the Medusa production server
CMD ["npm", "run", "start"]
