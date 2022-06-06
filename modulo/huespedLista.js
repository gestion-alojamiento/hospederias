// Listado de huéspedes que permite eliminar un registro con 'eliminaRegistro'
// Permite editar un registro con el enclace: '/huesped7 + id
const huespedLista = {
	components: {
		eliminaRegistro,
	},
  template: `
  <h3>Lista Huéspedes</h3>
	<fieldset>
		<label for="nacionalidad">Nacionalidad:</label>
		<input id="nacionalidad" v-model="filtro.nacionalidad" />
	</fieldset>
	<fieldset class="row">
			<label for="nombre">Nombre:</label>
			<input id="nombre" v-model="filtro.nombre" />

			<label for="apellido1">Apellido:</label>
			<input id="apellido1" v-model="filtro.apellido1" />
	</fieldset>
	<fieldset class="row">
			<label for="apartamento">Apartamento:</label>
			<input id="apartamento" v-model="filtro.habitacionID" />

			<label for="reserva">Reserva:</label>
			<input id="reserva" v-model="filtro.reservaID" />
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
			<th>Eliminar</th>
        </tr>
    </thead>
    <tbody v-if=" ! filtroVacio">
        <tr
			style="cursor: pointer"
			v-for="{fEntrada, nombre, apellido1, apellido2, nacionalidad, tipoDocumento, numIdentificacion, habitacionID, reservaID, subido, id} in dataFiltrada"
			>
            <td>{{ fEntrada }}</td>
            <td>{{ nombre }}</td>
			<td>{{ apellido1, apellido2 }}</td>
			<td>{{ nacionalidad }}</td>
			<td>{{ tipoDocumento }}: {{ numIdentificacion }}</td>
			<td>{{ habitacionID }}</td>
			<td>{{ reservaID }}</td>
			<td><input  v-if="subido" style="text-align: center" type="checkbox" checked></td>
			<td><router-link :to="'/huesped/' + id">🖋</router-link></td>
			<td><elimina-registro :id="id" /></td>

        </tr>
        <!-- and so on... -->
    </tbody>
</table>
  `,
  setup() {
	
	const filtro = reactive({
		nacionalidad: '',
		nombre: '',
		apellido1: '',
		habitacionID: '',
		reservaID: '',
	})
	
	
	const filtroVacio = computed(() => {
		if ( filtro.nacionalidad || filtro.nombre || filtro.apellido1 || filtro.habitacionID || filtro.reservaID ) return false
		return true
	})
	
    // GET
      // Recupera los datos de todos los huéspedes con ( fEntrada === ayer())
      // y los actualizo en la variable data.
      // Los registros se ordenan según fecha en _firebase.js_
      //const huespedDB = db.collection('alojamiento').doc(Establecimiento.firebaseDOC).collection(Establecimiento.huespedCOL)
      const data = ref([])
      huespedDB.orderBy("fecha","desc").get().then(query => {
		  query.forEach((doc) => {
			  if ( true ) {
				data.value.push({ id: doc.id,
                            ...doc.data()
                })
			}
		  })
	  })

	  const filtroReservas = computed (() => {
		return data.value.filter((x) => {
			return x.reservaID
				.toLowerCase()
			  .indexOf(filtro.reservaID.toLowerCase()) != -1
		})
	})  

      const dataFiltroHabitacion = computed (() => {
		  return filtroReservas.value.filter((x) => {
			  return x.habitacionID
			  	.toLowerCase()
				.indexOf(filtro.habitacionID.toLowerCase()) != -1
		  })
	  })

      const dataFiltroNombre = computed(() => {
		  return dataFiltroHabitacion.value.filter((x) => {
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
	  
   
    return { data, filtro, dataFiltrada, filtroVacio }
  }
}
