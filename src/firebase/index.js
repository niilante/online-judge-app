import firebase from 'firebase';

try {
  var config = {
    apiKey: "AIzaSyBNDfplEJGzqKQzBzPXfgv3pziKDWyzC7s",
    authDomain: "judge-app.firebaseapp.com",
    databaseURL: "https://judge-app.firebaseio.com",
    storageBucket: "judge-app.appspot.com",
    messagingSenderId: "796543208274"
  };
  firebase.initializeApp(config);
} catch (e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;
