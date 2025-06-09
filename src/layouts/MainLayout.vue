<template>
  <q-layout class="bg-grey-1">
    <q-header elevated class="text-white" style="background: black">
      <q-toolbar class="q-py-sm q-px-md items-center">
        <router-link to="/" class="flex items-center">
          <img src="/icons/logobranco.png" style="height: 28px" />
        </router-link>

        
        <div
          v-if="$q.screen.gt.sm"
          class="GL__toolbar-link q-ml-xs q-gutter-md text-subtitle2 text-weight-bolder row items-center no-wrap">
          <router-link to="/login-page" class="text-white">Marcar Horário</router-link>
          <router-link to="/quadras-page" class="text-white">Quadras</router-link>
          <router-link to="/contato-page" class="text-white">Contato</router-link>
          <router-link to="/sobre-page" class="text-white">Sobre Nós</router-link>
        </div>

        <q-space />

        
        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn v-if="$q.screen.gt.xs" dense flat round size="12px" icon="notifications" />
          
          <q-btn dense flat no-wrap>
            <q-avatar rounded size="25px">
              <img src="/icons/person.png" />
            </q-avatar>
            <q-icon name="arrow_drop_down" size="16px" />
            <q-menu auto-close>
              <q-list dense>
                <q-item class="GL__menu-link-signed-in" v-if="userStore.isLogado">
                  <q-item-section>
                    <div>Logado em <strong>{{ userName }}</strong></div>
                  </q-item-section>
                </q-item>
                <q-separator  v-if="userStore.isLogado"/>
                <q-item v-if="!userStore.isLogado" clickable to="/loginPage" class="GL__menu-link">
                  <q-item-section>Login</q-item-section>
                </q-item>
                <q-item v-if="userStore.isLogado" to="/usuario-agenda" clickable class="GL__menu-link">
                  <q-item-section>Meus Agendamentos</q-item-section>
                </q-item>
                <q-separator v-if="userStore.isLogado" />
                <q-item v-if="userStore.isLogado" clickable @click="logout" class="GL__menu-link">
                  <q-item-section>Log out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <!-- MENU MOBILE -->
          <q-btn
            dense flat round icon="menu"
            class="q-ml-sm"
            v-if="$q.screen.lt.md"
            @click="drawer = !drawer"
          />
        </div>
      </q-toolbar>
    </q-header>
    
    <q-drawer
      v-model="drawer"
      side="right"
      overlay
      behavior="mobile"
      class="bg-grey-10 text-white"
    >
      <q-list>
        <q-item clickable to="/marcar-page">
          <q-item-section>Marcar Horário</q-item-section>
        </q-item>
        <q-item clickable to="/quadras-page">
          <q-item-section>Quadras</q-item-section>
        </q-item>
        <q-item clickable to="/contato-page">
          <q-item-section>Contato</q-item-section>
        </q-item>
        <q-item clickable to="/sobre-page">
          <q-item-section>Sobre Nós</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

  
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useUsuarioStore } from 'src/stores/usuario';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

export default {
  name: 'MyLayout',
  setup() {
    const userStore = useUsuarioStore()
    const router = useRouter()

    return {
      drawer: ref(false),
      userStore,
      router
    }
  },
  computed: {
    isLogado() {
      return this.userStore.isLogado
    },
    userName() {
      return this.userStore.userName
    }
  },
  methods: {
    logout() {
      this.userStore.logout()
      this.router.push('/login-page')
    }
  }

}
</script>

<style lang="sass">
.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden

    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible

  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7

  &__menu-link:hover
    background: #0366d6
    color: white

  &__menu-link-signed-in,
  &__menu-link-status
    &:hover
      & > div
        background: white !important

  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9

  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
</style>
