const situacionDelDia = {
	components: {
		listaAlojamiento
	},
  template: `
  <h2>Situación del día</h2><div> {{ new Date() }}</div>
    <h3>Libres</h3>
    <div v-if="limpias">
		<h4 style="margin-top: .3rem">Limpias</h4>
		<span v-for="(estado, A) in alojamientoUnidades">
			<span v-if="!estado.bloqueada" style="">
				<span v-if="!estado.salida"
					  style="font-size: 1.2rem; background: green; padding: .5rem; margin: 0.2rem">
						{{ A }}
				</span>
			</span>
		</span>
	</div>
	<div v-if="sucias">
		<h4 style="margin-top: .6rem">Sucias</h4>
		<span v-for="(estado, A) in alojamientoUnidades">
			<span v-if="!estado.bloqueada" style="">
				<span v-if="estado.salida"
					  style="font-size: 1.2rem; background: red; padding: .5rem; margin: 0.2rem">
						{{ A }}
				</span>
			</span>
		</span>
	</div>
  <lista-alojamiento
		v-bind:notas="false"
		listado="Entradas" 
		:listaReservas='reservasEntradas'
		:mostrar="[ 'idappartamenti', 'idprenota', 'num_persone', 'cliente', 'pendiente', 'virtual', 'DOBLE', 'SV' ]"
		/>
	<lista-alojamiento
		v-bind:notas="false"
		listado="Salidas" 
		:listaReservas='reservasSalidas'
		:mostrar="[ 'idappartamenti', 'idprenota', 'num_persone', 'cliente', 'pendiente', 'virtual' ]"
		/>
	<lista-alojamiento
		clase="print-break"
		v-bind:notas="false"
		listado="Clientes" 
		:listaReservas='reservasClientes'
		:mostrar="[ 'idappartamenti', 'idprenota', 'num_persone', 'cliente', 'pendiente', 'virtual' ]"
		/>
  `,
  setup() {
	  
	  const verTarifa = false
	  
	  const reservasARCHIVO = './json/prenota2021.json'
	  const reservasOBJS = ref([])

	  const hoyNum = diaDelAnyo(new Date())
	 
	  
	  const registraComentarios = (notas) => {
		  const comentarios = notas ? notas.split(' - ') : ''
		  const obj = {
			  'notas': [],
			  'virtual': '',
			  'notasEntrada': '',
			  'notasSalida': ''
		  }
		  if ( comentarios.length ) comentarios.forEach((str) => {
			  if ( /^Booking.com/.test(str) ) {
				   let b = str.split(' ')
				   obj.notas.push(b[1])
				   return
			   }
			  if ( /^payment_on_Booking.com/.test(str) ) {
				   obj.virtual = 'V'
				   return
			   }
			  if ( /Approximate time of arrival:/.test(str) ) {
				   let ator = str.split('arrival:')
				   let time = ator[1].split(' ')
				   let ETA = time.slice(0, 5)
				   obj.notas.push('ETA: ' + ETA.join(' '))
				   return
			   }
			   if ( /^>/.test(str) ) {
				   let aviso = str.split('>')
				   obj.notasEntrada = aviso[1]
				   obj.notasSalida = aviso[2]
				   return
			   }
		})
		return obj
		
	  }
	  
	  /*
	   * Extrae nombre y apellidos de la tabla de clientes y los añade a la reserva en clientesOBJS
	   * @param - id - string - elemento idclienti del objeto clientesOBJS
	   * 
	   */
	  const registraCliente = (id) => {
		  for ( let c = ( id -1 ); c < ( id + 1); c++ ) {
			  if ( clientesOBJS[c]['idclienti'] == id ) return {
				  'cliente': clientesOBJS[c]['cognome'] + ', ' + clientesOBJS[c]['nome'],
			  }
		  }
	  }
	  
	  const ajustes = (obj) => {
		  let arr = obj.tariffa.split(/(?:#| )+/)
		  if ( arr.indexOf('SV') != -1 ) obj.SV = 'SV'
		  if ( arr.indexOf('2BD') != -1 ) obj.DOBLE = '2BD'
		  obj = { ...obj, ...registraCliente(obj.idclienti), ...registraComentarios(obj.commento) }
		  obj.pendiente = (obj.tariffa_tot - obj.pagato ) != 0 ? Intl.NumberFormat('es-ES', {style: "currency", currency: "EUR"}).format(obj.tariffa_tot - obj.pagato) : ''

		  // Convierto el número de apartamento en un númeero para eliminar los 0s
		  // Si es salida no le aplico el filtro....
		  if (obj.idappartamenti) {
			let n = parseInt(obj.idappartamenti)
			//entradas
			if ( obj.iddatainizio == hoyNum ) { alojamientoUnidades[n]['entrada'] = true }
			////salidas
			//else if ( obj.iddatafine === ( hoyNum - 1 ) ) { alojamientoUnidades[n]['salida'] = true }
			////clientes
			//else { alojamientoUnidades[n]['cliente'] = true; }
			//console.log({n}, {obj}, {alojamientoUnidades[n]})
			console.log('idapparamenti: ' + obj.idappartamenti + ', iddatainicio: ' + obj.iddatainizio + ', hoyNum: ' + hoyNum )
		}
		
		  return obj
	  }
		  console.table(alojamientoUnidades)

	const clientesArray = []
	  
	const callback = (r) => {
		clientesArray.push(r.idclienti)
		return r.iddatainizio <= hoyNum && r.iddatafine >= ( hoyNum -1 )
	}
	
	const clientesARCHIVO = './json/clienti.json'
	let clientesOBJS = []
	
	  async function juntaDatos() {
  		clientesOBJS = await fetch(clientesARCHIVO)
			.then(c => c.json())
		reservasOBJS.value = await fetch(reservasARCHIVO)
			.then(r => r.json())
			.then(r => r.filter(callback).sort(compareValues('idappartamenti', 'asc')))
			.then(r => r.map(ajustes))

			
	}
	 
	juntaDatos()
	
	const reservasEntradas = computed(() => {
		return reservasOBJS.value.filter((r) => r.iddatainizio == hoyNum )
	})
	
	
	const reservasSalidas = computed(() => {
		return reservasOBJS.value.filter((r) => r.iddatafine == ( hoyNum - 1 ) )
	})
	
		
	const reservasClientes = computed(() => {
		let filtro = reservasOBJS.value.filter((r) => r.iddatafine != ( hoyNum - 1 ) )
		return filtro.filter((r) => r.iddatainizio != hoyNum )
	})	
	
	
	//const estadoUnidadesAlojamiento = computed(() => {
		//reservasEntradas.value.forEach((r) => {
			//alojamientoUnidades[parseInt(r.idappartamenti)][in] = r.idprenota
		//})
		//return alojamientoUnidades
	//})
	
	
    return { reservasOBJS, verTarifa, reservasEntradas, reservasSalidas, reservasClientes, alojamientoUnidades, sucias, limpias }
  }
}
