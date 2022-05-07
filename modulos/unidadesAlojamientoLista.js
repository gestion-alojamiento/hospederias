const listaAlojamiento = {
  template: `
  <h3 :class="clase" style="margin-top: 1em">{{ listado }}</h3>
	<table class="styled-table">
		<thead>
			<tr>
				<th v-for="t in mostrar">{{ cabecera[t] }}</th>
				<th v-if="notas">Observaciones</th>
				<th v-if="listado == 'Salidas'">OUT</th>
				<th>Limpia</th>
				<th v-if="listado == 'Entradas' || listado == 'Salidas'">Aviso</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="r in listaReservas">
				<td v-for="campo in mostrar">{{ r[campo] }}</td>
				<td v-if="notas">{{ r.notas }}</td>
				<td v-if="listado == 'Salidas'"><input type="checkbox" /></td>
				<td><input type="checkbox" /></td>
				<td v-if="listado == 'Entradas'">{{ r.notasEntrada }}</td>
				<td v-if="listado == 'Salidas'">{{ r.notasSalida }}</td>
			</tr>
		</tbody>
	</table>
 
  `,
  props: {
	 listaReservas: {
		  type: Array,
		  default: []
    },
	 mostrar: {
		  type: Array,
		  default: []
    },
    listado: {
		type: String,
		default: 'Lista'
	},
	notas: {
		type: Boolean,
		default: false
	},
	clase: {
		type: String,
		default: ''
	}
  },
  setup() {

	  const cabecera = {
		  'idprenota': '#Reserva',
		  'idappartamenti': '#Apto',
		  'num_persone': 'Pax',
		  'DOBLE': '2BA',
		  'SV': 'SV',
		  'commento': 'Notas',
		  'cliente': 'Cliente',
		  'pendiente': 'A pagar',
		  'notas': 'Observaciones',
		  'notasLlegada': 'Aviso',
		  'virtual': 'Pago'
	  }
	  
	  return { cabecera }

  }
}
