FROM node:latest
WORKDIR /code
COPY package.json package.json
RUN npm install install
COPY . .
CMD npm run build && npm run start