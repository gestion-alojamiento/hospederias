const User = {
	components: {
		huespedFormularioEdita,
	},
  template: `
	<div>User {{ $route.params.id }}</div>
	<div>{{ r }}</div>
	<huesped-formulario-edita :huespedOBJ="huesped" />

 `,
  data() {
	  return {
		  r: this.$route.params.id,
		  huesped: {}
	  }
  },
  methods: {
	  descargaHuesped() {
		const docRef = db.collection('alojamiento').doc('WhiteApartments').collection('huesped').doc(this.$route.params.id)
		docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        this.huesped = (doc.data())
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
	  }
  },
  mounted() {
	  this.descargaHuesped()
  }
}
