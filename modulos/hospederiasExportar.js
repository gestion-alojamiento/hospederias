const hospederiasExportar = {
	components: {
		hospederiasLista,
		botonHospederiasExportar
	},
  template: `
	<hospederias-lista />
	<boton-hospederias-exportar :data="data"/>
	<div class="btn btn-secondary" @click=" mostrar = !mostrar " >Exportar datos</div>
	<div v-show=" mostrar " >
	let huespedes = [
	<span v-for="x in data">
		{<span v-for="(v,i) in x">"{{ i }}": "{{ v }}",</span>},
	</span>]
	<pre>{{ codigo }}</pre>
  </div>
  `,
  setup() {
	  
	const mostrar = ref(false)
	  	  
    // Snapshot
      const data = ref([])
      cargaHuespedes((querySnapshot) => {
        data.value = []	// debo vaciar el array porque si no se superponen
        querySnapshot.forEach((doc) => {
			if ( (doc.data().fEntrada) === fechaAyer() && ! doc.data().subido) {
				data.value.push({ ...doc.data() })
			}
		})
      })
      
    // CODIGO
    
    const codigoArchivo = 'CODIGO.md'

    const codigo = ref()
    fetch(codigoArchivo)
      .then( r => r.text() )
      .then( t => codigo.value = t )

    return { data, mostrar, codigo }
  }
}
