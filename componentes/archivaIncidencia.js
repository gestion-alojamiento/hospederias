const archivaIncidencia = {
  template: `
    <button
      class="btn btn-warning btn-block mx-1"
      @click="confirma = !confirma"
      >
      📂 Archivar
    </button>
    <Teleport to="#teleport">
      <div v-if="confirma" class="alerta">
        <div class="form-group">
          <textarea
            cols=80
            rows=6
            v-model="comentario"
            placeholder="Comentario"
          >
          </textarea>
        </div>
        <div class="form-group">
          <button
            type="button"
            class="btn btn-info btn-archivo ml-2"
            @click="archiva(incidencia)">
            📂 Archivar
          </button>
          <button
            class="btn btn-danger ml-2"
            @click="confirma = false"
            >Cancelar
          </button>
        </div>
      </div>
    </Teleport>

  `,
  props: {
    incidencia: {
      type: Object,
      default: ''
    },
    usuario: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // Como los props no se mueden modificar lo mando desde el template a la función.
    const archiva = (x) => {
      try {
        x.archivo.push(
          {
            usuario: props.usuario,
            fecha: new Date(),
            comentario
          }
        )

      modificaIncidencia(x.id, { archivo: x.archivo })
      console.log({x})
      } catch (error) {
        console.log(error)
      }

      console.log('Incidencia archivada:', x.id)
    }

    const confirma = ref(false)

    const comentario = ref('')

    return { archiva, confirma, comentario }
  }
}
