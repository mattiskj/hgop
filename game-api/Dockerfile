#create a layer from node v10 docker image
FROM node:dubnium
#Set the working directory to /code
WORKDIR /code

COPY . .
    
# install all necessary dependencies
RUN npm install --production
#run node app.js on docker run
CMD sleep 5 && npm run migratedb:pg && node app.js
