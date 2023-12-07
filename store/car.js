import { defineStore } from 'pinia'

export const useCarStore = defineStore({
  id: 'car-store',
  state: () => {
    return {
      allData: null,
      googleAnalyticsData: null,
    }
  },
  actions: {
    add (data) {
      this.allData = data
    },
    onAddGoogleAnalyticsData (data) {
      this.googleAnalyticsData = data
    },
  },
})
