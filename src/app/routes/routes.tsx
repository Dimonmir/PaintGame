import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import AuthForm from '@widgets/authForm';
import RegForm from '@widgets/regForm';
import { useAppSelector } from '@shared';
import Menu from '@pages/Menu/ui/Menu';
import Game from '@pages/Game';
import NotFound from '@pages/NotFound';

const publicRoutes = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthForm />,
  },
  {
    path: '/reg',
    element: <RegForm />,
  },
  {
    path: '/',
    element: <Navigate to="/auth" />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const privateRoutes = createBrowserRouter([
  {
    path: '/menu',
    element: <Menu />,
  },
  {
    path: '/game/:game',
    element: <Game />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/',
    element: <Navigate to="/menu" />,
  },
]);

const WithRouter = () => {
  const accessToken = useAppSelector((store) => store.session.token);
  return <RouterProvider router={accessToken.length ? privateRoutes : publicRoutes} />;
};

export default WithRouter;
