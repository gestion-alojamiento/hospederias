const menuHuesped = {
  template: `
	<ul class="navbar-horizontal">
		<li><router-link :to="{ name: 'huespedAlta' }"> โ Alta huรฉsped</router-link></li>
		<li><router-link to="/huesped/lista"> ๐ Buscar huรฉsped</router-link></li>
		<li><router-link to="/huesped/hospederias"> ๐ Hospederรญas</router-link></li>
		<li><router-link :to="{ name: 'huespedLeeme' }"> ๐ Lรฉeme</router-link></li>
		<li style="float:right"><a class="active" href="#about">Inicio</a></li>
		<div hidden>โยฉ๐โ๐จ๐๐๐๐ซโโ๐๐๐๐๐ฎโโ ๐จ๐น๐๐๐โ  โ๐ป๏ธ </div>
	</ul>
	`
}
