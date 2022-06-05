const huespedFormulario = {
  template: `
  <form name="huespedFormulario">
    <div class="card">
    
		<div class="card-title">Datos del huésped</div>
      
		<div class="card-body">
      
			<fieldset>
			
				<div>
					<label for="reservaID">#Reserva</label>
                    <input type="text"
						class="input-min"
						v-model="reservaID"
						@input="() => (reservaID = reservaID.toUpperCase())"
						id="reservaID"
						:disabled="bloqueaInput">
						<span></span>
				</div>
				
				<div>
					<label for="habitacionID">#Habitación</label>
					<input type="text"
						class="input-min"
						v-model="habitacionID"
						@input="() => (habitacionID = habitacionID.toUpperCase())"
						id="habitacionID">
						<span></span>
				</div>
				
			</fieldset>
			
			<fieldset>
			
				<div>
					<label for="nacionalidad">Nacionalidad</label>
					<select v-model="nacionalidad" name="nacionalidad">
						<option>{{ nacionalidad }}</option>
						<option v-for="pais in paisesArr" key="pais">{{ pais }}</option>
					</select>
					<span></span>
				</div>
            
				<div v-if="nacionalidad == 'ESPAÑA'" class="col-4">
					<label for="provincia">Provincia</label>
					<select v-model="provincia" @change="provincia = provincia.toUpperCase()">
					  <option>{{ provincia }}</option>
                      <option v-for="provincia in provinciasES">{{ provincia }}</option>
					</select>
				</div>
			</fieldset>
			
			<fieldset>
			
					<div>
						<label for="nombre">Nombre</label>
						<input type="text"
							v-model="nombre"
							@input="(val) => (nombre = nombre.toUpperCase())"
							maxlength="25"
							id="nombre"
							required>
							<span></span>
					</div>
            
					<div>
					<label for="apellido1">Primer Apellido</label>
						<input type="text"
							v-model="apellido1"
							@input="() => (apellido1 = apellido1.toUpperCase())"
							maxlength="25"
							required>
							<span></span>
					</div>
            
					<div v-if="nacionalidad == 'ESPAÑA'">
						<label for="apellido2">Segundo Apellido</label>
						<input type="text"
								v-model="apellido2"
								@input="() => (apellido2 = apellido2.toUpperCase())"
								maxlength="24"
								required>
								<span></span>
					</div>

			</fieldset>
			<fieldset>
			
					<div>
						<label for="tipoDocumento">Tipo de Documento</label>
						<select v-model="tipoDocumento">
							<option v-for="(documento, key) in documentosValidos" :value="key" :key="key">{{ documento }}</option>
						</select>
						<span></span>
					</div>
				
			</fieldset>
			
			<fieldset>
			
					<div>
						<label for="numIdentificacion">Nº documento</label>
						<input type="text"
							v-model="numIdentificacion"
							@input="() => (numIdentificacion = numIdentificacion.toUpperCase())"
							class="form-control"
							maxlength="14"
							required>
							<span></span>
					</div>
					
					<div v-if="tipoDocumento == 'D' && numIdentificacion.length > 7">
						<span class="boton boton-alerta" style="padding: 1rem" v-if=" letraDNI "> {{ letraDNI }} </span>
					</div>

					<div>
						<label for="fExpedicionDoc">F. Expedición</label>
						<input type="date"
							v-model="fExpedicionDoc"
							class="form-control"
							maxlength="8"
							required>
							<span></span>
					</div>
				
			</fieldset>
			
			<fieldset>
			
					<div>
						<label for="fNacimiento">F. Nacimiento</label>
						<input type="date"
							v-model="fNacimiento"
							size="10" maxlength="8"
							class="form-control"
							required>
							<span></span>
					</div>

					<div>
						<label for="sexo">Sexo</label>
						<select v-model="sexo" class="form-control">
								<option value="M">MASCULINO</option>
								<option value="F">FEMENINO</option>
						</select>
					</div>
					
				</fieldset>
			</div>
			
				<div class="card-footer">
					<router-link  to="/huesped/alta"
						class="boton boton-alerta my-1"
						@click="accionFormulario">
							💾 Guardar
					</router-link>
                  
					<div>
						<label for="fEntrada">Fecha Entrada</label>
						<input type="date"
							v-model="fEntrada"
							class="form-control"
							required>
							<span></span>
					</div>
				</div>
			</div>
		</form>
`,
setup() {

	let nuevoHuespedOBJ = {}
	let bloqueaInput = false

	/*
	 * FORMULARIO
	 * VALORES POR DEFECTO 
	 * 
	 */
	 
	/* REACTIVOS */

	const huesped = reactive({
		nombre: '',
		apellido1: '',
		apellido2: '',
		tipoDocumento: valorDeInicio.tipoDocumento,
		numIdentificacion: '',
		sexo: valorDeInicio.sexo,
		fExpedicionDoc: '',
		reservaID: '',
		habitacionID: '',
		fNacimiento: '',
		fEntrada: fecha.aInput(ayer)
	})

	/* NO REACTIVOS */
	const nacionalidad = ref(valorDeInicio.nacionalidad)
	const provincia = ref(valorDeInicio.provincia)
	
	/* ------------------------------------------------------------*/

	/*
	 * FUNCION DE ALTA
	 * 
	 */
	 
	async function accionFormulario() {

		try {
			let error = await validaDatos(huesped)
			
			if ( error.length ) {
				alert('Verifica los datos e inténtalo de nuevo')
				console.log({error})
				throw "No se puede enviar el formulario"
			}

			nuevoHuespedOBJ = {
				"reservaID": huesped.reservaID,
				"habitacionID": huesped.habitacionID,
				"sexo": huesped.sexo,
				"nombre": eliminaAcentos(huesped.nombre),
				"apellido1": eliminaAcentos(huesped.apellido1),
				"apellido2": eliminaAcentos(huesped.apellido2),
				"nacionalidad": nacionalidad.value,
				"tipoDocumento": huesped.tipoDocumento,
				"numIdentificacion": limpiaCadena(huesped.numIdentificacion),
				"fExpedicionDoc": fecha.inputACorta(huesped.fExpedicionDoc),
				"fNacimiento": fecha.inputACorta(huesped.fNacimiento),
				"fEntrada": fecha.inputACorta(huesped.fEntrada),
				"nacionalidadIndex": ( paisesArr.indexOf(nacionalidad.value) +1 ),
				"provincia": provincia.value,
			}
			
			//nuevoHuesped(nuevoHuespedOBJ) && console.log( 'Enviando datos a FIREBASE: ')
			await huespedDB.add({ ...nuevoHuespedOBJ, fecha: new Date() })
			.then((docRef) => { console.log("Nuevo registro con id: ", docRef.id); })
			.catch((error) => {
				throw "Error al añadir nuevo registro: " + error
			 });
			
			// Permite seleccionar que valores reseteo y que valores quiero que se queden con el valor actual
			limpiaFormulario()
		
			// Coloca el foco en el campo del número de reserva
			document.querySelector("#reservaID").focus();

		} catch (e) {
			console.log(e)
			// Coloca el foco en el campo del número de reserva
			document.querySelector(".boton-alerta").focus();
		}
	}
  
	const limpiaFormulario = () => {
		huesped.nombre = ''
		huesped.apellido1 = ''
		huesped.apellido2 = ''
		huesped.fNacimiento = ''
		huesped.fExpedicionDoc= ''
		huesped.numIdentificacion = ''
		huesped.sexo = valorDeInicio.sexo // config.js
	}

	// ----------------------------------


	/*
	 * 
	 * VALIDACIONES
	 * 
	 */
	 
	const salir = ref([])

	const validaDatos = ( { nombre, apellido1, apellido2, numIdentificacion, fExpedicionDoc, fEntrada, fNacimiento, tipoDocumento } ) => {
		salir.value = []
		
		if ( tipoDocumento == 'D' ) {
			 if ( ! apellido2 ) {
				err = '¡Falta el segundo apellido!'
				alert(err)
				salir.value.push(err)
			 }
			if ( letraDNI.value ) {
			err = 'La letra del DNI no es correcta. Debería ser: ' + letraDNI.value
			alert(err)
			salir.value.push(err)
			}
		}
		if ( ! nombre || ! apellido1 ) {
			err = '¡El nombre y apellidos son imprescindibles!'
			alert(err)
			salir.value.push(err)
		}
		if ( ! numIdentificacion ) {
			huesped.numIdentificacion = valorPorDefecto.numIdentificacion
			err = 'Se ha añadido ' + huesped.numIdentificacion + ' como número de documento'
			alert(err)
			salir.value.push(err)
		}
		if ( fecha.esPasado(fExpedicionDoc) ) {
			huesped.fExpedicionDoc = fechaID(fExpedicionDoc, nacionalidad.value, huesped.tipoDocumento)
			err = 'Fecha de expedición de documento' + fExpedicionDoc + ' ha sido actualizada a: ' + huesped.fExpedicionDoc + '.'
			alert(err)
			salir.value.push(err)
		}
		if ( ! fExpedicionDoc ) {
			huesped.fExpedicionDoc = valorPorDefecto['fExpedicionDoc']
			err = 'Fecha de expedición de documento ' + fExpedicionDoc + ' ha sido modificada a: ' + huesped.fExpedicionDoc + '.'
			alert(err)
			salir.value.push(err)
		}
		if ( ! fNacimiento || fecha.esPasado(fNacimiento) ) {
			huesped.fNacimiento = valorPorDefecto['fNacimiento']
			err = 'Fecha de nacimiento ' + fNacimiento + ' ha sido modificada a: ' + huesped.fNacimiento + '.'
			alert(err)
			salir.value.push(err)
		}
		if ( ! fEntrada ) {
			huesped.fEntrada = valorPorDefecto['fEntrada']
			err = 'Fecha de entrada ' + fEntrada + ' ha sido modificada a: ' + huesped.fEntrada + '.'
			alert(err)
			salir.value.push(err)
		}
		return salir.value	
	}

	/**
	 * letraDNI
	 * Devuelve '1' si la letra del DNI (último caracter) no coincide con la letra calculada
	 * Si coinciden devuelve 'false'
	 * MEJORA (si se puede):
	 * Activar el 'computed()' sólo cuando el "tipoDocumento == 'D'"
	 */
	const letraDNI = computed(() => {
		let n, l, L
		const cadena="TRWAGMYFPDXBNJZSQVHLCKET"
		n = huesped.numIdentificacion.slice(0, 8) % 23
		L = huesped.numIdentificacion.slice(-1)
		l = cadena.substring(n,n+1)
		return L == l ? false : l
		})
	/* ---------------------- */

	/**
	 * fechaID
	 * Modifica la fecha de expedición cuando se ha introducido la fecha de caducidad
	 * @param {string} f fecha en formato yyy-mm-dd
	 * @param {string} pais pais de expedición del documento del huésped
	 * @param {string} id Letra de identificación del tipo de documento del huésped
	 */
	const fechaID = (f, pais, id) => {
	let d = new Date(f)
	const year = d.getFullYear();
	const month = d.getMonth();
	const day = d.getDate() + 1;
	const fechaMenos10 = d.setFullYear(d.getFullYear() - 10)
	/**
	 * DOCUMENTOS QUE MUESTRAN FECHA DE CADUCIDAD EN EL FRENTE Y LA DE EXPEDICIÓN ATRÁS
	 * Facilita introducir la fecha de expedición sin consultar el reverso
	 */
	if ( pais == "ALEMANIA" && id == "I" ) return new Date(year - 10, month, day + 1).toISOString().slice(0, 10);
	if ( pais == "CROACIA" && id == "I" ) return new Date(year - 5, month).toISOString().slice(0, 10);

	/**
	 * DOCUMENTOS QUE TIENEN ELEMENTOS QUE DIFICULTAN LA CONSULTA DE LA FECHA DE EXPEDICIÓN
	 */

	// Falta confirmación
	//	if ( pais == "ITALIA" && id == "P" ) return new Date(year - 10, month, day + 1).toISOString().slice(0, 10);
	//	if ( pais == "FRANCIA" && id == "I" ) return new Date(year - 15, month, day + 1).toISOString().slice(0, 10);
	//	if ( pais == "FRANCIA" && id == "P" ) return new Date(year - 15, month, day + 1).toISOString().slice(0, 10);

	/**
	 * FECHA CADUCIDAD MENOS 10 AÑOS
	 * VALIDO PARA:
	 * ESPAÑA D
	 * BELGICA I
	 */
	return new Date(fechaMenos10).toISOString().split('T')[0];
	}
	/* ------------------------------- */

	/*
	 * SELECCION DE DOCUMENTOS POR DEFECTO SEGÚN NACIONALIDAD
	 * 
	 */

	const documentosValidos = computed(() => {
		if ( nacionalidad.value == 'ESPAÑA' ) {
			huesped.tipoDocumento = "D"
			return documentosObjES
		}
		else if ( paisesArrEU.includes(nacionalidad.value) ) {
			huesped.tipoDocumento = "I"
			return documentosObjEU
		}
		else {
			huesped.tipoDocumento = "P"
			return documentosObjOtros
		}
	})
		
  return {
    provinciasES,
    provincia,
    paisesArr,
    documentosValidos,
    nacionalidad,
    accionFormulario,
    ...toRefs(huesped),
    letraDNI,
	bloqueaInput
  }
}
}
