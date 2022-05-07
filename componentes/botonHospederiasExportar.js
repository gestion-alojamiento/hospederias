const botonHospederiasExportar = {
  template: `
	<div class="boton boton-claro" @click=" mostrar = !mostrar " >{{ text }}</div>
	<div v-show=" mostrar " >
	let huespedes = [
	<span v-for="x in data">
		{<span v-for="(v,i) in x">"{{ i }}": "{{ v }}",</span>},
	</span>]
	<pre>{{ codigo }}</pre>
  </div>
  `,
  props: {
    data: {
      type: Array,
      default: ''
    },
    text: {
		type: String,
		default: 'Código'
	},
	code: {
		type: String,
		default: ''
	}
  },
  setup(props) {
	  
	const mostrar = ref(false)
    
    // CODIGO
    const codigo = ref()
    fetch(props.code)
      .then( r => r.text() )
      .then( t => codigo.value = t )
	// -----------------
	
    return { mostrar, codigo }
  }
}
