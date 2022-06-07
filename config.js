/*
 * CONFIGURACION SERVIDOR
 * 
 */

 /*
 * INFO ESTABLECIMIENTO
 */
 
 const Establecimiento = {
    alias: 'White Apartments & Sunrise Suites',
    firebaseDOC: 'WhiteApartments',
    huespedCOL: 'huesped',
  }
  // ---------------------------------------
  
  
   // Define la ruta de inicio para el 'router'
   const rutaInicio = '/'
   
   
  /*
   * GESTIÓN USUARIOS
   */
   
    const adminUsersOBJ = {
      info: {
          UID: 'Kd1ZOVY0NNRntrCVlD7LnXr4kbG2',
          correo: 'info@whiteapartments.com'
      },
      gesalojamiento: {
          UID: 'fbOd44zBIZNGg80nuwkIlIK4tqO2',
          correo: 'gesalojamiento@gmail.com'
      }
    }
  
  // Selecciona cual de los usuarios tiene funciones de administrador
    const adminUserUID = adminUsersOBJ.info.UID // Administrador => info
  
  // ------------------------------------------------------
  
  

      
      	  
/**
 * FECHAS
 * Genera una nueva clase Fecha() declarada en clases.js
 */

 const fecha = new Fecha(new Date())
 const hoy = fecha.hoy
 const ayer = fecha.ayer


/*
 * HOSPEDERÍAS
 */
 

// Valores de inicio para el formulario ------------------
const valorDeInicio = {
	sexo: 'F',
	nacionalidad: 'ESPAÑA',
	tipoDocumento: 'D',
	provincia: null
}
// -----------------------------

// Valores por defecto en caso de error u omisión --------------
const valorPorDefecto = {
	numIdentificacion: '00000000',
	fNacimiento: '2000-01-01',
	fEntrada: fecha.aInput(ayer),
	fExpedicionDoc: '2021-01-01'
}
// ---------------------------------

// Se muestra solo a españoles
const documentosObjES = {
    "D": "DNI",
    "P": "PASAPORTE",
    "C": "PERMISO CONDUCIR ESPAÑOL",
    "NV": "NO VÁLIDO"
  }
  // Se muestra sólo a nacionalizados dentro de la UE
  const documentosObjEU = {
    "P": "PASAPORTE",
    "I": "DOCUMENTO DE IDENTIDAD DE LA UE",
    "N": "NIE O TARJETA ESPAÑOLA DE EXTRANJEROS",
    "NV": "NO VÁLIDO"
  }
  // Se muestra a todos menos a los españoles
  const documentosObjOtros = {
    "P": "PASAPORTE",
    "N": "NIE O TARJETA ESPAÑOLA DE EXTRANJEROS",
    "X": "PERMISO DE RESIDENCIA DE ESTADO MIEMBRO DE LA UE",
    "NV": "NO VÁLIDO"
  }