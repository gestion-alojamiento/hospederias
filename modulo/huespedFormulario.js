const huespedFormulario = {
  template: `
  <form name="huespedFormulario">
    <div class="card">
    
		<div class="card-title">Datos del huésped</div>
      
		<div class="card-body">
      
			<fieldset>
			
				<div>
					<label for="reservaNum">#Reserva</label>
                    <input type="text"
						class="input-min"
						v-model="reservaNum"
						@input="() => (reservaNum = reservaNum.toUpperCase())"
						id="reservaID">
						<span></span>
				</div>
				
				<div>
					<label for="habitacionNum">#Habitación</label>
					<input type="text"
						class="input-min"
						v-model="habitacionNum"
						@input="() => (reservaNum = reservaNum.toUpperCase())"
						id="habitacionNum">
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
					<router-link  to="/"
						class="boton boton-alerta my-1"
						@click="altaHuesped">
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
style: ``,
setup() {

	/*
	 * FORMULARIO
	 * VALORES POR DEFECTO 
	 * 
	 */
	 
	const nacionalidad = ref(valorDeInicio.nacionalidad)
	const provincia = ref(valorDeInicio.provincia)
	
	const huesped = reactive({
		nombre: '',
		apellido1: '',
		apellido2: '',
		tipoDocumento: valorDeInicio.tipoDocumento,
		numIdentificacion: '',
		sexo: valorDeInicio.sexo,
		fExpedicionDoc: '',
		reservaNum: '',
		habitacionNum: '',
		fNacimiento: '',
		fEntrada: fecha.aInput(ayer)
	})

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
		
  /*
   * DATOS FORMATEADOS
   * 
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

	
	/*
	 * 
	 * VALIDACIONES
	 * 
	 */
	 
	const salir = ref([])

	const validaDatos = ( { nombre, apellido1, apellido2, numIdentificacion, fExpedicionDoc, fEntrada, fNacimiento, tipoDocumento } ) => {
		 salir.value = []
		 if ( tipoDocumento == 'D' && letraDNI.value ) {
			err = 'La letra del DNI no es correcta. Debería ser: ' + letraDNI.value
			alert(err)
			salir.value.push(err)
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
		if ( ! fExpedicionDoc || fecha.esPasado(fExpedicionDoc) ) {
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

	/*
	 * FUNCION DE ALTA
	 * 
	 */
	 
	let nuevoHuespedOBJ = {}
	
	async function altaHuesped() {

		try {
			let error = await validaDatos(huesped)
			
			if ( error.length ) {
				alert('Verifica los datos e inténtalo de nuevo')
				console.log({error})
				throw "No se puede enviar el formulario"
			}

			nuevoHuespedOBJ = {
				"reservaID": huesped.reservaNum,
				"habitacionID": huesped.habitacionNum,
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

		} catch (e) {
			console.log(e)
		}
		
		// Coloca el foco en el campo del número de reserva
		document.querySelector("#reservaID").focus();
	}
  
  const limpiaFormulario = () => {
	  huesped.nombre = ''
	  huesped.apellido1 = ''
	  huesped.apellido2 = ''
	  huesped.fNacimiento = ''
	  huesped.fExpedicionDoc= ''
	  huesped.numIdentificacion = ''
	  huesped.sexo = valorDeInicio.sexo
  }

// ----------------------------------



  return {
    provinciasES,
    provincia,
    paisesArr,
    documentosValidos,
    nacionalidad,
    altaHuesped,
    ...toRefs(huesped),
    letraDNI,
  }
}
}
