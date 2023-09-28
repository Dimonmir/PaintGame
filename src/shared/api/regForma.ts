
import { app } from '@/main';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

export const regTry = async (email: string, password: string) => {
    const auth = getAuth(app);
    return  createUserWithEmailAndPassword(auth, email, password)
}