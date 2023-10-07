import { useAppDispatch, useAppSelector } from './store/redux';
import { regTry } from './api/regForma';
import { IMessage } from './api/message';
import { IPlayer } from './api/player';
import { authTry, authLogout } from './api/authForm';
import { randString } from './lib/randString';
import { isIPlayer } from './lib/isIPlayer';
import { isIMessage } from './lib/isIMessage';
import { hasTargetValue } from './lib/hasTargetValue';

export { useAppDispatch, useAppSelector, regTry, authLogout, authTry, type IMessage, type IPlayer, randString, isIPlayer, hasTargetValue, isIMessage};
