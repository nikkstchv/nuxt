import { defineStore } from 'pinia'

export const useMapStore = defineStore({
  id: 'map-store',
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
