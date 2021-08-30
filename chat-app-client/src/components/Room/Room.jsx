import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { roomApi } from '../../apis';

import { RoomContext } from '../../contexts/RoomContext';

import { convertMessages, getLastMessage } from '../../helper/helper';

import './Room.scss';

const Room = ({ roomId, roomName, roomMessages }) => {
  const [sender, setSender] = useState('');
  const [lastMessage, setLastMessage] = useState('');

  const { selectedRoom } = useContext(RoomContext);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { members } = await roomApi.getMembers(roomId);

        const convertedMessages = convertMessages(roomMessages, members);
        const lastMessage = getLastMessage(convertedMessages);

        setSender(lastMessage.author);
        setLastMessage(lastMessage.content);
      } catch (error) {
        throw error;
      }
    };

    fetchRoom();
  }, []);

  return (
    <Link
      to={`/chat/${roomId}`}
      className={`room ${roomId === selectedRoom._id ? 'selected' : ''}`}
    >
      <div className='room__name'>{roomName}</div>
      <div className='room__text'>{`${sender}: ${lastMessage}`}</div>
    </Link>
  );
};

export default Room;
