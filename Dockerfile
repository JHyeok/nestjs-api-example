FROM node:20.9.0-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --immutable --immutable-cache --check-cache

COPY . .
RUN yarn build

RUN yarn install --production

FROM node:20.9.0-alpine AS deploy

ENV NODE_ENV production

RUN apk add --no-cache tzdata

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./

EXPOSE 3000

CMD ["node", "dist/src/main"]
