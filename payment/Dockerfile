FROM node:10

RUN npm i -g typescript ts-node nodemon

WORKDIR /var/www/payment
ADD package.json /var/www/payment
ADD yarn.lock /var/www/payment
RUN yarn install

ADD . /var/www/payment

CMD ["npm", "run", "start:dev"]
