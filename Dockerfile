FROM node:0.12

ENV NODE_ENV="production"

ADD . /dunlin

WORKDIR /dunlin

RUN npm install && npm run build

CMD node index

EXPOSE 8001