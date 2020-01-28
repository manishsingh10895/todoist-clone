import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBNzlg4EaqcMaxZN7tJv11ygAgFmnBCDB0",
    authDomain: "todoist-166bf.firebaseapp.com",
    databaseURL: "https://todoist-166bf.firebaseio.com",
    projectId: "todoist-166bf",
    storageBucket: "todoist-166bf.appspot.com",
    messagingSenderId: "670250860897",
    appId: "1:670250860897:web:45e0b255b2b4253da34520",
    measurementId: "G-8PBTER1LJE"
});

export { firebaseConfig as firebase };

