
import { app } from '@/main';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const authTry = async (email: string, password: string) => {
    const auth = getAuth(app);
    return signInWithEmailAndPassword(auth, email, password)
}

export const authLogout = async () => {
    const auth = getAuth(app);
    return signOut(auth)
}