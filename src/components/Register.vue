<template>
  <section class="hero">
    <div class="has-background-white">
      <div class="container has-text-left">
        <h2 class="title">
          <span>📧 Crear nueva cuenta en FletsApp</span>
        </h2>
      </div>
    </div>   
    <div class="hero-body">
      <div class="container">
        <h2 class="subtitle">
          Por favor ingresa tu código de verificación
        </h2>
        <form v-show="!verified" class="form has-text-left" @submit.prevent="verify">
          <div class="field">
            <div class="control">
              <input class="input is-success" type="text" placeholder="Success input">
            </div>
          </div>
          <div class="field">
            <div class="control ">
              <button type="submit" class="button is-link is-medium is-fullwidth" :class="{'is-loading' : loading}">Verificar</button>
            </div>
          </div>  
        </form>
        <form v-show="verified" class="form has-text-left" @submit.prevent="register">
          <div class="field">
            <div class="control">
              <input v-model="data.fullname" class="input is-success" type="text" placeholder="Nombre completo">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="data.email" class="input is-success" type="text" placeholder="Email">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="data.phone" class="input is-success" type="text" placeholder="Teléfono">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" v-model="acceptTerms">
                Acepto los <router-link to="/terminos">Términos y condiciones</router-link>
              </label>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button type="submit" class="button is-link is-medium is-fullwidth" :class="{'is-loading' : loading}">Registrarme</button>
            </div>
          </div>  
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'register',
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    register: function() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
}
</script>
