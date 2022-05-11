const botonHospederiasCopiar = {
  template: `
	<div class="boton boton-claro" @click.prevent="copiarAlPortapapeles" >{{ text }}</div>
	<div v-if="alerta">
		<teleport to="#alerta">
			<span class="alerta">
			Texto copiado
			<div>{{ textarea }}</div>
			<div class="boton boton-alerta" @click="alerta = false">Cerrar</div>
			</span>
		</teleport>
	</div>
	<textarea
		id="copia-codigo"
		class="copia-textarea"
		v-model="textarea" placeholder="add multiple lines"></textarea>
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
	  
	const huespedesVAR = 'let huespedes = '
	
	const huespedes = computed(() => {
		return huespedesVAR + JSON.stringify(props.data)
	})

    
    // CODIGO
    const codigo = ref()
    fetch(props.code)
      .then( r => r.text() )
      .then( t => codigo.value = t )
	// --------------------------------------
	
	/* TEXTAREA */
	const textarea = computed(() => {
		return huespedes.value + ';' + codigo.value
	})
	const alerta = ref('')
	const copiarAlPortapapeles = () => {
          let testingCodeToCopy = document.querySelector('#copia-codigo')
          testingCodeToCopy.setAttribute('type', 'text') 
          testingCodeToCopy.select()

          try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            //alert('Testing code was copied ' + msg);
            alerta.value = true
          } catch (err) {
            alert('Oops, unable to copy');
          }
	  }
	  // --------------------------------------
	  
      
    return { alerta, textarea, codigo, copiarAlPortapapeles, huespedes }
  }
}
