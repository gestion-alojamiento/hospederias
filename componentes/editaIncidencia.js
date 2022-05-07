const editaIncidencia = {
  template: `
    <button
      class="btn btn-secondary btn-block mx-1"
      @click="confirma = !confirma"
      >
      ✏ Editar
    </button>
    <Teleport to="#teleport">
      <div v-if="confirma" class="alerta">
        <div class="btn btn-lg btn-dark btn-block rounded">Actualizar Incidencia</div>
        <form id="formulario" @submit.prevent="actualizaIncidencia" style="background: background: rgba(0, 128, 0, 0.8)">
          <div class="form-group m-2" style="display: flex;flex-direction: row;justify-content: center">
            <label for="tast-title" class="mr-4" >Incidencia:  </label>
            <input type="text" v-model="incidencia" class="form-control w-75" placeholder="Incidencia"
              autofocus>
          </div>
          <div class="form-group m-2" style="display: flex;flex-direction: row;justify-content: center">
            <label for="habitacion" class="pr-4">Huésped: </label>
            <input type="text" v-model="habitacion" class="form-control px-1" placeholder="Apto.">
            <input type="text" v-model="huesped" class="form-control ml-2 px-1" placeholder="Nombre">
          </div>
          <div class="form-group m-2">
            <textarea v-model="descripcion" rows="3" cols="80" placeholder="Detalles"></textarea>
          </div>
          <div class="form-group m-2">
            <textarea v-model="accion" rows="3" cols="80" placeholder="Acción"></textarea>
          </div>
          <div class="form-group m-2">
            <textarea v-model="resultado" rows="3" cols="80" placeholder="Resultado"></textarea>
          </div>
          <div class="form-group m-2"  style="display: flex;flex-direction: row;justify-content: center">
            <button class="btn btn-primary m-3" type="submit">
              💾 Guardar
            </button>
            <button class="btn btn-danger m-3" @click="confirma = false">🚫 Cancelar</button>
          </div>
        </form>
      </div>
    </Teleport>

  `,
  props: {
    incidenciaOBJ: {
      type: Object,
      default: ''
    }
  },
  setup(props) {

    // const x = reactive( {
    //   ...toRefs(props.incidenciaOBJ)
    // })


    const incidencia = ref(props.incidenciaOBJ.incidencia)
    const habitacion = ref(props.incidenciaOBJ.habitacion)
    const huesped = ref(props.incidenciaOBJ.huesped)
    const descripcion = ref(props.incidenciaOBJ.descripcion)
    const accion = ref(props.incidenciaOBJ.accion)
    const resultado = ref(props.incidenciaOBJ.resultado)
    const id = props.incidenciaOBJ.id


    const actualizaIncidencia = (x) => {
      try {
        console.log('id:', id)

        modificaIncidencia(id, {
          incidencia: incidencia.value,
          habitacion: habitacion.value,
          huesped: huesped.value,
          descripcion: descripcion.value,
          accion: accion.value,
          resultado: resultado.value
         })
        confirma.value = false
        } catch (error) {
          console.log(error)
        }
    }

    const confirma = ref(false)

    return { actualizaIncidencia, confirma, incidencia, habitacion, huesped, descripcion, accion, resultado }
  }
}
