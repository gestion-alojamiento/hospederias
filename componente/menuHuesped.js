const menuHuesped = {
  template: `
	<ul class="navbar-horizontal">
		<li><router-link :to="{ name: 'huespedAlta' }"> ➕ Alta huésped</router-link></li>
		<li><router-link to="/huesped/lista"> 🔍 Buscar huésped</router-link></li>
		<li><router-link to="/huesped/hospederias"> 🛂 Hospederías</router-link></li>
		<li><router-link :to="{ name: 'huespedLeeme' }"> 📑 Léeme</router-link></li>
		<li style="float:right"><a class="active" href="#about">Inicio</a></li>
		<div hidden>➕©👁‍🗨🛂🔍🔎📫✏✒🖋🖊🖌🖍👮‍♀ 👨🕹📚📃📄✍  ‍💻️ </div>
	</ul>
	`
}
