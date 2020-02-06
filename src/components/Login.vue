<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container content is-flex-column is-vertical">
        <h2>
          <span class="icon">
            <span class="fas fa-sign-in-alt"></span>
          </span> 
          <span>Ingresar</span>
        </h2>
        <div class="content columns column is-centered">
          <div class="column is-6 has-background-light is-rounded">
            <form class="form has-text-left fadeIn" @submit.prevent="submit">
              <h4>Bienvenido <em>FletsPanel</em></h4>
              <p>Ingresa tus datos para iniciar sesión</p>
              <div class="field">
                <div class="control">
                  <input v-model="data.email" class="input is-success" type="text" placeholder="user@fletsapp.com" required>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="data.password" class="input is-success" type="password" placeholder="********" required>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button type="submit" class="button is-link is-medium is-fullwidth" :class="{'is-loading' : $root.loading}">Ingresar</button>
                </div>
              </div>  
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  methods: {
    submit : function(){
      let email = this.data.email;
      let password = this.data.password;
      this.$root.loading = true
      this.$store
        .dispatch("login", { email, password })
        .then(() => {
          this.$root.snackbar('success',"Sesión iniciada correctamente. Redirigiendo...")
          this.$root.loading = false
          setTimeout(() => {
            this.$router.push("/panel")
          },3000)
        })
        .catch(err => {
          this.$root.loading = false
          if(err.response){
            if(err.response.status === 404){
              this.$root.snackbar('error',"No se encontró el usuario")
            } else if(err.response.status === 401){
              this.$root.snackbar('error',"La constraseña es incorrecta")
            }
          }
        });
    }
  },
  data () {
    return {
      data:{}
    }
  }
}
</script>
