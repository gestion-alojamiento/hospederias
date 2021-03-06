/**
 * CODIGO EJECUTADO PARA EXPORTAR REGISTROS
 * Crea un array de huéspedes
 * Añade el siguiente código al array
 * Por último ejecuta la función subir()
 */

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const tipoDocumento = (v) => {
	var sel = document.querySelector("#tipoDocumento")
	var opt1 = document.createElement("option")
	opt1.value = v
	sel.add(opt1, 0)
	sel.selectedIndex = 0
}

/**
 * @param {Array} arr - array de objetos (huéspedes)
 * @param {Number}  i  - primer registro del array a subir a hospederías
 * @param {Numbre}  f  - último registro a subir a hospederías
 * 
 * Ejemplos:
 * subir(huespedes, 3, 3) -> Subir únicamente el registro 3
 * subir(huespedes, 4, 12) -> Subir los registros del 4 al 12
 * subir(huespedes, 1) -> Subir todos los registros
 */
 
const subir = (arr, i, f) => {

	// Calcula el índice del elemento actual del array
	// El primer elemento (1) corresponde al elemento 0 del array
	let j = ( i - 1 )

	// Si no hay segundo parámetro en la función subir(), este será igual al número de elemntos del array huespedes[]
	let fin = f ? f : arr.length

	// Extraigo los datos el huésped y los guardo en la variable x
	const x = arr[j]  // es el registro cuyo orden corresponde con 'i'
	
	if ( j < fin) {
	
		// Muestra en consola los datos principales del huésped que se va a subir a hospederías.
		console.log(( i ) + ' de ' + arr.length, x.apellido1, x.nacionalidad, x.tipoDocumento, x.sexo )

		// Introduce los datos del huésped en los inputs correspondientes
		let nacimiento = x.fNacimiento.split('/')
		const [ dia, mes, ano ] = nacimiento

		document.querySelector("#dia").value = dia
		document.querySelector("#mes").value = mes
		document.querySelector("#ano").value = ano

		document.querySelector("#nombre").value = x.nombre
		document.querySelector("#apellido1").value = x.apellido1
		document.querySelector("#apellido2").value = x.apellido2
		document.querySelector("#nacionalidad").selectedIndex = x.nacionalidadIndex
		document.querySelector("#sexo").value = x.sexo
		document.querySelector("#numIdentificacion").value = x.numIdentificacion
		document.querySelector("#fechaExpedicionDoc").value = x.fExpedicionDoc
		document.querySelector("#fechaEntrada").value = x.fEntrada


		tipoDocumento(x.tipoDocumento)

		// Ejecuta los clicks en los botones correspondientes para ir guardando uno a uno los registros
		sleep(14000).then(() => { document.querySelector("#btnGuardar").click() })
		sleep(20000).then(() => { document.querySelector(".close").click() })
		sleep(25000).then(() => { subir(arr, ++i, fin) })
	}
	
	if (j >= fin) {
		console.log('No hay más registros para subir')
		return
	}
	
}

subir(huespedes, 1)