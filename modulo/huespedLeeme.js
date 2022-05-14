const huespedLeeme = {
  template: `
    <h3>Léeme - módulo Huésped</h3>
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
