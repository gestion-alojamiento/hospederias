/**
 * RENOMBRAR ARCHIVO A firebase.js
 * COPIAR DATOS DEL PROJECTO EN firebaseConfig
 */

// FIREBASE - HUESPEDES

var firebaseConfig = {
     apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXA",
     authDomain: "XXXXXXXXXXXXXXXXXXXXXXXXXA",
     databaseURL: "XXXXXXXXXXXXXXXXXXXXXXXXXA",
     projectId: "XXXXXXXXXXXXXXXXXXXXXXXXXA",
     storageBucket: "XXXXXXXXXXXXXXXXXXXXXXXXXA",
     messagingSenderId: "XXXXXXXXXXXXXXXXXXXXXXXXXA",
     appId: "XXXXXXXXXXXXXXXXXXXXXXXXXA"
   };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// CONEXIÓN
const huespedDB = db.collection('alojamiento').doc(Establecimiento.firebaseDOC).collection(Establecimiento.huespedCOL)
const huespedDATAxFecha = (callback) => huespedDB.orderBy("fecha","desc").onSnapshot(callback)
