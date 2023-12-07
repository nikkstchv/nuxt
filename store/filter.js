import { defineStore } from 'pinia'

export const useFilterStore = defineStore({
  id: 'filter-store',
  this: () => {
    return {
      isOpen: false,
      fastFilter: false,
      filterData: null,
      allData: null,
      isInitFilter: false,
    }
  },
  actions: {
    onOpen () {
      this.isOpen = true
    },
    onClose () {
      this.isOpen = false
    },
    setFilterData (filterData) {
      this.filterData = filterData
    },
    setAllData (allData) {
      this.allData = allData
    },
    setInitFilter (isInitFilter) {
      this.isInitFilter = isInitFilter
    },
    clearAllFilterData () {
      this.allData = null
      this.filterData = null
      this.isInitFilter = false
    },
    clearFilterData () {
      this.filterData = null
      this.isInitFilter = false
    },
    formatFilterData (filterData) {
      const data = JSON.parse(JSON.stringify(filterData))
      delete data.page
      delete data.sort
      delete data.init
      for (const key in data) {
        if (typeof data[key] === 'string') {
          data[key] = [data[key]]
        }
      }

      return data
    },
  },
})
