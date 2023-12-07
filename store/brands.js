import { defineStore } from 'pinia'
import { getBrands as getBrandsPath } from '~/api/routes/brands'

export const useBrandsStore = defineStore({
  id: 'brands-store',
  state: () => {
    return {
      brands: [],
    }
  },
  actions: {
    async getBrands () {
      if (!this.brands.length) {
        const { $fetchClient, $hasErrorResponse } = useNuxtApp()
        const res = await $fetchClient(getBrandsPath())
        if (!$hasErrorResponse(res)) {
          this.brands = res.data
        }
      }
      return this.brands
    },
  },
})
