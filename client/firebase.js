import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPRzwJUoEcG1TGQphurDLm5n0peAQLmDk",
  authDomain: "psicologi-90278.firebaseapp.com",
  projectId: "psicologi-90278",
  storageBucket: "psicologi-90278.appspot.com",
  messagingSenderId: "861303330597",
  appId: "1:861303330597:web:f0a952eb9452eb9c1e2ccc",
  measurementId: "G-RJN92G7CNB",
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

export default firebase;
