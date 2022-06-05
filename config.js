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

