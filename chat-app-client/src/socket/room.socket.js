const roomSocket = {
  connectRooms: (socket, rooms) => {
    const event = 'connectRooms';
    return socket.emit(event, rooms);
  },

  createRoom: (socket, room) => {
    const event = 'createRoom';
    return socket.emit(event, room);
  },

  joinRoom: (socket, room) => {
    const event = 'joinRoom';
    return socket.emit(event, room);
  },
};

export default roomSocket;
