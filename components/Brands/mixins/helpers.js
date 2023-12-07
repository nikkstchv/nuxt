export const helpers = {
  computed: {
    isShowCredit () {
      return this.pageData.viewCredit === '1'
    },
    isShowTestDrive () {
      return this.pageData.viewTestDrive === '1'
    },
    isShowGuaranty () {
      return this.pageData.viewGuaranty === '1'
    },
    isShowTradeIn () {
      return this.pageData.viewTradein === '1'
    },
    isShowSubscription () {
      return this.pageData?.podpiskaUrl
    },
    isShowService () {
      return this.pageData?.viewService === '1'
    },
    isShowServicesBlock () {
      return (
        this.isShowTradeIn ||
        this.isShowCredit ||
        this.isShowGuaranty ||
        this.isShowTestDrive ||
        this.isShowSubscription ||
        this.isShowService
      )
    },
    schemaMinPrice () {
      const minDispriceNew = this.pageData?.catMinDispriceNew
      const minDispriceUsed = this.pageData?.catMinDispriceUsed
      return minDispriceNew > minDispriceUsed ? minDispriceNew : minDispriceUsed
    },
  },
}
