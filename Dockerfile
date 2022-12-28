FROM node:16-alpine as builder

WORKDIR /usr/src/app
COPY app/package*.json ./
RUN npm install --legacy-peer-deps
COPY app/public public
COPY app/src src
COPY app/rollup.config.js .
RUN npm run build

FROM node:15.14-alpine3.10

WORKDIR /usr/src/server
COPY --from=builder /usr/src/app/public /usr/src/app/public
COPY server/package*.json ./
RUN npm install --legacy-peer-deps
COPY server .

EXPOSE 3000
USER node
CMD npm start