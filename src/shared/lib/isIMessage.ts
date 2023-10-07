import { IMessage } from "..";

export function isIMessage(obj: any): obj is IMessage {
  return (
    typeof obj === 'object' &&
    'message' in obj &&
    'messageId' in obj &&
    'author' in obj &&
    'uid' in obj &&
    'avatar' in obj 
  );
}