import React, { useContext } from 'react';
import { Avatar } from 'antd';
import ScrollToBottom from 'react-scroll-to-bottom';

import { RoomContext } from '../../contexts/RoomContext';

import './Members.scss';

const Members = () => {
  const { members } = useContext(RoomContext);

  return (
    <div className='members'>
      <div className='members__title'>Members</div>
      <ScrollToBottom
        className='members__box'
        mode='top'
        followButtonClassName='scroll-to-bottom__btn'
      >
        {members.map((member) => (
          <div className='members__item' key={member._id}>
            <Avatar src={member.avatarUrl} size={36} />
            <div className='members__username'>{member.username}</div>
          </div>
        ))}
      </ScrollToBottom>
    </div>
  );
};

export default Members;
