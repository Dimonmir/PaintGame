import { FC } from 'react';
import { SMessage } from './s-message';
import { Avatar } from 'antd';
import { IMessage } from '@shared/index';

export const Message: FC<IMessage> = ({ author, avatar, message }) => {
  return (
    <SMessage>
      <Avatar size={40} icon={<img src={avatar} alt="avatar" />} />
      <div className="message">
        <div className="messageAutor">{author}</div>
        <div className="messageText">{message}</div>
      </div>
    </SMessage>
  );
};

export default Message;
