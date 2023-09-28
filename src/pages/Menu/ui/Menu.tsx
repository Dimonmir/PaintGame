import Header from '@widgets/header/header';
import { ContainerPage } from './menu.styles';
import { Button } from 'antd';
import MenuForm from '@widgets/menuForm';

const Menu = () => {
  return (
    <>
      <Header />
      <MenuForm />
    </>
  );
};

export default Menu;
