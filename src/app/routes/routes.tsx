import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AuthForm from '@widgets/authForm';
import RegForm from '@widgets/regForm';
import { useAppSelector } from '@shared';
import Menu from '@pages/Menu/ui/Menu';
import Game from '@pages/Game';

const publicRoutes = createBrowserRouter([
  {
    path: '/',
    element: <AuthForm />,
  },
  {
    path: '/reg',
    element: <RegForm />,
  },
]);

const privateRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Menu />,
  },
  {
    path: '/game',
    element: <Game />,
  },
]);

const WithRouter = () => {
  const accessToken = useAppSelector((store) => store.session.token);
  return <RouterProvider router={accessToken.length ? privateRoutes : publicRoutes} />;
};

export default WithRouter;
