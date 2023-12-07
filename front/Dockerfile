
FROM node:21.1.0 as build-stage
WORKDIR /front
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage

RUN mkdir /front
COPY --from=build-stage /front/dist /front
COPY nginx.conf /etc/nginx/nginx.conf




# docker build  -t sheff2000/front-app:0.1 .



#FROM node:v21.1.0 AS build-env

#WORKDIR /app

#COPY package*.json ./
#RUN npm ci

#COPY . ./
#RUN npm run build

#FROM node:v21.1.0 AS run-env
#WORKDIR /app

#COPY --from=build-env /app/dist /usr/share/nginx/html
#EXPOSE 80



# ---------------------------

#FROM node:v21.1.0-alpine AS build-env
#WORKDIR /app
#COPY package*.json ./
#RUN npm ci
#COPY . ./
#RUN npm run build
#FROM nginx:stable-alpine AS run-env
#COPY --from=build-env /app/dist /usr/share/nginx/html
#EXPOSE 80
