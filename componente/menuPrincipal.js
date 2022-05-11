const menuPrincipal = {
  template: `
    <p class="menu-principal">
	  <span>
		<span>
			<router-link to="/">Inicio</router-link> | 
		</span>
        <span v-if="opcion.huespedes" >
			<router-link to="/huesped">Huéspedes</router-link> | 
		</span>
        <span v-if="opcion.huespedes" >
			<router-link to="/huesped/lista">Listado huéspedes</router-link> | 
		</span>
        <span v-if="opcion.huespedes" >
			<router-link to="/huesped/alta">Alta huéspedes</router-link> | 
		</span>
        <span v-if="opcion.leeme">
			<router-link to="/leeme">Leeme.md</router-link> |
        </span>
        <span v-if="opcion.logeado">
			<router-link to="/" @click="cerrarSesion">🏃‍</router-link> |
        </span>
      </span>
      <span>{{ hoy }}</span>
    </p>`,
    setup() {

      const opcion = reactive({
//        inicio: inject('menuHome'),
//        login: inject('menuLogin'),
//        registro: inject('menuRegistro'),
//        usuarios: inject('menuUsuarios'),
        leeme: inject('menuLeeme'),
        logeado: inject('userId'),
//        exportar: inject('menuExportarHuespedes'),
//        altaHuesped: inject('menuAltaHuesped'),
//        listaHuesped: inject('menuListaHuesped'),
        huespedes: 'true',
        config: inject('config')
      })


      const cerrarSesion = () => {
        firebase.auth().signOut()
        router.push('/')
      }

      // Control del ciclo de vida de la instancia Vue
      onMounted(() => {
        opcion?.config?.debug && console.log('¡Menú principal montado!')
      })
      
      // Recupero la fecha de hoy desde _./store/index.js_
      const hoy = fecha.corta(fecha.hoy)

      return {
		cerrarSesion,
		opcion,
		hoy,
//		rutaInicio
		}

    }
}
