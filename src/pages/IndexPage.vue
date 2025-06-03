<template>
<q-page class="flex flex-center column">
  <div style="width: 100%;">
    <q-carousel animated v-model="slide" arrows navigation infinite height="600px">
      <q-carousel-slide :name="1" img-src="/public/icons/SOCCER-10.jpg" />
      <q-carousel-slide :name="2" img-src="/public/icons/SOCCER-11.jpg" />
      <q-carousel-slide :name="3" img-src="/public/icons/SOCCER-12.jpg" />
      <q-carousel-slide :name="4" img-src="/public/icons/SOCCER-6.jpg" />
    </q-carousel>
  </div>

  <div class="container text-center">
    <q-btn
      label="Marcar Jogo"
      color="primary"
      icon="sports_soccer"
      size="lg"
      @click="showMarcar = true"
      />

    <q-dialog v-model="showMarcar" persistent>
      <MarcaJogo @close="showMarcar = false" />
    </q-dialog>
  </div>
  
</q-page>
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
  padding: 20px;
}
</style>
