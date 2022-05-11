const menuHuesped = {
  template: `
	<ul class="navbar-horizontal">
		<li><router-link to="/huesped/alta"> ➕ </router-link></li>
		<li><router-link to="/huesped/lista"> 🔍 </router-link></li>
		<li><router-link to="/huesped/hospederias"> 🛂 </router-link></li>
		<li><router-link :to="{ name: 'huespedLeeme' }"> 📑 </router-link></li>
		<div hidden>➕©👁‍🗨🛂🔍🔎📫✏✒🖋🖊🖌🖍👮‍♀ 👨🕹📚📃📄✍  ‍💻️</div>
	</ul>
	`
}
