<template>
<q-card class="cartao">
<q-btn 
    label="Voltar" 
    icon="arrow_back" 
    flat 
    @click="$emit('close')" 
    class="q-mb-md"
/>
<div class="agendamento-container">
  <div class="row q-col-gutter-md items-center ">
    <div class="col-12 col-md-6">
      <h2 class="q-mb-3 titulo">Agendamentos</h2>
      <q-date
        v-model="selectedDate"
        flat
        :options="dateOptions"
        today-btn
        label="Selecione a data"
        class="q-mb-md bg-black text-white"
      />
    </div>    
    <div v-if="selectedDate" class="col-12 col-md-6">
      <h3 class="titulo q-mt-none">Horários disponíveis para {{ formata }}</h3>
      <div class="horarios">
        <q-card
          v-for="slot in horariosDisponiveis"
          flat
          :key="`${slot.period}-${slot.hour}`"
          class="q-mb-sm text-white horario-cartao"
          :class="{ 'bg-black': slot.available, 'bg-primary': !slot.available }"
        >
        <q-card-section>
            <div class="row items-center q-m-sm">
              <div class="col-sm-5">{{ slot.hour }}:00 - {{ slot.period }} (R$ {{ slot.price }})</div>
              <div class="col-sm-7 text-right info">
                  <q-btn
                  v-if="userStore.isLogado"
                  label="Reservar"
                  color="primary"
                  @click="bookSlot(slot)"
                  :disable="!slot.available"
                  />
                <q-badge v-else color="black">Reservado</q-badge>
              </div>
            </div>
        </q-card-section>
        </q-card>
      </div>
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
      selectedDate: null,
      agendamentoStore: null,
    }
  },
  computed: {
    formata() {
      return date.formatDate(this.selectedDate, 'DD/MM/YYYY')
    },
    horariosDisponiveis() {
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
        color: 'primary',
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
.cartao {
  width: 100%; 
  height: 800px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px;
}

.agendamento-container {
  max-width: 900px;
  margin: 0 auto;
}

.titulo {
  font-size: 48px;
  font-weight: bolder;
}

.horarios {
  width: 100%;
  align-items: center;
}

@media (max-width: 600px) {
  .mycard {
    max-width: 98vw;
    padding: 20px;
  }

  .titulo {
    font-size: 24px;
  }

  .horarios {
    width: 100%;
    text-align: right;
  }
  
  .info {
    margin: auto 0 auto auto;
  }

}

</style>