# Use the official Node.js 18 image as the base image
FROM node:18

# Install PNPM
RUN npm install -g pnpm

# Create and change to the app directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Environment variables
ENV MONGODB_URL=mongodb://mongo:PcewCjwiDzNeoDGdTIhybnLYukyqBgCU@junction.proxy.rlwy.net:34396
ENV PORT=5000
# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["pnpm", "run", "start"]