import { defineStore } from 'pinia'

export const useNavBarStore = defineStore({
  id: 'navBar-store',
  state: () => {
    return {
      isOpen: false,
    }
  },
  actions: {
    onOpen () {
      this.isOpen = true
    },
    onClose () {
      this.isOpen = false
    },
  },
})
