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
  useAppDispatch,
  useAppSelector,
} from '@shared/index';
import { useEffect, useRef, useState } from 'react';
import { app, database } from '@main';
import {
  DataSnapshot,
  Unsubscribe,
  getDatabase,
  off,
  onValue,
  push,
  ref,
  remove,
  set,
} from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addMessage } from '@features/Message';

export const Chat = () => {
  const auth = getAuth(app);
  const profile = useAppSelector((store) => store.user);
  const roomId = useAppSelector((store) => store.session.roomId);
  const avatar = useAppSelector((store) => store.session.avatar);
  const host = useAppSelector((store) => store.session.host);

  const playersIdBaseRef = useRef('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

    const listenerPlayer: Unsubscribe = onValue(startPlayersRef, (snapshot: DataSnapshot) => {
      const valueSnap = snapshot.val();
      const tempPlayers: IPlayer[] = [];
      if (valueSnap != null) {
        for (const [keyPlayers, valuePlayers] of Object.entries(valueSnap)) {
          if (isIPlayer(valuePlayers)) {
            tempPlayers.push(valuePlayers);
            if (!hasTargetValue(tempPlayers, profile.uid)) {
              playersIdBaseRef.current = keyPlayers;
            }
          }
        }
        tempPlayers.length !== playersRoom.length && setPlayersRoom(tempPlayers);
      } else {
        dispatch(
          addMessage([
            {
              level: 'low',
              type: 'error',
              message: 'Хост комнаты вышел из комнаты',
            },
          ])
        );
      }
    });

    const listenerMessage: Unsubscribe = onValue(startMessageRef, (snapshot: DataSnapshot) => {
      const valueSnap = snapshot.val();
      const tempMessage: IMessage[] = [];
      if (valueSnap) {
        for (const [keyMessage, valueMessage] of Object.entries(valueSnap)) {
          if (isIMessage(valueMessage)) {
            !hasTargetValue(messageChat, valueMessage.messageId) && tempMessage.push(valueMessage);
          }
        }
        tempMessage.length !== messageChat.length && setMessageChat(tempMessage);
      }
    });

    return () => {
      if (host) {
        remove(ref(database, 'game/' + roomId + '/players/' + playersIdBaseRef.current)).then(
          () => {
            remove(ref(database, 'game/' + roomId)).then(() => {
              listenerPlayer();
              listenerMessage();
            });
          }
        );
      } else {
        remove(ref(database, 'game/' + roomId + '/players/' + playersIdBaseRef.current)).then(
          () => {
            listenerPlayer();
            listenerMessage();
          }
        );
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messageChat]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleButton = () => {
    if (!message) {
      return;
    }
    push(ref(database, 'game/' + roomId + '/chat'), {
      message: message,
      author: profile.name,
      uid: profile.uid,
      avatar: avatar,
      messageId: randString(),
    }).then(() => {
      setMessage('');
    });
  };

  return (
    <SChat>
      <div className="headerContainer">
        {playersRoom.length &&
          playersRoom.map((player) => (
            <div key={player.uid}>
              <div>{player.user}</div>
              <Avatar size={40} icon={<img src={player.avatar} alt="avatar" />} />
            </div>
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
