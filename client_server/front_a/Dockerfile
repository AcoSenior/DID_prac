FROM node:16-alpine

WORKDIR /client_server/front_a

COPY . /client_server/front_a

COPY package.json package-lock.json ./

RUN npm ci

ENTRYPOINT [ "npm" ,"run" , "dev" ]