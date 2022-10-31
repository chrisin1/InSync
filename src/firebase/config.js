import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB1_ZhPRkiJeku9YtN9aDWvlb2-1EZ2me8',
  authDomain: 'insync-dce29.firebaseapp.com',
  databaseURL: 'https://insync-dce29.firebaseio.com',
  projectId: 'insync-dce29',
  storageBucket: 'insync-dce29.appspot.com',
  messagingSenderId: '295758432841',
  appId: '1:295758432841:android:110a5ce55a806a84248d98',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };