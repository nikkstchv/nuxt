import { defineStore } from 'pinia'

export const useServiceStore = defineStore({
  id: 'service-store',
  state: () => {
    return {
      isOpenPanel: false,
      isOpenPopup: false,
    }
  },
  actions: {
    onOpen (payload = 'isOpenPanel') {
      this[payload] = true
    },
    onClose () {
      this.isOpenPanel = false
      this.isOpenPopup = false
    },
  },
})
