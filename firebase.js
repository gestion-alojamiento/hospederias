// FIREBASE - HUESPEDES

var firebaseConfig = {
     apiKey: "AIzaSyBEt2q1uUTDqoRU9SrmghEoQ263hp3x-SA",
     authDomain: "hospederias-policia.firebaseapp.com",
     databaseURL: "https://hospederias-policia-default-rtdb.europe-west1.firebasedatabase.app",
     projectId: "hospederias-policia",
     storageBucket: "hospederias-policia.appspot.com",
     messagingSenderId: "497107244569",
     appId: "1:497107244569:web:8312f08e712b90815b7c88"
   };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// CONEXIÓN
const huespedDB = db.collection('alojamiento').doc(Establecimiento.firebaseDOC).collection(Establecimiento.huespedCOL)
const huespedDATAxFecha = (callback) => huespedDB.orderBy("fecha","desc").onSnapshot(callback)
