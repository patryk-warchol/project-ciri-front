import React, { useEffect } from 'react';
import logo from '@/assets/images/logo.svg';
import googleLogo from './google_btn.png';
import { Row, Col } from 'antd';
import styles from './index.sass';

const config = require(`../../config${
  process.env.NODE_ENV === 'development' ? '.dev' : ''
}`).default;

const redirectToSSO = () => {
  window.location.href = `${config.authUrl}?origin=${config.redirectUri}`;
};
const SignIn = () => {
  useEffect(() => {
    document.querySelector('body')?.classList.add('sign-in');
    return () => {
      document.querySelector('body')?.classList.remove('sign-in');
    };
  });
  return (
    <div className={styles.container}>
      <Row>
        <Col className={styles.signinWrapper} xs={24}>
          <img src={logo} />
          <a onClick={redirectToSSO}>
            <img src={googleLogo} height="46px" />
          </a>
        </Col>
      </Row>
    </div>
  );
};
export default SignIn;
