import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
  projectId: "houseai-blueprint",
  appId: "1:535566464653:web:721b711a60883f321d94c4",
  storageBucket: "houseai-blueprint.firebasestorage.app",
  apiKey: "AIzaSyD3K7Y8gOes5GV1ESyjhMk4aHqKpcHNFQk",
  authDomain: "houseai-blueprint.firebaseapp.com",
  messagingSenderId: "535566464653"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
