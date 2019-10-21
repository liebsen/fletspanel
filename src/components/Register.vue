<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container content is-flex-column is-vertical">
        <h2>
          <span class="icon">
            <span class="fas fa-user"></span>
          </span> 
          <span>Crear cuenta</span>
        </h2>
        <h4>Crea tu cuenta en <em>FletsApp</em></h4>
        <p>Para crear una cuenta en <em>FletsApp</em> necesitas un código de invitación. Si todavía no lo tenés pedilo. <router-link to="/contacto">Solicitar código de invitación.</router-link></p>
        <form class="form has-text-left fadeIn" @submit.prevent="submit">
          <div class="field">
            <div class="control">
              <input v-model="data.code" class="input is-info" type="text" placeholder="Código de invitación">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="data.name" class="input is-success" type="text" placeholder="Nombre completo">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="data.email" class="input is-success" type="text" placeholder="Email">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="data.password" class="input is-danger" type="password" placeholder="Contraseña">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="data.password2" class="input is-danger" type="password" placeholder="Confirmar contraseña">
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
              <button type="submit" class="button is-link is-medium is-fullwidth" :class="{'is-loading' : $root.loading}">Registrarme</button>
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
      acceptTerms: false,
      data: {}
    };
  },
  methods: {
    submit: function() {
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
