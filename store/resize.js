import { defineStore } from 'pinia'

export const useResizeStore = defineStore({
  id: 'resize-store',
  state: () => {
    return {
      windowWidth: null,
    }
  },
  actions: {
    windowSizeChange () {
      this.windowWidth = document.documentElement.clientWidth
      return this.windowWidth
    },
    addEventListener () {
      window.addEventListener('resize', this.windowSizeChange)
    },
    removeEventListener () {
      // TODO настроить удаление слушателя на страницах где он есть
      return window.removeEventListener('resize', this.windowSizeChange)
    },
  },
})
