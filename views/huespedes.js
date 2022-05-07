const huespedes = {
  components: {
    huespedesLista,
  },
  template: `
    <h2>Huéspedes</h2>
	<ul class="navbar-horizontal">
		<li><router-link to="/huesped/alta">Alta de nuevos huéspedes</router-link></li>
		<li><router-link to="/hospederias">Hospederias</router-link></li>
	</ul>
    <huespedes-lista />
  `,
}
