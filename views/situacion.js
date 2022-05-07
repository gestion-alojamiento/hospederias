const situacion = {
  template: `
  <h3>Entradas</h3>
	<table class="styled-table">
		<thead>
			<tr>
				<th>#Apto</th>
				<th>#Reserva</th>
				<th>#pax</th>
				<th>Tarifa</th>
				<th>Pendiente</th>
				<th>Limpia</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="{ idprenota, idappartamenti, num_persone, tariffa, tariffa_tot, pagato } in reservasEntradasHoy">
				<td>{{ idappartamenti }}</td>
				<td>{{ idprenota }}</td>
				<td>{{ num_persone }}</td>
				<td>{{ tariffa }}</td>
				<td v-if="(tariffa_tot - pagato ) != 0">{{ Intl.NumberFormat('es-ES', {style: "currency", currency: "EUR"}).format(tariffa_tot - pagato) }}</td>
				<td v-else></td>
				<td><input type="checkbox" /></td>
			</tr>
		</tbody>
	</table>
  <h3>Salidas</h3>
	<table class="styled-table">
		<thead>
			<tr>
				<th>#Apto</th>
				<th>#Reserva</th>
				<th>#pax</th>
				<th>Tarifa</th>
				<th>Pendiente</th>
				<th>OUT</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="{ idprenota, idappartamenti, num_persone, tariffa, tariffa_tot, pagato } in reservasSalidasHoy">
				<td>{{ idappartamenti }}</td>
				<td>{{ idprenota }}</td>
				<td>{{ num_persone }}</td>
				<td>{{ tariffa }}</td>
				<td v-if="(tariffa_tot - pagato ) != 0">{{ Intl.NumberFormat('es-ES', {style: "currency", currency: "EUR"}).format(tariffa_tot - pagato) }}</td>
				<td v-else></td>
				<td><input type="checkbox" /></td>
			</tr>
		</tbody>
	</table>
  <h3>Clientes</h3>
	<table class="styled-table">
		<thead>
			<tr>
				<th>#Apto</th>
				<th>#Reserva</th>
				<th>#pax</th>
				<th>Tarifa</th>
				<th>Pendiente</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="{ idprenota, idappartamenti, num_persone, tariffa, tariffa_tot, pagato } in reservasClientes">
				<td>{{ idappartamenti }}</td>
				<td>{{ idprenota }}</td>
				<td>{{ num_persone }}</td>
				<td>{{ tariffa }}</td>
				<td v-if="(tariffa_tot - pagato ) != 0">{{ Intl.NumberFormat('es-ES', {style: "currency", currency: "EUR"}).format(tariffa_tot - pagato) }}</td>
				<td v-else></td>
			</tr>
		</tbody>
	</table>
  `,
  setup() {
	  
	  const reservasARCHIVO = './json/reservas.json'
	  const reservasOBJS = ref([])
	  
	  fetch(reservasARCHIVO)
		.then(r => r.json())
		.then(r => reservasOBJS.value = r)
		
	  console.log({reservasOBJS})

	  const hoyNum = diaDelAnyo(new Date())

	  const reservasEntradasHoy = computed(() => {
		  let reservasOBJSFiltradas = reservasOBJS.value.filter((r) => r.iddatainizio == hoyNum );
		  return reservasOBJSFiltradas.sort(compareValues('idappartamenti', 'asc'));
	  })
	  const reservasSalidasHoy = computed(() => {
		  let reservasOBJSFiltradas = reservasOBJS.value.filter((r) => r.iddatafine == ( hoyNum - 1 ) );
		  return reservasOBJSFiltradas.sort(compareValues('idappartamenti', 'asc'));
	  })
	  
	  const reservasClientes = computed(() => {
		  let reservasOBJSFiltro1 = reservasOBJS.value.filter((r) => r.iddatainizio < hoyNum );
		  let reservasOBJSFiltradas = reservasOBJSFiltro1.filter((r) => r.iddatafine >= hoyNum );
		  return reservasOBJSFiltradas.sort(compareValues('idappartamenti', 'asc'));
	  })
	 

    return { reservasEntradasHoy, reservasSalidasHoy, reservasClientes }
  }
}
