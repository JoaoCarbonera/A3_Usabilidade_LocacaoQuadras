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
      <div v-if="loadingHorarios" class="text-center">
        <q-spinner color="primary" size="40px" />
        <p>Buscando horários...</p>
      </div>
      <div v-else class="horarios">
        <q-card
          v-for="slot in horarios"
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
                  v-if="slot.available"
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

    <div v-if="!selectedDate" class="col-12 col-md-6">
        <h3 class="titulo q-mt-none">Meus Próximos Agendamentos</h3>
        <div v-if="loadingAgendamentos" class="text-center">
            <q-spinner-dots color="primary" size="40px" />
            <p>Carregando seus agendamentos...</p>
        </div>
        <div v-else>
            <q-list bordered separator v-if="meusAgendamentos.length">
                <q-item v-for="agendamento in meusAgendamentos" :key="agendamento.id">
                    <q-item-section>
                    <q-item-label>{{ formatDate(agendamento.date) }} às {{ agendamento.hour }}:00</q-item-label>
                    <q-item-label caption>{{ agendamento.period }} - R$ {{ agendamento.price }}</q-item-label>
                    </q-item-section>
                    
                    <q-item-section side>
                    <q-btn
                        icon="delete"
                        color="negative"
                        flat
                        round
                        @click="cancelAgendamento(agendamento.id)"
                    />
                    </q-item-section>
                </q-item>
            </q-list>
            <div v-else class="text-grey-7 q-pa-md text-center">
                Você ainda não possui agendamentos. Selecione uma data no calendário para começar!
            </div>
        </div>
    </div>

  </div>
</div>
</q-card>
</template>

<script>
import { date } from 'quasar'
import { useAgendamentoStore } from 'src/stores/agendamento'
import { useUsuarioStore } from 'src/stores/usuario'
import { useRouter } from 'vue-router'


export default {
  name: 'MarcaJogo',
  data() {
    return {
      selectedDate: null,
      agendamentoStore: null,
      userStore: null,
      horarios: [],
      loadingHorarios: false,
      loadingAgendamentos: false
    }
  },
  computed: {
    formata() {
      if (!this.selectedDate) return ''
      return date.formatDate(this.selectedDate, 'DD/MM/YYYY')
    },
    meusAgendamentos() {
        if (!this.agendamentoStore) return []
        
        return [...this.agendamentoStore.agendamentos].sort((a, b) => {
            const dateA = new Date(a.date.replace(/\//g, '-'))
            const dateB = new Date(b.date.replace(/\//g, '-'))
            return dateA - dateB || a.hour - b.hour
        })
    },
  },
  watch: {
    // Observar mudanças na data para buscar os horários
    selectedDate(newDate) {
      if (newDate) {
        this.loadHorarios(newDate)
      }
    }
  },
  methods: {
    async loadHorarios(data) {
      console.log('[COMPONENTE] Carregando horários para a data:', data);
      this.loadingHorarios = true;
      this.horarios = []; // Limpa os horários anteriores para evitar mostrar dados antigos

      try {
        const result = await this.agendamentoStore.getHorariosDisponiveis(data);
        console.log('[COMPONENTE] Resultado recebido da store:', result);
        this.horarios = result;
      } catch (error) {
        console.error('[COMPONENTE] Erro ao carregar horários:', error);
        this.$q.notify({
            type: 'negative',
            message: 'Falha ao buscar horários. Tente novamente.'
        });
      } finally {
        // O bloco finally garante que o loading será desativado, mesmo se ocorrer um erro
        this.loadingHorarios = false;
      }
    },

    dateOptions(d) {
      return d >= date.formatDate(Date.now(), 'YYYY/MM/DD')
    },

    async bookSlot(slot) {
      if (!this.userStore.isLogado) {
        this.$q.notify({
          type: 'negative',
          message: 'Você precisa estar logado para fazer uma reserva.'
        })
        this.router.push('/login-page') 
        return
      }
      
      const agendamento = {
        id: String(Date.now()),
        date: this.selectedDate,
        hour: slot.hour,
        period: slot.period,
        price: slot.price,
        bookedAt: new Date().toISOString(),
      }

      await this.agendamentoStore.addAgendamento(agendamento)


      this.$q.notify({
        type: 'positive',
        color: 'primary',
        message: 'Horário reservado com sucesso!',
      })

      // Espere Recarregar os horarios para atualizar os dados
      await this.loadHorarios(this.selectedDate)
    },

    formatDate(d) {
      return date.formatDate(d, 'DD/MM/YYYY')
    },

    async cancelAgendamento(id) {
      await this.agendamentoStore.removeAgendamento(id)
      this.$q.notify({
        type: 'info',
        message: 'Reserva cancelada.'
      })
    },

    async loadMyAgendamentos() {
        this.loadingAgendamentos = true;
        try {
            await this.agendamentoStore.fetchAgendamentos()
        } catch (error) {
            console.error('[Component] Erro ao buscar meus agendamentos:', error)
        } finally {
            this.loadingAgendamentos = false;
        }
    }

  },
  created() {
    this.agendamentoStore = useAgendamentoStore()
    this.userStore = useUsuarioStore()
    this.router = useRouter()
    this.loadMyAgendamentos()
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
  font-size: 28px;
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