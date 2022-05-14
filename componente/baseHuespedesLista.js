const baseHuespedesLista = {
	components: {
		eliminaRegistro,
	},
	template: `
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
				<th v-if="seleccionar">Subir</th>
				<th v-if="eliminar">Eliminar</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="({id, fEntrada, nombre, apellido1, apellido2, nacionalidad, tipoDocumento, numIdentificacion, habitacionID, reservaID, subido}, i) in data">
				<td>{{ ( ++i ) }}</td>
				<td>{{ fEntrada }}</td>
				<td>{{ nombre }}</td>
				<td>{{ apellido1, apellido2 }}</td>
				<td>{{ nacionalidad }}</td>
				<td>{{ tipoDocumento }}: {{ numIdentificacion }}</td>
				<td>{{ habitacionID }}</td>
				<td>{{ reservaID }}</td>
				<td v-if="seleccionar" style="text-align: center;"><input type="checkbox" v-model="subir" :value="id"></td>
				<td v-if="eliminar"><elimina-registro :id="id" /></td>
			</tr>
			<tr>
				<td colspan=2>Total: {{ data.length }}</td>
			</tr>
		</tbody>
		</table>
	  `,
	props: {
		data: {
		type: Array,
		default: ''
		},
		seleccionar: {
		type: Boolean,
		default: false
		},
		eliminar: {
			type: Boolean,
			default: false
		}
	},
	emits: ['subeHospederias'],
	setup(props, { emit } ) {

		/*
		* SELECCIÓN DE HUÉSPEDES PARA SUBIR A HOSPEDERÍAS
		* _subir_ es un array con los ids de cada registro seleccionado con su _checkbox_
		* la función se llama desde un watch()
		*/

		const subir = ref([])
		
		watch(() => subir.value, (x, y) => {
			emit('subeHospederias', x)
			}
		)

		return { subir }
	}
}
