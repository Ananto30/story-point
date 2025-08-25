SHELL := /bin/bash

init:
	cd ./app && pnpm install
	cd ./server && pnpm install

start:
	cd ./app && pnpm build
	cd ./server && pnpm start

test:
	cd ./app && npx playwright install && pnpm test
	cd ./server && pnpm test

docker-build:
	docker build -t story-point .

docker-run:
	docker run -p 3000:3000 story-point