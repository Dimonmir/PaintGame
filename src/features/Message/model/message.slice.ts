import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessageItemNotification, IMessageNotification } from '@shared/index';

const initialState: IMessageNotification = {
  message: [],
};

const MessageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: (state, { payload }: PayloadAction<IMessageItemNotification[]>) => {
      state.message = payload;
    },
  },
});

export const { addMessage } = MessageSlice.actions;

export default MessageSlice.reducer;
