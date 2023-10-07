import Header from '@widgets/header/header';
import { GameForm } from './Game.styles';
import Canvas from '@features/canvas';
import Chat from '@features/chat';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/index';
import { store } from '@app/store';

const Game = () => {
  const host = useAppSelector((store) => store.session.host);
  const roomId = useAppSelector((store) => store.session.roomId);

  const title = host ? 'Вы хост' : 'Вы участник';

  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <GameForm>
        <div className="gameConteiner">
          <div className="title">
            <div>Выйти</div>
            <div>{title}</div>
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
