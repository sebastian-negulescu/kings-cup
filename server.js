const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(5000, function() {
    console.log('Starting server on port 5000');
});

let players = {
    leader: null
};
const emitPlayers = () => { // send out players to all devices
    io.sockets.emit('players', players);
}

io.on('connection', socket => {
    socket.on('new player', () => {
        players[socket.id] = {name: socket.id};
        if (!players.leader) {
            players.leader = socket.id;
        }
        emitPlayers();
    });

    socket.on('change name', data => {
        players[socket.id] = data.name;
        emitPlayers();
    });

    socket.on('start game', () => {
        if (players.leader === socket.id) {
            // call game start
        } else {
            socket.emit('start game error', {
                reason: 'only the session leader can start the game'
            });
        }
    });

    socket.on('disconnect', reason => {
        if (players.leader === socket.id) {
            players.leader = null;
        }
        delete players[socket.id];
    });
});
