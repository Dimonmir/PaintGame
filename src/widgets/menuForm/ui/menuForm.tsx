import { useNavigate } from 'react-router-dom';
import { BoxMenu } from './s-menuForm';
import { Button, Typography } from 'antd';
import { randString } from '@shared/index';

const MenuForm = () => {
  const navigate = useNavigate();

  function navigateGame() {
    navigate('/game/' + randString());
  }
  return (
    <BoxMenu>
      <div className="menuHeader">
        <Typography.Title level={2}> Добро пожаловать ! </Typography.Title>
      </div>
      <div className="menuButton">
        <Button type="primary" onClick={navigateGame}>
          Быстрая игра
        </Button>
        <Button type="primary"> Создать игру </Button>
        <Button type="primary"> Присоедниться к игре </Button>
        <Button type="primary"> Настройки </Button>
      </div>
    </BoxMenu>
  );
};

export default MenuForm;
