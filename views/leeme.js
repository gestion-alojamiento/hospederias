const Leeme = {
  template: `
    <h2>leeme</h2>
    <h4>README.md</h4>
    <br />
    <pre>{{ texto }}</pre>
  `,
  setup() {
    const readme = 'README.md'

    const texto = ref()
    fetch(readme)
      .then( r => r.text() )
      .then( t => texto.value = t )

    return { texto }
  }
}
