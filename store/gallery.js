import { defineStore } from 'pinia'

export const useGalleryStore = defineStore({
  id: 'gallery-store',
  state: () => {
    return {
      isOpen: false,
      openIndexImage: 0,
    }
  },
  actions: {
    onOpen () {
      this.isOpen = true
    },
    onClose () {
      this.isOpen = false
    },
    setOpenIndexImage (index) {
      this.openIndexImage = index
    },
  },
})
