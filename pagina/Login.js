const Login = {
  template: `
    <h1>Login</h1>
    <form @submit.prevent="Login">
      <input type="text" placeholder="Correo" v-model="correo" />
      <input type="password" placeholder="Clave" v-model="clave" />
      <input type="submit" value="Login">
      <div v-if="opcion.registro">
        <p>¿No tienes cuenta?
          <router-link to="/registro">Regístrate aquí</router-link>
        </p>
      </div>
    </form>`,
  setup() {

    const opcion = reactive({
            registro: inject('menuRegistro'),
          })

    const correo = ref('')
    const clave = ref('')

    // Necesito una función async/await para cargar el usuario antes de acceder a la página protegida.
    async function Login() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(correo.value, clave.value)
        .then(data => console.log(data))
        .catch(err => alert(err.message))

      router.push('/')
    }

    return {
      opcion,
      Login,
      correo,
      clave
    }
  }
}
