import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';

import {
  CreateIcon,
  JoinIcon,
  LogoutIcon,
  MoreIcon,
  SettingsIcon,
} from '../../img/index';

import { CreateRoomModal, JoinRoomModal, SettingsModal } from '../index';

import './Action.scss';

const Action = () => {
  const [isShowCreateRoomModal, setIsShowCreateRoomModal] = useState(false);
  const [isShowJoinRoomModal, setIsShowJoinRoomModal] = useState(false);
  const [isShowSettingsModal, setIsShowSettingsModal] = useState(false);

  const history = useHistory();

  const logout = () => {
    const storageKey = 'jwtToken';

    localStorage.removeItem(storageKey);
    history.push('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item
        key='create-room'
        onClick={() => setIsShowCreateRoomModal(true)}
      >
        <div className='menu__item-wrapper'>
          <CreateIcon width='16' height='16' margin='0px 12px 0px 0px' />
          <span className='menu-item__text'>Create room</span>
        </div>
      </Menu.Item>
      <Menu.Item key='join-room' onClick={() => setIsShowJoinRoomModal(true)}>
        <div className='menu__item-wrapper'>
          <JoinIcon width='16' height='16' margin='0px 12px 0px 0px' />
          <span className='menu-item__text'>Join room</span>
        </div>
      </Menu.Item>
      <Menu.Item key='settings' onClick={() => setIsShowSettingsModal(true)}>
        <div className='menu__item-wrapper'>
          <SettingsIcon width='16' height='16' margin='0px 12px 0px 0px' />
          <span className='menu-item__text'>Settings</span>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='logout' onClick={logout}>
        <div className='menu__item-wrapper'>
          <LogoutIcon width='16' height='16' margin='0px 12px 0px 0px' />
          <span className='menu-item__text'>Log Out</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='action'>
      <CreateRoomModal
        isModalVisible={isShowCreateRoomModal}
        setIsModalVisible={setIsShowCreateRoomModal}
      />

      <JoinRoomModal
        isModalVisible={isShowJoinRoomModal}
        setIsModalVisible={setIsShowJoinRoomModal}
      />
      <SettingsModal
        isModalVisible={isShowSettingsModal}
        setIsModalVisible={setIsShowSettingsModal}
      />

      <Dropdown
        overlay={menu}
        placement='bottomRight'
        trigger={['click']}
        arrow
      >
        <div>
          <MoreIcon width='16' height='16' margin='0px' />
        </div>
      </Dropdown>
    </div>
  );
};

export default Action;
