<template>
  <section v-if="cards.length" class="advisers">
    <header class="advisers__header">
      <p class="advisers__title">
        Сотрудники
      </p>

      <UIArrowLink
        class="advisers__link advisers__link_mobile"
        :href="linkSeeAll"
      >
        Смотреть все
      </UIArrowLink>
    </header>

    <div class="advisers__buttons">
      <UIBaseSelectButtons
        :buttons="departments"
        @onChangeButtons="onChangeButtons"
      />

      <UIArrowLink
        class="advisers__link advisers__link_desktop"
        :href="linkSeeAll"
      >
        Смотреть все
      </UIArrowLink>
    </div>

    <MainScroller
      :key="filteredCards.length"
      ref="advisersSlider"
      name="advisers"
      :options="sliderOptions"
      class="advisers__scroller"
    >
      <ContactsAdvisersCard
        v-for="item in filteredCards"
        :key="item.userId"
        :adviser="item"
        is-in-dealers
        class="swiper-slide advisers__card"
      />
    </MainScroller>
  </section>
</template>

<script>
import { getAdvisers } from '@/api/routes/adviser'

export default {
  name: 'ContactsAdvisersBlock',
  props: {
    dealerId: {
      type: String,
      required: true,
    },
    linkSeeAll: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    departments: [],
    cards: [],
    sliderOptions: {
      slidesPerView: 'auto',
      spaceBetween: 20,
      breakpoints: {
        415: {
          spaceBetween: 25,
        },
        900: {
          spaceBetween: 55,
        },
        1367: {
          spaceBetween: 90,
        },
      },
      navigation: {},
    },
  }),
  computed: {
    filteredCards () {
      if (this.activeTag?.code) {
        return this.cards.filter(
          item => item.department === this.activeTag.label,
        )
      }

      return this.cards
    },

    activeTag () {
      return this.departments.find(department => department.isActive)
    },
  },
  mounted () {
    this.getCards()
  },
  methods: {
    async getCards () {
      const { $fetchClient } = useNuxtApp()
      try {
        const options = {
          query: {
            dealerId: this.dealerId,
          },
        }
        const res = await $fetchClient(getAdvisers(), options)

        this.cards = res?.users ?? []

        if (res?.departments) {
          this.departments = res.departments
            .filter((department) => {
              return !!this.cards.find(
                card => card.department === department.name,
              )
            })
            .reduce(
              (arr, item) => {
                arr.push({
                  label: item.name,
                  code: item.code,
                  isActive: false,
                })

                return arr
              },
              [
                {
                  label: 'Все',
                  code: null,
                  isActive: true,
                },
              ],
            )
        }
      } catch (err) {}
    },

    onChangeButtons (data) {
      const activeItem = data.find(item => item.isActive)

      this.departments.forEach(item => (item.isActive = false))
      this.departments.find((item) => {
        if (item.code === activeItem.code) {
          item.isActive = true
          return true
        }
        return false
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';

.advisers {
  max-width: 100vw;
  padding: 0 0 0 15px;

  @include mq($bp-small-medium) {
    padding: 0 0 0 20px;
  }

  @include mq($bp-small) {
    padding: 0 0 0 32px;
  }

  @include mq($bp-medium) {
    padding: 0 0 0 50px;
  }

  @include mq($bp-medium-big) {
    padding: 0 0 0 81px;
  }

  @include mq($bp-big) {
    padding: 0 0 0 146px;
  }

  &__header {
    display: flex;
    grid-gap: 40px;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px 0 0;
    margin-bottom: 20px;

    @include mq($bp-small-medium) {
      grid-gap: 30px;
      padding: 0 20px 0 0;
      margin-bottom: 30px;
    }

    @include mq($bp-small) {
      padding: 0 32px 0 0;
    }

    @include mq($bp-medium) {
      padding: 0 50px 0 0;
    }

    @include mq($bp-medium-big) {
      padding: 0 81px 0 0;
      margin-bottom: 40px;
    }

    @include mq($bp-big) {
      padding: 0 146px 0 0;
    }
  }

  &__title {
    @include h5;

    @include mq($bp-small-medium) {
      @include h3;
    }

    @include mq($bp-medium-big) {
      @include h2;
    }
  }

  &__link {
    .advisers &_mobile {
      display: flex;

      @include mq($bp-small) {
        display: none;
      }
    }

    .advisers &_desktop {
      display: none;

      @include mq($bp-small) {
        display: flex;
      }
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px 0 0;
    margin-bottom: 20px;

    @include mq($bp-small-medium) {
      padding: 0 20px 0 0;
      margin-bottom: 30px;
    }

    @include mq($bp-small) {
      padding: 0 32px 0 0;
    }

    @include mq($bp-medium) {
      padding: 0 50px 0 0;
    }

    @include mq($bp-medium-big) {
      padding: 0 81px 0 0;
      margin-bottom: 40px;
    }

    @include mq($bp-big) {
      padding: 0 146px 0 0;
    }
  }

  & :deep(.swiper) {
    padding: 0 15px 0 0;
    overflow: visible;

    @include mq($bp-small-medium) {
      padding: 0 20px 0 0;
    }

    @include mq($bp-small) {
      padding: 0 32px 0 0;
    }

    @include mq($bp-medium) {
      padding: 0 50px 0 0;
    }

    @include mq($bp-medium-big) {
      padding: 0 81px 0 0;
      margin-bottom: 40px;
    }

    @include mq($bp-big) {
      padding: 0 146px 0 0;
    }
  }

  & :deep(.swiper__button) {
    display: none;
  }

  &__card {
    scroll-snap-coordinate: left;
    scroll-snap-align: start;

    @include mq($bp-super-small) {
      max-width: 360px;
    }

    @include mq($bp-super-small) {
      max-width: 260px;
    }
  }
}
</style>
