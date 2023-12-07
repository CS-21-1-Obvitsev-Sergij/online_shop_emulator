
FROM node:21.1.0-alpine AS build-env

WORKDIR /server
COPY package*.json ./

RUN npm ci

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]

#docker build  -t sheff2000/server--app:0.1 .