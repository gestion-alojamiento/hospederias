// FIREBASE - HUESPEDES

var firebaseConfig = {
     apiKey: "AIzaSyBZ96L9oO90ZB7cue-U94urbKemOo9gt9A",
     authDomain: "libro-de-incidencias.firebaseapp.com",
     projectId: "libro-de-incidencias",
     storageBucket: "libro-de-incidencias.appspot.com",
     messagingSenderId: "63359688434",
     appId: "1:63359688434:web:9baa32a3f64c66b9a67a6b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// CONEXIÓN
const huespedDB = db.collection('alojamiento').doc(Establecimiento.firebaseDOC).collection(Establecimiento.huespedCOL)
const huespedDATAxFecha = (callback) => huespedDB.orderBy("fecha","desc").onSnapshot(callback)
