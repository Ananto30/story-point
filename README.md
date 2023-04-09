# Story Point 🤷

[![Depfu](https://badges.depfu.com/badges/62b7e29359598f2124622fc739433ac9/overview.svg)](https://depfu.com/github/Ananto30/story-point?project_id=34509)
[![docker](https://img.shields.io/docker/image-size/ananto30/story-point?logo=docker)](https://hub.docker.com/r/ananto30/story-point)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/169737f5a3064d2c89939885d767b231)](https://app.codacy.com/gh/Ananto30/story-point/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

**Realtime voting (the story points) app.**

Oh! The sweating part of agile. This app just allows you to not get biased by others saying this worth less than 1 point. Just vote your point and see the result after the timer.

<img src="https://res.cloudinary.com/dvqpo7nkm/image/upload/v1614755104/projects/iwabgt5vv36yasghbbdc.gif">

## Run now 🏃

Just use the docker image. It's available on [Docker Hub](https://hub.docker.com/r/ananto30/story-point).

```bash
docker pull ananto30/story-point
docker run -p 3000:3000 ananto30/story-point
```

## Getting started 🚀

```bash
make init
make start
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

### Manual way

*   Build the app

```bash
cd app
npm install
npm run build
```

*   Run the server

```bash
cd server
npm install
npm start
```

## Docker 🚢

```bash
make docker-build
make docker-run
```
