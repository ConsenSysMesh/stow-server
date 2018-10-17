FROM node:8

# Create app directory
RUN mkdir -p /usr/src/linnia-server
WORKDIR /usr/src/linnia-server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ARG NPM_TOKEN
COPY .npmrc .npmrc

RUN npm install
# If you are building your code for production
# RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
