const Home = {
  template: `
  <h2>Libro de incidencias</h2>
  <br />
  <pre>{{ texto }}</pre>
  `,
  setup() {
	  
    const readme = 'inicio.md'
    const texto = ref()

    fetch(readme)
      .then( r => r.text() )
      .then( t => texto.value = t )

    return { texto }
  }
}
