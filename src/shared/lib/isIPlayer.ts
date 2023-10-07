import { IPlayer } from "..";

export function isIPlayer(obj: any): obj is IPlayer {
  return (
    typeof obj === 'object' &&
    'user' in obj &&
    'uid' in obj &&
    'host' in obj &&
    'avatar' in obj 
  );
}