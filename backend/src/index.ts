import express from 'express'
import { WebSocketServer } from 'ws'
import SignalServer from './managers/SignalServer';

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


    try {
        new SignalServer(socket);
    } catch (err) {
        console.log(err);
    }

    socket.on("close", () => {
        console.log('connection closed')
    });
})
