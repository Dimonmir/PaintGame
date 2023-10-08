import Header from '@widgets/header/header';
import { SNotFound } from './notFound.styles';
import { Button } from 'antd';
import MenuForm from '@widgets/menuForm';

const Menu = () => {
  return (
    <>
      <SNotFound>
        <h1>404 - Страница не найдена</h1>
        <p>Извините, запрошенная вами страница не существует.</p>
        <a href="/">Вернуться на главную страницу</a>
      </SNotFound>
    </>
  );
};

export default Menu;
