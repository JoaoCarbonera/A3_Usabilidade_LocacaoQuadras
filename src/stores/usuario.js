import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import axios from 'axios'

export const useUsuarioStore = defineStore('user', {
    state: () => ({
        // Busca no LocalStorage por usuário logado ou inicia com null
        user: LocalStorage.getItem('user') || null
    }),

    getters: {
        // Verifica se o usuário está logado
        isLogado: (state) => !!state.user,

        // Retorna o nome do usuário ou 'Visitante' se não estiver logado
        userName: (state) => (state.user ? state.user.name : 'Visitante')
    },

    actions: {

        // Método async para salvar o usuário no LocalStorage
        async login(credenciais) {
            try {

                // Faz uma requisição GET para o endpoint de login com as credenciais
                const response = await axios.get(`http://localhost:3001/users?username=${credenciais.username}`)

                if (response.data.length > 0) {

                    // Se a resposta contiver dados, extrai o usuário e salva no estado e no LocalStorage
                    const user = response.data[0]
                    if (user.password === credenciais.password) {
                        // Senha correta, login bem-sucedido!
                        this.user = { id: user.id, name: user.name, username: user.username }
                        LocalStorage.set('user', this.user)
                        return true // Retorna sucesso
                    }
                }
                // Se não houver dados, retorna false
                return false

            } catch (error) {
                // Em caso de erro, exibe uma mensagem no console e retorna false
                console.error('Erro ao fazer login:', error)
                return false
            }
        },

        logout() {

            // Método para limpar o usuário do estado e do LocalStorage
            this.user = null
            localStorage.remove('user')
        }
    }
})