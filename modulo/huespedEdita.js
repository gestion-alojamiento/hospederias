const huespedFormularioEdita = {
  template: `
  <form name="huespedFormulario">
    <div class="card">
    
      <div class="card-title">
          Datos del Huésped
      </div>
      
      <div class="card-body">
      
			<fieldset class="row">
			
				<div class="col-4">
					<label for="reservaNum">#Reserva</label>
                    <input type="text" 
						v-model="reservaNum"
						@input="() => (reservaNum = reservaNum.toUpperCase())"
						class="form-control"
						style="width: 10rem;"
						id="reservaID">
				</div>
				
				<div class="col-4">
					<label for="habitacionNum">#Habitación</label>
					<input type="text" 
						v-model="habitacionNum"
						@input="() => (reservaNum = reservaNum.toUpperCase())"
						class="form-control"
						style="width: 10rem;"
						id="habitacionNum">
				</div>
            
			</fieldset>
		
			<fieldset class="row">
        
				<div class="col-4">
					<label for="nacionalidad">* Nacionalidad</label>
					<select v-model="nacionalidad" name="nacionalidad">
						<option>{{ nacionalidad }}</option>
						<option v-for="pais in paisesArr" key="pais">{{ pais }}</option>
					</select>
				</div>
            
				<div v-if="nacionalidad == 'ESPAÑA'" class="col-4">
					<label for="provincia">Provincia</label>
					<select v-model="provincia">
					  <option>{{ provincia }}</option>
                      <option v-for="provincia in provinciasES">{{ provincia }}</option>
					</select>
				</div>
            
			</fieldset>
		
			<fieldset class="row">
			
					<div class="col-4">
						<label for="nombre">* Nombre</label>
						<input v-model="nombre"
							@input="(val) => (nombre = nombre.toUpperCase())"
							class="form-control"
							maxlength="25"
							id="nombre">
					</div>
            
					<div class="col-4">
					<label for="apellido1">* Primer Apellido</label>
						<input v-model="apellido1"
							@input="() => (apellido1 = apellido1.toUpperCase())"
							class="form-control"
							maxlength="25">
					</div>
            
					<div v-if="nacionalidad == 'ESPAÑA'" class="col-4">
						<label class="control-label  loadedTooltip" data-original-title="" title="">Segundo Apellido</label>
						<input v-model="apellido2"
								@input="() => (apellido2 = apellido2.toUpperCase())"
								class="form-control"
								maxlength="24">
					</div>
					
				</fieldset>
				
				<fieldset class="row">
				
					<div class="col-6">
						<label for="tipoDocumento">* Tipo de Documento</label>
						<select v-model="tipoDocumento">
							<option v-for="(documento, key) in documentosValidos" :value="key" :key="key">{{ documento }}</option>
						</select>
					</div>
					
				</fieldset>
			
				<fieldset class="row">
            
					<div class="col-4">
						<label for="numIdentificacion">* Nº documento</label>
						<input v-model="numIdentificacion"
							@input="() => (numIdentificacion = numIdentificacion.toUpperCase())"
							class="form-control"
							maxlength="14">
					</div>

					<div class="col-4">
						<label for="fExpedicionDoc">* F. Expedición</label>
						<input v-model="fExpedicionDoc"
							class="form-control"
							maxlength="8"
							type="date">
					</div>

				</fieldset>
        
				<fieldset class="row">
        
					<div class="col-4">
						<label for="fNacimiento">* F. Nacimiento</label>
						<input v-model="fNacimiento"
							size="10" maxlength="8"
							class="form-control"
							type="date">
					</div>

					<div class="col-4">
						<label for="sexo">* Sexo</label>
						<select v-model="sexo" class="form-control">
								<option value="M">MASCULINO</option>
								<option value="F">FEMENINO</option>
						</select>
					</div>
					
				</fieldset>
			</div>
			
				<div class="card-footer row">
					<router-link  to=""
						class="btn btn-primary btn-block"
						@click="editaHuesped">
							💾 Guardar
					</router-link>
                  
					<div class="col-4">
						<label class="control-label  loadedTooltip" data-original-title="" title="">* Fecha Entrada</label>
						<input type="date" v-model="fEntrada"
							class="form-control input-sm calendario loaded loadedBlur"
							data-obligatorio="true">
					</div>
					
				</div>
			</div>
		</form>
		<div>huespedOBJ: {{ huespedOBJ }}</div>
		<div>objeto: {{ objeto }}</div>
  `,
  props: {
	  huespedOBJ: {
		type: Object,
		required: true
	  }
  },
  setup(props) {
	  
	    const huesped = reactive({
			nombre: props.huespedOBJ.nombre,
			apellido1: '',
			apellido2: '',
			numIdentificacion: '',
			sexo: valorDeInicio.sexo,
			fNacimiento: '',
			fExpedicionDoc: '',
			reservaNum: '',
			habitacionNum: '',
			fEntrada: ''
		})
	  
	  	/*
	 * 
	 * VALORES POR DEFECTO
	 * 
	 */
	 
		const objeto = ref('')
		objeto.value = props.huespedOBJ
	 
		const nacionalidad = ref('')
		//		const nacionalidad = ref(props.huespedOBJ.nacionalidad)


		const region = ref('Elige la región de residencia')
		const provincia = ref('Provincia de residencia')

		const tipoDocumento = ref("D")
		const fExpedicionDocES = computed(() => {
			x = new Date(huesped.fExpedicionDoc)
			return x.toLocaleDateString('es-ES', fechaFormato)
		})

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
	 * 
	 * VALIDACIONES
	 * 
	 */
	 
	 const validaDatos = ( { nombre, apellido1, numIdentificacion, fExpedicionDoc, fEntrada } ) => {
		 
		if ( ! nombre || ! apellido1 ) alert('¡El nombre y apellidos son imprescindibles!')

		if ( ! numIdentificacion ) nuevoHuespedOBJ.numIdentificacion = '0000000'
		if ( ! fExpedicionDoc || fExpedicionDoc == "Invalid Date" ) nuevoHuespedOBJ.fExpedicionDoc = '01/01/2021'
		if ( ! fEntrada) nuevoHuespedOBJ.fEntrada = fechaAyer()
		
		if ( ! fechaEsPasado(fExpedicionDoc) ) alert('La fecha de Expedición no es correcta! ' + fExpedicionDoc)
	}
	
	  const editaHuesped = () => {
		  console.log('edita')
	  }
	  
	return {
		provinciasES,
		provincia,
		region,
		paisesArr,
		documentosValidos,
		tipoDocumento,
		nacionalidad,
		editaHuesped,
		fExpedicionDocES,
		...toRefs(huesped),
		objeto
    }
	}
}
