import { defineStore } from 'pinia'

export const useFormStore = defineStore({
  id: 'form-store',
  state: () => {
    return {
      isOpen: false,
      isOpenCredit: false,
      isOpenTradeIn: false,
      isOpenTestDrive: false,
      isOpenFeedback: false,
      isOpenFeedbackService: false,
      isOpenService: false,
      isOpenStock: false,
      isOpenInsurance: false,
      isOpenHistory: false,
      initData: {
        markCode: '',
        dealerCode: '',
        dealerId: '',
      },
    }
  },
  actions: {
    onOpen (payload = 'isOpen') {
      const storeItem = typeof payload === 'string' ? payload : 'isOpen'
      this[storeItem] = true
    },
    onClose () {
      for (const item in this.$state) {
        const hasIsOpen = item.includes('isOpen')
        const isBoolean = typeof this.$state[item] === 'boolean'
        const isOpen = this.$state[item] === true
        if (isBoolean && hasIsOpen && isOpen) {
          this.$state[item] = false
        }
      }
    },
    setInitData (data) {
      this.initData = data
    },
    clearInitData () {
      this.initData = {
        markCode: '',
        dealerCode: '',
        dealerId: '',
      }
    },
  },
})
