import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
    uid: string
    name: string
    mail: string
    password: string
    creationTime?: string
}

const initialState: IUser = {
    uid: "",
    name: "",
    mail: "",
    password: "",
    creationTime: "",
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, {payload}: PayloadAction<IUser>) {
            state.uid = payload.uid,
            state.name = payload.name,
            state.mail = payload.mail,
            state.password = payload.password,
            state.creationTime = payload.creationTime
        },
    }
})

export const { addUser } = userSlice.actions;

export default userSlice.reducer