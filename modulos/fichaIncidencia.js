const fichaIncidencia = {
  components: {
    archivaIncidencia,
    eliminaIncidencia,
    editaIncidencia
  },
  template: `
  <div v-for="datos in data" :key="datos.id">
    <div v-if="!archivo(datos)" class="card mt-2 p-2 border-warning bg-primary text-white" :style="estilo.tarjeta">
        <h3 class="card-title">{{ datos.incidencia }}</h3>
        <div>
          <span class="h5">{{ datos.huesped }}</span>
          <span class="h6 ml-3">Apto:{{ datos.habitacion }}</span>
        </div>
        <p>{{ datos.descripcion }}</p>
        <p>{{ datos.accion }}</p>
        <p>{{ datos.resultado }}</p>
        <p :style="estilo.fecha">Fecha y hora: {{ datos.fechaHora }}</p>
        <div style="display: flex;justify-content: space-around;">
          <archiva-incidencia :incidencia="datos" :usuario="usuario" />
          <edita-incidencia :incidenciaOBJ="datos" />
          <elimina-incidencia v-if="adminUser" :id="datos.id" />
        </div>
      </div>
    </div>`,
//    inject: ['usuario'],
    emits: ['edita'],
    setup(props, { emit }) {

      // estilos ---------------------------------------------------
      const estilo = {
        tarjeta: {
        // maxWidth: '580px',
        //  background: 'cyan',
        //  color: 'black'
        //  color: 'f1c40f'
        },
        fecha: {
          fontSize: '.8rem',
          fontStyle: 'italic',
          textAlign: 'right'
        }
      }
      // ------------------------------------------------------------


      // AUTORIZACIÓN DE USUARIO --------------------------------------
      // Provide -> app.js
      // Comprobar si el usuario puede borrar Incidencias
      const adminUser = inject('adminUser')
      const userId = inject('userId')

      // Recojo el valor de _libroIncidencias.js_
      const usuario = inject('usuario');   // injecting variable in setup

      const config = inject('config')
    // FILTRO
      // Filtro de usuarios
      // Busca si aparece el alias del usuario en el campo 'archivo' de la incidencias
      // Si aparece devuelve 'true'
      const archivo = (doc) => {
        if ( !doc ) {
          console.log('No accede al filtro porque no encuentra el doc:', { doc } )
        } else {
          const ocultaIncidencia = doc.archivo.find(x => x.usuario == usuario.value);
          if ( config.debug ) {
            if ( ocultaIncidencia ) console.log('Incidencia', doc.id, 'ya ha sido archivado por', usuario.value)
            else console.log('Incicencia', doc.id, 'NO ha sido archivada todavía por', usuario.value)
          }
          return ocultaIncidencia
        }
      }

    //

    // GET
      // Recupera los datos de todas las incidencias de la colección
      // y los actualizo en la variable data.
      // Los registros se ordenan según fecha en _firebase.js_
      const data = ref([])
      alCargarIncidencias((querySnapshot) => {
        // debo vaciar el array porque si no se superponen
        data.value = []
        querySnapshot.forEach((doc) => {
          let fechaHora = fechaHoraString(doc.data())
          data.value.push({ id: doc.id,
                            fechaHora,
                            ...doc.data()
                          })
          //data.value.push({ fechaHora: h })
        })
      })

      // Crea una cadena con la fecha y hora de la incidencia.
      // Puedo mejorar la función si recibo los parámetros con ({dia, hora})
      const fechaHoraString = (x) => {
        let d, h, fechaHora
        d = x.dia ?
                x.dia.slice(0,2) +
                '/'+
                x.dia.slice(2,4) +
                '/' +
                x.dia.slice(4,) :
                  'NA'
        h = x.hora ?
              x.hora.slice(0,2) + ':' +
              x.hora.slice(2,) :
                'NA'

      d = h != 'NA' ? d + ' a las ' + h : d

      return d
      }

      return {  estilo,
                data,
                archivo,
                usuario,
                userId,
                adminUser,
              }
    }

}
