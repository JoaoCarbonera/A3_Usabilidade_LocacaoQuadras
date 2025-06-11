<template>
<q-page class="flex flex-center q-pa-sm column items-center">
  <img 
    src="/icons/logo2.png" 
    alt="Logo Net Quadras com design estilizado de quadra esportiva e letras modernas em destaque, sobre fundo limpo." 
    style="height: 40px; margin-bottom: 16px;" 
  />
    
  <q-card class="q-pa-md" style="max-width: 400px; width: 100%;">

  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="username"
        label="Usuário *"
        hint="Usuário"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor coloque seu Usuário']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
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

<script>
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useUsuarioStore } from 'src/stores/usuario';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const userStore = useUsuarioStore()

    return { $q, router, userStore }
  },
  methods: {
    async onSubmit() {
      const success = await this.userStore.login ({
        username: this.username,
        password: this.password
      });

      if (success) {
        this.$q.notify({
          message: 'Login realizado com sucesso!',
        })

        // Redireciona para a home
        this.$router.push('/')
      } else {
        this.$q.notify({
          color: 'negative',
          message: 'Usuário ou senha inválidos. Tente novamente.',
        })
      }
    },
    onReset() {
      this.username = '';
      this.password = '';
      this.$q.notify({
        message: 'Campos redefinidos.'
      })
    }
  },

}
</script>
