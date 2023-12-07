FROM node:21.1.0-alpine AS build-env



WORKDIR /image-resize

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["node", "resize.js"]
#docker build  -t sheff2000/image-resize:0.1 .