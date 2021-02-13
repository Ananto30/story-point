# Story Pointing

Oh! The sweating part of agile. This app just allows you to not get biased by others saying this worth less than 1 point. Just vote your point and see the result after the timer.

```bash
git clone 
cd story-point
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

### Run the app along with server

### App
Install the dependencies...
```bash
cd app
npm install
```
Build the app...
```bash
npm run build
```

### Server
Install the dependencies...
```bash
cd server
npm install
```
Start the server...
```bash
npm start
```


## Development tricks

The app can be run with - 
```bash
cd app
npm run dev
```
And the server can be run and serve the index.html file
```bash
cd server
npm start
```
The rollup will build the js file in realtime and our server can serve that with realtime changes.

## Docker
```bash
docker build -t story-point .
docker run --name story-point -p 3000:3000 story-point
```