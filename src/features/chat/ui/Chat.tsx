import { Avatar, Button, Empty, Input, InputProps } from 'antd';
import { SChat } from './s-chat';
import { MessageOutlined } from '@ant-design/icons';
import Message from '@entities/message/Message';
import { IMessage, IPlayer, useAppDispatch, useAppSelector } from '@shared/index';
import { ChangeEventHandler, useState } from 'react';
import { app, database } from '@main';
import { push, ref, set } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const MOCKPlayer: IPlayer[] = [
  {
    user: 'Dima',
    avatar: '/avatar0.png',
  },
  {
    user: 'Roma',
    avatar: '/avatar2.png',
  },
  {
    user: 'Masha',
    avatar: '/avatar1.png',
  },
  {
    user: 'Egor',
    avatar: '/avatar3.png',
  },
];

const MOCKMessage: IMessage[] = [
  {
    author: 'Dima',
    avatar: '/avatar0.png',
    message: 'Крокодил',
  },
  {
    author: 'Roma',
    avatar: '/avatar2.png',
    message: 'Макака',
  },
  {
    author: 'Masha',
    avatar: '/avatar1.png',
    message: 'Ромик',
  },
  {
    author: 'Egor',
    avatar: '/avatar3.png',
    message: 'АААААААААААААААААААААААААААААААААААААААААААААААААА',
  },
];

export const Chat = () => {
  const auth = getAuth(app);
  const profile = useAppSelector((store) => store.user);

  const [message, setMessage] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleButton = () => {
    if (!message) {
      return;
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          push(ref(database, 'game/123/chat'), {
            message: message,
            author: profile.name,
            uid: profile.uid,
          }).then(() => {
            setMessage('');
          });
        });
      }
    });
  };

  return (
    <SChat>
      <div className="headerContainer">
        {MOCKPlayer.map((player) => (
          <Avatar size={40} icon={<img src={player.avatar} alt="avatar" />} />
        ))}
      </div>
      <div className="chatContainer">
        <div className="chatDialog">
          {MOCKMessage.length ? (
            MOCKMessage.map((message) => (
              <Message author={message.author} avatar={message.avatar} message={message.message} />
            ))
          ) : (
            <Empty className="empty" description="Сообщений пока что нет" />
          )}
        </div>
        <div className="chatSendMessage">
          <Input
            placeholder="Напиши сообщение"
            value={message}
            onChange={handleInput}
            bordered={false}
            size="small"
          />
          <Button
            onClick={handleButton}
            className="sendMessageBtn"
            type="primary"
            shape="circle"
            icon={<MessageOutlined />}
          />
        </div>
      </div>
    </SChat>
  );
};
