const altaIncidencia = {
  template: `
        <div class="card">
          <div class="card-title">Nueva incidencia</div>
          <div class="card-body">
            <form id="formulario" @submit.prevent="altaIncidencia" class="container">
              <div class="row">
                <span class="col-7 p-1">
                  <input  type="text"
                          v-model="fecha_incidencia"
                          @focus="fecha_incidencia = ''"
                          class="btn btn-block">
                          </span>
                <span class="col-5 p-1">
                  <input  type="text"
                          v-model="hora_incidencia"
                          @focus="hora_incidencia = ''"
                          class="btn btn-block">
                          </span>
              </div>
              <div class="form-group m-2 w-100 row">
                <label for="tast-title" class="mr-2 col-2" >Incidencia:  </label>
                <input  type="text"
                        id="incidenciaID"
                        v-model="incidencia"
                        class="form-control col-9"
                        placeholder="Incidencia">
              </div>
              <div class="form-group m-2 row">
                <label for="incidencia-hab" class="col-2">Huésped: </label>
                <input  type="text"
                        id="incidencia-hab"
                        class="form-control col-3 mx-1"
                        placeholder="Apto.">
                <input  type="text"
                        id="incidencia-huesped"
                        class="form-control col-5 mx-1"
                        placeholder="Nombre">
              </div>
              <div class="row">
                <div class="form-group m-2 col-11">
                  <textarea id="task-description"
                            rows="3"
                            placeholder="Detalles"
                            class="w-100"
                            ></textarea>
                </div>
              </div>
              <div class="row">
                <div class="form-group m-2 col-11">
                  <textarea id="incidencia-accion"
                            rows="3"
                            class="w-100"
                            placeholder="Acción"
                            ></textarea>
                </div>
              </div>
              <div class="row">
                <div class="form-group m-2 col-11">
                  <textarea id="incidencia-resultado"
                            rows="3"
                            class="w-100"
                            placeholder="Resultado"
                            ></textarea>
                </div>
              </div>
            </form>
          </div>

          <div class="card-footer">
            <router-link  to=""
                    class="btn btn-primary btn-block"
                    @click="altaIncidencia">
                      💾 Guardar
                    </router-link>
          </div>
        </div>
  `,
  setup(props, { emit }) {

    const incidencia = ref()

    // Día y hora
    const d = new Date()
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const fecha_incidencia = ref(d.toLocaleDateString("es-ES", options))

    // Hora y minutos de d
    var hora = d.getHours()
    var minutos = d.getMinutes()

    // Añado un cero si es menor de 10
    if ( hora < 10 ) hora = '0' + hora
    if ( minutos < 10 ) minutos = '0' + minutos

    const hora_incidencia = ref(hora + ':' + minutos)

    // ----------------------------------------------------------------

    // No actualiza la hora...
    onBeforeMount(() => {
      d.value = new Date()
      console.log('updated d:', d)
    })

    onUpdated(() => {
      console.log(new Date())
    })

    //  No usa el v-model de Vue 3. En su lugar es puro JavaScript para recuperar los valores del formulario
    function altaIncidencia() {


      // Datos recogidos del formulario
      const descripcion = formulario["task-description"];
      const habitacion = formulario["incidencia-hab"];
      const huesped = formulario["incidencia-huesped"];
      const accion = formulario["incidencia-accion"];
      const resultado = formulario["incidencia-resultado"]


      // Limpia las cadenas de hora y día antes de guardarla en la bd
      const limpiaCadena = (x) => {
        return x.split(/[.,:\/\\ -]/).join('')
      }

      hora_incidencia.value = limpiaCadena(hora_incidencia.value)
      fecha_incidencia.value = limpiaCadena(fecha_incidencia.value)


      try {
        nuevaIncidencia(incidencia.value, descripcion.value, habitacion.value, huesped.value, accion.value, resultado.value, hora_incidencia.value, fecha_incidencia.value);
      } catch (e) {
        console.log(e)
      }

      // El reset ya no funciona porque el v-model tiene datos cargados.
      // Tengo que eliminar todos esos datos...
      formulario.reset();
      incidencia.value = ''
      descripcion.value = ''


      // Coloca el foco en el primer campo a rellenar
      const incidenciaInput = formulario["incidenciaID"]
      incidenciaInput.focus();

      emit('close')
    }

    function nuevaIncidencia(incidencia, descripcion, habitacion, huesped, accion, resultado, hora, dia) {
      incidenciaDB.doc().set({
        incidencia,
        descripcion,
        habitacion,
        huesped,
        accion,
        resultado,
        hora,
        dia,
        fecha: new Date(),
        archivo: new Array()
      });
    }


    return { altaIncidencia, fecha_incidencia, hora_incidencia, incidencia };
  }
}
