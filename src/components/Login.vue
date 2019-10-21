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
        <h4>Bienvenido <em>FletsPanel</em>. Ingresa tus datos para entrar.</h4>
        <form class="form has-text-left fadeIn" @submit.prevent="login">
          <div class="field">
            <div class="control">
              <input v-model="data.email" class="input is-success" type="text" placeholder="user@fletsapp.com">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="data.password" class="input is-success" type="text" placeholder="********">
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
  </section>
</template>

<script>
export default {
  name: 'login',
  methods: {
    submit : function(){
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  },
  data () {
    return {
      data:{},
      msg: 'Welcome to FletsApp'
    }
  }
}
</script>
