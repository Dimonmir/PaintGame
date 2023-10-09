import Header from '@widgets/header/header';
import { GameForm } from './Game.styles';
import Canvas from '@features/canvas';
import Chat from '@features/chat';
import { useEffect, useState } from 'react';
import { IPlayer, hasTargetValue, randString, useAppDispatch, useAppSelector } from '@shared/index';
import { Button } from 'antd';
import { setAvatar, setHost, setRoomId } from '@entities/session/sessionSlice';
import { get, child, ref, getDatabase, DataSnapshot, push } from 'firebase/database';
import { database } from '@main';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { addMessage } from '@features/Message';

const Game = () => {
  const profile = useAppSelector((store) => store.user);
  const host = useAppSelector((store) => store.session.host);
  const roomId = useAppSelector((store) => store.session.roomId);
  const avatar = useAppSelector((store) => store.session.avatar);
  const auth = getAuth();

  const [isReady, setIsReady] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  dispatch(addMessage([{ level: 'low', type: 'success', message: 'Подписание прошло успешно' }]));

  const { game } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let flag: boolean = true;
    get(child(ref(getDatabase()), `game`)).then((snapshot: DataSnapshot) => {
      setIsReady(true);
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const [key, value] of Object.entries(data)) {
          if (value && typeof value === 'object' && 'players' in value) {
            if (value.players && typeof value.players === 'object') {
              const arrayOfPlayers = Object.values(value.players);
              for (const [keyPlayers, valuePlayers] of Object.entries(value.players)) {
                const player: IPlayer = valuePlayers;
                if (Object.keys(value.players).length < 4) {
                  if (!hasTargetValue(arrayOfPlayers, profile.uid)) {
                    dispatch(setRoomId(key));
                    dispatch(setHost(player.host));
                    dispatch(setAvatar(player.avatar));
                  } else {
                    const avatarRand = '/avatar' + Math.floor(Math.random() * 9) + '.png';
                    dispatch(setRoomId(key));
                    dispatch(setHost(false));
                    dispatch(setAvatar(avatarRand));
                    push(ref(database, 'game/' + key + '/players'), {
                      user: profile.name,
                      uid: profile.uid,
                      host: false,
                      avatar: avatarRand,
                    });
                    flag = false;
                    return;
                  }
                  flag = false;
                }
                navigate('/game/' + key);
              }
              return;
            }
          }
        }
      }
      if (flag) {
        const avatarRand = '/avatar' + Math.floor(Math.random() * 9) + '.png';
        dispatch(setHost(true));
        dispatch(setRoomId(game as string));
        dispatch(setAvatar(avatarRand));
        push(ref(database, 'game/' + game + '/players'), {
          user: profile.name,
          uid: profile.uid,
          host: true,
          avatar: avatarRand,
        });
      }
    });
  }, []);
  return (
    <>
      <Header />
      <GameForm>
        <div className="gameConteiner">
          <div className="title">
            <Link to={'/menu'}>Выйти</Link>
            <div>{host ? 'Вы хост' : 'Вы участник'}</div>
            <div>0:00</div>
          </div>
          <Canvas />
        </div>
        {isReady && <Chat />}
      </GameForm>
    </>
  );
};

export default Game;
