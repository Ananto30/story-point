SHELL := /bin/bash

init:
	cd ./app && npm install
	cd ./server && npm install

start:
	cd ./app && npm run build
	cd ./server && npm start

test:
	cd ./app && npm test
	cd ./server && npm test

docker-build:
	docker build -t story-point .

docker-run:
	docker run -p 3000:3000 story-point