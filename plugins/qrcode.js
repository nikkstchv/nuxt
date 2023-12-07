// https://github.com/scopewu/qrcode.vue

import { defineNuxtPlugin } from 'nuxt/app'
import QrcodeVue from 'qrcode.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('QrCode', QrcodeVue)
})
