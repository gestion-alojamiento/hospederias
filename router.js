const routes = [
  { path: '/', component: huespedes },

  { 
	path: `${rutaInicio}`,
	beforeEnter() {location.href = `${rutaInicio}`},
  },
  { 
	path: '/incidencias',
	beforeEnter() {location.href = `${rutaInicio}/mod-incidencias`},
  },
  { 
	path: '/situacion',
	beforeEnter() {location.href = `${rutaInicio}/mod-situacion`},
  },  { path: '/login', component: Login },
  { path: '/huespedes', component: huespedes },
//  { path: '/hospederias', component: hospederias},
  { path: '/huesped/alta', component: huespedFormularioAlta},
  { path: '/lista-huespedes', component: huespedesLista },
  { path: '/hospederias', component: hospederias},
  { path: '/leeme', component: Leeme },
// No quiero que nadie acceda al registro pero quiero mantener el código
// Si alguien escribe la URL '/registro' lo mando al Home
  { path: '/registro', component: Home },
  { path: '/huesped/:id', component: User },

]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})
