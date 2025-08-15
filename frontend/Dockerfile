# Stage 1: Build Vite app
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve dist with Vite preview
FROM node:18-alpine

WORKDIR /app

# Copy built files only
COPY --from=build /app/dist ./dist

# Install Vite globally
RUN npm install -g vite

EXPOSE 80

CMD ["vite", "preview", "--port", "80", "--host"]