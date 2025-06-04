<template>
  <q-page class="q-pa-md">
    <!-- Título da Página -->
    <div class="text-center q-mb-md">
      <h1 class="text-h4 text-primary text-weight-bold">Nossas Quadras</h1>
      <p class="text-subtitle1">Contamos com duas quadras para futebol 5, com medidas de 17 m x 30 m, ambas cobertas. E mais quatro quadras oficiais de futebol 7, com medidas de 30 m x 50 m, sendo duas cobertas e duas descobertas. Todas as campos em grama sintética de tecnologia monofilada padrão FIFA, proporcionando menos impacto e maior maciez, reproduzindo com muita semelhança um gramado natural. A Iluminação em LED segue as tendências mais modernas.</p>
    </div>

    <!-- Primeiro Carrossel -->
    <q-carousel
      arrows
      animated
      v-model="slide1"
      height="500px"
      class="shadow-2 rounded-borders q-mb-xl"
      style="max-width: 90%; margin: auto; margin-bottom: 40px;"
    >
      <q-carousel-slide name="first" img-src="/icons/SOCCER-12.jpg">
        <div class="absolute-bottom custom-caption text-white q-pa-md">
          <div class="text-h5">Quadra de Futebol 7</div>
          <div class="text-subtitle2">Quadra 01</div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="second" img-src="/icons/SOCCER-10.jpg">
        <div class="absolute-bottom custom-caption text-white q-pa-md">
          <div class="text-h5">Quadra de Futebol 7</div>
          <div class="text-subtitle2">Quadra 02</div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="third" img-src="/icons/SOCCER-11.jpg">
        <div class="absolute-bottom custom-caption text-white q-pa-md">
          <div class="text-h5">Quadra de Futebol 7</div>
          <div class="text-subtitle2">Quadra 03</div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="for" img-src="/icons/SOCCER-9.jpeg">
        <div class="absolute-bottom custom-caption text-white q-pa-md">
          <div class="text-h5">Quadra de Futebol 7</div>
          <div class="text-subtitle2">Quadra 04</div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <!-- Segundo Carrossel -->
    <q-carousel
      arrows
      animated
      v-model="slide2"
      height="500px"
      class="shadow-2 rounded-borders"
      style="max-width: 90%; margin: auto; margin-bottom: 40px;"
    >
      <q-carousel-slide name="1" img-src="/icons/SOCCER-6.jpg">
        <div class="absolute-bottom custom-caption text-white q-pa-md">
          <div class="text-h5">Quadra de Futebol 5</div>
          <div class="text-subtitle2">Quadra 05</div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="2" img-src="/icons/SOCCER-7.jpg">
        <div class="absolute-bottom custom-caption text-white q-pa-md">
          <div class="text-h5">Quadra de Futebol 5</div>
          <div class="text-subtitle2">Quadra 06</div>
        </div>
      </q-carousel-slide>

    </q-carousel>
  </q-page>

<q-footer class="bg-black text-white text-center q-pa-sm">
      © 2025 - Net Quadras
    </q-footer>

</template>

<script setup>
import { ref } from 'vue'

const slide1 = ref('first')
const slide2 = ref('1')
</script>

<style scoped>
.custom-caption {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}
</style>
