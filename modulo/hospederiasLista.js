const hospederiasLista = {
	components: {
		botonHospederiasCopiar,
		baseHuespedesLista
	},
  template: `
  <h3>Lista de Hospederías</h3>
  
	<base-huespedes-lista v-if="subir.length > 0" :data="subeArray" />
	<base-huespedes-lista :data="dataFiltrada" @subeHospederias="hospederiasRecibidas" seleccionar />

  	<fieldset>
		<label for="fEntrada">Fecha de Entrada</label>
		<input v-model="filtro.fEntrada" type="date" />
		<boton-hospederias-copiar :data="dataFiltrada" text="Copiar Todos" code="CODIGO.md" />
		<boton-hospederias-copiar v-if="subir.length > 0" :data="subeArray" text="Copiar Selección" code="CODIGO.md" />
	</fieldset>
	
  <table class="styled-table">
    <thead>
        <tr>
			<th>#</th>
			<th>Entrada</th>
            <th>Nombre</th>
            <th>Apellidos</th>
			<th>Nacionalidad</th>
			<th>Documento</th>
			<th># Hab.</th>
			<th>Reserva</th>
			<th>Subir</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="({id, fEntrada, nombre, apellido1, apellido2, nacionalidad, tipoDocumento, numIdentificacion, habitacionID, reservaID, subido}, i) in dataFiltrada">
			<td>{{ ( i + 1 ) }}</td>
            <td>{{ fEntrada }}</td>
            <td>{{ nombre }}</td>
			<td>{{ apellido1, apellido2 }}</td>
			<td>{{ nacionalidad }}</td>
			<td>{{ tipoDocumento }}: {{ numIdentificacion }}</td>
			<td>{{ habitacionID }}</td>
			<td>{{ reservaID }}</td>
			<td style="text-align: center"><input type="checkbox" v-model="subir" :value="id" ></td>
        </tr>
        <tr>
			<td colspan="2">Total: {{ dataFiltrada.length }}</td>
		</tr>
    </tbody>
</table>
    <div style="visibility: hidden;">{{ subir }}</div>
  `,
  setup(props) {
	  const hospederiasRecibidas = (event) => {
		  console.log('hospederiasRecibidas: ', event)
	  }

	  /*
	   * FECHAS
	   * 
	   */
	   const fecha = new Fecha(new Date())

	
	const filtro = reactive({
		nacionalidad: '',
		nombre: '',
		apellido1: '',
		fEntrada: fecha.aInput(fecha.ayer),
	})
	
	// Crea una nueva cadena con la fecha seleccionada en el formato que usa mi base de datos y la de la Policía Nacional
	const filtroFechaEntrada = computed(() => {
		d = new Date(filtro.fEntrada)
		return fecha.corta(d)
	})

	/*
	 * DATA
	 * Recupera todos los huéspedes de la colección de FIRESTORE
	 * Usa SNAPSHOT, pero creo que un get() sería suficiente
	 */
	 
      const data = ref([])
      
      if (false) {
		// GET
		// Los registros se ordenan por fecha en _firebase.js_ antes de cargar aquí el resultado
		huespedDB.orderBy("fecha","desc").get().then(query => {
		  query.forEach((doc) => {
			  if ( true ) {
				data.value.push({ id: doc.id,
                            ...doc.data()
                })
			}
		  })
	  })
      
	  } else {
		  
		// SNAPSHOT
		huespedDATAxFecha((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				data.value.push({ id: doc.id,
                            ...doc.data()
                })
			})
		})
	  }
      
      // FILTRO FECHA DE ENTRADA
      // Filtra los registros de huéspedes según la fecha de entrada: fEntrada
      const dataFiltrada = computed(() => {
		  return data.value.filter((x) => {
			  return x.fEntrada
				.indexOf(filtroFechaEntrada.value) != -1
			})
	  })
	  
	  // --------------------------------------------------------------
	 
	 /*
	  * SELECCIÓN DE HUÉSPEDES PARA SUBIR A HOSPEDERÍAS
	  * _subir_ es un array con los ids de cada registro seleccionado con su _checkbox_
	  * _subeArray_ contiene los huéspedes seleccionados a exportar a hospederías
	  * _construyeArray()_ carga los huéspedes a ${subeArray}
	  * la función se llama desde un watch()
	  * 
	  */
	  
	 const subir = ref([])
	 const subeArray = ref([])	  
     const construyeArray = (obj) => {
		 subeArray.value = []
		 dataFiltrada.value.forEach((x) => {
	 		 for (const item in obj) {
				 if ( obj[item] == x.id ) subeArray.value.push(x)
			 }
		 })
	 }
	 
	 watch(() => subir.value, (x, y) => {
		construyeArray(x)
		}
	)

    // ------------------------------------------------------------------
      
    return { dataFiltrada, filtro, filtroFechaEntrada, subir, subeArray, hospederiasRecibidas  }
  }
}
