<template>
<q-page class="q-pa-md">
    <h2 class="text-weight-bolder">Meus Agendamentos</h2>

    <div v-if="loading" class="text-center q-pa-lg">
      <q-spinner-primary size="3em" />
    </div>

    <q-list bordered separator v-if="agendamentos.length">
      <q-item v-for="agendamento in agendamentos" :key="agendamento.id">
        <q-item-section>
          <q-item-label>{{ formatDate(agendamento.date) }} às {{ agendamento.hour }}:00</q-item-label>
          <q-item-label caption>{{ agendamento.period }} - R$ {{ agendamento.price }}</q-item-label>
        </q-item-section>
        
        <q-item-section side>
          <q-btn
            icon="delete"
            color="negative"
            flat
            @click="cancelAgendamento(agendamento.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    
    <div v-else class="text-grey">
      Nenhum agendamento encontrado.
    </div>
</q-page>
</template>

<script>
import { useAgendamentoStore } from 'src/stores/agendamento'
import { date } from 'quasar'

export default {
  data() {
    return {
      agendamentoStore: null,
      loading: false 
    }
  },
  computed: {
    agendamentos() {
      if (!this.agendamentoStore) return []
      return [...this.agendamentoStore.agendamentos].sort((a, b) => {
        const dateA = new Date(a.date.replace(/\//g, '-'))
        const dateB = new Date(b.date.replace(/\//g, '-'))
        return dateA - dateB || a.hour - b.hour
      })
    }
  },
  methods: {
    formatDate(d) {
      return date.formatDate(d, 'DD/MM/YYYY')
    },
    async cancelAgendamento(id) {
      await this.agendamentoStore.removeAgendamento(id)
      this.$q.notify({
        type: 'positive',
        color: 'primary',
        message: 'Reserva cancelada com sucesso!'
      })
    }
  },
  async created() {
    this.agendamentoStore = useAgendamentoStore()
    this.loading = true
    await this.agendamentoStore.fetchAgendamentos()
    this.loading = false
  }
}
</script>