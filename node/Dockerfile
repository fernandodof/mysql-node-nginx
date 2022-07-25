FROM node:16 AS node-builder

WORKDIR /app

COPY . .

RUN npm i

EXPOSE 3000

CMD [ "npm", "start" ]