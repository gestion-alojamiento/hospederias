CHANGELOG

## v2.4

  - Nuevo tipo de documento "NO VÁLIDO" que permite crear la ficha sin que se incluya en hospederías
  
## v2.3

  - Nuevos filtros de búsqueda: apartamento y reserva
  
## v2.2

  - Arreglado el el componente botonHospederiasCopiar.js
  - Ahora funciona la selección de registros a subir a hospederías.
  
## V2.1.2

  - Separado el código de configuración en 'config.js' del 'index.js'
  - Mejora en el menú de navegación de Huesped
  - Mejora en las rutas de router.js
  - Nueva apiKey
  - Formularios de Huesped alta y edición ahora son iguales

## v2.1.1

  - Agregados nuevos documentos con corrección de la fecha de expedición

## v2.1

  - Corrige la fecha de expedición de los documentos (resta 10 años)
  - Después de validar datos se queda el foco en el botón de guardar
  
## v2

  - Eliminados módulos obsoletos (hospederíasLista y huespedEdita)
  - Código un poco más legible y limpio

## v1

  - Ejecutable sin necesidad de descargar archivos del directorio padre
  - CDNs de producción (vue + vue-router)

## v0.0.3

  - Elimina huéspedes (falta refrescar listado después de eliminar el registro)
  - Valida la letra del DNI
  - Recupera datos de _firestore_ con _.get()_ en lugar de _.onSpnapshot()_ lo que mejora el rendimiento y reduce las consultas a _firebase_
  
## v0.0.2

  - Posibilidad de editar datos de huéspedes. Falta depurar
