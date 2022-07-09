import React from 'react';
import { Dropdown, Menu, Space } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';
import useUmiAuth from '@/utils/useUmiAuth';

const RightMenu = () => {
  const { user, access, redirectToLogin, isAuthenticated, logout } =
    useUmiAuth();

  const intl = useIntl();

  const overlay = (
    <Menu>
      <Menu.Item key="logoutLink" onClick={() => logout()}>
        {intl.formatMessage({ id: 'auth.logout' })}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown key="userMenu" overlay={overlay}>
      <div style={{ padding: '0 15px' }}>
        <Space>
          <div style={{ color: '#FFFFFF' }}>{user.email}</div>
          <CaretDownOutlined />
        </Space>
      </div>
    </Dropdown>
  );
};

export default RightMenu;
