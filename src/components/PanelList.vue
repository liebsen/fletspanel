<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container content is-flex-column is-vertical">
        <h4>
          <span class="icon">
            <span class="fas fa-charging-station"></span>
          </span> 
          <span v-show="$route.params.slug === 'preferences'">Preferencias</span>
          <span v-show="$route.params.slug === 'approved'">Aprobados</span>
          <span v-show="$route.params.slug === 'rejected'">Rechazados</span>

          <span>&nbsp;</span>

          <span class="has-text-weight-normal" v-show="$route.params.view === 'day'">Hoy</span>
          <span v-show="$route.params.view === 'week'">Última Semana</span>
          <span v-show="$route.params.view === 'month'">Último Mes</span>
          <span v-show="$route.params.view === 'year'">Último Año</span>
        </h4>

        <div class="columns is-multiline"> 
          <div v-for="item in data" class="column is-item is-3 has-background-light"> 
            <router-link :to="'/preference/' + item._id">
              <div>
                <span class="icon">
                  <span class="fas fa-calendar"></span>
                </span>
                <span>{{item.createdAt | formatDate}}</span><br>
                <span class="icon">
                  <span class="fas fa-clock"></span>
                </span>
                <span>{{item.createdAt | formatHour}}</span><br>
                <span class="icon">
                  <span class="fas fa-user"></span>
                </span>              
                <a :href="'tel:' + item.datos.telefono">
                  <span class="has-text-dark is-capitalized" v-html="item.datos.nombre"></span>
                </a>
                <!--span class="icon">
                  <span class="fas fa-map-marker"></span>
                </span>
                <span class="has-text-dark is-size-7" v-html="item.ruta.from.formatted_address"></span><br>
                <span class="icon">
                  <span class="fas fa-map-marker"></span>
                </span>
                <span class="has-text-dark is-size-7" v-html="item.ruta.to.formatted_address"></span><br-->
                <span v-if="item.mercadopago" class="has-text-warning" v-html="item.mercadopago.status"></span><br>
                <span class="icon">
                  <span class="fas fa-weight"></span>
                </span>
                <span class="has-text-dark">
                  <span v-html="item.carga.peso"></span><span>KG</span>
                </span><br>
                <span class="icon">
                  <span class="fas fa-route"></span>
                </span>    
                <span class="has-text-dark" v-html="item.ruta.distance.text"></span><br>
                <span class="icon">
                  <span class="fas fa-stopwatch"></span>
                </span>
                <span class="has-text-dark" v-html="item.ruta.duration.text"></span><br>
                <span class="icon">
                  <span class="fas fa-money-check-alt"></span>
                </span>              
                <span class="has-text-dark">
                  <span v-html="item.estimate.amount"></span>
                  <span v-html="item.estimate.currency"></span>
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'panel-list',
  mounted: function(){
    var t = this
    t.$root.loading = true
    const date = moment().format('YYYY-MM-DD')
    const list = t.$route.params.slug
    const view = t.$route.params.view
    var filter = { 
      limit:25, 
      find: {} 
    }
    if(view==='day'){
      filter.find.createdAt = {"$gte" : moment(date).format() }
    } else if(view==='week'){
      filter.find.createdAt = {"$gte" : moment(date).subtract(1,"week").format() }
    } else if(view==='month'){
      filter.find.createdAt = {"$gte" : moment(date).subtract(1,"month").format() }
    } else if(view === 'year'){
      filter.find.createdAt = {"$gte" : moment(date).subtract(1,"year").format() }
    }

    if(list==='preferences'){
      filter.find.mercadopago =  null
    } else if(list==='approved'){
      filter.find.mercadopago = { $ne: null}
    } else if(list==='rejected'){
      filter.find.mercadopago = { $ne: null}
    }

    axios.post( t.$root.endpoint + '/panel/search', {
      data : JSON.stringify(filter)
    }).then((res) => {
      t.$root.loading = false
      t.data = res.data.results
    }).catch(err => {
      t.$root.loading = false
      if(err){
       t.$root.snackbar('error',"Error.",30000)
      }
    })
  },
  data () {
    return {
      data:{}
    }
  }
}
</script>

<style>
  .is-item {
    border-bottom: 1px solid #dbdbdb;
  }
</style>