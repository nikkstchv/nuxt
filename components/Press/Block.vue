<template>
  <section v-if="sectionButtons?.length" class="press-block">
    <p class="press-block__title">
      {{ title }}
    </p>
    <header class="press-block__header">
      <UIBaseSelectButtons
        v-if="sectionButtons"
        ref="sectionButtons"
        class="press-block__section-buttons"
        :buttons="sectionButtons"
        @onChangeButtons="onChangeSectionButtons"
      />
      <UIArrowLink
        class="press-block__button"
        :href="
          activeSectionLabel === 'Акции'
            ? `/actions/?brand=${markCode}`
            : `/news/?brand=${markCode}`
        "
      >
        Смотреть все
      </UIArrowLink>
    </header>

    <MainScroller name="press-block" :options="sliderOptions">
      <UIMediaCard
        v-for="item in sortedCards"
        :key="item.code"
        :code="item.code"
        :type="activeSectionLabel === 'Акции' ? 'actions' : 'news'"
        :title="item.title"
        :text="item.text"
        :date="item.startAt"
        :image="item.previewImage"
        :mark="item.mark"
        :marks="item.marks"
        :department="activeSectionLabel === 'Акции' ? item.department : ''"
        class="swiper-slide press-block__card"
      />
    </MainScroller>
  </section>
</template>

<script>
import { mapState } from 'pinia'
import { useCityStore } from '../../store/city'
import { getActions as getActionsPath } from '@/api/routes/action'
import { getNews as getNewsPath } from '@/api/routes/news'

export default {
  name: 'PressBlock',
  props: {
    title: {
      type: String,
      required: true,
    },
    markId: {
      type: String,
      required: true,
      default: '',
    },
    markCode: {
      type: String,
      required: true,
      default: '',
    },
  },
  data () {
    return {
      news: null,
      actions: null,
      activeSectionLabel: '',
      sectionButtons: null,
      sliderOptions: {
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          599: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          899: {
            slidesPerView: 3,
            spaceBetween: 35,
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1366: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        },
      },
    }
  },
  computed: {
    query () {
      return {
        ...(this.markId && { markId: this.markId }),
        archive: false,
      }
    },
    sortedCards () {
      if (this.showedCards) {
        return this.showedCards.reduce((sum, cur) => {
          const isUserCity = cur.dealers.some(dealer => dealer.cityCode === this.siteCityCode)
          if (isUserCity) {
            return [cur, ...sum]
          } else {
            return [...sum, cur]
          }
        }, [])
      }

      return null
    },
    showedCards () {
      switch (this.activeSectionLabel) {
        case 'Акции':
          return this.actions
        case 'Новости':
          return this.news
        default:
          return this.actions
      }
    },
    ...mapState(useCityStore, ['siteCityCode']),
  },
  async mounted () {
    this.news = await this.getNews()
    this.actions = await this.getActions()
    this.setSectionButtons()
  },
  methods: {
    setSectionButtons () {
      const hasActions = this.actions?.length
      const hasNews = this.news?.length
      this.activeSectionLabel = !hasActions ? 'Новости' : 'Акции'
      this.sectionButtons = [
        ...(hasActions
          ? [
              {
                label: 'Акции',
                isActive: hasActions,
              },
            ]
          : []),
        ...(hasNews
          ? [
              {
                label: 'Новости',
                isActive: !hasActions,
              },
            ]
          : []),
        // {
        //   label: 'Статьи',
        //   isActive: this.$route.query.section === 'Статьи',
        // },
      ]
    },
    onChangeSectionButtons () {
      const activeButton = this.$refs.sectionButtons.getActiveButton()
      this.activeSectionLabel = activeButton.label
    },
    async getNews () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const options = {
        query: this.query,
      }
      const res = await $fetchClient(getNewsPath(8, 1), options)
      if (!$hasErrorResponse(res)) {
        return res.data
      }
      return null
    },
    async getActions () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const options = {
        query: this.query,
      }
      const res = await $fetchClient(getActionsPath(8, 1), options)
      if (!$hasErrorResponse(res)) {
        return res.data
      }
      return null
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.press-block {
  max-width: 100vw;
  padding: 0 15px;

  @include mq($bp-small-medium) {
    padding: 0 20px;
  }

  @include mq($bp-small) {
    padding: 0 32px;
  }

  @include mq($bp-medium) {
    padding: 0 50px;
  }

  @include mq($bp-medium-big) {
    padding: 0 81px;
  }

  @include mq($bp-big) {
    padding: 0 146px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 0 !important;
    margin-bottom: 30px;

    @include mq($bp-small) {
      margin-bottom: 40px;
    }
  }

  &__title {
    @include h5;

    margin-bottom: 20px;

    @include mq($bp-small-medium) {
      @include h3;

      margin-bottom: 30px;
    }

    @include mq($bp-small) {
      margin-bottom: 40px;
    }

    @include mq($bp-medium-big) {
      @include h2;
    }
  }

  &__card {
    min-width: auto !important;
    max-width: 100% !important;
    height: auto;
  }
}
</style>
