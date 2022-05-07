const Modal = {
  template: `
  <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            This is the default title!
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="cierraModal"
          >
            x
          </button>
        </header>

        <article class="modal-body">
          <slot name="body">
            Aquí va el formulario
          </slot>
         </article>

        <footer class="modal-footer">
          <button
            type="button"
            class="btn btn-lg btn-info"
            @click="cierraModal"
          >
            Salir
          </button>
          <slot name="footer">
            Volver a Incidencias.
          </slot>
        </footer>
      </div>
    </div>
  `,
  setup(props, { emit }) {
    const cierraModal = () => {
      emit('close')
    }

    return { cierraModal }
  }
}
