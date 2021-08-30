import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Members } from '..';

import { RoomContext } from '../../contexts/RoomContext';

import { InfoIcon } from '../../img/index';

import './ChatRoomDetail.scss';

const ChatRoomDetail = () => {
  const { roomId } = useParams();
  const { selectedRoom, selectRoom } = useContext(RoomContext);

  useEffect(() => {
    selectRoom(roomId);
  }, [roomId]);

  return (
    <div className='chat-room-detail'>
      <div className='chat-room-detail__header'>
        <div className='chat-room-detail__title'>Details</div>
        <Link
          to={`/chat/${selectedRoom._id}`}
          className='chat-room-detail__info-btn'
        >
          <InfoIcon width='24' height='24' margin='0px' active={true} />
        </Link>
      </div>
      <div className='chat-room-detail__main'>
        <Members />
      </div>
    </div>
  );
};

export default ChatRoomDetail;
