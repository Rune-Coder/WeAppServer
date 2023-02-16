import socketio from 'socket.io';

const io = socketio(server);

io.on('connection', (socket) => {
    console.log('New connection');
})