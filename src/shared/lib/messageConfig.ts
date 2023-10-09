import { ArgsProps } from 'antd/es/notification/interface';
import { IMessageItemNotification } from '@shared/model/IMessageNotification';
import { CSSProperties } from 'react';
import { mainTheme } from '@app/ui/theme';

type IMessageConfigProps = ArgsProps & Pick<IMessageItemNotification, 'type'>;

const notificationConfig = ({ type, ...props }: IMessageConfigProps): ArgsProps => {
  let notificationStyle: CSSProperties = {
    marginLeft: 0,
    width: 'max-content',
  };

  if (type === 'info') {
    notificationStyle = { ...notificationStyle, backgroundColor:  '#ce7e00', color: 'white'};
  }
  if (type === 'error') {
    notificationStyle = { ...notificationStyle, backgroundColor: '#989898', color: 'white' };
  }
  if (type === 'success') {
    notificationStyle = { ...notificationStyle, backgroundColor: '#F6ECE1', color: 'black' };
  }
  if (type === 'warning') {
    notificationStyle = { ...notificationStyle, backgroundColor: '#DC9754',color: 'white' };
  }

  return {
    style: notificationStyle,
    placement: 'bottomLeft',
    closeIcon: null,
    ...props,
  };
};

export default notificationConfig;
