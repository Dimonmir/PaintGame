import { Avatar, Button, Empty, Input, InputProps } from 'antd';
import { SChat } from './s-chat';
import { MessageOutlined } from '@ant-design/icons';
import Message from '@entities/message/Message';
import {
  IMessage,
  IPlayer,
  hasTargetValue,
  isIMessage,
  isIPlayer,
  randString,
  useAppSelector,
} from '@shared/index';
import { useEffect, useRef, useState } from 'react';
import { app, database } from '@main';
import { DataSnapshot, getDatabase, onValue, push, ref, set } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const Chat = () => {
  const auth = getAuth(app);
  const profile = useAppSelector((store) => store.user);
  const roomId = useAppSelector((store) => store.session.roomId);
  const avatar = useAppSelector((store) => store.session.avatar);

  const [playersRoom, setPlayersRoom] = useState<IPlayer[]>([]);
  const [messageChat, setMessageChat] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>('');

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const startPlayersRef = ref(getDatabase(), 'game/' + roomId + '/players');
    const startMessageRef = ref(getDatabase(), 'game/' + roomId + '/chat');

    onValue(startPlayersRef, (snapshot: DataSnapshot) => {
      const valueSnap = snapshot.val();
      const tempPlayers: IPlayer[] = [];
      for (const [keyPlayers, valuePlayers] of Object.entries(valueSnap)) {
        if (isIPlayer(valuePlayers)) {
          !hasTargetValue(playersRoom, valuePlayers.uid) && tempPlayers.push(valuePlayers);
        }
      }
      tempPlayers.length !== playersRoom.length && setPlayersRoom(tempPlayers);
    });

    onValue(startMessageRef, (snapshot: DataSnapshot) => {
      const valueSnap = snapshot.val();
      const tempMessage: IMessage[] = [];
      for (const [keyMessage, valueMessage] of Object.entries(valueSnap)) {
        if (isIMessage(valueMessage)) {
          !hasTargetValue(messageChat, valueMessage.messageId) && tempMessage.push(valueMessage);
        }
      }
      tempMessage.length !== messageChat.length && setMessageChat(tempMessage);
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messageChat]);

  useEffect(() => {
    console.log(playersRoom);
  }, [playersRoom]);

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
          push(ref(database, 'game/' + roomId + '/chat'), {
            message: message,
            author: profile.name,
            uid: profile.uid,
            avatar: avatar,
            messageId: randString(),
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
        {playersRoom.length &&
          playersRoom.map((player) => (
            <>
              <div>{player.user}</div>
              <Avatar size={40} icon={<img src={player.avatar} alt="avatar" />} />
            </>
          ))}
      </div>
      <div className="chatContainer">
        <div className="chatDialog" ref={chatContainerRef}>
          {messageChat.length ? (
            messageChat.map((item) => (
              <Message
                author={item.author}
                avatar={item.avatar}
                messageId={item.messageId}
                message={item.message}
                uid={item.uid}
                key={item.messageId}
              />
            ))
          ) : (
            <Empty className="empty" description="Сообщений пока что нет" />
          )}
        </div>
        <div className="chatSendMessage">
          <Input
            onPressEnter={handleButton}
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
