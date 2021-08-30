const listenerSocket = {
  connectRooms: (socket) => {
    const event = 'connectRooms';

    return socket.on(event, (rooms) => {
      for (const room of rooms) {
        socket.join(room._id);
      }
    });
  },

  createRoom: (socket) => {
    const event = 'createRoom';

    return socket.on(event, (room) => {
      socket.join(room._id);
    });
  },

  joinRoom: (socket) => {
    const event = 'joinRoom';
    const severEvent = 'server-emit-join-room--socket';

    return socket.on(event, (room) => {
      socket.join(room._id);
      socket.emit(severEvent, { roomId: room._id });
    });
  },
};

module.exports = listenerSocket;
