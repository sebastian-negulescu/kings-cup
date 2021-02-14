const socket = io();

socket.emit('new player');

socket.on('players', data => {
    console.log(data);
    let playerNames = '';
    for (const player in data) {
        playerNames += `<li>${data[player].name}</li>`;
    }
    document.querySelector('.players').innerHTML = playerNames;
});

socket.on('start game error', data => {
    console.log(data.reason);
});

socket.on('card', data => {
    document.querySelector('.cards').innerHTML += `<li>${data}</li>`;
});

socket.on('turn', data => {
    document.querySelector('.turn').innerHTML = data;
});

socket.on('clear board', () => {
    document.querySelector('.cards').innerHTML = '';
    document.querySelector('.turn').innerHTML = '';
    document.querySelector('.game-over').innerHTML = '';
});

socket.on('game over', () => {
    document.querySelector('.game-over').innerHTML = 'game over';
});

const sendName = () => {
    const name = document.querySelector('input').value;
    socket.emit('change name', {name: name});
};

const startGame = () => {
    socket.emit('start game');
}

const drawCard = () => {
    socket.emit('draw');
}