import { FC } from 'react';
import { SMessage } from './s-message';
import { Avatar } from 'antd';
import { IMessage, useAppSelector } from '@shared/index';

export const Message: FC<IMessage> = ({ author, avatar, message, uid }) => {
  const myUid = useAppSelector((state) => state.user.uid);
  return (
    <SMessage $myMessage={myUid === uid}>
      <Avatar size={40} icon={<img src={avatar} alt="avatar" />} />
      <div className="message">
        <div className="messageAutor">{author}</div>
        <div className="messageText">{message}</div>
      </div>
    </SMessage>
  );
};

export default Message;
