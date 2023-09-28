import { useAppDispatch, useAppSelector } from './store/redux';
import { regTry } from './api/regForma';
import { authTry, authLogout } from './api/authForm';

export { useAppDispatch, useAppSelector, regTry, authLogout, authTry };
