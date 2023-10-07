import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ITypeSession {
    token: string,
    roomId: string | null,
    host: boolean | null,
}

const initialState: ITypeSession = { token: "", host: null, roomId: null }

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
    }
})

export const { addToken, removeToken } = sessionSlice.actions;

export default sessionSlice.reducer