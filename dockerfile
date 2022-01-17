FROM node:16

RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json
RUN npm install --only=prod
COPY . /app
RUN npm run build-webpack