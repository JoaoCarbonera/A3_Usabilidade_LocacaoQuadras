<template>
  <div>
    <q-carousel animated v-model="slide" arrows navigation infinite height="600px">
      <q-carousel-slide :name="1" img-src="/icons/SOCCER-10.jpg" />
      <q-carousel-slide :name="2" img-src="/icons/SOCCER-11.jpg" />
      <q-carousel-slide :name="3" img-src="/icons/SOCCER-12.jpg" />
      <q-carousel-slide :name="4" img-src="/icons/SOCCER-6.jpg" />
    </q-carousel>
  </div>

  <!-- Seção: Estrutura Completa -->
  <section class="q-pa-xl bg-grey-4">
    <!-- Título da Seção -->
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
</template>

<script>
import { date } from 'quasar'

export default {
  data() {
    return {
      selectedDate: date.formatDate(Date.now(), 'YYYY/MM/DD'),
      agendamentoStore: null,
      slide: 1,
    }
  },
}
</script>

<style></style>
