FROM node:0.12

ENV NODE_ENV="production"

RUN wget https://github.com/dunlin/dunlin/archive/master.tar.gz -O dunlin-master.tar.gz && \
	tar -zxvf dunlin-master.tar.gz && \
	rm dunlin-master.tar.gz

WORKDIR /dunlin-master

RUN npm install

CMD node index

EXPOSE 8080