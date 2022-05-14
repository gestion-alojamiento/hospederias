// Página general que muestra el título, el menún de navegación de huéspedes y el componente de turno.
const Huesped = {
  components: {
    menuHuesped
  },
  template: `
    <h2>Huéspedes</h2>
    <menu-huesped />
    <router-view></router-view>
  `,
}
