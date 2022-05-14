// Muestra un modal para eliminar un huésped
const eliminaRegistro = {
  template: `
    <button
      class="boton boton-alerta"
      @click="confirma = !confirma"
      >
      🗑
    </button>
    <Teleport to="#teleport">
      <div v-if="confirma" class="alerta">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Eliminar registro</h5>
            <p>id: {{ id }}</p>
            <p class="card-text" style="display: flex; justify-content: space-evenly">No se podrá recuperar después de eliminarlo.</p>

            <button
              class="boton boton-alerta mx-1"
              @click="eliminar(id)">
                🗑 Eliminar
              </button>

            <router-link
              to="/huesped/lista"
              class="boton boton-claro mx-1"
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
  setup() {

    // Al arrancar el modulo la alerta no está visible.
    const confirma = ref(false)

    // Como los props no se mueden modificar lo mando desde el template a la función.
    const eliminar = (id) => {
        const resultado = huespedDB.doc(id).delete()
        console.log('registro ' + id + ' eliminado', resultado)
        confirma.value = false
        router.push('/huesped/lista')
    }

    const cancelar = () => {
      confirma.value = false
      router.push('/huesped/lista')
    }


    return { eliminar, confirma, cancelar }
  }
}
