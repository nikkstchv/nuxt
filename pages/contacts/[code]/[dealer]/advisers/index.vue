<template>
  <main class="advisers">
    <UISimplePageHeader
      class="advisers__header"
      :title="h1"
      :direct-crumbs="directCrumbs"
    />

    <div class="advisers__bar">
      <UIBaseSelectButtons
        class="advisers__buttons"
        :buttons="tags"
        @onChangeButtons="onChangeButtons"
      />

      <div class="advisers__search">
        <UIButtonLoop class="advisers__search-button" />
        <input
          v-model="search"
          placeholder="Найти сотрудника"
          class="advisers__search-input"
        >
      </div>
    </div>

    <p
      v-if="filteredCards.length === 0 && !isLoading"
      class="advisers__empty"
    >
      Сотрудники не найдены
    </p>

    <div v-else-if="!isLoading" class="advisers__list">
      <ContactsAdvisersCard
        v-for="item in filteredCards"
        :key="item.userId"
        :adviser="item"
      />
    </div>

    <UILoader v-else class="advisers__loader" />
  </main>
</template>

<script>
import { getDealer } from '@/api/routes/dealer'
import { getAdvisers } from '@/api/routes/adviser'

export default defineNuxtComponent({
  name: 'PageContactsDealerAdvisers',
  async asyncData () {
    const { $fetchClient, $hasErrorResponse, $errorResponseCatch, $getSeo } = useNuxtApp()
    const route = useRoute()
    const { params, path } = route
    const { mark, dealer: code } = params
    const seo = await $getSeo(path)
    const dealer = await $fetchClient(getDealer(code, mark))

    if ($hasErrorResponse(dealer)) {
      $errorResponseCatch(dealer)
    }

    return { dealer, seo }
  },
  setup () {
    useHeadDefault()
  },
  data () {
    return {
      isLoading: true,
      cards: [],
      departments: [],
      search: '',
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: this.title,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: this.description,
        },
      ],
    }
  },
  computed: {
    defaultSeoText () {
      return `Команда ${this.dealerName}${
        this.activeTag?.code ? ` ${this.activeTag.label}` : ''
      }`
    },
    h1 () {
      return this.seo?.seoH1 || this.defaultSeoText
    },
    title () {
      return this.seo?.seoTitle || this.defaultSeoText
    },
    description () {
      return this.seo?.seoDescription || this.defaultSeoText
    },
    directCrumbs () {
      return ['', this.dealerMark, this.dealerName, this.title]
    },
    dealerName () {
      return this.dealer?.nameRu ?? ''
    },
    dealerMark () {
      return this.dealer?.mark?.nameEn ?? ''
    },

    tags () {
      const { departmentId } = this.$route.query

      return this.departments.reduce(
        (arr, item) => {
          arr.push({
            label: item.name,
            code: item.code,
            isActive: item.code === departmentId,
          })

          return arr
        },
        [
          {
            label: 'Все',
            code: null,
            isActive: !departmentId,
          },
        ],
      )
    },

    activeTag () {
      return this.tags.find(tag => tag.isActive)
    },

    filteredCards () {
      if (this.search) {
        return this.cards.filter(item =>
          item.name.toLowerCase().includes(this.search.toLowerCase()),
        )
      }

      return this.cards
    },
  },
  async mounted () {
    if (this.dealer?.id) {
      await this.getAdvisers(this.$route.query.departmentId)
    }
  },
  methods: {
    onChangeButtons (data) {
      const activeItem = data.find(item => item.isActive)

      let obj = {}

      if (activeItem?.code) {
        obj = {
          query: {
            departmentId: activeItem.code,
          },
        }
      }

      this.$router.push(obj)

      this.getAdvisers(activeItem.code)
    },

    async getAdvisers (departmentId) {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      this.isLoading = true
      this.cards = []

      const options = {
        query: {
          dealerId: this.dealer.id,
          ...(departmentId && { departmentId }),
        },
      }

      const advisers = await $fetchClient(getAdvisers(), options)

      if (!$hasErrorResponse(advisers)) {
        this.cards = advisers.users ?? []
        this.departments = advisers.departments ?? []
      }

      this.isLoading = false
    },
  },
})
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.advisers {
  @include indentsMainHorizontal;

  height: 100%;
  padding-bottom: 50px;

  @include mq($bp-small) {
    padding-bottom: 100px;
  }

  @include mq($bp-medium-big) {
    padding-bottom: 150px;
  }

  &__header {
    padding-top: 15px;

    & :deep(.header__title) {
      margin-bottom: 0;
    }
  }

  &__bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 18px;

    @include mq($bp-small-medium) {
      margin-top: 20px;
    }

    @include mq($bp-small) {
      flex-direction: row;
      align-items: center;
    }

    @include mq($bp-big) {
      margin-top: 30px;
    }
  }

  &__search {
    position: relative;
    width: 100%;
    max-width: 100%;
    margin-top: 15px;

    @include mq($bp-small) {
      max-width: 250px;
      margin-top: 0;
    }

    @include mq($bp-medium) {
      max-width: 275px;
    }

    @include mq($bp-medium-big) {
      max-width: 250px;
    }

    &-button {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20px;
      width: auto;
      height: auto;
      margin: auto;
      pointer-events: none;

      & :deep(.icon) {
        width: 18px;
        height: 18px;
      }
    }

    &-input {
      @include text_medium_small;

      width: 100%;
      height: 37px;
      padding-left: 48px;
      color: var(--grayDolphin);
      background: var(--grayLight);
      border-radius: 20px;
      outline: none;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
    justify-content: space-between;
    justify-items: center;
    margin-top: 30px;

    @include mq($bp-super-small) {
      grid-template-columns: repeat(2, minmax(100px, 250px));
      grid-gap: 40px 20px;
    }

    @include mq($bp-small-medium) {
      grid-template-columns: repeat(2, minmax(100px, 250px));
      grid-gap: 50px 20px;
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(3, minmax(100px, 250px));
    }

    @include mq($bp-medium) {
      grid-template-columns: repeat(3, minmax(100px, 275px));
      grid-gap: 60px 20px;
      margin-top: 40px;
    }

    @include mq($bp-medium-big) {
      grid-template-columns: repeat(4, minmax(100px, 250px));
      grid-gap: 60px 20px;
      margin-top: 50px;
    }

    @include mq($bp-big) {
      grid-template-columns: repeat(5, minmax(100px, 250px));
      grid-gap: 70px 20px;
    }
  }

  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-bottom: 100px;
  }
}
</style>
