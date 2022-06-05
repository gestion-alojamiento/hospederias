const routes = [
	{	path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/alta',
		name: 'nuevoHuesped',
		component: huespedFormulario
	},
	{
		path: '/hospederias',
		name: 'hospederias',
		component: Hospederias
	},
	/**
	*  Carga el módulo huesped
	*  Este módulo tiene un menún de navegación propio y
	*  otro 'router-view' donde se cargan los módulos
	*/
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
				name: 'huespedHospederias',
				component: Hospederias
			}
		]
	},
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})
