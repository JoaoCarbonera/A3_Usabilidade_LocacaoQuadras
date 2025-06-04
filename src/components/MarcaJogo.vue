<template>
<q-card style="width: 100%; max-width: 1920px;">
    <div class="agendamento-container">
    <q-btn 
      label="Voltar" 
      icon="arrow_back" 
      flat 
      @click="$emit('close')" 
      class="q-mb-md"
    />

    <div class="row justify-between items-center q-mb-md">
      <h2 class="q-ma-none">Agendamentos</h2>
    </div>

    <div class="row q-mb-md">
      <div class="col-12 col-md-6">
        <q-date
          v-model="selectedDate"
          :options="dateOptions"
          today-btn
          label="Selecione a data"
          class="q-mb-md"
        />
      </div>
    </div>
    <div v-if="selectedDate">
      <h3>Horários disponíveis para {{ formattedDate }}</h3>

      <div class="horarios">
        <q-card
          v-for="slot in availableSlots"
          :key="`${slot.period}-${slot.hour}`"
          class="q-mb-sm"
          :class="{ 'bg-green-2': slot.available, 'bg-grey-3': !slot.available }"
        >
        <q-card-section>
            <div class="row items-center">
              <div class="col">{{ slot.hour }}:00 - {{ slot.period }} (R$ {{ slot.price }})</div>
                <div class="col-auto">
                    <q-btn
                    v-if="slot.available"
                    label="Reservar"
                    color="primary"
                    @click="bookSlot(slot)"
                    :disable="!slot.available"
                    />
                <q-badge v-else color="red">Reservado</q-badge>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    </div>
</q-card>
</template>

<script>
import { date } from 'quasar'
import { useAgendamentoStore } from 'src/stores/agendamento'

export default {
  data() {
    return {
      selectedDate: date.formatDate(Date.now(), 'YYYY/MM/DD'),
      agendamentoStore: null,
      slide: 1,
    }
  },
  computed: {
    formattedDate() {
      return date.formatDate(this.selectedDate, 'DD/MM/YYYY')
    },
    availableSlots() {
      return this.agendamentoStore.getHorariosDisponiveis(this.selectedDate)
    },
  },
  methods: {
    dateOptions(d) {
      return d >= date.formatDate(Date.now(), 'YYYY/MM/DD')
    },
    bookSlot(slot) {
      const agendamento = {
        id: Date.now(),
        date: this.selectedDate,
        hour: slot.hour,
        period: slot.period,
        price: slot.price,
        bookedAt: new Date().toISOString(),
      }

      this.agendamentoStore.addAgendamento(agendamento)
      this.$q.notify({
        type: 'positive',
        message: 'Horário reservado com sucesso!',
      })
    },
  },
  created() {
    this.agendamentoStore = useAgendamentoStore()
  },
}
</script>

<style scoped>
.agendamentos {
  max-width: 800px;
  margin: auto;
}
.horarios {
  max-width: 500px;
}
</style>