<template>
  <q-page class="q-pa-xl bg-grey-2">
    
    <div class="text-center q-mb-xl">
      <h1 class="text-h4 text-primary text-weight-bold">Nossas Quadras</h1>
      <p class="text-subtitle2 text-grey-8">
        Escolha entre Futebol 5 ou Futebol 7 com infraestrutura completa
      </p>
    </div>

    
    <q-layout-grid cols="1" cols-sm="2" class="q-gutter-lg">
      
      <q-card class="bg-white shadow-2">
        <q-img src="/img/fut5.jpg" alt="Quadra Futebol 5" height="200px" />

        <q-card-section>
          <div class="text-h6 text-primary">Futebol 5</div>
          <p class="text-body2 text-grey-8">
            Quadra sintética para jogos dinâmicos. Ideal para partidas rápidas com até 10 jogadores.
          </p>

          <div class="row q-mt-md q-gutter-sm items-center">
            <q-icon name="sports_soccer" />
            <q-icon name="shower" />
            <q-icon name="outdoor_grill" />
            <q-icon name="local_parking" />
          </div>
        </q-card-section>
      </q-card>

     
      <q-card class="bg-white shadow-2">
        <q-img src="/img/fut7.jpg" alt="Quadra Futebol 7" height="200px" />

        <q-card-section>
          <div class="text-h6 text-primary">Futebol 7</div>
          <p class="text-body2 text-grey-8">
            Quadra maior, perfeita para jogos com mais espaço e até 14 jogadores.
          </p>

          <div class="row q-mt-md q-gutter-sm items-center">
            <q-icon name="sports_soccer" />
            <q-icon name="wc" />
            <q-icon name="outdoor_grill" />
            <q-icon name="directions_car" />
          </div>
        </q-card-section>
      </q-card>
    </q-layout-grid>
  </q-page>

  <q-footer class="bg-black text-white text-center q-pa-sm">
      © 2025 - Net Quadras
    </q-footer>
    
</template>

<script setup>

</script>

<style scoped>

</style>