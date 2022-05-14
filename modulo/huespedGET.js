/**
 * Options API
 * Pasar a Composition API
 */

const huespedGET = {
	components: {
		huespedFormularioEdita,
	},
  template: `
	<huesped-formulario-edita :huespedOBJ="huesped" :id="$route.params.id" />
	<p style="margin-top:2rem; font-size: 1.4rem"> id: {{ r }}</p>
 `,
  data() {
	  return {
		  r: this.$route.params.id,
		  huesped: {}
	  }
  },
  methods: {
	  descargaHuesped() {
		const docRef = huespedDB.doc(this.$route.params.id)
		docRef.get().then((doc) => {
			if (doc.exists) {
				console.log("Datos del huésped:", doc.data());
				this.huesped = (doc.data())
			} else {
				console.log("No existe el usuario con id: ", this.r);
			}
		})
		.catch(error => console.log("Error al recuperar datos de huésped:", error));
	  }
  },
  mounted() {
	  this.descargaHuesped()
  }
}
