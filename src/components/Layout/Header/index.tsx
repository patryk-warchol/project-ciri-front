import React from 'react';
import logo from '@/assets/images/logo_inverted.svg';
import styles from './index.sass';

const Header = (props) => {
  return (
    <div className="ant-pro-global-header ant-pro-global-header-layout-mix">
      <div className="ant-pro-global-header-logo">
        <img src={logo} />
      </div>
      <div style={{ flex: "1 1 0%" }} />
      <div className={styles.rightMenu}>
        Patryk
      </div>
    </div>
  );
};
export default Header;
