const routes = [
	{	path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/huesped',
		name: 'huesped',
		component: Huesped,
		children: [
			{	path: '/leeme',
				name: 'huespedLeeme',
				component: huespedLeeme
			},
			{
				path: '/',
				name: 'huespedDefault',
				component: huespedFormulario
			},
			{
				path: 'lista',
				name: 'huespedLista',
				component: huespedLista
			},
			{
				path: 'alta',
				name: 'huespedAlta',
				component: huespedFormulario
			},
			{
				path: ':id',
				name: 'huespedGET',
				component: huespedGET
			},
			{
				path: 'hospederias',
				name: 'hospederias',
				component: Hospederias
			}
		]
	},
//	{ path: '/', component: Inicio },
//	{ path: '/registro', component: Inicio },
//	{ path: '/login', component: Login },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})
