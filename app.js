const { createApp, ref, reactive, toRefs, inject, provide, onBeforeMount, onMounted, onUpdated, onBeforeUnmount, computed, watch } = Vue;

  const App = {
    components: {
      menuPrincipal
    },
    template: `
    <h1>{{ alojamiento }}</h1>
    <menu-principal />
    <router-view></router-view>
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
        menuListaHuesped: false,
        config: {
          debug: true
        }
      }
    },
    setup() {
      // Gestión usuarios con _firebase_
		const userId = ref()
		const adminUser = ref()

      firebase.auth().onAuthStateChanged((x) => {
          if (!x) { // not logged in
            console.log('no logeado')
            userId.value = false
            adminUser.value = false
          } else {
            userId.value = x.uid
            if ( x.uid == adminUserUID ) {
              adminUser.value = true
              console.log('Usuario logeado como administrador:', x.uid, adminUser.value)
            } else {
              adminUser.value = false
              console.log('Usuario logeado:', x.uid )
            }
          }
      })

      provide('userId', computed(() => userId.value))
      provide('adminUser', computed(() => adminUser.value))
      // ----------------------------------------------------------------------------
      
      const alojamiento = Establecimiento.alias
            
      return { alojamiento }
    }
}

createApp(App).use(router).mount("#app");
