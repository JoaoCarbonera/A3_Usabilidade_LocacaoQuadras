<template>
  <div>
    <q-carousel animated v-model="slide" arrows navigation infinite height="870px">
      <q-carousel-slide :name="1" img-src="/icons/SOCCER-10.jpg" />
      <q-carousel-slide :name="2" img-src="/icons/SOCCER-11.jpg" />
      <q-carousel-slide :name="3" img-src="/icons/SCITY-1304.jpg" />
      <q-carousel-slide :name="4" img-src="/icons/SCITY-1428.jpg" />
    </q-carousel>
  </div>

  <!-- Seção: Estrutura Completa -->
  
    
    <div class="q-pa-xl flex flex-center bg-grey-2" style="height: 10vh;">
      <q-btn
        label="Marcar Jogo"
        color="primary"
        icon="sports_soccer"
        style="font-size: 24px; padding: 15px 30px; min-width: 200px;"
        class="q-px-xl q-py-lg text-h6"
        @click="showMarcar = true"
      />

      <q-dialog v-model="showMarcar" persistent>
        <MarcaJogo @close="showMarcar = false" />
      </q-dialog>
    </div>
    
  <section class="q-pa-xl bg-grey-2">
    <div class="text-center q-mb-xl">
      <h2 class="text-h4 text-lime-10 text-weight-bold">Jogo com cara de final de Copa do Mundo</h2>
      <p class="text-subtitle1 text-grey-7">A Net é craque em qualidade</p>
    </div>

    <!-- Descrição da Estrutura -->
    <q-card flat bordered class="q-pa-lg q-mx-auto text-center" style="max-width: 900px">
      <q-card-section>
        <p class="text-body1 q-mb-lg">
          Duas quadras de <strong>Futebol 5</strong> e quatro de <strong>Futebol 7</strong>, além de
          uma estrutura completa com:
        </p>

        <!-- Grid com Ícones -->
        <div class="row q-col-gutter-lg justify-center">
          <!-- Churrasqueiras -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-icon name="outdoor_grill" size="48px" color="deep-orange-7" />
            <div class="text-subtitle1 q-mt-sm">Churrasqueiras</div>
          </div>

          <!-- Vestiários -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-icon name="shower" size="48px" color="indigo-7" />
            <div class="text-subtitle1 q-mt-sm">Vestiários</div>
          </div>

          <!-- Estacionamento -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-icon name="directions_car" size="48px" color="blue-7" />
            <div class="text-subtitle1 q-mt-sm">Estacionamento</div>
          </div>

          <!-- Espaço Gourmet -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-icon name="restaurant" size="48px" color="green-7" />
            <div class="text-subtitle1 q-mt-sm">Espaço Gourmet</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </section>

  <section>
    
  </section>

  <q-footer class="bg-black text-white text-center q-pa-sm">
      © 2025 - Net Quadras
    </q-footer>

</template>

<script>
import MarcaJogo from 'src/components/MarcaJogo.vue'

export default {
  name: 'IndexPage',
  components: {
    MarcaJogo,
  },
  data() {
    return {
      slide: 1,
      showMarcar: false,
      maximizedToggle: false,
    }
  },
}
</script>

<style scoped>
.container {
  max-width: 500px;
  padding: 15px;
}
</style>
