import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ITypeSession {
    token?: string,
    roomId: string | null,
    playerId: string | null,
    host: boolean | null,
    avatar: string | null,
}

const initialState: ITypeSession = { token: "", host: null, roomId: null, avatar: null, playerId: null }

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
        clearHost(state) {
            state.host = null
        },
        setRoomId(state, action: PayloadAction<string>) {
            state.roomId = action.payload
        },
        clearRoomId(state) {
            state.roomId = null
        },
        setAvatar(state, action: PayloadAction<string>) {
            state.avatar = action.payload
        },
        clearAvatar(state) {
            state.avatar = null
        },
        setPlayerId(state, action: PayloadAction<string>) {
            state.playerId = action.payload
        },
        clearPlayerId(state) {
            state.playerId = null
        },
        setSession(state, action: PayloadAction<ITypeSession>) {
            state.avatar = action.payload.avatar
            state.host = action.payload.host
            state.roomId = action.payload.roomId
            state.playerId = action.payload.playerId
        },
        clearSession(state) {
            state.avatar = null
            state.host = null
            state.roomId = null
            state.playerId = null
        },
    }
})

export const { addToken, removeToken, clearHost, clearRoomId, setHost, setRoomId, clearAvatar, setAvatar, clearSession, setSession, clearPlayerId, setPlayerId } = sessionSlice.actions;

export default sessionSlice.reducer