FROM node:20.12.2-alpine AS builder

WORKDIR /usr/src/app
COPY . .

RUN yarn install && yarn build

FROM node:20.12.2-alpine

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./

RUN apk add --no-cache --update bash

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /
RUN chmod +x /wait-for-it.sh
