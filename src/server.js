const express = require('express');
const app = express();
const server = require('http').Server(app);
const socket = require('socket.io');

server.listen(8080, ()=>{console.log("server listing at", 8080)});
const io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    const pickCard = (data) =>{
        socket.broadcast.emit('Enemie\'s Card', data);
        console.log("Enemie choose card",data)
    }
    const StartDrawing = (data) => {
        socket.broadcast.emit('Start Drawing', data);
        console.log("start drawing", data);
    }
    const Drawing = (data) => {
        socket.broadcast.emit('Drawing', data);
        console.log("drawing", data);
    }
    const StopDrawing = (data) => {
        socket.broadcast.emit('Stop Drawing', data);
        console.log("stop drawing", data);
    }
    console.log('new connection ' + socket.id);
//    socket.on('Start Drawing', StartDrawing);
//    socket.on('Drawing', Drawing);
//    socket.on('Stop Drawing', StopDrawing);
    socket.on("pickCard",pickCard)
}
