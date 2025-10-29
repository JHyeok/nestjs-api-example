FROM node:22.21.1-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# devDependencies 제거
RUN npm prune --production

FROM node:22.21.1-alpine AS deploy

RUN apk add --no-cache tzdata curl

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./

EXPOSE 3000

CMD ["node", "dist/src/main"]
