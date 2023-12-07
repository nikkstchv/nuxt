import { defineStore } from 'pinia'

export const usePayStore = defineStore({
  id: 'pay-store',
  state: () => {
    return {
      isOpen: false,
      paySum: null,
      discounts: [],
    }
  },
  actions: {
    onOpen () {
      this.isOpen = true
    },
    onClose () {
      this.isOpen = false
    },
    setPaySum (payload) {
      this.paySum = payload
    },
    setDiscounts (payload) {
      this.discounts = payload
    },
  },
})
