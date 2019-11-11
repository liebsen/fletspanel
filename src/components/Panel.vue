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
        <div class="columns">
          <div class="column" v-for="item, w in data.data">
            <h2><span></span></h2>
            <div class="box" v-for="item2,i in item">
              <h6>
                <span v-if="i>0">
                  <span>Hace</span> <span v-html="i"></span>
                </span>
                <span v-else>
                  <span v-if="w==='week'">Esta</span>
                  <span v-if="w==='month'">Este</span>
                </span>
                <span v-if="w==='week'">
                  <span>semana</span><span v-if="i>1">s</span>
                </span>
                <span v-if="w==='month'">
                  <span>mes</span><span v-if="i>1">es</span>
                </span>
              </h6>
              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <div class="bar-container" v-for="val, type in item2" v-if="val>0">
                      <router-link :to="'/panel/' + type + '/' + w + '/' + i">
                        <div class="bar" :style="{ width: (val / data.max * 100) + '%', backgroundColor: colors[type] }"><span v-html="val"></span>
                        </div>
                      </router-link>
                    </div>
                  </div>
                  <!--nav class="level is-mobile">
                    <div class="level-left">
                      <a class="level-item" aria-label="reply">
                        <span class="icon is-small">
                          <i class="fas fa-reply" aria-hidden="true"></i>
                        </span>
                      </a>
                      <a class="level-item" aria-label="retweet">
                        <span class="icon is-small">
                          <i class="fas fa-retweet" aria-hidden="true"></i>
                        </span>
                      </a>
                      <a class="level-item" aria-label="like">
                        <span class="icon is-small">
                          <i class="fas fa-heart" aria-hidden="true"></i>
                        </span>
                      </a>
                    </div>
                  </nav-->
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'panel',
  mounted: function(){
    var t = this
    t.$options.interval = setInterval(() => {
      t.findall(false)
    }, t.timeout)
    t.findall(true)
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
    findall : function(loader){
      var t = this
      if(loader) t.$root.loading = true
      axios.post( t.$root.endpoint + '/panel/charts', {}).then((res) => {
        t.data = res.data
        t.$root.loading = false
      }).catch(err => {
        if(err){
         t.$root.snackbar('error',"Error.",30000)
         t.$root.loading = false
        }
      })
    }
  },
  data () {
    return {
      timeout: 30000,
      colors: {
        preferences: '#36a4ea',
        approved: '#2dd22d'
      },
      data:{}
    }
  }
}
</script>

<style>
  .bar-container {
    background-color: rgba(0,0,0,0.05);
    border-radius: 3px;
    text-align: left;
  }

  .bar {
    text-align: center;
    height: 1.5rem;
    color: white;
    border-radius: 3px;
  }
</style>
