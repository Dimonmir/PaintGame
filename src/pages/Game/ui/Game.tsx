import Header from '@widgets/header/header';
import { GameForm } from './Game.styles';
import Canvas from '@features/canvas';
import Chat from '@features/chat';

const Game = () => {
  return (
    <>
      <Header />
      <GameForm>
        <Canvas/>
        <Chat />
      </GameForm>
    </>
  );
};

export default Game;
