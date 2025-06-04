<template>
  <q-page class="q-pa-xl bg-grey-2">

    <!-- Título -->
    <div class="text-center q-mb-xl">
      <h2 class="text-h4 text-primary text-weight-bold">Fale com a gente</h2>
      <p class="text-subtitle1 text-grey-7">
        Entre em contato para agendar, tirar dúvidas ou conhecer a estrutura
      </p>
    </div>

    <div class="row q-col-gutter-xl">
      <!-- Coluna: Informações de Contato -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-lg">
          <q-card-section class="text-primary text-h6">Informações</q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row items-center q-mb-md">
              <q-icon name="place" class="q-mr-sm" />
              Rua Exemplo, 123 - Porto Alegre, RS
            </div>
            <div class="row items-center q-mb-md">
              <q-icon name="call" class="q-mr-sm" />
              (51) 99999-9999
            </div>
            <div class="row items-center q-mb-md">
              <q-icon name="email" class="q-mr-sm" />
              contato@netquadras.com.br
            </div>
            <div class="row items-center">
              <q-icon name="access_time" class="q-mr-sm" />
              Seg a Dom: 09h às 23h
            </div>
          </q-card-section>
        </q-card>

        <!-- Mapa -->
        <div class="q-mt-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.390071833977!2d-51.1952575!3d-29.996953999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951979f3d76194fb%3A0xc42cf0a0c1cec3f0!2sSoccer%20City%20-%20Loca%C3%A7%C3%A3o%20de%20Quadras%20Esportivas!5e0!3m2!1spt-BR!2sbr!4v1749049686262!5m2!1spt-BR!2sbr"
            width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <!-- Coluna: Formulário -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-lg">
          <q-card-section class="text-primary text-h6">Envie uma mensagem</q-card-section>
          <q-separator />
          <q-card-section>
            <q-form @submit.prevent="enviarFormulario">
              <q-input v-model="nome" label="Nome" outlined class="q-mb-md" />
              <q-input v-model="email" label="E-mail" type="email" outlined class="q-mb-md" />
              <q-input v-model="mensagem" label="Mensagem" type="textarea" outlined class="q-mb-md" />

              <q-btn label="Enviar" color="primary" type="submit" />
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>

  <q-footer class="bg-black text-white text-center q-pa-sm">
      © 2025 - Net Quadras
    </q-footer>

</template>

<script setup>
import { ref } from 'vue'

const nome = ref('')
const email = ref('')
const mensagem = ref('')

function enviarFormulario () {
  console.log('Formulário enviado:', nome.value, email.value, mensagem.value)
  
}
</script>
