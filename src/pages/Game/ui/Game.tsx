import Header from '@widgets/header/header';
import { GameForm } from './Game.styles';
import Canvas from '@features/canvas';
import Chat from '@features/chat';
import { useEffect } from 'react';
import { IPlayer, hasTargetValue, randString, useAppDispatch, useAppSelector } from '@shared/index';
import { Button } from 'antd';
import { setAvatar, setHost, setRoomId } from '@entities/session/sessionSlice';
import { get, child, ref, getDatabase, DataSnapshot, push } from 'firebase/database';
import { database } from '@main';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const profile = useAppSelector((store) => store.user);
  const host = useAppSelector((store) => store.session.host);
  const roomId = useAppSelector((store) => store.session.roomId);
  const avatar = useAppSelector((store) => store.session.avatar);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  function navigateMenu() {
    navigate('/game');
  }

  useEffect(() => {
    let flag: boolean = true;
    get(child(ref(getDatabase()), `game`))
      .then((snapshot: DataSnapshot) => {
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
                      push(ref(database, 'game/' + key + '/players'), {
                        user: profile.name,
                        uid: profile.uid,
                        host: false,
                        avatar: avatarRand,
                      }).then(() => {
                        dispatch(setRoomId(key));
                        dispatch(setHost(false));
                        dispatch(setAvatar(avatarRand));
                      });
                    }
                    flag = false;
                  }
                }
                return;
              }
            }
          }
        }
        if (flag) {
          const roomRand = randString();
          const avatarRand = '/avatar' + Math.floor(Math.random() * 9) + '.png';
          dispatch(setHost(true));
          dispatch(setRoomId(roomRand));
          dispatch(setAvatar(avatarRand));
          push(ref(database, 'game/' + roomRand + '/players'), {
            user: profile.name,
            uid: profile.uid,
            host: true,
            avatar: avatarRand,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <Header />
      <GameForm>
        <div className="gameConteiner">
          <div className="title">
            <Button className="back" type="text" danger onClick={navigateMenu}>
              Выйти
            </Button>
            <div>{host ? 'Вы хост' : 'Вы участник'}</div>
            <div>0:00</div>
          </div>
          <Canvas />
        </div>
        <Chat />
      </GameForm>
    </>
  );
};

export default Game;
