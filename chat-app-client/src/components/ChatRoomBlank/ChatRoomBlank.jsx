import React, { useState } from 'react';
import { Button } from 'antd';

import { SendIcon } from '../../img/index';

import { CreateRoomModal } from '../index';

import './ChatRoomBlank.scss';

const ChatRoomBlank = () => {
  const [isShowCreateRoomModal, setIsShowCreateRoomModal] = useState(false);

  return (
    <div className='chat-room-blank'>
      <SendIcon width='80' height='80' margin='0px' />
      <div className='chat-room-blank__title'>Your Messages</div>
      <div className='chat-room-blank__text'>
        Send private photos and messages to friends.
      </div>

      <Button type='primary' onClick={() => setIsShowCreateRoomModal(true)}>
        Create Room
      </Button>

      <CreateRoomModal
        isModalVisible={isShowCreateRoomModal}
        setIsModalVisible={setIsShowCreateRoomModal}
      />
    </div>
  );
};

export default ChatRoomBlank;
