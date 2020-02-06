<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container content is-flex-column is-vertical">
        <h2>
          <span class="icon">
            <span class="fas fa-ticket-alt"></span>
          </span> 
          <span>Código de invitación</span>          
        </h2>
        <div class="content columns is-centered ">
          <div class="column is-5 is-step is-step-code has-background-light is-rounded" v-show="!codeChecked">
            <h4>Introduce tu código de invitación a <em>FletsApp</em></h4>
            <p>Para validar una cuenta en <em>FletsApp</em> necesitas un código de invitación único para cada usuario. Si todavía no lo tenés podés solicitarlo directamente. <router-link to="/contacto#solicitar-codigo-de-invitacion">Solicitar código de invitación.</router-link></p>
            <form class="form has-text-left fadeIn" @submit.prevent="validate">
              <div class="field">
                <div class="control">
                  <input v-model="data.code" class="input is-info" type="text" placeholder="Código de invitación" required autofocus>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button type="submit" class="button is-link is-medium is-fullwidth" :class="{'is-loading' : $root.loading}">Validar mi código de invitación</button>
                </div>
              </div>  
            </form>
          </div>

          <div class="column is-5 is-step is-step-data has-background-light is-rounded" v-show="codeChecked">
            <h4>Introduce tus datos para acceder a tu <em>FletsPanel</em>. tu código de invitación a <em>FletsApp</em></h4>
            <p>Para crear una cuenta en <em>FletsApp</em> necesitas un código de invitación. Si todavía no lo tenés pedilo. <router-link to="/contacto">Solicitar código de invitación.</router-link></p>
            <form class="form has-text-left fadeIn" @submit.prevent="submit">
              <div class="field">
                <div class="control">
                  <input v-model="data.name" class="input is-success" type="text" placeholder="¿Cómo te llamas?" required autofocus>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="data.email" class="input is-success" type="email" placeholder="Email" required>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="data.email2" class="input is-success" type="email" placeholder="Confirmar Email" required>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="data.password" class="input is-danger" type="password" placeholder="Contraseña" required>
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
      codeChecked: false,
      data: {}
    };
  },
  methods: {
    validate: function(){
      var t = this
      t.$root.loading = true
      axios.post( t.$root.endpoint + '/account/validate_code', t.data).then((res) => {
        t.$root.loading = false
        t.codeChecked = t.data
        t.$root.snackbar('success',"Código verificado exitosamente. Ahora podés registrarte.",15000)
        document.querySelectorAll('.is-step').forEach(e => {
          e.style.display = 'none'
        })
        document.querySelector('.is-step-data').style.display = 'block'
      }).catch(err => {
        t.$root.loading = false
        if(err){
          t.codeChecked = false
          if(err.response.status === 403){
            t.$root.snackbar('error',"Error. El email <em>" + t.data.email + "</em> ya se encuentra registrado. Probá con otro email.",30000)
          } else if(err.response.status === 404){
            t.$root.snackbar('error',"Error. El Código <em>" + t.data.code + "</em> es inválido. Probá con otro código.",30000)
          } else if(err.response.status === 500){
            t.$root.snackbar('error',"Hubo un error al verificar código.")
          }
        }
      })
    },
    submit: function() {
      var t = this
      if(t.data.email != t.data.email2)
        return t.$root.snackbar('error',"El email y su confirmación deben coincidir.")
      if(!t.acceptTerms)
        return t.$root.snackbar('error',"Debes aceptar nuestros términos y condiciones para crear una cuenta") 
      t.$root.loading = false
      delete t.data.email2 
      this.$store
        .dispatch("register", t.data)
        .then(() => this.$router.push("/register-success"))
        .catch(err => console.log(err));
    }
  }
}
</script>

<style>
  
  .is-step {
    display: none;
  }

  .is-step:nth-child(1){
    display: block;
  }

</style>