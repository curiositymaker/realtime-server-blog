const express = require('express');
const http = require('http');
const { Server } = require('socket.io')
const port = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});


io.on('connection', (socket) => {
    console.log('A user is connected: ', socket.id);

    socket.on('messageFromUnity', (message) => {
        console.log('Received message from Unity:', message);
        socket.emit('messageFromServer', 'This is message from server');
    });

})



server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});