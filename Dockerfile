#syntax=docker/dockerfile:1
 FROM node:14
 WORKDIR /AMABUZZAPIFRONTEND/
 COPY . .
 RUN yarn install --production
 RUN yarn add nodemon
 EXPOSE 4443

 CMD ["node", "server.js"]
