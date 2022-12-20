FROM node:19.3-alpine as builder
RUN apk update
COPY ./package.json ./
RUN npm install

FROM node:19.3-alpine
COPY . .
COPY --from=builder node_modules ./node_modules
RUN npm run compile-api
CMD . ./entrypoint.sh
