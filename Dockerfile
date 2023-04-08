FROM node:19-alpine as builder

WORKDIR /app
COPY app/package*.json .
RUN npm install --legacy-peer-deps

COPY app/ .
RUN npm run build

FROM node:15.14-alpine3.10

WORKDIR /server
COPY server/package*.json .
RUN npm install --legacy-peer-deps

COPY --from=builder /app/build /app/build
COPY server .

EXPOSE 3000
USER node
CMD npm start