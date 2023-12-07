import { defineStore } from 'pinia'

export const useTradeInStore = defineStore({
  id: 'tradeIn-store',
  state: () => {
    return {
      isOpen: false,
      stateNumber: '',
    }
  },
  actions: {
    onOpen () {
      this.isOpen = true
    },
    onClose () {
      this.isOpen = false
    },
    setStateNumber (payload) {
      this.stateNumber = payload
    },
  },
})
