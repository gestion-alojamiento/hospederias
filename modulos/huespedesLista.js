const huespedesLista = {
  template: `
  <h3>Lista de Huéspedes</h3>
	<fieldset>
		<label for="nacionalidad">Nacionalidad</label>
		<input v-model="filtro.nacionalidad" />
	</fieldset>
	<fieldset class="row">
		<div class="col-3">
			<label for="nombre">Nombre</label>
			<input v-model="filtro.nombre" />
		</div>
		<div class="col-3">
			<label for="apellido1">Apellido</label>
			<input v-model="filtro.apellido1" />
		</div>
	</fieldset>
  
  <table class="styled-table">
    <thead>
        <tr>
			<th>Entrada</th>
            <th>Nombre</th>
            <th>Apellidos</th>
			<th>Nacionalidad</th>
			<th>Documento</th>
			<th># Hab.</th>
			<th>Reserva</th>
			<th>Subido</th>
			<th>Editar</th>
        </tr>
    </thead>
    <tbody>
        <tr
			style="cursor: pointer"
			v-for="{fEntrada, nombre, apellido1, apellido2, nacionalidad, tipoDocumento, numIdentificacion, habitacionID, reservaID, subido, id} in dataFiltrada"
			@mouseover="campoID = id">
            <td>{{ fEntrada }}</td>
            <td>{{ nombre }}</td>
			<td>{{ apellido1, apellido2 }}</td>
			<td>{{ nacionalidad }}</td>
			<td>{{ tipoDocumento }}: {{ numIdentificacion }}</td>
			<td>{{ habitacionID }}</td>
			<td>{{ reservaID }}</td>
			<td><input  v-if="subido" style="text-align: center" type="checkbox" checked></td>
			<td><router-link :to="'/huesped/' + id">🖋</router-link></td>
        </tr>
        <!-- and so on... -->
    </tbody>
</table>
  `,
  setup() {
	const ayer = fechaAyer()	// Lo saca de ./store/index.js
	
	const filtro = reactive({
		nacionalidad: '',
		nombre: '',
		apellido1: ''
	})
	
    // GET
      // Recupera los datos de todos los huéspedes con ( fEntrada === ayer())
      // y los actualizo en la variable data.
      // Los registros se ordenan según fecha en _firebase.js_
      const data = ref([])
      cargaHuespedes((querySnapshot) => {
        // debo vaciar el array porque si no se superponen
        data.value = []
        querySnapshot.forEach((doc) => {
			if ( true ) {
				data.value.push({ id: doc.id,
                            ...doc.data()
                })
			}
        })
        console.log( { data } )
      })

      
      const dataFiltroNombre = computed(() => {
		  return data.value.filter((x) => {
			  return x.nombre
				.toLowerCase()
				.indexOf(filtro.nombre.toLowerCase()) != -1
			})
	  })
  
      
      const dataFiltroApellido = computed(() => {
		  return dataFiltroNombre.value.filter((x) => {
			  return x.apellido1
				.toLowerCase()
				.indexOf(filtro.apellido1.toLowerCase()) != -1
			})
	  })
	  
      const dataFiltrada = computed(() => {
		  return dataFiltroApellido.value.filter((x) => {
			  return x.nacionalidad
				.toLowerCase()
				.indexOf(filtro.nacionalidad.toLowerCase()) != -1
			})
	  })
	  
    const campoID = ref('')
    
    return { data, campoID, filtro, dataFiltrada }
  }
}
