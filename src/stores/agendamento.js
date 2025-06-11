import { defineStore } from 'pinia'
import { useUsuarioStore } from './usuario'
import axios from 'axios'
import { date as quasarDate } from 'quasar'


export const useAgendamentoStore = defineStore('agendamento', {
  // Define o estado inicial do store
  state: () => ({

    agendamentos: [],

    // Define os horários disponíveis para agendamento
    horarios: {
      manha: { start: 8, end: 10, price: 120 },
      tarde: { start: 15, end: 17, price: 160 },
      noite: { start: 19, end: 21, price: 180 }
    }
  }),

  actions: {
    async fetchAgendamentos() {
      const userStore = useUsuarioStore()
      if (!userStore.isLogado) {
        this.agendamentos = []
        return
      }
      try {
        const response = await axios.get(`http://localhost:3001/agendamentos?userId=${userStore.user.id}`)
        this.agendamentos = response.data
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error)
      }
    },
  
    // Método para adicionar um agendamento
    async addAgendamento(agendamento) {
      const userStore = useUsuarioStore()

      if (!userStore.isLogado) return;

      const newAgendamento = { ...agendamento, userId: userStore.user.id }
      try {
        const response = await axios.post('http://localhost:3001/agendamentos', newAgendamento)
        this.agendamentos.push(response.data)
        
      } catch (error) {
        console.error('Erro ao adicionar agendamento:', error)

      }
    },

    // Método para atualizar um agendamento
    async removeAgendamento(agendamentoId) {
      
      try {
        await axios.delete(`http://localhost:3001/agendamentos/${agendamentoId}`)

        this.agendamentos = this.agendamentos.filter(a => a.id !== agendamentoId)

      } catch (error) {
        console.error('Erro ao cancelar agendamento:', error)

      }
    },
    
    // Método para buscar agendamentos por data
    // Esta função agora buscará de todos os usuários, a disponibilidade é global
    async getAgendamentosData(date) {
    
      console.log('[STORE] Buscando agendamentos para a data:', date);
      
      try {
        const response = await axios.get(`http://localhost:3001/agendamentos?date=${date}`);
        console.log('[STORE] Agendamentos encontrados:', response.data);
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar agendamentos por data:', error);
        return []; // Retorna um array vazio em caso de erro
      }
    },

    // Método para buscar agendamentos por período
    async getHorariosDisponiveis(selectedDate) {
      const agendados = await this.getAgendamentosData(selectedDate)
      const todos = []
      
      const agora = new Date();
      const hojeString = quasarDate.formatDate(agora, 'YYYY/MM/DD');
      const horaAtual = agora.getHours();

      const ehHoje = (selectedDate === hojeString);

      // Itera sobre os períodos definidos e cria uma lista de horários disponíveis
      for (const [period, details] of Object.entries(this.horarios)) {
        for (let hour = details.start; hour < details.end; hour++) {
          const jaReservado = agendados.some(a => a.hour === hour && a.period === period);
          const horarioJaPassou = ehHoje && hour <= horaAtual;

          todos.push({
            hour,
            period,
            price: details.price,
            available: !jaReservado && !horarioJaPassou
          })
        }
      }
      console.log('[STORE] Horários disponíveis retornados para o componente:', todos);
      return todos;
    },
    
  }
})