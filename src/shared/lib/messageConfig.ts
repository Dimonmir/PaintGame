import { ArgsProps } from 'antd/es/notification/interface';
import { IMessageItemNotification } from '@shared/model/IMessageNotification';
import { CSSProperties } from 'react';

type IMessageConfigProps = ArgsProps & Pick<IMessageItemNotification, 'type'>;

const notificationConfig = ({ type, ...props }: IMessageConfigProps): ArgsProps => {
  let notificationStyle: CSSProperties = {
    color: 'white',
    marginLeft: 0,
    width: 'max-content',
  };

  if (type === 'info') {
    notificationStyle = { ...notificationStyle, backgroundColor: '#797979' };
  }
  if (type === 'error') {
    notificationStyle = { ...notificationStyle, backgroundColor: '#B22222' };
  }
  if (type === 'success') {
    notificationStyle = { ...notificationStyle, backgroundColor: '#63A388' };
  }
  if (type === 'warning') {
    notificationStyle = { ...notificationStyle, backgroundColor: '#FF9A19' };
  }

  return {
    style: notificationStyle,
    placement: 'bottomLeft',
    closeIcon: null,
    ...props,
  };
};

export default notificationConfig;
