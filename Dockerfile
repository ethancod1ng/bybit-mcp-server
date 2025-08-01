# Generated by https://smithery.ai. See: https://smithery.ai/docs/build/project-config
FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json tsconfig.json ./
COPY src ./src

# Install dependencies and build
RUN npm install --ignore-scripts && npm run build

# Expose port if needed (not required for stdio)
# EXPOSE  port

# Start the MCP server
CMD ["node", "dist/index.js"]
