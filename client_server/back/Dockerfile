FROM mysql:5.7

ENV MYSQL_USER root

ENV MYSQL_PASSWORD root

ENV MYSQL_ROOT_PASSWORD root

ENV MYSQL_DATABASE login

FROM node:16-alpine

WORKDIR /client_server/back

COPY . /client_server/back

COPY package.json package-lock.json ./

RUN npm ci

COPY server.js ./

ENTRYPOINT [ "npm" ,"run" , "start" ]