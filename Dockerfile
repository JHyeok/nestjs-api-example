FROM node:20.18.0-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# devDependencies 제거
RUN npm prune --production

FROM node:20.18.0-alpine AS deploy

ENV NODE_ENV production

RUN apk add --no-cache tzdata

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./

EXPOSE 3000

CMD ["node", "dist/src/main"]
