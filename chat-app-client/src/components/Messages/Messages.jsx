import React, { useContext } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import { RoomContext } from '../../contexts/RoomContext';

import { Message } from '../index';

import './Messages.scss';

const Messages = () => {
  const { messages } = useContext(RoomContext);

  return (
    <div className='messages'>
      <ScrollToBottom
        className='messages__box'
        followButtonClassName='scroll-to-bottom__btn'
      >
        <div className='messages__wrapper'>
          {messages.map((message) => {
            return (
              <Message
                key={message._id}
                content={message.content}
                author={message.author}
                avatarUrl={message.avatarUrl}
                type={message.type}
                imgUrl={message.imgUrl}
              />
            );
          })}
        </div>
      </ScrollToBottom>
    </div>
  );
};

export default Messages;
