<template>
  <section class="dealer-block">
    <p class="dealer-block__title">
      {{ typeCarTitle }} представлен в дилерском центре
      {{ detailTypeCar }}
    </p>
    <div class="dealer-block__main-info">
      <nuxt-img
        v-if="dealer.photo[0]"
        :src="dealer.photo[0]"
        alt="Дилерский центр"
        loading="lazy"
        class="dealer-block__image"
        width="600"
        sizes="md:100vw b:50vw sb:700px"
      />
      <div class="dealer-block__contact-info">
        <h2 v-if="dealer" class="dealer-block__name">
          {{ dealer.nameRu }}
        </h2>
        <a class="dealer-block__phone" :href="`tel:${dealer.phone}`">
          {{ dealer.phone }}</a>
        <ContactsDepartmentList class="dealer-block__department-list">
          <ContactsDepartmentItem
            v-for="item in dealer.timeTable"
            :key="item.department"
            :title="item.department"
            :time="item.time"
          />
        </ContactsDepartmentList>
        <section class="dealer-block__section">
          <UIBaseButton
            :to="`/contacts/${dealer.mark.code}/${dealer.code}/`"
            class="dealer-block__button dealer-block__button--large"
            text="Подробнее о центре"
            primary
          />
          <div class="dealer-block__navigation navigation">
            <button
              v-if="dealer.googleCardUrl"
              class="navigation__button"
              @click="onGoToNavigation(dealer.googleCardUrl)"
            >
              <img
                class="dealer-block__icon"
                src="@/assets/icons/google-point.svg"
                alt="метка на карте google"
              >
            </button>
            <button
              v-if="dealer.yandexCardUrl"
              class="navigation__button"
              @click="onGoToNavigation(dealer.yandexCardUrl)"
            >
              <img
                class="dealer-block__icon"
                src="@/assets/icons/yandex-point.svg"
                alt="метка на карте yandex"
              >
            </button>
            <button
              v-if="dealer.yanaviCardUrl"
              class="navigation__button navigation__button--nav"
              @click="onGoToNavigation(dealer.yanaviCardUrl)"
            >
              <img
                class="dealer-block__icon"
                src="@/assets/icons/yandex-navigation.svg"
                alt="стрелка yandex навигации"
              >
            </button>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CatalogBlockDealer',
  props: {
    dealer: {
      type: Object,
      required: true,
    },
    carType: {
      type: String,
      default: 'cars',
    },
  },
  data: () => ({
    typeCarTitle: 'Автомобиль',
    detailTypeCar: '',
  }),
  mounted () {
    this.setTtileCarType()
  },
  methods: {
    onGoToNavigation (url) {
      process.client && window.open(url, '_blank')
    },
    setTtileCarType () {
      const carTitles = {
        moto: 'Мотоцикл',
        atv: 'Квадроцикл',
        'jet-ski': 'Гидроцикл',
      }

      this.typeCarTitle = carTitles[this.carType] || 'Автомобиль'
      this.detailTypeCar =
        this.carType === 'commercial' ? '(для коммерческого транспорта)' : ''
    },
  },
}
</script>

<style lang="scss" scoped>
.dealer-block {
  display: grid;
  grid-gap: 20px;

  @include mq($bp-small-medium) {
    grid-gap: 30px;
  }

  &__title {
    @include text_big_bold;

    @include mq($bp-small-medium) {
      @include h4;
    }

    @include mq($bp-small) {
      @include h3;
    }
  }

  &__contact-info {
    @include mq($bp-big) {
      display: grid;
      grid-template-rows: min-content min-content 1fr;
    }
  }

  &__main-info {
    display: grid;
    grid-gap: 20px;

    @include mq($bp-small-medium) {
      grid-gap: 25px;
    }

    @include mq($bp-big) {
      grid-template-columns: 1fr minmax(416px, 1fr);
      grid-auto-flow: column;
      grid-gap: 40px;
    }

    @include mq($bp-super-big) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__section {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
  }

  &__image {
    width: 100%;
    border-radius: 8px;
  }

  &__name {
    @include text_medium_bold;

    margin-bottom: 5px;

    @include mq($bp-super-small) {
      margin-bottom: 10px;
    }

    @include mq($bp-small-medium) {
      @include h4;
    }
  }

  &__phone {
    @include text_medium_regular;

    display: block;
    margin-bottom: 20px;
    color: var(--blackLight);

    @include mq($bp-medium) {
      margin-bottom: 25px;
    }
  }

  &__department-list {
    @include mq($bp-small-medium) {
      grid-template-columns: 1fr 1fr;
      width: initial;
    }

    @include mq($bp-big) {
      grid-gap: 30px;
      align-self: center;
    }

    @include mq($bp-super-big) {
      row-gap: 30px;
      column-gap: 40px;
    }
  }

  &__button {
    padding: 12px 0;

    @include mq($bp-small-medium) {
      padding: 12px 25px;
    }

    &--large {
      width: 100%;

      @include mq($bp-small) {
        width: auto;
      }
    }
  }

  &__navigation {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;

    @include mq($bp-small) {
      width: calc(50% - 6px);
    }

    &.navigation {
      .navigation {
        &__button {
          display: flex;
          flex-grow: 1;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          min-width: 44px;
          max-width: 100%;
          min-height: 44px;
          background: var(--grayLight);
          border-radius: 6px;

          @include mq($bp-small) {
            flex-grow: 0;
            flex-shrink: 1;
            min-width: 44px;
          }

          &--nav {
            @include mq($bp-small) {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
