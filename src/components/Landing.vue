<template>
  <div class="columns is-vcentered has-text-centered" id="photo">
    <div class="column">
      <div class="landing-text content slideIn">
        <h2>Llevalo y traelo al toque</h2>
        <p>
          <span>Configura tus preferencias y monitorea tu actividad en FletsApp</span>
        </p>
        <router-link class="button is-info is-large" to="/login" v-if="!$root.isLoggedIn">
          <span class="icon">
            <span class="fas fa-sign-in-alt"></span>
          </span> 
          <span>Iniciar sesión</span>  
        </router-link>
        <router-link class="button is-info is-rounded is-large" to="/panel" v-if="$root.isLoggedIn">
          <span class="icon">
            <span class="fas fa-chart-bar has-text-white"></span>
          </span> 
          <span class="has-text-white">Mi Panel</span>  
        </router-link>
      </div>
    </div>
  </div>        
</template>

<script>

  export default {
    name: 'landing'
  }

</script>

<style type="text/css">

  #photo {
    display: inline-flex;
    position: fixed;
    left: 0;
    right:0;
    top: 0;
    bottom: -12px;
    padding-top: 1rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(/static/img/calles-buenos-aires-1.jpg);  
  }

  #photo .button {
    /*box-shadow: 10px 10px 0 rgba(0,0,0,0.5)*/
  }

  .landing-text {
    background-color: #f3fe7e;
    padding: 2rem;
    padding-top: 1.5rem;
    margin-bottom: 1rem;
  }

</style>
