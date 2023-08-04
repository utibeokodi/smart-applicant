# Start with Node.js image
FROM node:14-alpine

WORKDIR /app

#copy nextjs app to docker
COPY . ./

#update npm
RUN npm install -g npm

# Install dependencies
RUN npm install --production

# Build the Next.js app
RUN npm run build

# Your app listens on port 4000 so you'll use the EXPOSE instruction to have it mapped by the Docker daemon
EXPOSE 4000

# Define the command to run your app using CMD which defines your runtime
CMD [ "npm", "start" ]