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
  // En caso de querer enviar datos fuera del setup()
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
		
		const alojamiento = Establecimiento.alias
		const config = {
			debug: true
		}

		
		/*
		 * FIREBASE AUTH
		 * 
		 */
		 
		let log = null
		 
		const userId = ref()
		const adminUser = ref()
      firebase.auth().onAuthStateChanged((x) => {
          if (!x) { // not logged in
            log = 'no logeado'
            userId.value = false
            adminUser.value = false
          } else {
            userId.value = x.uid
            if ( x.uid == adminUserUID ) {
              adminUser.value = true
              log = 'Usuario logeado como administrador:', x.uid, adminUser.value
            } else {
              adminUser.value = false
              log = 'Usuario logeado:', x.uid
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
