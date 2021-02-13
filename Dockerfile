FROM node:14.13-alpine3.10 as builder

WORKDIR /usr/src/app
COPY app/package*.json ./
RUN npm install
COPY app/public public
COPY app/src src
COPY app/rollup.config.js .
RUN npm run build

FROM node:14.13-alpine3.10

WORKDIR /usr/src/server
COPY --from=builder /usr/src/app/public /usr/src/app/public
COPY server/package*.json ./
RUN npm install
COPY server .

EXPOSE 3000
USER node
CMD npm start