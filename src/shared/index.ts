import { useAppDispatch, useAppSelector } from './store/redux';
import { regTry } from './api/regForma';
import { IMessage } from './api/message';
import { IPlayer } from './api/player';
import { authTry, authLogout } from './api/authForm';

export { useAppDispatch, useAppSelector, regTry, authLogout, authTry, type IMessage, type IPlayer};
