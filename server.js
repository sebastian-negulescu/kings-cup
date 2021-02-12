const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const game = require('./game');

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

let players = [];
let leader = null;
const emitPlayers = () => { // send out players to all devices
    io.sockets.emit('players', players);
}

io.on('connection', socket => {
    socket.on('new player', () => {
        players.push({
            id: socket.id, 
            name: socket.id,
        });
        if (!leader) {
            leader = socket.id;
        }
        emitPlayers();
    });

    socket.on('change name', data => {
        for (const player in players) {
            if (players[player].id === socket.id) {
                players[player].name = data.name;
            }
        }
        emitPlayers();
    });

    socket.on('start game', () => {
        if (leader === socket.id) {
            game.init(players);
        } else {
            socket.emit('start game error', {
                reason: 'only the session leader can start the game'
            });
        }
    });

    socket.on('disconnect', reason => {
        if (leader === socket.id) {
            leader = null;
        }
        
        let ind = -1;
        for (let i = 0; i < players.length; ++i) {
            if (players[i].id === socket.id) {
                ind = i;
                break;
            }
        }
        players.splice(ind, 1);
    });
});
