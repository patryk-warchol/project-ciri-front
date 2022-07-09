// @ts-nocheck
// import { history, useModel, useAccess } from 'umi';
import { history, useModel } from 'umi';
const logout = () => {
  history.push('/sign-in');
  localStorage.removeItem('auth');
};
type StateProps = {
  isAuthenticated: boolean;
  user: any;
};
const useUmiAuth = () => {
  const { initialState } = useModel('@@initialState');
  const { isAuthenticated, user } = initialState as StateProps;
  // const access = useAccess();
  const redirectToLogin = () => history.push('/sign-in');
  return {
    isAuthenticated,
    user,
    // access,
    redirectToLogin,
    logout,
  };
};
export default useUmiAuth;
