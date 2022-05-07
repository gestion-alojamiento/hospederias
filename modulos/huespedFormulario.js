const huespedFormularioAlta = {
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
					<router-link  to=""
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
	 * FECHAS
	 * 
	 */
	 
	const fecha = new Fecha(new Date())

	const hoy = fecha.hoy
	const ayer = fecha.ayer

	/*
	 * FORMULARIO
	 * VALORES POR DEFECTO 
	 * 
	 */
	 
	const nacionalidad = ref(valorDeInicio.nacionalidad)
	const provincia = ref(valorDeInicio.provincia)
	const tipoDocumento = ref(valorDeInicio.tipoDocumento)
	
	const huesped = reactive({
		nombre: '',
		apellido1: '',
		apellido2: '',
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
			tipoDocumento.value = "D"
			return documentosObjES
		}
		else if ( paisesArrEU.includes(nacionalidad.value) ) {
			tipoDocumento.value = "I"
			return documentosObjEU
		}
		else {
			tipoDocumento.value = "P"
			return documentosObjOtros
		}
	})
		
  /*
   * DATOS FORMATEADOS
   * 
   */
   
   // Puedo sustituir estos _computed_ con una función a la que llamo desde el template _@input="accion()"_
   // Supongo que necesito un _emit_ que sustituya al valor... No estoy seguro.
  const nombreCAP = computed(() => eliminaAcentos(huesped.nombre))
  const apellido1CAP = computed(() => eliminaAcentos(huesped.apellido1))
  const apellido2CAP = computed(() => eliminaAcentos(huesped.apellido2))
  const numIdentificacionCAP = computed(() => limpiaCadena(huesped.numIdentificacion))
  
  // FECHAS
  const fExpedicionDocES = computed(() => {
	  x = new Date(huesped.fExpedicionDoc)
	  return fecha.corta(x)
  })
  const fNacimientoES = computed(() => {
	  x = new Date(huesped.fNacimiento)
	  return fecha.corta(x)
  })
  const fEntradaES = computed(() => {
	  x = new Date(huesped.fEntrada)
	  return fecha.corta(x)
  })

  /* ---------------------- */

	/*
	 * FUNCION DE ALTA
	 * 
	 */
	 
	let nuevoHuespedOBJ = {}
	const salir = ref([])
	function altaHuesped() {    
		try {

			nuevoHuespedOBJ = {
				// Directamente del formulario
				"reservaID": huesped.reservaNum,
				"habitacionID": huesped.habitacionNum,
				"sexo": huesped.sexo,
				// Datos formateados
				"nombre": nombreCAP.value,
				"apellido1": apellido1CAP.value,
				"apellido2": apellido2CAP.value,
				"nacionalidad": nacionalidad.value,
				"tipoDocumento": tipoDocumento.value,
				"numIdentificacion": numIdentificacionCAP.value,
				"fExpedicionDoc": fExpedicionDocES.value,
				"fNacimiento": fNacimientoES.value,
				"fEntrada": fEntradaES.value,
				"nacionalidadIndex": ( paisesArr.indexOf(nacionalidad.value) +1 ),
				"provincia": provincia.value,
			}
		
			// VERIFICACIÓN DE DATOS. EN CASO DE ERROR SALE DE LA FUNCIÓN ANTES DE ENVIAR LOS DATOS A FIRESTORE
			if ( validaDatos(nuevoHuespedOBJ) && salir.value.length ) {
				alert('Verifica los datos e inténtalo de nuevo' + salir.value)
				console.log(salir)
				throw "No se puede enviar el formulario"
			}
			// ----
			
			//console.log( { nuevoHuespedOBJ } )
			console.log( 'Enviando datos a FIREBASE: ', nuevoHuesped (nuevoHuespedOBJ))
			
			// El reset ya no funciona porque el v-model tiene datos cargados.
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
//	  provincia.value = valorDeInicio.provincia
	  
//      huespedFormulario.reset();
  }
	/*
	 * 
	 * VALIDACIONES
	 * 
	 */
	 

	 const validaDatos = ( { nombre, apellido1, numIdentificacion, fExpedicionDoc, fEntrada } ) => {
		 salir.value = []
		 
		if ( ! nombre || ! apellido1 ) {
			err = '¡El nombre y apellidos son imprescindibles!'
			alert(err)
			salir.value.push(err)
			}

		if ( ! numIdentificacion ) {
			let nuevoNumIdentificacion = "000000"
			huesped.numIdentificacion = nuevoNumIdentificacion // Añadir una opción en el alert para enviar la ficha o descartarla
			err = 'Se ha añadido ' + nuevoNumIdentificacion + 'como número de documento'
			alert(err)
			salir.value.push(err)
		}
		if ( ! fExpedicionDoc || fecha.esPasado(fExpedicionDoc)  ) {
			huesped.fExpedicionDoc = '2021-01-01'
			err = 'Fecha de expedición de documento no válida: ' + fExpedicionDoc + '. Se ha modificado a: "01/01/2021".'
			alert(err)
			salir.value.push(err)
		}
		if ( ! fEntrada) {
			nuevoHuespedOBJ.fEntrada = fecha.aInput(ayer)
			err = 'Se ha actualizado la Fecha de Entrada a: ' + nuevoHuespedOBJ.fEntrada
			alert(err)
			salir.value.push(err)
		}
		return salir.value		
	}
	
	/*
	 * 
	 * GUARDAR OBJETO EN FIRESTORE
	 * 
	 */

 
	// ESTO TAMBIÉN FUNCIONA:
	// function nuevoHuesped (obj) {
	// const {nombre, apellido1, apellido2, nacionalidad, tipoDocumento, numIdentificacion, fExpedicionDoc, sexo, fNacimiento, fEntrada, nacionalidadIndex, provincia, reservaID, habitacionID } = obj
	function nuevoHuesped ({nombre, apellido1, apellido2, nacionalidad, tipoDocumento, numIdentificacion, fExpedicionDoc, sexo, fNacimiento, fEntrada, nacionalidadIndex, provincia, reservaID, habitacionID } ) {
		hospederiasDB.doc().set({
			nombre,
			apellido1,
			apellido2,
			nacionalidad,
			tipoDocumento,
			numIdentificacion,
			fExpedicionDoc,
			sexo,
			fNacimiento,
			fEntrada,
			nacionalidadIndex,
			provincia,
			reservaID,
			habitacionID,
			fecha: new Date()
			})
		}



  return {
	fEntradaES,
    provinciasES,
    provincia,
    paisesArr,
    documentosValidos,
    tipoDocumento,
    nacionalidad,
    altaHuesped,
    fExpedicionDocES,
    ...toRefs(huesped),
  }
}
}
