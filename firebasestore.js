import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBudMGw2lgzPL06PpIT2xWzzULfdr33O2o",//use your own firebase data 
  authDomain: "preschool-d24c5.firebaseapp.com",//use your own firebase data 
  projectId: "preschool-d24c5",//use your own firebase data 
  storageBucket: "preschool-d24c5.firebasestorage.app",//use your own firebase data 
  messagingSenderId: "568314365551",//use your own firebase data 
  appId: "1:568314365551:android:63904c2725d0b74c796f9a"//use your own firebase data 
};
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
export {db};