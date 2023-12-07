import plugin from 'vue-yandex-maps'
import { defineNuxtPlugin } from 'nuxt/app'

const settings = {
  apiKey: 'ca913e0d-396f-41fb-aba4-8537720869c5',
  lang: 'ru_RU',
  version: '2.1',
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(plugin, settings)
})
