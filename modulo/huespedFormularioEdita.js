const huespedFormularioEdita = {
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
						disabled>
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
		<div>{{ test }}</div>
		<div>fNacimiento: {{ fNacimiento }}</div>
		<div> --- </div>

  `,
  props: {
	  huespedOBJ: {
		type: Object,
		required: false
	  },
	  id: {
		  type: String,
		  required: false
	  }
  },
  setup(props) {
	  
	const fecha = new Fecha(new Date())

	const hoy = fecha.hoy
	const ayer = fecha.ayer

	/*
	 * PROPS
	 * 
	 */
	 
	 const huesped = reactive({
		 reservaID: '',
		 habitacionID: '',
		 nacionalidad: '',
		 provincia: '',
		 nombre: '',
		 apellido1: '',
		 apellido2: '',
		 nacionalidad: '',
		 provincia: '',
		 tipoDocumento: '',
		 numIdentificacion: '',
		 sexo: '',
		 fExpedicionDoc: '',
		 fNacimiento: '',
		 fEntrada: '',
	 })
	 
	 	 
	 const test = computed(() => {
		 return fecha.inputACorta(huesped.fNacimiento)
	 })
	 
	 
	 let id = ''
	 let datosCargados = false
	 onUpdated(() => {
		 if ( props.huespedOBJ && datosCargados == false ) {
			 huesped.reservaID = props.huespedOBJ.reservaID
			 huesped.habitacionID = props.huespedOBJ.habitacionID
			 huesped.nacionalidad = props.huespedOBJ.nacionalidad
			 huesped.provincia = props.huespedOBJ.provincia
			 huesped.nombre = props.huespedOBJ.nombre
			 huesped.apellido1 = props.huespedOBJ.apellido1
			 huesped.apellido2 = props.huespedOBJ.apellido2
			 huesped.tipoDocumento = props.huespedOBJ.tipoDocumento
			 huesped.numIdentificacion = props.huespedOBJ.numIdentificacion
			 huesped.sexo = props.huespedOBJ.sexo
			 
			 huesped.fNacimiento = ! props.huespedOBJ.fNacimiento || props.huespedOBJ.fNacimiento == "Invalid Date" ? fecha.input(ayer) : fecha.cortaAInput(props.huespedOBJ.fNacimiento)
			 huesped.fExpedicionDoc = ! props.huespedOBJ.fExpedicionDoc || props.huespedOBJ.fExpedicionDoc == "Invalid Date" ? fecha.input(ayer) : fecha.cortaAInput(props.huespedOBJ.fExpedicionDoc)
			 huesped.fEntrada = ! props.huespedOBJ.fEntrada || props.huespedOBJ.fEntrada == "Invalid Date" ? fecha.input(ayer) : fecha.cortaAInput(props.huespedOBJ.fEntrada)

			 datosCargados = true
		 }
		 id = props.id ? props.id : null
	})
	
	//const fechaCortaAInput

	/*
	 * SELECCION DE DOCUMENTOS POR DEFECTO SEGÚN NACIONALIDAD
	 * 
	 */

	const documentosValidos = computed(() => {
		if ( huesped.nacionalidad == 'ESPAÑA' ) {
			//tipoDocumento = "D"
			return documentosObjES
		}
		else if ( paisesArrEU.includes(huesped.nacionalidad) ) {
			//tipoDocumento.value = "I"
			return documentosObjEU
		}
		else {
			//tipoDocumento.value = "P"
			return documentosObjOtros
		}
	})
	
	/* --------------------------------- */
	
	
	/*
	 * VALIDACIÓN
	 * 
	 */
	 
	const salir = ref([])
	
	
  	/*
	 * FUNCION DE ALTA
	 * 
	 */

	 
	let nuevoHuespedOBJ = {}
	function accionFormulario() {    
		try {
			nuevoHuespedOBJ = {
				// Directamente del formulario
				"reservaID": huesped.reservaID,
				"habitacionID": huesped.habitacionID,
				"sexo": huesped.sexo,
				// Datos formateados
				"nombre": huesped.nombre,
				"apellido1": huesped.apellido1,
				"apellido2": huesped.apellido2,
				"nacionalidad": huesped.nacionalidad,
				"tipoDocumento": huesped.tipoDocumento,
				"numIdentificacion": huesped.numIdentificacion,
				"fExpedicionDoc": fecha.inputACorta(huesped.fExpedicionDoc),
				"fNacimiento": fecha.inputACorta(huesped.fNacimiento),
				"fEntrada": fecha.inputACorta(huesped.fEntrada),
				"nacionalidadIndex": ( paisesArr.indexOf(huesped.nacionalidad) +1 ),
				"provincia": huesped.provincia,
			}
			
			huespedDB.doc(id).update(nuevoHuespedOBJ)
		
			// VERIFICACIÓN DE DATOS. EN CASO DE ERROR SALE DE LA FUNCIÓN ANTES DE ENVIAR LOS DATOS A FIRESTORE
			//if ( validaDatos(nuevoHuespedOBJ) && salir.value.length ) {
				//alert('Verifica los datos e inténtalo de nuevo' + salir.value)
				//console.log(salir)
				//throw "No se puede enviar el formulario"
			//}
			// ----
			
			//console.log( { nuevoHuespedOBJ } )
			console.log( 'Enviando datos a FIREBASE: ', nuevoHuespedOBJ)
			

		} catch (e) {
			console.log(e)
		}
		
		// Coloca el foco en el campo del número de reserva
		document.querySelector("#reservaID").focus();
	}


//    const modificaHuesped = (OBJ, id) => huespedDB.doc(id).update(OBJ);

	let param = toRefs(huesped);
	
	return {
		documentosValidos,
		paisesArr,
		provinciasES,
		...param,
		accionFormulario,
		test
		}
	}
}
