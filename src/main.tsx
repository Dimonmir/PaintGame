import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA0xyzuoxdNI2Rlv0tz4zx1nRviNIIFQ9w',
  authDomain: 'paint-pet.firebaseapp.com',
  databaseURL: 'https://paint-pet-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'paint-pet',
  storageBucket: 'paint-pet.appspot.com',
  messagingSenderId: '212066879010',
  appId: '1:212066879010:web:6bdf45daba1c0784b96c7b',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const db = getFirestore(app);
const analyticsAuth = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
