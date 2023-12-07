<template>
  <section v-if="sortedDealers?.length" class="dealers">
    <header class="dealers__header">
      <MainTitle tag="h2" class="dealers__title">
        {{ localTitle }}
      </MainTitle>
      <UIArrowLink
        v-if="isShowSeeAll"
        class="dealers__button"
        :href="`/contacts/${markCode ? `${markCode}/` : ''}`"
      >
        Смотреть все
      </UIArrowLink>
    </header>
    <MainSlider name="dealers" :loop="loopSlider && windowWidth > 1366">
      <div
        v-for="dealer in sortedDealers"
        :key="dealer.id"
        class="swiper-slide"
        :itemscope="!noMicroMarking"
        :itemtype="!noMicroMarking && 'http://schema.org/LocalBusiness'"
      >
        <DealersCard
          class="swiper__card"
          :dealer="dealer"
          :mark-code="markCode"
          :is-seo-title="isSeoTitle"
        />
      </div>
    </MainSlider>
  </section>
</template>

<script>
import { mapState } from 'pinia'
import { useResizeStore } from '@/store/resize'
import { useCityStore } from '@/store/city'
import { getDealer, getDealers, getOtherDealers } from '@/api/routes/dealer'

export default {
  name: 'DealersBlock',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    markCode: {
      type: String,
      required: false,
      default: '',
    },
    markNameEn: {
      type: String,
      required: false,
      default: '',
    },
    marks: {
      type: Array,
      required: false,
      default: () => [],
    },
    models: {
      type: Array,
      required: false,
      default: () => [],
    },
    dealersRelation: {
      type: Array,
      required: false,
      default: () => [],
    },
    dealerCode: {
      type: String,
      required: false,
      default: '',
    },
    dealerId: {
      type: String,
      required: false,
      default: '',
    },
    isShowButtonSeeAll: {
      type: Boolean,
      required: false,
      default: false,
    },
    loopSlider: {
      type: Boolean,
      required: false,
      default: true,
    },
    isSeoTitle: {
      type: Boolean,
      default: false,
    },
    noMicroMarking: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    dealers: null,
  }),
  computed: {
    sortedDealers () {
      if (this.dealers) {
        return this.dealers.reduce((sum, cur) => {
          const isUserCity = cur.cityCode === this.siteCityCode
          if (isUserCity) {
            return [cur, ...sum]
          } else {
            return [...sum, cur]
          }
        }, [])
      }

      return null
    },
    isShowSeeAll () {
      if (this.dealersRelation?.length) {
        return false
      } else if (this.dealerCode) {
        return true
      } else if (this.marks?.length === 1 || this.models.length === 1) {
        return true
      } else if (this.marks?.length > 1) {
        return false
      } else if (this.markCode) {
        return true
      }
      return this.isShowButtonSeeAll && !this.hasOneDealer
    },
    hasOneDealer () {
      return this.dealers.length === 1
    },
    localTitle () {
      const title = {
        one: 'Дилерский центр',
        some: 'Дилерские центры',
        someMark: `Дилерские центры ${this.markNameEn}`,
        mark: `Дилерский центр ${this.markNameEn}`,
      }

      if (this.title) {
        return this.title
      } else if (this.dealers?.length === 1 && this.markNameEn && (this.dealerCode || this.marks?.length === 1 || this.models?.length === 1 || this.markCode)) {
        return title.mark
      } else if (this.dealers?.length === 1) {
        return title.one
      } else if (this.dealers?.length > 1 && this.markNameEn && this.markCode) {
        return title.someMark
      } else if (this.dealers?.length > 1) {
        return title.some
      }
      return title.some
    },
    ...mapState(useCityStore, ['siteCityCode']),
    ...mapState(useResizeStore, ['windowWidth']),
  },
  async mounted () {
    if (this.dealersRelation?.length) {
      await this.getDealers(this.dealersRelation)
    } else if (this.dealerCode) {
      await this.getDealer()
    } else if (this.marks?.length) {
      await this.getBrandDealers(this.marks, 'brand')
    } else if (this.models?.length) {
      const marks = [this.mark, ...this.marks].filter((mark) => {
        return this.models.find(model => model.markCode === mark.code)
      })
      await this.getBrandDealers(marks, 'brand')
    } else if (this.markCode) {
      await this.getBrandDealers()
    } else if (this.dealerId) {
      await this.getOtherDealers()
    } else {
      await this.getDealers()
    }
  },
  methods: {
    async getDealer () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      try {
        const res = await $fetchClient(getDealer(this.dealerCode))
        if (!$hasErrorResponse(res)) {
          this.dealers = [res]
        }
      } catch (err) {
        console.error(err)
      }
    },
    async getOtherDealers () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      try {
        const res = await $fetchClient(getOtherDealers(this.dealerId))
        if (!$hasErrorResponse(res)) {
          this.dealers = res?.data ?? null
        }
      } catch (err) {
        console.error(err)
      }
    },
    async getBrandDealers (items, name) {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      try {
        let query = []
        if (items) {
          query = this.getQuery(items, name)
        }
        const hasParam = this.markCode && !items

        const params = {
          ...(hasParam && { brand_code: this.markCode }),
        }

        const options = {
          query: { ...query, ...params },
        }
        const res = await $fetchClient(getDealers(), options)

        if (!$hasErrorResponse(res)) {
          this.dealers = res?.data ?? null
        }
      } catch (err) {
        console.error(err)
      }
    },
    async getDealers (dealers) {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      try {
        const res = await $fetchClient(getDealers())
        if (!$hasErrorResponse(res)) {
          if (dealers) {
            this.dealers = res?.data?.filter((dealer) => {
              return dealers.find(item => item.code === dealer.code)
            })
          } else {
            this.dealers = res?.data?.slice(0, 8) ?? null
          }
        }
      } catch (err) {
        console.error(err)
      }
    },
    getQuery (items, name) {
      return items.reduce((sum, cur) => {
        const param = { [`${name}Codes`]: cur.code }

        return { ...sum, ...param }
      }, {})
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/indents/main';

.dealers {
  grid-gap: 40px;
  max-width: 100vw;
  padding: 0 15px;
  overflow: hidden;

  @include mq($bp-small-medium) {
    grid-gap: 30px;
    padding: 0 0 0 20px;
  }

  @include mq($bp-small) {
    padding: 0 0 0 32px;
  }

  @include mq($bp-medium) {
    padding: 0 0 0 50px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 40px;
    padding: 0 0 0 81px;
  }

  @include mq($bp-big) {
    padding: 0 0 0 146px;
  }

  .dealers &__header {
    @include indentsMainHorizontal;

    display: flex;
    grid-gap: 20px;
    align-items: center;
    justify-content: space-between;
    padding-left: 0 !important;
    margin-bottom: 30px;

    @include mq($bp-small) {
      margin-bottom: 40px;
    }

    @include mq($bp-medium) {
      margin-bottom: 50px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 60px;
    }
  }

  &__list-container {
    position: relative;
    height: 100%;
    min-height: calc(380px + 30px);
    overflow: auto;

    @include mq($bp-small-medium, $bp-medium-big) {
      min-height: calc(380px + 40px);
    }

    @include mq($bp-medium-big) {
      min-height: calc(380px + 50px);
    }
  }

  .dealers &__title {
    margin-bottom: 0;
  }

  &__list {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    grid-gap: 15px;
    height: 100%;
    padding-right: 15px;
    padding-bottom: 30px;

    @include mq($bp-small-medium) {
      padding-right: 30px;
      padding-bottom: 40px;
    }

    @include mq($bp-medium) {
      grid-gap: 30px;
      padding-right: 50px;
    }

    @include mq($bp-medium-big) {
      padding-bottom: 50px;
    }

    @include mq($bp-big) {
      grid-gap: 40px;
      padding-right: 146px;
    }
  }
}

.swiper-slide :deep(.swiper__card ~ .card__content) {
  display: none;
}

.swiper-slide {
  width: auto;
  height: auto;
}
</style>
