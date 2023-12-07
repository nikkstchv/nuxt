import uniqBy from 'lodash/uniqBy'
import { getDealersShort } from '@/api/routes/dealer'

export const dealers = {
  // data: () => {
  //   return {
  //     optionsDealers: null,
  //     form: {
  //       dealer: {
  //         value: '',
  //         errors: [],
  //         isRequire: false
  //       }
  //     }
  //   }
  // },
  watch: {
    'form.dealer.value' () {
      this.clearErrorsInForm('dealer')
    },
    isOpenPanel (isOpen) {
      const isFetchDealers = !this.optionsDealers && isOpen
      isFetchDealers && this.fetchDealers()
    },
  },
  methods: {
    async fetchDealers ({ markCode, hasHolding = true } = {}) {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const params = this.$route.params
      const markCodeValue =
        this.markCode || markCode || params.mark || params.brand || ''
      const options = markCodeValue ? { query: { markCode: markCodeValue } } : {}
      const res = await $fetchClient(getDealersShort(), options, hasHolding)
      if (!$hasErrorResponse(res)) {
        this.optionsDealers = this.initDealers(res.dealer)
      } else {
        const resDefault = await $fetchClient(
          getDealersShort(), {}, hasHolding,
        )
        if (!$hasErrorResponse(resDefault)) {
          this.optionsDealers = this.initDealers(resDefault.dealer)
        }
      }
    },
    checkDealer () {
      if (this.form.dealer.isRequire) {
        this.clearErrorsInForm('dealer')
        if (!this.form.dealer.value) {
          this.addRequiredError('dealer')
          return false
        }
      }
      return true
    },
    initDealers (dealers) {
      const dealersFormatted = dealers?.map(({ nameRu, ...rest }) => ({
        name: nameRu,
        isActive: false,
        ...rest,
      }))
      return uniqBy(dealersFormatted, 'name')
    },
  },
}
