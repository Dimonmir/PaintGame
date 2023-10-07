import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ITypeSession {
    token: string,
    roomId: string | null,
    host: boolean | null,
    avatar: string | null,
}

const initialState: ITypeSession = { token: "", host: null, roomId: null, avatar: null }

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        addToken(state, action: PayloadAction<string>) {
            state.token = action.payload
        },
        removeToken(state) {
            state.token = ""
        },
        setHost(state, action: PayloadAction<boolean>) {
            state.host = action.payload
        },
        removeHost(state) {
            state.host = null
        },
        setRoomId(state, action: PayloadAction<string>) {
            state.roomId = action.payload
        },
        removeRoomId(state) {
            state.roomId = null
        },
        setAvatar(state, action: PayloadAction<string>) {
            state.avatar = action.payload
        },
        removeAvatar(state) {
            state.avatar = null
        },
    }
})

export const { addToken, removeToken, removeHost, removeRoomId, setHost, setRoomId, removeAvatar, setAvatar } = sessionSlice.actions;

export default sessionSlice.reducer