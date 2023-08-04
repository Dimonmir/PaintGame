import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AuthForm from '@widgets/authForm';
import RegForm from '@widgets/regForm';
import { useAppSelector } from '@shared/store';
import Menu from '@pages/Menu/Menu';

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
]);

const WithRouter = () => {
  const accessToken = useAppSelector((store) => store.session.token);
  return <RouterProvider router={accessToken.length ? privateRoutes : publicRoutes} />;
};

export default WithRouter;
