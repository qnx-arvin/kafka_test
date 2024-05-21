FROM node:22-alpine
WORKDIR /producer
COPY package.json index.js /producer/
RUN npm config set strict-ssl=false
RUN npm install
RUN npm i -g nodemon
CMD ["nodemon", "index.js"]