const { createApp, ref, reactive, toRefs, inject, provide, onBeforeMount, onMounted, onUpdated, onBeforeUnmount, computed, watch } = Vue;

  const App = {
    components: {
      menuPrincipal,
      pieDePagina
    },
    template: `
    <h1>{{ alojamiento }}</h1>
    <menu-principal />
    <router-view></router-view>
    <pie-de-pagina />
    `,

  /**
   * ENVÍA VARIABLES DE CONFIGURACIÓN
   * Método para usar fuera de la función setup()
   * Otras variables se definen dentro del setup() y necesitan enviarse desde allí
   */
    provide() {
      return {
        menuRegistro: false,
        menuHome: true,
        menuLogin: false,
        menuUsuarios: false,
        menuLeeme: true,
        menuAltaHuesped: false,
        menuExportarHuespedes: false,
        menuListaHuesped: false
      }
    },
    setup() {
		
    // Establecido en index.js
		const alojamiento = Establecimiento.alias

    /**
     * MODO DE DEPURACIÓN
     */
		const config = {
			debug: true
		}

		
		/*
		 * FIREBASE AUTH
		 * Comprueba si el usuario está registrado y si es editor o administrador
		 */
		 
		let log = null
		 
		const userId = ref()
		const adminUser = ref()
      firebase.auth().onAuthStateChanged((x) => {
          if (!x) { // not logged in
            log = 'Usuario no logeado'
            userId.value = false
            adminUser.value = false
          } else {
            userId.value = x.uid
            if ( x.uid == adminUserUID ) {
              adminUser.value = true
              log = 'Usuario registrado como administrador:'
            } else {
              adminUser.value = false
              log = 'Usuario registrado como editor:'
            }
          }
          
          config.debug && console.log(log)
      })

      provide('userId', computed(() => userId.value))
      provide('adminUser', computed(() => adminUser.value))
      provide('config', config)
      // ----------------------------------------------------------------------------
      	   
            
      return { alojamiento }
    }
}

createApp(App).use(router).mount("#app");
