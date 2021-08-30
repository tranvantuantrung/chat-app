import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { roomApi } from '../apis/';

import { convertMessages } from '../helper/helper';

import { socket } from '../pages/Chat/Chat';

import roomSocket from '../socket/room.socket';

export const RoomContext = React.createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const fetchRoomsApi = async () => {
      try {
        const { rooms } = await roomApi.get();

        roomSocket.connectRooms(socket, rooms);

        setRooms(rooms);
      } catch (error) {
        throw error;
      }
    };

    fetchRoomsApi();
  }, []);

  const selectRoom = (roomId) => {
    const selectRoomApi = async () => {
      try {
        const { room } = await roomApi.getRoom(roomId);
        const { members } = await roomApi.getMembers(roomId);

        const convertedMessages = convertMessages(room.messages, members);

        setMessages(convertedMessages);
        setMembers(members);
        setSelectedRoom(room);
      } catch (error) {
        history.push('/page-not-found');
      }
    };

    selectRoomApi();
  };

  const createRoom = (data, setLoading, setError, resetForm, handleCancel) => {
    const createRoomApi = async () => {
      setLoading(true);

      try {
        const { createdRoom } = await roomApi.create(data);
        const { rooms } = await roomApi.get();

        setRooms(rooms);
        history.push(`/chat/${createdRoom._id}`);

        roomSocket.createRoom(socket, createdRoom);

        setLoading(false);
        resetForm();
        handleCancel();
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    createRoomApi();
  };

  const joinRoom = (data, setLoading, setError, resetForm, handleCancel) => {
    const joinRoomApi = async () => {
      setLoading(true);

      try {
        const { updatedRoom } = await roomApi.join(data);
        const { rooms } = await roomApi.get();

        setRooms(rooms);

        roomSocket.joinRoom(socket, updatedRoom);

        setLoading(false);
        resetForm();
        handleCancel();
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    joinRoomApi();
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
        selectedRoom,
        members,
        messages,
        setRooms,
        setSelectedRoom,
        setMembers,
        setMessages,
        selectRoom,
        createRoom,
        joinRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
