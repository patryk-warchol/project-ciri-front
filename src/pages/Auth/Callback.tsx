import React from 'react';
import { Redirect } from 'umi';
type CallbackProps = {
  isAuthenticated: boolean;
};
const Callback: React.FC<CallbackProps> = (props) => {
  return <Redirect to="/" />;
};
export default Callback;
