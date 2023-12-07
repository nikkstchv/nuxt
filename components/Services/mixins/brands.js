import { mapActions } from 'pinia'
import { useHoldingStore } from '~/store/holding'
import { getCards } from '~/api/routes/catalog'

export const brands = {
  computed: {
    servicesCards () {
      return [
        ...(this.isShowTestDrive
          ? [
              {
                title: 'Тест-драйв',
                text: `Запишитесь на пробную поездку на ${this.mark.nameEn} в наших дилерских центрах.`,
                buttonText: 'Записаться',
                buttonAction: this.onOpenFormTestDrivePanel,
              },
            ]
          : []),
        ...(this.isShowCredit
          ? [
              {
                title: `${
                this.carType.code === 'cars' ? 'Автокредит' : 'Кредит'
              } на ${this.mark.nameRu}${this.modelRuText}`,
                text: this.creditText,
                buttonText: 'Подробнее',
                buttonLink: this.creditLink,
              },
            ]
          : []),
        ...(this.isShowTradeIn
          ? [
              {
                title: `${this.mark.nameRu}${this.modelRuText} в Trade-in`,
                text: `Получите больше преимуществ при покупке ${this.mark.nameEn}${this.modelText} в Трейд-ин в дилерских центрах ${this.holdingName}. Обменяйте ваш старый ${this.typeOfTransport} на новый ${this.mark.nameRu}`,
                buttonText: 'Подробнее',
                buttonLink: this.tradeInLink,
              },
            ]
          : []),
        ...(this.isShowSubscription
          ? [
              {
                title: `${this.mark.nameRu}${this.modelRuText} по Подписке`,
                text: 'Подписка - наиболее доступный способ приобретения автомобиля. Оформите подписку на срок от 6 до 24 мес. Страхование, техническое обслуживание, сезонная замена шин и налоги включены в ежемесячный платеж.',
                buttonText: 'Подробнее',
                buttonAction: () =>
                  window.open(this.pageData?.podpiskaUrl, '_blank'),
              },
            ]
          : []),
        ...(this.isShowGuaranty
          ? [
              {
                title: `${this.mark.nameRu}${this.modelRuText} с гарантией производителя`,
                text: this.guarantyText,
                buttonText: 'Подробнее',
                buttonLink: `/brands/${this.$route.params.brand}/guaranty/`,
              },
            ]
          : []),
      ]
    },
    hasTradeInMark () {
      return this.tradeInMarks?.find(mark => mark.code === this.mark?.code)
    },
    hasTradeInModel () {
      return this.tradeInModel
    },
    creditLink () {
      const { brand, model, series } = this.$route.params
      if (series) {
        return `/brands/${brand}/${model}/credit/`
      }
      return `${this.$route.path}credit/`
    },
    tradeInLink () {
      return `/services/trade-in/${this.hasTradeInMark ? this.mark.code + '/' : ''}${this.hasTradeInMark && this.hasTradeInModel ? this.model.code + '/' : ''}`
    },
    creditText () {
      return `Оформите кредит на покупку ${this.mark.nameEn}${this.modelText} с выгодными условиями. Для наших покупателей доступны программы поддержки от производителя ${this.mark.nameEn}`
    },
    guarantyText () {
      return `Узнайте больше о гарантии на ${this.mark.nameEn}${this.modelText} от производителя ${this.mark.nameRu}`
    },
    modelText () {
      return this.model?.nameEn ? ` ${this.model.nameEn}` : ''
    },
    modelRuText () {
      return this.model?.nameRu ? ` ${this.model.nameRu}` : ''
    },
    typeOfTransport () {
      switch (this.carType.code) {
        case 'atv':
          return 'квадроцикл'
        case 'moto':
          return 'мотоцикл'
        default:
          return 'автомобиль'
      }
    },
    ...mapActions(useHoldingStore, ['holdingName']),
  },
  methods: {
    async getRefs (data) {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const method = 'POST'
      const body = {
        method,
        data,
      }
      const res = await $fetchClient(getCards(1, 1), body)
      if (!$hasErrorResponse(res)) {
        return res?.responseRefs ?? null
      }
      return null
    },
    setInitDataNames (filterData) {
      for (const key in this.initData) {
        let keyFound = key
        if (key === 'filter') {
          keyFound = this.initData[key].name
        }
        this.initData[key] = filterData[keyFound].find(
          item => item.code === this.initData[key].code,
        )
      }
    },
    getInitFilterData () {
      const mainFilters = ['mark', 'model', 'condition', 'transportType']
      const initFilterData = {}
      for (const key in this.initData) {
        if (mainFilters.includes(key)) {
          initFilterData[key] = [this.initData[key].code]
        } else {
          const [name, code] = this.initData[key].code.split('-is-')
          const filterName = this.getRefsName(name)
          this.initData[key].filterName = name
          this.initData[key].name = filterName
          this.initData[key].code = code
          initFilterData[filterName] = [code]
        }
      }

      return initFilterData
    },
    getRefsName (filterName) {
      const additionalFilters = {
        'engine-type': 'engineType',
        'drive-type': 'driveType',
        'gear-type': 'gearType',
        'body-type': 'bodyType',
      }

      return additionalFilters[filterName] || filterName
    },
  },
}
