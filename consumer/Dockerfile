FROM node:22-alpine
WORKDIR /consumer
COPY package.json index.js /consumer/
RUN npm config set strict-ssl=false
RUN npm install
RUN npm i -g nodemon
CMD ["nodemon", "index.js"]