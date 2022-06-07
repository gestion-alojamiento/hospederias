const Hospederias = {
	components: {
		botonHospederiasCopiar,
		baseHuespedesLista
	},
  template: `
  <h3>Lista de Hospederías</h3>
  
	<base-huespedes-lista v-if="subir.length > 0" :data="subeArray" />

  	<fieldset>
		<label for="filtro">Fecha de Entrada</label>
		<input v-model="filtro" type="date" id="filtro"/>
		<boton-hospederias-copiar :data="dataFiltrada" identificador="Todos" code="CODIGO.md" />
		<boton-hospederias-copiar v-if="subir.length > 0" :data="subeArray" identificador="Selección" code="CODIGO.md" />
	</fieldset>
	
	<base-huespedes-lista :data="dataFiltrada" @subeHospederias="hospederiasRecibidas" seleccionar />

  `,
  setup() {

	  /*
	   * FILTRO
	   * 
	   */
	   const fecha = new Fecha(new Date())
	   
	   // Recupera como valor por defecto la fecha de ayer para aplicarla como filtro de la base de datos _huesped_
	   const filtro = ref(fecha.aInput(fecha.ayer))
	   
	   // Formatea la fecha seleccionada en el input para usarla como filtro contra mi base de datos
	   const filtroFechaEntrada = computed(() => {
		   d = new Date(filtro.value)
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
      
	  const filtroDocumentoValido = computed(() => {
		  return data.value.filter((x) => {
			  return x.tipoDocumento
			  .indexOf("NV") == -1
		  })
	  })
      // FILTRO FECHA DE ENTRADA
      // Filtra los registros de huéspedes según la fecha de entrada: fEntrada
      const dataFiltrada = computed(() => {
		  return filtroDocumentoValido.value.filter((x) => {
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
	  	 	  
	 /**
	  * hospederiasRecibidas
	  * Recibe los id de los huéspedes seleccionados en la lista principal
	  * Luego los copia en la variable 'subir'
	  */
	  const subir = ref([])

	  const hospederiasRecibidas = (event) => {
		  console.log('hospederiasRecibidas: ', event)
		  subir.value = event
	  }
	  /* ----------------------- */

	  
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
