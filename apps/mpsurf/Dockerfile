# Stage 1: Build Angular app
FROM public.ecr.aws/docker/library/node:alpine3.20 AS builder
# Automatically create the directory if it doesn't exist.
WORKDIR /app
# Copy the rest of the application code
COPY package.json /app/
# Install dependencies
RUN npm install --force
COPY . .
# Build the Angular app
RUN npm run build:mock

# Stage 2: Serve Angular app using NGINX
FROM public.ecr.aws/nginx/nginx:stable-perl
# Copy built Angular app from Stage 1
COPY --from=builder /app/dist/mpsurf2/browser /usr/share/nginx/html
COPY /nginx.conf.template  /etc/nginx/conf.d/default.conf
# Create NGINX cache directory
RUN mkdir -p /var/cache/nginx/client_temp
# Set ownership of NGINX cache directory
RUN chown -R nginx:nginx /var/cache/nginx

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]