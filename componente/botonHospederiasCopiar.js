const botonHospederiasCopiar = {
  template: `
	<div class="boton boton-claro" @click.prevent="copiarAlPortapapeles" >Copia {{ identificador }}</div>
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
		:id="textoID"
		class="copia-textarea"
		v-model="textarea" placeholder="add multiple lines">
	</textarea>
  `,
  props: {
	/**
	 * data
	 * Array con los registros de los huéspedes
	 * Llega ya filtrado con los registros que se van a subir
	 */
    data: {
      type: Array,
      default: ''
    },
	/**
	 * identificador
	 * Se muestra en el botón de 'copiar'
	 * Se utiliza como identificador del textarea para identificarlo cuando hay más de un 'botonHospederiasCopiar'
	 * Como identificador no puede contener acentos
	 */
    identificador: {
		type: String,
		default: 'Todo'
	},
	/**
	 * code
	 * Archivo con el código que se ejecuta en la página de hospederías de la policía nacional
	 * Permite modificarlo fácilmente e incluso tener varios con opciones diferentes
	 */
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

	/**
	 * identificador
	 * Define el 'id' del textarea para poder seleccionarlo al copiar los registros
	 * El identificador se muestra en el botón tal cual
	 * pero cuando se usa como 'id' del textarea hay que eliminar posibles acentos
	 */
	const textoID = eliminaAcentos(props.identificador)
	const selector = "#" + textoID

	const copiarAlPortapapeles = () => {
          let testingCodeToCopy = document.querySelector(selector)
          testingCodeToCopy.setAttribute('type', 'text') 
          testingCodeToCopy.select()

          try {
            var successful = document.execCommand('copy');
            //alert('Testing code was copied ' + msg);
            alerta.value = true
          } catch (err) {
            alert('Oops, unable to copy');
          }
	  }
	  // --------------------------------------
	  
      
    return { alerta, textarea, codigo, copiarAlPortapapeles, huespedes, textoID }
  }
}
