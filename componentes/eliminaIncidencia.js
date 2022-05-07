const eliminaIncidencia = {
  template: `
    <button
      class="btn btn-danger btn-block mx-1"
      @click="confirma = !confirma"
      >
      🗑 Eliminar
    </button>
    <Teleport to="#teleport">
      <div v-if="confirma" class="alerta">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">¿Seguro que quieres eliminar la incidencia?</h5>
            <p class="card-text" style="display: flex; justify-content: space-evenly">Después de eliminarla ya no se podrá recuperar.</p>

            <button
              type="button"
              class="btn btn-warning m-1"
              @click="eliminar(id)">
                🗑 Eliminar
              </button>

            <router-link
              to="/incidencias"
              class="btn btn-danger m-1"
              @click="cancelar">
                🚫 Cancelar
              </router-link>

          </div>
        </div>
      </div>
    </Teleport>
  `,
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  setup(props) {

    // Al arrancar el modulo la alerta no está visible.
    const confirma = ref(false)

    // Como los props no se mueden modificar lo mando desde el template a la función.
    const eliminar = (id) => {
        incidenciaDB.doc(id).delete() && console.log('registro ' + id + ' eliminado')
        confirma.value = false
        router.push('/incidencias')
    }

    const cancelar = () => {
      confirma.value = false
      router.push('/incidencias')
    }


    return { eliminar, confirma, cancelar }
  }
}
