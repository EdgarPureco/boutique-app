
import firebase from 'firebase';
  
const firebaseConfig = {
  apiKey: "AIzaSyDI6n0dF63ze6f7_rqmk1tWS4XvKhR9s38",
  authDomain: "pruebas-94047.firebaseapp.com",
  projectId: "pruebas-94047",
  storageBucket: "pruebas-94047.appspot.com",
  messagingSenderId: "318361524696",
  appId: "1:318361524696:web:5e72de0a9ccc0632a9baad"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore()

  export default db;