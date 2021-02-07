const socket = io();

socket.emit('new player');

socket.on('players', data => {
    console.log(data);
});

socket.on('start game error', data => {
    console.log(data.reason);
});

const sendName = () => {
    const name = document.querySelector('input').value;
    socket.emit('change name', {name: name});
};