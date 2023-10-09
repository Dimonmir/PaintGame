import {
  IMessageItemNotification,
  useAppDispatch,
  useAppSelector,
  notificationConfig,
} from '@shared/index';
import { useEffect, useState } from 'react';
import { message as messageAntd, notification } from 'antd';

import { SContainer, SContainerItem } from './message.styles';
import { selectorMessage } from '../model/messageSelectors';
import {
  StopOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const Message = () => {
  const dispatch = useAppDispatch();

  const allMessage = useAppSelector(selectorMessage);

  const [levelMessage, setLevelMessage] = useState<IMessageItemNotification[]>([]);

  const [messageApi, contextHolderMessage] = messageAntd.useMessage();
  const [notificationApi, contextHolderNotification] = notification.useNotification();

  useEffect(() => {
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
      {levelMessage.length ? (
        <SContainer>
          {levelMessage?.map(({ message }) => {
            return (
              <SContainerItem className="warning" key={message}>
                <WarningOutlined />
                <p>{message}</p>
              </SContainerItem>
            );
          })}
        </SContainer>
      ) : null}
    </>
  );
};

export default Message;
