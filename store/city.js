import { defineStore } from 'pinia'

export const useCityStore = defineStore('city-store', () => {
  const siteCityCodeCookie = useCookie('siteCityCode')
  const siteCityCode = ref(siteCityCodeCookie.value)
  const isPanelOpen = ref(false)
  const isPopupOpen = ref(false)
  const declensions = {
    msk: {
      i: 'Москва',
      r: 'Москвы',
      d: 'Москве',
      v: 'Москву',
      t: 'Москвой',
      p: 'Москве',
    },
    spb: {
      i: 'Санкт-Петербург',
      r: 'Санкт-Петербурга',
      d: 'Санкт-Петербургу',
      v: 'Санкт-Петербург',
      t: 'Санкт-Петербургом',
      p: 'Санкт-Петербурге',
    },
    krasnodar: {
      i: 'Краснодар',
      r: 'Краснодара',
      d: 'Краснодару',
      v: 'Краснодар',
      t: 'Краснодаром',
      p: 'Краснодаре',
    },
  }
  const definiteCity = computed(() => declensions[siteCityCode.value || 'msk']?.i ?? '')
  const declensionCity = computed(() => declensions[siteCityCode.value || 'msk'] ?? '')

  const onOpen = () => {
    isPanelOpen.value = true
  }
  const onClose = () => {
    isPanelOpen.value = false
  }
  const onOpenPopup = () => {
    isPopupOpen.value = true
  }
  const onClosePopup = () => {
    isPopupOpen.value = false
  }
  const onSetCityCode = (code) => {
    const options = { maxAge: 24 * 60 * 60 * 7 }
    const siteCityCodeCookie = useCookie('siteCityCode', options)
    siteCityCodeCookie.value = code
    siteCityCode.value = code
  }

  return {
    isPanelOpen,
    isPopupOpen,
    definiteCity,
    declensionCity,
    siteCityCode,
    onOpen,
    onClose,
    onOpenPopup,
    onClosePopup,
    onSetCityCode,
  }
})
