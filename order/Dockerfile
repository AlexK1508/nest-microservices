FROM node:10

RUN npm i -g typescript ts-node nodemon

WORKDIR /var/www/order
ADD package.json /var/www/order
ADD yarn.lock /var/www/order
RUN yarn install

ADD . /var/www/order

CMD ["npm", "run", "start:dev"]
