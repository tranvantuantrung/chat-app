import React, { useContext, useEffect } from 'react';
import { Redirect, Switch, useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import { Avatar } from 'antd';

import { roomApi } from '../../apis';

import {
  Action,
  ChatRoom,
  ChatRoomBlank,
  ChatRoomDetail,
  RoomList,
} from '../../components';

import { RoomContext } from '../../contexts/RoomContext';
import { UserContext } from '../../contexts/UserContext';

import { convertMessages } from '../../helper/helper';

import PrivateRoute from '../../routes/PrivateRoute';

import './Chat.scss';

export let socket;

const Chat = () => {
  const { user } = useContext(UserContext);

  const { selectedRoom, setRooms, setMessages, setMembers } =
    useContext(RoomContext);

  const history = useHistory();

  useEffect(() => {
    document.title = 'Chat App - Inbox';

    socket = io(process.env.REACT_APP_SOCKET_URI);

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    const event = 'server-emit-join-room--socket';

    socket.on(event, ({ roomId }) => {
      history.push(`/chat/${roomId}`);
    });
  }, []);

  useEffect(() => {
    const event = 'server-emit-join-room--room';

    socket.on(event, ({ members, messages, roomId }) => {
      const fetchRoomsApi = async () => {
        const { rooms } = await roomApi.getRooms(roomId);

        setRooms(rooms);
      };

      fetchRoomsApi();

      if (roomId === selectedRoom._id) {
        const convertedMessages = convertMessages(messages, members);

        setMessages(convertedMessages);
        setMembers(members);
      }
    });
  }, [selectedRoom]);

  useEffect(() => {
    const event = 'server-emit-send-message';

    socket.on(event, ({ members, messages, roomId }) => {
      const fetchRoomsApi = async () => {
        const { rooms } = await roomApi.getRooms(roomId);

        setRooms(rooms);
      };

      fetchRoomsApi();

      if (roomId === selectedRoom._id) {
        const convertedMessages = convertMessages(messages, members);

        setMessages(convertedMessages);
      }
    });
  }, [selectedRoom]);

  const isExpand = history.location.pathname === '/';

  return (
    <div className='chat'>
      <div className='container'>
        <div className='chat-box'>
          <div className={`chat-box__l-bar ${isExpand ? 'expand' : ''}`}>
            <div className='l-header'>
              <div className='user'>
                <Avatar
                  className='user__avatar'
                  size={28}
                  src={user.avatarUrl}
                />
                <div className='user__username'>{user.username}</div>
              </div>
              <Action />
            </div>
            <RoomList />
          </div>
          <div className='chat-box__r-bar'>
            <Switch>
              <PrivateRoute path='/' exact component={ChatRoomBlank} />
              <PrivateRoute path='/chat/:roomId' exact component={ChatRoom} />
              <PrivateRoute
                path='/chat/:roomId/details'
                exact
                component={ChatRoomDetail}
              />
              <Redirect to='/page-not-found' />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
