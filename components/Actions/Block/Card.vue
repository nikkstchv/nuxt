<template>
  <nuxt-link :to="link" class="card">
    <span v-if="showEndDate" class="card__label">
      Завершится {{ $toLocalDate(end) }}
    </span>
    <div :data-background="image" class="card__image swiper-lazy">
      <div class="swiper-lazy-preloader" />
    </div>
    <div class="card__container">
      <div class="card__header">
        <p
          v-if="department && schema.department[department]"
          class="card__department"
        >
          {{ schema.department[department] }}
        </p>
        <p class="card__title" v-html="title" />
      </div>
      <div ref="footer" class="card__footer">
        <div class="card__logos" :style="{ opacity: isEmptyLogos && '0' }">
          <nuxt-img
            v-for="(item, index) in logos"
            :key="index"
            class="card__logo"
            :src="item.logo"
            alt="Логотип марки"
            width="80"
            height="40"
            loading="lazy"
          />
        </div>
        <div class="card__button-wrapper">
          <CatalogButton class="card__button">
            Читать
          </CatalogButton>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ActionsBlockCard',
  props: {
    id: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
      default: '',
    },
    brands: {
      type: Array,
      required: false,
      default: () => [],
    },
    image: {
      type: String,
      required: true,
      default: '',
    },
    brand: {
      type: Object,
      required: true,
      default: null,
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    department: {
      type: String,
      required: false,
      default: '',
    },
  },
  data () {
    return {
      schema: {
        department: {
          service: 'Сервис',
          sale: 'Отдел продаж',
        },
      },
    }
  },
  computed: {
    isEmptyLogos () {
      return !(this.brands?.length || this.brand)
    },
    logos () {
      return this.brands?.length ? this.brands : [this.brand]
    },
    link () {
      return `/actions/${this.id}/`
    },
    showEndDate () {
      if (this.end) {
        const endDate = new Date(this.end)
        const startDate = new Date()

        const oneDay = 1000 * 60 * 60 * 24

        const diffInTime = endDate.getTime() - startDate.getTime()
        const diffInDays = Math.round(diffInTime / oneDay)

        return diffInDays <= 7
      }

      return false
    },
  },
  mounted () {
    this.observeFooter()
  },
  beforeUnmount () {
    this.observer.disconnect()
  },
  methods: {
    observeFooter () {
      const element = this.$refs.footer
      this.observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const newHeight = entry.contentRect.height
          if (newHeight > 60) {
            element.classList.add('card__footer_wrap')
          } else if (newHeight === 40) {
            element.classList.remove('card__footer_wrap')
          }
        }
      })
      this.observer.observe(element)
    },
  },
}
</script>

<style scoped lang="scss">
.card {
  position: relative;
  display: grid;
  grid-template-rows: max-content;
  height: 100%;
  min-height: 422px;
  overflow: hidden;
  border-radius: 8px;

  @include mq($bp-big) {
    display: grid;
    grid-template-rows: none;
    grid-template-columns: 780px 380px;
    max-width: 1163px;
  }

  @include mq($bp-super-big) {
    width: 1163px;
  }

  &:hover {
    .card__button {
      width: 100%;
      background: var(--black);
    }

    & :deep(.button-arrow__icon-arrow) {
      background: var(--black);
      transform: translateX(0) rotate(-180deg);
    }

    & :deep(.button-arrow__text) {
      opacity: 1;
    }
  }

  &__image {
    position: relative;
    aspect-ratio: 16 / 9;
    padding-bottom: 56.3%;
    background-color: var(--grayLight);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 15px 30px;
    background-color: white;

    @include mq($bp-big) {
      padding: 30px 30px 60px 20px;
    }
  }

  &__label {
    @include text_small_medium;

    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    padding: 5px 7px;
    background: var(--grayLight);
    border-radius: 20px;
  }

  &__department {
    @include text_small_super;

    width: fit-content;
    padding: 4px 8px;
    margin-bottom: 14px;
    font-weight: 500;
    color: var(--blackLight);
    border: 1px solid var(--blackLight);
    border-radius: 2px;
  }

  &__title {
    @include text_medium_bold;

    margin-bottom: 10px;
    font-weight: 700;

    @include mq($bp-medium) {
      @include h5;
    }

    @include mq($bp-medium-big) {
      @include h4;
    }
  }

  &__footer {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    grid-gap: 30px;
    align-self: flex-end;
    justify-content: space-between;
    width: 100%;

    @include mq($bp-big) {
      flex-direction: row;
    }

    &_wrap {
      flex-direction: row;
      margin-top: 15px;
    }
  }

  &__button-wrapper {
    display: block;
    width: 120px;

    @include mq($bp-big) {
      display: none;
    }
  }

  &__logos {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 20px;
    align-items: center;
  }

  &__logo {
    position: relative;
    width: auto;
    max-width: 80px;
    height: 40px;

    @include mq($bp-big) {
      max-width: 90px;
      height: 45px;
    }
  }
}
</style>
