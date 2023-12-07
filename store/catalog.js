import { defineStore } from 'pinia'

export const useCatalogStore = defineStore({
  id: 'catalog-store',
  state: () => {
    return {
      sort: null,
    }
  },
  actions: {
    onSetSort (value) {
      this.sort = value
    },
  },
})
