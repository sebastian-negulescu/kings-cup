const socket = io();

socket.emit('new player');

socket.on('players', data => {
    console.log(data);
    let playerNames = '';
    for (const player in data) {
        if (data[player].name) {
            playerNames += `<li>${data[player].name}</li>`;
        }
    }
    document.querySelector('.players').innerHTML = playerNames;
});

socket.on('start game error', data => {
    console.log(data.reason);
});

const sendName = () => {
    const name = document.querySelector('input').value;
    socket.emit('change name', {name: name});
};