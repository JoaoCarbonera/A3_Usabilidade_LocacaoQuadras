<template>
  <q-page class="flex flex-center q-pa-md">
    <q-card class="mycard q-pa-md" style="max-width: 600px; width: 100%;">
      <q-card-section>
        <div class="text-h5 text-center text-primary q-mb-md">Bem-vindo à Net Quadras!</div>
        <p class="text-subtitle1 text-grey-7">
          Aqui você pode agendar suas quadras de Futebol 5 e Futebol 7, 
          conferir nossos serviços e muito mais. Navegue pelo menu para explorar todas as opções disponíveis.
        </p>
        <q-btn
        label="Entre em Contato" 
          color="primary" 
          class="full-width q-mt-md" 
          to="/contato-page"
          />
        <q-btn
        label="Nossas Quadras" 
          color="primary" 
          class="full-width q-mt-md" 
          to="/quadras-page"
          />
        <q-btn
        label="Marcar Horário"
          color="primary"
          class="full-width q-mt-md"
          to="/"
          />
      </q-card-section>
    </q-card>
</q-page>

</template>

<script>
</script>