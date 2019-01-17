FROM node:10

RUN npm i -g typescript ts-node nodemon

WORKDIR /var/www/api
ADD package.json /var/www/api
ADD yarn.lock /var/www/api
RUN yarn install

ADD . /var/www/api

CMD ["npm", "run", "start:dev"]
