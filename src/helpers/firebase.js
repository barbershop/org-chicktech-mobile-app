import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBNsocIEX353UJaso9I4Aj_Q5AkVsYMPBU",
    authDomain: "chicktech-sticker-pics.firebaseapp.com",
    databaseURL: "https://chicktech-sticker-pics.firebaseio.com",
    storageBucket: "chicktech-sticker-pics.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export default firebase;