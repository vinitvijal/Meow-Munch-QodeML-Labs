FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm config set strict-ssl false 
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .


# Build the Next.js application
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 8000

# Next.js needs a PORT environment variable, Medusa template defaults to 8000 in package.json start script
CMD ["npm", "run", "start"]
