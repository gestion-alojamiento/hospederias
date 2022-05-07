// Your web app's Firebase configuration
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

// Selecciono las bases de datos con las que trabajar
const coleccionIncidencias = 'incidencia'
// const coleccionIncidencias = 'tests_incidencia'
const coleccionHospederias = 'huesped'


const incidenciaDB = db.collection(coleccionIncidencias)
//const incidenciasOrdenadas = db.collection(coleccionIncidencias).orderBy("fecha")

// Agrega una nueva incidencia a _firebase_
const nuevaIncidencia = (incidencia) => incidenciaDB.add(incidencia)
// Actualiza una incidencia recibiendo el id y el objeto actualizado
const modificaIncidencia = (id, updatedTask) => incidenciaDB.doc(id).update(updatedTask);
// Devuelve una colección añadiendo un elemento con el id
const alCargarIncidencias = (callback) => incidenciaDB.orderBy("fecha").onSnapshot(callback)

// HOSPEDERÍAS
//const hospederiasDB = db.collection('usuarios')
//const hospederiasDB = db.collection('tests')
//const hospederiasDB = db.collection(coleccionHospederias).orderBy("fecha")  // Sale error al dar de alta un huésped
const hospederiasDB = db.collection('alojamiento').doc('WhiteApartments').collection('huesped')
const cargaHuespedes = (callback) => hospederiasDB.orderBy("fecha").onSnapshot(callback)
