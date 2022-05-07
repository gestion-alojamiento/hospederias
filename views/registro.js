const Registro = {
  template: `
  <h1>Registro</h1>
  <form @submit.prevent="Registro">
    <input type="text" placeholder="Correo" v-model="correo" />
    <input type="password" placeholder="Clave" v-model="clave" />
    <input type="submit" value="Registro">
    <p>Ya tienes cuenta?
      <router-link to="/login">Accede aquí</router-link>
    </p>
  </form>`,
  setup() {
    const correo = ref('')
    const clave = ref('')

    const Registro = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(correo.value, clave.value)
        .then(user => {
          alert(user)
        })
        .catch(err => alert(err.message))
    }

    return {
      Registro,
      correo,
      clave
    }
  }
}
// canMises2021!white
