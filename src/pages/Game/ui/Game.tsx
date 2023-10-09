import Header from '@widgets/header/header';
import { GameForm } from './Game.styles';
import Canvas from '@features/canvas';
import Chat from '@features/chat';
import { useEffect, useState } from 'react';
import { IPlayer, hasTargetValue, useAppDispatch, useAppSelector } from '@shared/index';
import { setSession } from '@entities/session';
import { get, child, ref, getDatabase, DataSnapshot, push } from 'firebase/database';
import { database } from '@main';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const Game = () => {
  const auth = getAuth();
  const profile = useAppSelector((store) => store.user);
  const host = useAppSelector((store) => store.session.host);

  const [isReady, setIsReady] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { game } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let newUser: boolean = true;
    const avatarRand = '/avatar' + Math.floor(Math.random() * 9) + '.png';
    get(child(ref(getDatabase()), `game`)).then((snapshot: DataSnapshot) => {
      setIsReady(true);
      const data = snapshot.val();
      if (data) {
        for (const [key, value] of Object.entries(data)) {
          if (
            value &&
            typeof value === 'object' &&
            'players' in value &&
            value.players &&
            typeof value.players === 'object'
          ) {
            for (const valuePlayers of Object.values(value.players)) {
              const player: IPlayer = valuePlayers;
              if (Object.keys(value.players).length > 4) {
                return;
              }
              if (hasTargetValue(Object.values(value.players), profile.uid)) {
                dispatch(
                  setSession({
                    avatar: player.avatar,
                    host: player.host,
                    roomId: key,
                    playerId: null,
                  })
                );
              } else {
                dispatch(
                  setSession({
                    avatar: avatarRand,
                    host: false,
                    roomId: key,
                    playerId: null,
                  })
                );
                push(ref(database, 'game/' + key + '/players'), {
                  user: profile.name,
                  uid: profile.uid,
                  host: false,
                  avatar: avatarRand,
                });
              }
              newUser = false;
              navigate('/game/' + key);
            }
            return;
          }
        }
      }
      if (newUser) {
        dispatch(
          setSession({
            avatar: avatarRand,
            host: true,
            roomId: game as string,
            playerId: null,
          })
        );
        push(ref(database, 'game/' + game + '/players'), {
          user: profile.name,
          uid: profile.uid,
          host: true,
          avatar: avatarRand,
        }).then((data) => {
          console.log(data);
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
