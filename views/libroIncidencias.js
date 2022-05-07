const libroIncidencias = {
    components: {
      altaIncidencia,
      editaIncidencia,
      fichaIncidencia,
      listaUsuarios,
      Modal
    },
    template: `
    <h2>Libro de incidencias</h2>
    <!-- Edición de incidencia -->
      <div v-if="edicion" >
        <edita-incidencia :id=incidenciaId />
        <button type="button" class="btn btn-warning btn-lg" @click="edicion = !edicion">
          Volver
        </button>
      </div>
    <!-- -->

    <!-- Página principal -->
      <div v-else >
        <header class="modal-header">
          Registro de Incidencias
        </header>
        <!-- Nueva incidencia (Modal) -->
        <button
          type="button"
          class="btn btn-lg btn-warning"
          @click="showModal"
        >
          Nueva Incidencia
        </button>

        <Modal
          v-show="isModalVisible"
          @close="closeModal"
        >
          <template v-slot:header>
            <h2>White Apartments</h2>
          </template>

          <template v-slot:body>
          <alta-incidencia @close="closeModal" ></alta-incidencia>
          </template>

          <template v-slot:footer>
            Vuelve al listado de incidencias
          </template>
        </Modal>
        <!-- Fin nueva incidencia -->

        <!-- Listado de incidencias -->
        <lista-usuarios @usuarioActivo="cambiaUsuario" />
        <div class="row">
            <div class="card-columns">
              <ficha-incidencia @edita="editaIncidencia" />
            </div>
        </div>
        <!-- Fin de listado de incidencias -->

      </div>
      <!-- Fin de página principal -->
      <div id="teleport"></div>

  `,
  // En caso de querer enviar datos fuera del setup()
  //    provide() {
  //      return {
  //        usuario: 'test'
  //      }
  //    },
    setup() {
      // Variables sin importancia -----------------
      const name = ref("Libro de Incidencias");
      const fecha = ref(new Date())
      // --------------------------------------------

      // Selección de usuario activo -------------------
      const usuarioAlias = ref('jose')
      const usuarioActivo = ref()
      const cambiaUsuario = (event) => {
        usuarioAlias.value = event
        return event
      }

      provide('usuario',
        computed(() => usuarioAlias.value)
      )
      // ---------------------------------------------

      // Modal para alta de Incidencia -----------------------
      const isModalVisible = ref(false)

      const showModal = () => {
        isModalVisible.value = true
      }
      const closeModal = () => {
        formulario.reset();
        isModalVisible.value = false
      }
      // --------------------------------------

      // Edita incidencia ------------------
      // Abre el módulo editaIncidencia y oculta el listado.
      const edicion = ref(false)
      const incidenciaId = ref('')

      const editaIncidencia = (id) => {
        incidenciaId.value = id
        edicion.value = true
      }
      // ----------------------------------------------------

      // Control de acceso a contenido reservado.
      const copruebaAutentificacion = firebase.auth().onAuthStateChanged((user) => {
          if (!user) { // not logged in
              alert('Debes estar logeado para acceder a este contenido. Te redirigiremos a la página de login.')
              router.push('/login')
          }
      })

      onBeforeUnmount(() => {
          // clear up listener
          copruebaAutentificacion()
      })
      // ------------------------------------------------------------------------

      // Control del ciclo de vida de la instancia Vue
      onMounted(() => {
      console.log('montado!')
      })

      onUpdated(() => {
      console.log('¡Formulario montado!')
      const incidenciaInput = formulario["incidenciaID"];
      incidenciaInput.focus();
      })
      // ---------------------------------------------------

      return {  incidenciaId, editaIncidencia, edicion, name, showModal, closeModal, isModalVisible, usuarioAlias, cambiaUsuario, fecha }
    },

}
