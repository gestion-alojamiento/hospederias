CHANGELOG

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
