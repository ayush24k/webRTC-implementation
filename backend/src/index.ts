import express from 'express'

const app = express();

app.get('/', (req, res) => {
    res.send("server setup")
})

app.listen(8080);