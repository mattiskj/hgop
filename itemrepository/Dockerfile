FROM node:dubnium
#Set the working directory to /code
WORKDIR /code

COPY package.json package.json

COPY database.js database.js

COPY app.js app.js
# install all necessary dependencies
RUN npm install

CMD node app.js
