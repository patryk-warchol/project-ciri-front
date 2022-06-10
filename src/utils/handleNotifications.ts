import { notification } from 'antd';

type FlashType = {
  type: 'open' | 'success' | 'warning' | 'error';
  description: string;
};

const showNotification = (flash: FlashType) => {
  notification[flash.type || 'open']({
    message: flash.message,
    description: null,
    placement: 'bottomRight',
    duration: 3,
  });
};

const handleNotifications = (response) => {
  const notifications = response;
  notifications.forEach((notification) => {
    showNotification(notification);
  });
  return response;
};

export default handleNotifications;
