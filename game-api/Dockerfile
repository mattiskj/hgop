#create a layer from node v10 docker image
FROM node:dubnium
#Set the working directory to /code
WORKDIR /code
#copies package.json from itemrepository and adds them to the container
COPY package.json package.json
#copies database.js from itemrepository and adds them to the container
COPY database.js database.js
# copies app.js from itemrepository and adds them to the container
COPY app.js app.js
# install all necessary dependencies
RUN npm install
#run node app.js on docker run
CMD node app.js
