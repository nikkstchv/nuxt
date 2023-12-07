import { defineStore } from 'pinia'

export const useCompareStore = defineStore({
  id: 'compare-store',
  this: () => {
    return {
      compareCars: [],
      compareMoto: [],
      compareJetSki: [],
      compareAtv: [],
      compareAccessories: [],
    }
  },
  actions: {
    addCompare ({ id, name }) {
      const compare = JSON.parse(localStorage.getItem(name)) ?? []

      compare.includes(id)

      if (!compare.includes(id)) {
        compare.push(id)

        localStorage.setItem(name, JSON.stringify(compare))
        this[name] = compare
      }
    },
    removeCompare ({ id, name }) {
      const compare = JSON.parse(localStorage.getItem(name)) ?? []
      const filteredCompare = compare.filter(item => item !== id)

      localStorage.setItem(name, JSON.stringify(filteredCompare))
      this[name] = filteredCompare
    },
  },
})
