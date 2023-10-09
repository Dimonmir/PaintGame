import { useAppSelector, notificationConfig } from '@shared/index';
import { useEffect } from 'react';
import { message as messageAntd, notification } from 'antd';

import { selectorMessage } from '../model/messageSelectors';
import {
  StopOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const Message = () => {
  const allMessage = useAppSelector(selectorMessage);

  const [messageApi, contextHolderMessage] = messageAntd.useMessage();
  const [notificationApi, contextHolderNotification] = notification.useNotification();

  useEffect(() => {
    console.log(allMessage);
    allMessage.message?.forEach(({ level, type, message }) => {
      if (level === 'medium') {
        if (type === 'error') {
          messageApi.error(message);
        } else if (type === 'warning') {
          messageApi.warning(message);
        } else if (type === 'info') {
          messageApi.info(message);
        } else if (type === 'success') {
          messageApi.success(message);
        }
      }
      if (level === 'low') {
        if (type === 'error') {
          notificationApi.error(notificationConfig({ message, icon: <StopOutlined />, type }));
        } else if (type === 'warning') {
          notificationApi.warning(notificationConfig({ message, icon: <WarningOutlined />, type }));
        } else if (type === 'info') {
          notificationApi.info(notificationConfig({ message, icon: <InfoCircleOutlined />, type }));
        } else if (type === 'success') {
          notificationApi.success(
            notificationConfig({ message, icon: <CheckCircleOutlined />, type })
          );
        }
      }
    });
  }, [allMessage]);

  return (
    <>
      {contextHolderMessage}
      {contextHolderNotification}
    </>
  );
};

export default Message;
