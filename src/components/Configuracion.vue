<template>
  <div class="hero">
    <div class="has-background-light">
      <div class="container">
        <div class="column">
          <h6>
            <span class="icon">              
              <span class="fa fa-cog"></span>
            </span>
            <span>Configuración</span>
          </h6>
        </div>
      </div>
    </div>
    <div class="columns is-desktop is-vcentered">
      <div class="column">
        <div class="container has-actions content">
          <h4>Indica cuales son tus preferencias</h4>
          <p>Por favor ingresa tus datos de preferencias para tus cotizaciones.</p>
          <div class="columns is-vbaseline has-text-centered has-background-success">
            <div class="column has-text-centered">
              <router-link to="configuracion/datos" class="has-text-white">
                <span class="icon">
                  <span class="fas fa-image"></span>
                </span>
                <span>Datos</span>
              </router-link>
            </div>
            <div class="column has-text-centered has-background-warning">
              <router-link to="configuracion/costos" class="has-text-white">
                <span class="icon">
                  <span class="fas fa-credit-card"></span>
                </span>
                <span>Costos</span>
              </router-link>
            </div>
            <div class="column has-text-centered has-background-info">
              <router-link to="configuracion/ubicacion" class="has-text-white">
                <span class="icon">
                  <span class="fas fa-map-marker"></span>
                </span>
                <span>Ubicación</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'configuracion'
}
</script>
