import express from 'express'
import { WebSocketServer } from 'ws'

const PORT = 8000;

const app = express();

app.get('/', (req, res) => {
    res.send("server setup")
})

const server = app.listen(PORT, () => {
    console.log(`listening to port: ${PORT} \nRunning on: http://localhost:${PORT}`)
})

// ws server setup

const wss = new WebSocketServer({server});

wss.on("connection", (socket) => {
    console.log("Websokcet connection intialised!")
    
    socket.on('error', (err) => {
        console.log("error", err);
    })


    socket.on('message', (data) => {
        const message = data.toString();
        console.log(`data recived: ${message}`)
    })

    socket.send("hello");
})
