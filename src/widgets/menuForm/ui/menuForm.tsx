import { useNavigate } from 'react-router-dom';
import { BoxMenu } from './s-menuForm';
import { Button, Typography } from 'antd';

const MenuForm = () => {
  const navigate = useNavigate();

  function navigateMenu() {
    navigate('/game');
  }
  return (
    <BoxMenu>
      <div className="menuHeader">
        <Typography.Title level={2}> Добро пожаловать ! </Typography.Title>
      </div>
      <div className="menuButton">
        <Button type="primary" onClick={navigateMenu}>
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
