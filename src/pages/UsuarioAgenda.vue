<template>
<q-page class="q-pa-md">
    <h2 class="text-weight-bolder">Meus Agendamentos</h2>

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
      agendamentoStore: null
    }
  },
  computed: {
    agendamentos() {
      return [...this.agendamentoStore.agendamentos].sort((a, b) => {
        return new Date(a.date) - new Date(b.date) || a.hour - b.hour
      })
    }
  },
  methods: {
    formatDate(d) {
      return date.formatDate(d, 'DD/MM/YYYY')
    },
    cancelAgendamento(id) {
      this.agendamentoStore.removeAgendamento(id)
      this.$q.notify({
        type: 'positive',
        color: 'primary',
        message: 'Reserva cancelada com sucesso!'
      })
    }
  },
  created() {
    this.agendamentoStore = useAgendamentoStore()
  }
}
</script>