const menuPrincipal = {
  template: `
    <p class="menu-principal">
	  <span>
        <router-link :to="rutaInicio">Inicio</router-link> |
        <router-link to="/incidencias">Incidencias</router-link> |
        <router-link to="/situacion">Situación</router-link> |
        
      <span v-if="opcion.login">
        <router-link to="/login">Login</router-link> |
        </span>
      <span v-if="opcion.registro">
        <router-link to="/registro">Registro</router-link> |
        </span>
      <span v-if="opcion.usuarios">
        <router-link to="/usuarios">Usuarios</router-link> |
        </span>
        
        <span  v-if="opcion.altaHuesped" ><router-link to="/hospederias">Hospederias</router-link> | </span>
        <span v-if="opcion.listaHuesped" ><router-link to="/lista-huespedes">Huéspedes</router-link> | </span>
        <span v-if="opcion.exportar" ><router-link to="/exportar-huespedes">Exportar huéspedes</router-link> | </span>
        <span v-if="opcion.huespedes" ><router-link to="/huespedes">Huéspedes</router-link> | </span>
        <span><router-link to="/huesped/02dCgWxh3aC1MoSnC9Lg">Ver huésped</router-link> | </span>


      <span v-if="opcion.leeme">
        <router-link to="/leeme">Leeme.md</router-link> |
        </span>

      <span v-if="opcion.logeado">
        <router-link :to="rutaInicio" @click="cerrarSesion">🏃‍</router-link> |
        </span>
       </span>
        
      <span>{{ hoy }}</span>
    </p>`,
    setup() {

      const opcion = reactive({
        inicio: inject('menuHome'),
        login: inject('menuLogin'),
        registro: inject('menuRegistro'),
        usuarios: inject('menuUsuarios'),
        leeme: inject('menuLeeme'),
        logeado: inject('userId'),
        exportar: inject('menuExportarHuespedes'),
        altaHuesped: inject('menuAltaHuesped'),
        listaHuesped: inject('menuListaHuesped'),
        huespedes: 'true',
      })


      const cerrarSesion = () => {
        firebase.auth().signOut()
        router.push('/')
      }

      // Control del ciclo de vida de la instancia Vue
      onMounted(() => {
        console.log('¡Menú principal montado!')
      })
      
      // Recupero la fecha de hoy desde _./store/index.js_
      const hoy = fechaHoy()

      return { cerrarSesion, opcion, hoy, rutaInicio }

    }
}
