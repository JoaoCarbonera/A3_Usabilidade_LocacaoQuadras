import { defineStore } from 'pinia'

export const useAgendamentoStore = defineStore('agendamento', {
  state: () => ({
    agendamentos: [],
    horarios: {
      manha: { start: 8, end: 10, price: 120 },
      tarde: { start: 15, end: 17, price: 160 },
      noite: { start: 19, end: 21, price: 180 }
    }
  }),

  // Getters
  actions: {
    addAgendamento(agendamento) {
      this.agendamentos.push(agendamento)
    },
    removeAgendamento(agendamentoId) {
      this.agendamentos = this.agendamentos.filter(a => a.id !== agendamentoId)
    },
    
    getAgendamentosData(date) {
      return this.agendamentos.filter(agendamento => agendamento.date === date)
    },
    getHorariosDisponiveis(date) {
      const agendados = this.getAgendamentosData(date)
      const todos = []
      
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
    }
  }
})