import React, { useContext } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import { RoomContext } from '../../contexts/RoomContext';

import { Room } from '../index';

import './RoomList.scss';

const RoomList = () => {
  const { rooms } = useContext(RoomContext);

  return (
    <div className='room-list'>
      <ScrollToBottom
        className='room-list__box'
        mode='top'
        followButtonClassName='scroll-to-bottom__btn'
      >
        {rooms.map((room) => (
          <Room
            key={room._id}
            roomId={room._id}
            roomName={room.name}
            roomMessages={room.messages}
          />
        ))}
      </ScrollToBottom>
    </div>
  );
};

export default RoomList;
