export interface IMessageItemNotification {
  type: 'warning' | 'error' | 'success' | 'info';
  level: 'height' | 'medium' | 'low';
  message: string;
}

export interface IMessageNotification {
  message: IMessageItemNotification[] | null;
}
