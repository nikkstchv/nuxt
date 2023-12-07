import { defineStore } from 'pinia'

export const useTestDriveStore = defineStore({
  id: 'testDrive-store',
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
