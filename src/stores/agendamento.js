import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'


export const useAgendamentoStore = defineStore('agendamento', {
  // Define o estado inicial do store
  state: () => ({

    // Busca no LocalStorage por agendamentos salvos ou inicia com um array vazio
    agendamentos: LocalStorage.getItem('agendamentos') || [],

    // Define os horários disponíveis para agendamento
    horarios: {
      manha: { start: 8, end: 10, price: 120 },
      tarde: { start: 15, end: 17, price: 160 },
      noite: { start: 19, end: 21, price: 180 }
    }
  }),

  actions: {
    // Método para adicionar um agendamento
    addAgendamento(agendamento) {
      this.agendamentos.push(agendamento)
      this.saveToLocalStorage()
    },
    // Método para atualizar um agendamento
    removeAgendamento(agendamentoId) {
      this.agendamentos = this.agendamentos.filter(a => a.id !== agendamentoId)
      this.saveToLocalStorage()
    },
    // Método para buscar agendamentos por data
    getAgendamentosData(date) {
      return this.agendamentos.filter(agendamento => agendamento.date === date)
    },
    // Método para buscar agendamentos por período
    getHorariosDisponiveis(date) {
      const agendados = this.getAgendamentosData(date)
      const todos = []
      
      // Itera sobre os períodos definidos e cria uma lista de horários disponíveis
      for (const [period, details] of Object.entries(this.horarios)) {
        for (let hour = details.start; hour < details.end; hour++) {
          todos.push({
            hour,
            period,
            price: details.price,
            available: !agendados.some(a => a.hour === hour && a.period === period)
          })
        }
      }
      
      return todos
    },
    
    saveToLocalStorage() {
      // Salva os agendamentos no LocalStorage
      LocalStorage.set('agendamentos', this.agendamentos)
    }
  }
})