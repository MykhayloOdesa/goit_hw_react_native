// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCwQeEfJUP9EoZ2HO4Gd5o5_M3TiitvnA0',
  authDomain: 'goit-hw-react-native-25917.firebaseapp.com',
  projectId: 'goit-hw-react-native-25917',
  storageBucket: 'goit-hw-react-native-25917.appspot.com',
  messagingSenderId: '486711612129',
  appId: '1:486711612129:web:b85b5a801d2808256d5da0',
  measurementId: 'G-8DZWT4EBJ1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
