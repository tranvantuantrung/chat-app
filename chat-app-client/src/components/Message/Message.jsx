import React, { useContext } from 'react';
import { Avatar, Image } from 'antd';

import { UserContext } from '../../contexts/UserContext';

import './Message.scss';

const Message = ({ content, author, avatarUrl, type, imgUrl }) => {
  const { user } = useContext(UserContext);

  const system = 'system';

  if (author === system) {
    return <div className='message system'>{content}</div>;
  }

  if (user.username === author) {
    if (type === 'image') {
      return (
        <div className='message author'>
          <div className='message__content'>
            <div className='message__content-wrapper'>
              <div className='message__image'>
                <Image width={200} src={imgUrl} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='message author'>
          <div className='message__content'>
            <div className='message__content-wrapper'>
              <div className='message__text'>{content}</div>
            </div>
          </div>
        </div>
      );
    }
  }

  if (type === 'image') {
    return (
      <div className='message'>
        <Avatar size={28} src={avatarUrl} />
        <div className='message__content'>
          <div className='message__sender-name'>{author}</div>
          <div className='message__content-wrapper'>
            <div className='message__image'>
              <Image width={200} src={imgUrl} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='message'>
        <Avatar size={28} src={avatarUrl} />
        <div className='message__content'>
          <div className='message__sender-name'>{author}</div>
          <div className='message__content-wrapper'>
            <div className='message__text'>{content}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default Message;
