import React, { useContext, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Avatar } from 'antd';

import { MessageInput, Messages } from '..';

import { RoomContext } from '../../contexts/RoomContext';

import { BackIcon, InfoIcon } from '../../img/index';

import './ChatRoom.scss';

const ChatRoom = () => {
  const { roomId } = useParams();
  const { selectedRoom, members, selectRoom, setSelectedRoom } =
    useContext(RoomContext);

  const history = useHistory();

  useEffect(() => {
    selectRoom(roomId);
  }, [roomId]);

  const onClick = () => {
    setSelectedRoom({});
    history.push('/');
  };

  return (
    <div className='chat-room'>
      <div className='chat-room__header'>
        <div className='chat-room__back-btn' onClick={onClick}>
          <BackIcon width='24' height='24' margin='0px' />
        </div>
        <Avatar.Group maxCount={2}>
          {members.map((member) => {
            return <Avatar key={member._id} src={member.avatarUrl} size={28} />;
          })}
        </Avatar.Group>

        <div className='chat-room__name'>{selectedRoom.name}</div>
        <Link
          to={`/chat/${selectedRoom._id}/details`}
          className='chat-room__info-btn'
        >
          <InfoIcon width='24' height='24' margin='0px' />
        </Link>
      </div>
      <div className='chat-room__main'>
        <Messages />
      </div>
      <div className='chat-room__footer'>
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatRoom;
