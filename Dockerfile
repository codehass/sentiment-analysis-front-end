# ----------------------------------------------------------------------
# Stage 1: Builder (Installs dependencies and builds the Next.js app)
# ----------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy necessary files for dependency installation
# Copy package.json and lockfile first to leverage Docker layer caching
COPY package.json yarn.lock* package-lock.json* ./

# Use npm install or yarn install based on your lock file
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Next.js application for production
# This creates the optimized .next folder
RUN npm run build

# ----------------------------------------------------------------------
# Stage 2: Runner (Minimal production environment)
# ----------------------------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment and default port
ENV NODE_ENV production
ENV PORT 3000

# Copy only the files needed to run the app from the builder stage
# 1. The built app (.next)
COPY --from=builder /app/.next ./.next
# 2. Public assets
COPY --from=builder /app/public ./public
# 3. node_modules (production dependencies only, if separated)
COPY --from=builder /app/node_modules ./node_modules
# 4. package.json (to run the start script)
COPY --from=builder /app/package.json ./package.json

# Expose the port (3000 by default)
EXPOSE 3000

# Start the optimized Next.js production server
CMD ["npm", "start"]