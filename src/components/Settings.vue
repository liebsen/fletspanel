<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container content is-flex-column is-vertical">
        <h2>
          <span class="icon">
            <span class="fas fa-cog"></span>
          </span> 
          <span>Configuración</span>
        </h2>
        <h4>Indica cuales son tus preferencias.</h4>
        <p>Por favor ingresa tus datos de preferencias para tus cotizaciones.</p>
        <form class="form is-padless has-text-left fadeIn" @submit.prevent="submit">
          <div class="columns">
            <div class="column">
              <h6>Distancia</h6>
              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input class="input" v-model="data.distance.min" type="text" placeholder="Mínima" autofocus required>
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <input class="input" type="text" v-model="data.distance.max" placeholder="Máxima" required>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input class="input" v-model="data.distance.price" type="text" placeholder="Precio" autofocus required>
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <input class="input" type="text" v-model="data.distance.karma" placeholder="Karma" required>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <h6>Carga</h6>
              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input class="input" v-model="data.weight.min" type="text" placeholder="Nombre" autofocus required>
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <input class="input" type="text" v-model="data.weight.max" placeholder="Apellido" required>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input class="input" v-model="data.weight.price" type="text" placeholder="Nombre" autofocus required>
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <input class="input" type="text" v-model="data.weight.karma" placeholder="Apellido" required>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--div class="field">
             <input class="is-checkradio has-background-color is-success" v-model="acceptTerms" id="exampleCheckboxSuccess" type="checkbox" name="exampleCheckboxSuccess" checked="checked">
             <label for="exampleCheckboxSuccess"> Estoy de acuerdo con los <router-link to="/terminos">Términos y condiciones</router-link> de <em>FletsApp</em></label>
          </div-->

          <div class="field">
            <div class="control has-text-centered">
              <button type="submit" class="button is-link is-medium" :class="{'is-loading' : $root.loading}">Guardar</button>
            </div>
          </div>    
          <!--div class="field">
            <div class="control" v-if="!token().token">
              <a href="/sign-in" class="button is-text">Send as registered account</a>
            </div>
          </div-->

        </form>
      </div>
    </div>
  </section>

</template>

<script>
import axios from 'axios'
export default {
  name: 'settings',
  methods : {
    submit : function(){
      this.$root.loading = true
      axios.post( this.$root.endpoint + '/settings', this.data ).then((res) => {
        if(res.data.status==='success'){
          this.$root.snackbar('success','Tu configuración fue actualizada con éxito.',10000)
        } else {
          this.$root.snackbar('danger','Tu configuración no pudo ser actualizada. Por favor intentá nuevamente en unos instantes.')
        }
        this.$root.loading = false
      })
    }
  },
  data () {
    return {
      acceptTerms: false,
      data:{
        distance:{},
        weight:{}
      },
      msg: 'Welcome to FletsApp'
    }
  }
}
</script>
