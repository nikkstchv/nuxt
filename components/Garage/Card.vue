<template>
  <div class="card">
    <img class="card__image" :src="image" alt="">
    <div class="card__main">
      <h2 class="card__title">
        {{ title }}
      </h2>
      <p class="card__text">
        {{ modification }}
      </p>
      <p class="card__text card__text_indent">
        {{ year }} / {{ color }}
      </p>
      <p class="card__item">
        VIN: <span class="card__item-value">{{ vin }}</span>
      </p>
      <p class="card__item">
        Гос. номер: <span class="card__item-value">{{ stateNumber }}</span>
      </p>
      <p class="card__item" @click="onOpenGaragePanel">
        Пробег:
        <span class="card__item-value card__item-value_underline">{{
          run
        }}</span>
      </p>
    </div>
    <div class="card__wrapper">
      <IconDots class="card__icon" @click="onOpenPopup" />
      <transition name="fade">
        <div
          v-if="isOpenPopup"
          v-click-outside="onClosePopup"
          class="card__popup"
        >
          <ul class="card__popup-list">
            <li class="card__popup-item">
              Сделать автомобилем по умолчанию
            </li>
            <li class="card__popup-item">
              Скрыть автомобиль
            </li>
            <nuxt-link
              to="service-registration"
              class="card__popup-item"
            >
              Записаться на сервис
            </nuxt-link>
            <nuxt-link to="orders" class="card__popup-item">
              Посмотреть список заказов
            </nuxt-link>
            <li class="card__popup-item" @click="onOpenGaragePanel">
              Дополнить информацию
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GarageCard',
  props: {
    image: {
      type: String,
      required: true,
      default: '',
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    modification: {
      type: String,
      required: true,
      default: '',
    },
    year: {
      type: String,
      required: true,
      default: '',
    },
    run: {
      type: String,
      required: true,
      default: '',
    },
    color: {
      type: String,
      required: true,
      default: '',
    },
    vin: {
      type: String,
      required: true,
      default: '',
    },
    stateNumber: {
      type: String,
      required: true,
      default: '',
    },
  },
  data: () => ({
    isOpenPopup: false,
  }),
  methods: {
    onOpenPopup () {
      setTimeout(() => {
        this.isOpenPopup = true
      }, 0)
    },
    onClosePopup () {
      this.isOpenPopup = false
    },
    onOpenGaragePanel () {
      this.$emit('onOpenGaragePanel')
    },
  },
}
</script>
<style lang="scss" scoped>
.card {
  position: relative;
  display: block;
  grid-gap: 5px;
  max-width: 600px;
  padding: 20px 15px;
  box-shadow: 0 8px 12px rgb(153 155 168 / 15%);

  @include mq($bp-small-medium) {
    display: grid;
    grid-template-columns: 240px auto;
    grid-auto-flow: column;
  }

  @include mq($bp-medium) {
    box-shadow: none;

    &:hover {
      box-shadow: 0 8px 12px rgb(153 155 168 / 15%);
    }
  }

  &__main {
    padding-right: 25px;
  }

  &__image {
    align-self: center;
    max-width: 40%;
    max-height: 141px;
    padding: 10px;
    margin: 20px auto;
    object-fit: contain;

    @include mq($bp-small-medium) {
      max-width: 60%;
    }
  }

  &__wrapper {
    position: absolute;
    top: 15px;
    right: 10px;
  }

  &__title {
    @include text_small_bold;

    margin-bottom: 7px;

    @include mq($bp-small-medium) {
      @include text_medium_bold;
    }
  }

  &__text {
    @include text_small_regular;

    @include mq($bp-small-medium) {
      @include text_medium_regular;
    }

    &_indent {
      margin-bottom: 15px;

      @include mq($bp-small-medium) {
        margin-bottom: 22px;
      }
    }
  }

  &__item {
    @include text_small_bold;

    display: grid;
    grid-auto-flow: column;
    grid-gap: 5px;
    width: fit-content;

    @include mq($bp-small-medium) {
      @include text_medium_bold;
    }

    &-value {
      @include text_small_regular;

      @include mq($bp-small-medium) {
        @include text_medium_regular;
      }

      &_underline {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  &__icon {
    cursor: pointer;
  }

  &__popup {
    position: absolute;
    left: -170px;
    z-index: 1;
    max-width: 200px;
    background: white;
    box-shadow: 0 8px 12px rgb(153 155 168 / 15%);

    &-list {
      display: grid;
      grid-gap: 5px;
      padding: 15px 0;
    }

    &-item {
      @include text_small_regular;

      padding: 6px 10px;
      color: var(--blackLight);
      cursor: pointer;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--grayLight);
        }
      }
    }
  }
}
</style>
