# Gestión Alojamiento

## Módulo Huésped

  - Formulario de entrada de datos de los huéspedes de un alojamiento turístico
  - Genera un código que insertar en la web de Hospederías de la Dirección General de la Policía para dar de alta a los huéspedes en su sistema
  - Consulta de huéspedes con posibilidad de utilizar filtros por nacionalidad, nombre y apellido
  - Valida datos como fecha de expedición de documento de identidad y letra del DNI

## Instalación

  - Cambiar de nombre al archivo firebase-ejemplo.js -> firebase.js
  - Añadir los datos de nuestro proyecto en firebase al archivo firebase.js
  - Crear la base de datos 'firestore database' con la estructura: alojamiento -> <Establecimiento> -> huesped 
  
## Tecnologías

 1. html, CSS
 2. Bootstrap (CDN)
 3. Vue 3 (CDN)
 4. Vue-router (CDN)
 5. Firebase (CDN)
  - firebase-firestore
  - firebase-auth

## Pendiente

  - Actualizar listado al eliminar un registro
  -	Añadir botón para pasar de modo _impresion_ a modo _normal_
  -	Nueva página con huéspedes separados por nacionalidad y por provincia. Pudiendo elegir por periodos de 7 días a partir de una fecha determinada
  - Selección de opciones en selects sin necesidad de teclear a toda prisa
  - Limitar número de caracteres a mostrar en el módulo listaHospederias para que no se generen dos líneas en algunos registros (nombre, apellidos, nacionalidad)
	+ Usar string.slice() ó string.substring()
	
