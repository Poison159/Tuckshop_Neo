# =================================================================================================
# Build Container
# =================================================================================================

# Use Node.js v16
FROM node:16 AS build

# Create a directory for the application source
WORKDIR /usr/src

# Install app dependencies
# Build Speed Optimisation: Copy the package.*.json files first
# This allows the npm install to be done on a distinct layer, meaning if your dependencies don't change,
# a cached copy can be used.
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases ./.yarn/releases

# Install packages - throw error if the yarn lock file differs from package.json
RUN yarn install --immutable

# Copy in the app source
COPY ./ ./

# Build
RUN yarn build

# =================================================================================================
# Run Container
# =================================================================================================
FROM nginx:stable-alpine

# Copy the build into the nginx public html folder
COPY --from=build /usr/src/build /usr/share/nginx/html

# Expose nginx on port 80
EXPOSE 80

# Install bash
RUN apk add --no-cache bash

# Copy in the nginx config file
COPY ./deploy_config/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the env.sh script into the container
COPY ./deploy_config/env.sh /app/env.sh

# Make sure the line endings are unix format
RUN dos2unix /app/env.sh

# Make the env.sh shell script executable
RUN chmod +x /app/env.sh

# Run env.sh and start nginx
CMD ["/bin/sh", "-c", "/app/env.sh && nginx -g \"daemon off;\""]
