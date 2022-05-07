# CHANGELOG

## v0.2.6

	-	Actualizadas fechas en hospederías con clase _Fecha_
	-	Arreglado problema de filtro de fecha actual que mostraba fecha en UMT (-2)

## v0.2.5

	-	Actualizada validación de datos.
	-	Actualización de los valores por defecto
	-	Arreglado error de entrada de la fecha de entrada.
	-	Mejoras en estilo _../index.css_
	
## v0.2.4

	-	Corregidos errores en CODIGO. No subía los registros y los contadores no eran correctos.
	-	Anotaciones sobre próxima página de carga de reservas en README.md
	
## v0.2.0

	-	Filtros de huéspedes operativos (nacionalidad, nombre y apellido1)
	-	Lista de clientes x País
	-	Limpieza del formulario de hospederías y lista de huéspedes ahora debajo del formulario.
	-	Ordenado el código de _/store/index.js_
	-	Chequeos de valores como fExpedición


## v0.1.4

	-	Mejorada gestión de los _inject_ del __menú de navegación__. Para la próxima versión los sustituiré por una constante en la _store_
	-	Nuevo objeto en _store_ con datos del establecimiento
	-	Nuevo módulo que remplaza a _hospederiasFormulario_ => _huespedFormulario_ (Muy mejorado y falta limpiar código para que no cargue el módulo viejo)
	-	Modificados de nuevo los tiempos del código de subida de hospederías a la página de la Guardia Civil
	-	Nueva función para eliminar acentos. La anterior sustituía las Ñ por N.
	-	Nueva página lista-huespedes. De momento solo muestra a todos los huéspedes y hay un div que muestra el id al pasar el ratón por encima

## V0.1.3

	-	Modifico valor 'Sexo' por defecto a MASCULINO porque es más práctico al estar la mano derecha ocupada en el teclado numérico justo antes de introducir el valor
	-	Añado referencia a fechaAyer de la _store_ en hospederiasFormulario
	-	Nuevos valores en la _store_: { valorPorDefecto, limpiaCadena, eliminaAcentos }
	-	Nueva página de exportar hospederías con botón para mostar/ocultar el código
	-	Actualizado código de subida de huéspedes (falta probar). El actual que funciona sigue abajo en este archivo
	
## v0.1.2

	-	Nuevo script (./store/index.js) para cargar funciones y objetos accesibles desde cualquier módulo de la aplicación.
	-	Arreglado error en el código de hospederías. Desglosado el if de la última función para ejecutar el return correctamente.
	-	Añadidos varios 'todos'
	-	Añadida fecha actual en módulo __menuPrincipal__
	
## v0.1.1

	-	Texto aparece en mayúsculas en nombre, apellidos, reserva y número documento.
	-	Base de datos de huéspedes ahora en: alojamiento.WhiteApartments.huesped
	-	Campo reserva ahora al principio del formulario.
	-	El foco vuelve al campo 'reservaNum' después de dar de alta a un nuevo huésped.
	-	Añadido campo 'reservaNum' a listado de huéspedes.
	-	Número de reserva ahora es texto para diferenciar White Apartments de Sunrise Suites -> nnnSS
	-	Modificados los tiempos de carga y subida de huéspedes a la web de Hospederías (código en README.md)
	-	Añadida salida por consola cuando ya no hay más registros que subir a Hospederías.
	-	Añadida hoja de estilos para impresión.
	
## v0.0.1

  - Gestión alojamiento arranca aquí desde libro-de-incidencias.
  - Original en Rpi 4 de recepción /var/www/html/device
  - Copias de seguridad en /media/pi/Storage/dev/gestion-alojamiento_vX.x.x
