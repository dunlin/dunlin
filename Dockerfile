FROM node:5.5

ENV NODE_ENV="production"

COPY . /dunlin

WORKDIR /dunlin

RUN npm install && npm run build

CMD node index

EXPOSE 8001