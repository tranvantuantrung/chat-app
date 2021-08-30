import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input, Upload } from 'antd';

import { messageApi } from '../../apis';

import { RoomContext } from '../../contexts/RoomContext';

import { convertMessages } from '../../helper/helper';

import { AddPhotoIcon } from '../../img';

import './MessageInput.scss';

const { TextArea } = Input;

const MessageInput = () => {
  const [value, setValue] = useState('');
  const [fileList, setFileList] = useState([]);

  const { roomId } = useParams();

  const inputRef = useRef();

  const { setMessages } = useContext(RoomContext);

  useEffect(() => {
    inputRef.current.focus();
  }, [roomId]);

  const onChange = ({ target: { value } }) => {
    setValue(value);
  };

  const onSubmit = () => {
    const content = value.trimLeft().trimRight();

    if (content) {
      const sendMessage = async () => {
        const data = { roomId, content };

        const { members, messages } = await messageApi.sendMessage(data);

        const convertedMessages = convertMessages(messages, members);

        setMessages(convertedMessages);
      };

      sendMessage();

      setValue('');
    }
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();

      onSubmit();
    }
  };

  const onChangeFileUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onSubmitFileUpdate = (fileUrl) => {
    const data = new FormData();

    data.append('roomId', roomId);
    data.append('content', fileUrl);
    data.append('type', 'image');

    const sendMessage = async () => {
      const { members, messages } = await messageApi.sendMessage(data);

      const convertedMessages = convertMessages(messages, members);

      setMessages(convertedMessages);
    };

    sendMessage();

    setFileList([]);
  };

  const onUpload = ({ file, onSuccess }) => {
    const reader = new window.FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onSuccess('done', file);
      onSubmitFileUpdate(reader.result);
    };
  };

  return (
    <div className='message-input'>
      <TextArea
        ref={inputRef}
        value={value}
        placeholder='Message...'
        autoSize={{ minRows: 1, maxRows: 2 }}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <Upload
        name='photo'
        listType='picture-card'
        fileList={fileList}
        maxCount={1}
        customRequest={onUpload}
        onChange={onChangeFileUpload}
      >
        <AddPhotoIcon width='100%' height='100%' margin='0px' />
      </Upload>
      <Button type='link' onClick={onSubmit}>
        Send
      </Button>
    </div>
  );
};

export default MessageInput;
