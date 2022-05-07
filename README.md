# Gestión Alojamiento

## Descripción

### Incidencias

  - Organiza una base de datos de incidencias que deben ser consultadas por varios usuarios.
  - Cada usuario puede archivar las incidencias que seguirán visibles para el resto de usuarios.
  - Por defecto, el registro de nuevos usuarios está deshabilitado.
  - Se accede con un usuario habilitado con anterioridad lo que garantiza los permisos necesarios de acceso a los módulos restringidos de la página y a los datos de Firestore.

### Huéspedes

  - Formulario de entrada de datos de los huéspedes de un alojamiento turístico
  - Genera un cócigo que se puede insertar en la web de Hospederías de la Dirección General de la Policía para dar de alta a los huéspedes en su sistema
  - Consulta de huéspedes con posibilidad de utilizar filtros por nacionalidad, nombre y apellido

## Tecnologías

 1. html, CSS
 2. Bootstrap (CDN)
 3. Vue 3 (CDN)
 4. Vue-router (CDN)
 5. Firebase (CDN)
  - firebase-firestore
  - firebase-auth

## Pendiente

  - Las fechas de _/store/index.js_ están en UMT por lo que en verano no cambia el día hasta las 02:00 horas.
  -	Limpiar mensajes por consola.
  -	Añadir botón para pasar de modo _impresion_ a modo _normal_
  -	Nueva página con huéspedes separados por nacionalidad y por provincia. Pudiendo elegir por periodos de 7 días a partir de una fecha determinada
  - Añadir opción para Check Outs
  - Mostrar (no se como ni donde) los comentarios añadidos al archivar una incidencia.
  - Cuando creo una nueva incidencia, como hora coge la hora de cuando se cargó el listado de incidencias y no cuando se pincha en 'Nueva incidencia'
  - Pulir CSS
  - Selección de opciones en selects sin necesidad de teclear a toda prisa
  - Limitar número de caracteres a mostrar en el módulo listaHospederias para que no se generen dos líneas en algunos registros (nombre, apellidos, nacionalidad)
	+ Usar string.slice() ó string.substring()

## Subir huéspedes desde la página de la Guardia Civil:

## Carga de reservas

  1.	Descargo respaldo de la web de hoteldruid
  2.	Cargo el respaldo en la raspberry
  3.	Entro en phpMyAdmin y 'exporto' la tabla de reservas (white_prenota2021) en formato json
  4.	Edito el archivo y elimino las primeras líneas de código
  5.	Paso el archivo al directorio _/store_ del sitio _dev_
  
  if (in == hoy) => entrada
  if (in < hoy && last >= hoy) => cliente
  if (last == (hoy + 1) => salida
  
  idprenota => reserva
  idappartamento => apartamento
  iddatainizio => in
  iddatafine => last
  
// Día del año
var now = new Date();
var start = new Date(now.getFullYear(), 0, 0);
var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
var oneDay = 1000 * 60 * 60 * 24;
var day = Math.floor(diff / oneDay);
console.log('Day of year: ' + day);

fuente: https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366


probar:
echo "[Your SQL query]" | mysqlsh --sql --result-format=json --uri=[username]@localhost/[schema_name] 