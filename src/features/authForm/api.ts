
import { addToken, removeToken } from '@entities/session/sessionSlice';
import { app } from '@/main';
import { useAppDispatch } from '@/shared/store/redux';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const validationSchema = yup.object({
    email: yup
        .string()
        .email('Введите корректный email')
        .required('Почта обязательна'),
    password: yup
        .string()
        .min(6, 'Пароль должен быть состоять не менее чем из 6 симовлов')
        .required('Пароль обязателен'),
});

export const authTry = async (email: string, password: string) => {
    const auth = getAuth(app);
    return signInWithEmailAndPassword(auth, email, password)
}

export const authLogout = async () => {
    const auth = getAuth(app);
    return signOut(auth)
}