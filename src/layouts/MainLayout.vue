<template>
  <q-layout class="bg-grey-1">
    <q-header elevated class="text-white" style="background: black">
      <q-toolbar class="q-py-sm q-px-md">
        <img src="/icons/logobranco.png" style="height: 25px" />

        <div
          v-if="$q.screen.gt.sm"
          class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap"
        >
          <a href="javascript:void(0)" class="text-white"> Marcar Horario </a>
          <a href="javascript:void(0)" class="text-white"> Quadras </a>
          <a href="javascript:void(0)" class="text-white"> Contato </a>
          <a href="javascript:void(0)" class="text-white"> Sobre Nós </a>
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
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section>
                    <div>Logado em <strong>Jorge</strong></div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable class="GL__menu-link">
                  <q-item-section>Seu Perfil</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>Meus Agendamentos</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable class="GL__menu-link">
                  <q-item-section>Log out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { fabGithub } from '@quasar/extras/fontawesome-v6'

const stringOptions = ['quasarframework/quasar', 'quasarframework/quasar-awesome']

export default {
  name: 'MyLayout',

  setup() {
    const text = ref('')
    const options = ref(null)
    const filteredOptions = ref([])
    const search = ref(null) // $refs.search

    function filter(val, update) {
      if (options.value === null) {
        // load data
        setTimeout(() => {
          options.value = stringOptions
          search.value.filter('')
        }, 2000)
        update()
        return
      }

      if (val === '') {
        update(() => {
          filteredOptions.value = options.value.map((op) => ({ label: op }))
        })
        return
      }

      update(() => {
        filteredOptions.value = [
          {
            label: val,
            type: 'In this repository',
          },
          {
            label: val,
            type: 'All GitHub',
          },
          ...options.value
            .filter((op) => op.toLowerCase().includes(val.toLowerCase()))
            .map((op) => ({ label: op })),
        ]
      })
    }

    return {
      fabGithub,

      text,
      options,
      filteredOptions,
      search,

      filter,
    }
  },
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
