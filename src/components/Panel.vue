<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container content is-flex-column is-vertical">
        <h4>
          <span class="icon">
            <span class="fas fa-charging-station"></span>
          </span> 
          <span>Tu Actividad</span>
        </h4>
        <h6 class="has-text-right">
          <span>Hoy</span>
        </h6>
        <div class="columns">
          <router-link to="/panel/preferences/day" class="column has-background-info">
            <p class="has-text-white">Preferencias</p>
            <h1 class="has-text-white has-text-centered preferences">
              <span v-html="data.day.preferences"></span>
            </h1>
          </router-link>
          <router-link to="/panel/approved/day" class="column has-background-success">
            <p class="has-text-white">Aprobados</p>
            <h1 class="has-text-white has-text-centered approved">
              <span v-html="data.day.approved"></span>
            </h1>
          </router-link>
          <router-link to="/panel/rejected/day" class="column has-background-danger">
            <p class="has-text-white">Rechazados</p>
            <h1 class="has-text-white has-text-centered rejected">
              <span v-html="data.day.rejected"></span>
            </h1>
          </router-link>
        </div>

        <h6 class="has-text-right">
          <span>Última semana</span>
        </h6>
        <div class="columns">
          <router-link to="/panel/preferences/week" class="column has-background-info">
            <p class="has-text-white">Preferencias</p>
            <h1 class="has-text-white has-text-centered">
              <span v-html="data.week.preferences"></span>
            </h1>
          </router-link>
          <router-link to="/panel/approved/week" class="column has-background-success">
            <p class="has-text-white">Aprobados</p>
            <h1 class="has-text-white has-text-centered">
              <span v-html="data.week.approved"></span>
            </h1>
          </router-link>
          <router-link to="/panel/rejected/week" class="column has-background-danger">
            <p class="has-text-white">Rechazados</p>
            <h1 class="has-text-white has-text-centered">
              <span v-html="data.week.rejected"></span>
            </h1>
          </router-link>
        </div>

        <h6 class="has-text-right">
          <span>Último Mes</span>
        </h6>

        <div class="columns">
          <router-link to="/panel/preferences/month" class="column has-background-info">
            <p class="has-text-white">Preferencias</p>
            <h1 class="has-text-white has-text-centered">
              <span v-html="data.month.preferences"></span>
            </h1>
          </router-link>
          <router-link to="/panel/approved/month" class="column has-background-success">
            <p class="has-text-white">Aprobados</p>
            <h1 class="has-text-white has-text-centered">
              <span v-html="data.month.approved"></span>
            </h1>
          </router-link>
          <router-link to="/panel/rejected/month" class="column has-background-danger">
            <p class="has-text-white">Rechazados</p>
            <h1 class="has-text-white has-text-centered">
              <span v-html="data.month.rejected"></span>
            </h1>
          </router-link>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'panel',
  mounted: function(){
    var t = this
    t.$options.interval = setInterval(t.findDay, t.timeout)
    t.findDay()
    setTimeout(() => { 
      t.findWeek() 
    },1000)
    setTimeout(() => { 
      t.findMonth() 
    },2000)
  },
  beforeDestroy(){
    clearInterval(this.$options.interval)
  },
  methods: {
    playSound: function(){
      //var audio = new Audio('/assets/sounds/submit.mp3');
      var audio = new Audio('/assets/sounds/hollow.ogg');
      audio.play();
    },
    findDay : function(){
      var t = this
      const date = moment().format('YYYY-MM-DD')
      axios.post( t.$root.endpoint + '/panel/search', {
        data : JSON.stringify({
          limit:null,
          find: {
            createdAt: {"$gte" : moment(date).format() } 
          }
        })
      }).then((res) => {
        var preferences = res.data.count
        var approved = 0
        var rejected = 0

        for(var i in res.data.results){
          if(res.data.results[i].mercadopago){
            if(res.data.results[i].mercadopago.status === 'approved'){
              approved++
            } else {
              rejected++
            }
          }
        } 
        if(t.data.day.preferences != preferences){
          document.querySelector('.preferences').classList.remove('fadeIn')
          void document.querySelector('.preferences').offsetWidth;
          document.querySelector('.preferences').classList.add('fadeIn')
          setTimeout(() => { t.playSound() },1000)
        }
        if(t.data.day.approved != approved){
          document.querySelector('.approved').classList.remove('fadeIn')
          void document.querySelector('.approved').offsetWidth;
          document.querySelector('.approved').classList.add('fadeIn')          
        }
        if(t.data.day.rejected != rejected){
          document.querySelector('.rejected').classList.remove('fadeIn')
          void document.querySelector('.rejected').offsetWidth;
          document.querySelector('.rejected').classList.add('fadeIn')
        }
        if(approved){
          document.title = '(' + approved + ') FletsPanel' 
        }
        t.data.day.preferences = preferences
        t.data.day.approved = approved
        t.data.day.rejected = rejected
      }).catch(err => {
        if(err){
         t.$root.snackbar('error',"Error.",30000)
        }
      })
    },
    findWeek : function(){
      var t = this
      axios.post( t.$root.endpoint + '/panel/search', {
        data : JSON.stringify({
          limit:null,
          find: {
            createdAt: {"$gte" : moment().subtract(1,"week").format() } 
          }
        })
      }).then((res) => {
        var preferences = res.data.count
        var approved = 0
        var rejected = 0

        for(var i in res.data.results){
          if(res.data.results[i].mercadopago){
            if(res.data.results[i].mercadopago.status === 'approved'){
              approved++
            } else {
              rejected++
            }
          }
        } 
        t.data.week.preferences = preferences
        t.data.week.approved = approved
        t.data.week.rejected = rejected
      }).catch(err => {
        if(err){
         t.$root.snackbar('error',"Error.",30000)
        }
      })
    },
    findMonth : function(){
      var t = this
      axios.post( t.$root.endpoint + '/panel/search', {
        data : JSON.stringify({
          limit:null,
          find: {
            createdAt: {"$gte" : moment().subtract(1,"month").format() } 
          }
        })
      }).then((res) => {
        var preferences = res.data.count
        var approved = 0
        var rejected = 0

        for(var i in res.data.results){
          if(res.data.results[i].mercadopago){
            if(res.data.results[i].mercadopago.status === 'approved'){
              approved++
            } else {
              rejected++
            }
          }
        } 
        t.data.month.preferences = preferences
        t.data.month.approved = approved
        t.data.month.rejected = rejected
      }).catch(err => {
        if(err){
         t.$root.snackbar('error',"Error.",30000)
        }
      })
    }
  },
  data () {
    return {
      timeout: 30000,
      data:{
        day: {
          preferences:'...',
          approved:'...',
          rejected:'...'
        },
        week: {
          preferences:'...',
          approved:'...',
          rejected:'...'
        },
        month: {
          preferences:'...',
          approved:'...',
          rejected:'...'
        }
      }
    }
  }
}
</script>
