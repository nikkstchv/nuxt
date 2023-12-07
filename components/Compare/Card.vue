<template>
  <div class="card">
    <div class="card__pagination">
      <button
        class="card__pagination-button"
        :class="{ 'card__pagination-button_disabled': isLeftArrowDisabled }"
      >
        <IconArrow
          class="card__icon card__icon_arrow"
          :disable="isLeftArrowDisabled"
          left
          @click="onLeft"
        />
      </button>
      <span class="card__pagination-value">{{ activeCard + 1 }}/{{ cardsLength }}</span>
      <button
        class="card__pagination-button"
        :class="{ 'card__pagination-button_disabled': isRightArrowDisabled }"
      >
        <IconArrow
          class="card__icon card__icon_arrow"
          right
          :disable="isRightArrowDisabled"
          @click="onRight"
        />
      </button>
    </div>
    <nuxt-link :to="`/catalog/${id}/`" class="card__link-wrapper">
      <transition name="fade">
        <div v-show="!isSticky" class="card__image-wrapper">
          <img
            ref="mainImage"
            class="card__image"
            :src="mainImage"
            alt="Автомобиль"
          >
        </div>
      </transition>
      <transition name="fade">
        <span
          v-show="!isSticky"
          class="card__state"
          :class="{
            card__state_sold: !status,
            card__state_available: status,
          }"
        >{{ status ? 'В наличии' : 'Продан' }}</span>
      </transition>
      <p class="card__title">
        {{ mark }}
        {{ model }}
      </p>
      <p class="card__text">
        {{ modification }}
      </p>
      <p class="card__text card__text_intend">
        {{ equipment }}
      </p>
    </nuxt-link>
    <p v-if="isShowPrice" class="card__price">
      {{ `от  ${$toLocalPrice(price)} ₽` }}
    </p>
    <button
      class="card__button"
      :class="{ card__button_sticky: isSticky }"
      @click="onRemoveCompareCar"
    >
      <p class="card__button-text">
        Удалить из сравнения
      </p>
      <IconTrash class="card__icon card__icon_trash" />
    </button>
  </div>
</template>

<script>

export default {
  name: 'CompareCard',
  props: {
    images: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    cardsLength: {
      type: Number,
      required: false,
      default: null,
    },
    activeCardName: {
      type: String,
      required: false,
      default: '',
    },
    activeCard: {
      type: [String, Number],
      required: false,
      default: '',
    },
    status: {
      type: Boolean,
      required: true,
    },
    mark: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    modification: {
      type: String,
      required: true,
    },
    equipment: {
      type: String,
      required: true,
      default: '',
    },
    price: {
      type: Number,
      required: true,
    },
    isSticky: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({
    openPopup: false,
    imageWidth: 0,
    sorted: null,
    imageContainer: null,
    isMobile: null,
  }),
  computed: {
    isShowPrice () {
      return this.hasPrice(this.price) && this.status
    },
    isLeftArrowDisabled () {
      return this.activeCard === 0
    },
    isRightArrowDisabled () {
      return this.cardsLength - 1 === this.activeCard
    },
    mainImage () {
      if (this.images) {
        return this.images[0]?.source?.url ?? ''
      }
      return null
    },
  },
  mounted () {
    this.imageContainer = this.$refs.imageContainer
    this.isMobile = window.matchMedia('(max-width: 1400px)').matches
  },

  methods: {
    hasPrice (price) {
      return price && price > 0
    },
    onLeft () {
      const position = this.activeCard - 1

      this.$emit('changeActiveCard', {
        position,
        name: this.activeCardName,
      })
    },
    onRight () {
      const position = this.activeCard + 1

      this.$emit('changeActiveCard', {
        position,
        name: this.activeCardName,
      })
    },
    onRemoveCompareCar () {
      this.$emit('onRemoveCompareCar', this.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: grid;
  grid-template-rows: min-content 1fr;
  width: 100%;
  height: 100%;
  background-color: white;

  &:hover .card__button {
    opacity: 1;
  }

  &__pagination {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;

    @include mq($bp-small-medium) {
      margin-bottom: 30px;
    }

    @include mq($bp-medium-big) {
      display: none;
    }

    &-value {
      @include text_medium_regular;
    }
  }

  &__link-wrapper {
    display: grid;
    height: fit-content;
  }

  &__button {
    @include text_medium_regular;

    display: grid;
    grid-template-columns: 1fr auto;
    grid-auto-flow: column;
    grid-gap: 8px;
    align-items: center;
    padding-top: 15px;

    @include mq($bp-small-medium) {
      width: max-content;
    }

    @include mq($bp-medium-big) {
      opacity: 0;
    }

    &-text {
      text-align: start;
    }

    &_sticky {
      position: absolute;
      right: 0;
      bottom: 4px;

      & .card__button-text {
        display: none;
      }
    }
  }

  &__icons {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 17px;
    place-items: center;
  }

  &__image-container {
    position: relative;
    display: grid;
    place-items: center;
    align-items: center;
    height: 100%;
    background-color: white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 0;

    @media (max-width: $bp-small) {
      margin-bottom: 0;
    }
  }

  &__image-wrapper {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: auto;
    padding-bottom: 75%;
  }

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    object-fit: contain;
    object-position: center;
  }

  &__title {
    @include text_medium_bold;

    margin-bottom: 7px;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: $bp-super-small) {
      @include text_small_bold;

      align-self: flex-end;
    }
  }

  &__text {
    @include text_medium_regular;

    margin-bottom: 3px;
    color: var(--blackLight);

    @media (max-width: $bp-super-small) {
      @include text_small_regular;

      color: var(--blackLight);
    }

    &_intend {
      margin-bottom: 15px;

      @include mq($bp-small) {
        margin-bottom: 20px;
      }
    }
  }

  &__price {
    @include h5;

    align-self: flex-end;
    width: max-content;
    margin-right: 0;
    white-space: nowrap;

    @include mq($bp-small-medium) {
      @include h4;

      margin-right: 10px;
    }
  }

  &__pagination-button {
    &_disabled {
      cursor: default;
    }
  }

  &__icon {
    &_trash :deep(.icon__path) {
      stroke: var(--black);
    }

    &_arrow {
      width: 24px;
      height: 24px;
    }
  }

  &__state {
    @include label_small;

    padding-top: 7px;

    &_sold {
      color: var(--grayDark);
    }

    &_available {
      color: var(--valid);
    }
  }
}
</style>
