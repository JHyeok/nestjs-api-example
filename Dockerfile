FROM node:14.15.4-alpine AS builder

COPY . /app
WORKDIR /app

RUN npm install && \
  npm run build

FROM node:14.15.4-alpine

ARG PROJECT_DIR=/usr/src/app

COPY --from=builder /app $PROJECT_DIR

WORKDIR $PROJECT_DIR

RUN apk add --no-cache --update bash

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /
RUN chmod +x /wait-for-it.sh
