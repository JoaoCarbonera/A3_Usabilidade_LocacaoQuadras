<template>
  

  <q-page class="flex flex-center q-pa-sm column items-center">

    <img src="/icons/logo2.png" style="height: 40px; margin-bottom: 16px;" />
    
    <q-card class="q-pa-md" style="max-width: 400px; width: 100%;">
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Usuário *"
        hint="Usuário"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor coloque seu Usuário']"
      />

      <q-input
        filled
        type="password"
        v-model="age"
        label="Senha *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Por favor coloque sua senha',
        ]"
      />

      <div>
        <q-btn label="Login" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
  </q-card>
</q-page>

  <q-footer class="bg-black text-white text-center q-pa-sm">
      © 2025 - Net Quadras
    </q-footer>

</template>

<script setup>
</script>
