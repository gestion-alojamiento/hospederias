const listaUsuarios = {
  template: `
  <div class="usuarios">
  <div class="h3">Usuario activo: {{ aliasUsuario }}</div>
  <div class="p-4"
       :class="[ clase ]">
    <div class="row">
      <div class="col-lg-4">
        <div
          class="btn btn-dark btn-xl m-2 p-3"
          v-for="usuario in usuarios"
          :key="usuario.id"
          @click="cambiaUsuario(usuario.id, usuario.alias)">
            {{ usuario.alias }}
        </div>
      </div>
    </div>
  </div>
  </div>
  `,
  emits: ['usuario-activo'],
  setup(props, { emit }) {
  // GET
    // Colecta info de usuarios en la base de datos
    const usuarios = ref([])  // Lista de usuarios en base de datos
    const doc = db.collection('usuarios').onSnapshot(snapshot => {
      usuarios.value = snapshot.docs.map( doc => ({
        id: doc.id,
        ...doc.data()
      }))
    })
    // ----------------------------------------------------------

  // SET
    // Selección de usuario activo
    const clase = ref("")
    const aliasUsuario = ref("")
    const idUsuario = ref("")

    const cambiaUsuario = (x, y) => {
      idUsuario.value = x
      aliasUsuario.value = y
      clase.value = aliasUsuario.value
      emit('usuario-activo', aliasUsuario.value)
    }
    // -------------------------------------

    return { usuarios, aliasUsuario, cambiaUsuario, clase };
  }
}
