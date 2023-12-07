<template>
  <div class="card">
    <component
      :is="url ? 'router-link' : 'div'"
      :to="url"
      class="card__link"
      :class="{ card__link_disabled: !url || isDisabledLink}"
      @click="disableLink"
    >
      <nuxt-img
        v-if="image && !isSmallCard"
        ref="mainImage"
        class="card__image"
        :src="image"
        alt="транспортное средство"
        sizes="md:40vw mb:20vw"
        loading="lazy"
      />
      <section class="card__title-container">
        <component
          :is="isSeoTitle ? 'h3' : 'p'"
          class="card__title"
          :class="{ card__title_size_small: isSmallCard }"
        >
          {{ title }}
        </component>
        <span
          v-if="qty !== '0'"
          class="card__qty"
          :class="{ card__qty_size_small: isSmallCard }"
        >{{ qty }}</span>
      </section>
    </component>
    <template v-if="type === 'В продаже' || type === 'Все'">
      <nuxt-link
        v-if="priceNew !== '0'"
        class="card__price-container card__price-container_indent"
        :to="linkNew"
      >
        Новые {{ isAvtodom ? 'модели' : '' }}: <br class="card__br">
        <span class="card__price">от {{ `${priceNew} ₽` }}</span>
      </nuxt-link>
      <span v-else />
      <nuxt-link
        v-if="priceUsed !== '0'"
        class="card__price-container"
        :to="linkUsed"
      >
        С пробегом: <br class="card__br">
        <span class="card__price">от {{ `${priceUsed} ₽` }}</span>
      </nuxt-link>
    </template>
    <nuxt-link
      v-else-if="type === (isAvtodom ? 'Новые модели' : 'Новые')"
      class="card__price-container card__price-container_indent"
      :to="linkNew"
    >
      <span class="card__price">от {{ `${priceNew} ₽` }}</span>
    </nuxt-link>
    <nuxt-link
      v-if="type === 'С пробегом'"
      class="card__price-container"
      :to="linkUsed"
    >
      <span class="card__price">от {{ `${priceUsed} ₽` }}</span>
    </nuxt-link>
  </div>
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'

defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  priceNew: {
    type: String,
    required: true,
  },
  priceUsed: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: '',
  },
  qty: {
    type: String,
    required: true,
    default: '',
  },
  url: {
    type: String,
    required: false,
    default: '',
  },
  linkNew: {
    type: String,
    required: false,
    default: '',
  },
  linkUsed: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String,
    required: false,
    default: 'В продаже',
    validator (type) {
      return [
        'В продаже',
        'С пробегом',
        'Новые',
        'Все',
        'Новые модели',
      ].includes(type)
    },
  },
  isSmallCard: {
    type: Boolean,
    required: false,
    default: false,
  },
  isSeoTitle: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const { isAvtodom } = useHoldingStore()
const isDisabledLink = ref(false)

const disableLink = () => {
  isDisabledLink.value = true

  setTimeout(() => {
    isDisabledLink.value = false
  }, 1000)
}
</script>
<style lang="scss" scoped>
.card {
  position: relative;
  display: grid;
  grid-auto-rows: max-content;
  width: 100%;
  height: 100%;
  background-color: white;
  border-bottom: 1px solid var(--grayMediumLight);

  @include mq($bp-small-medium) {
    border-bottom: none;
  }

  &:hover {
    & .card__price {
      @include mq($bp-medium-big) {
        text-decoration: underline;
      }
    }
  }

  &__br {
    @include mq($bp-small-medium) {
      display: none;
    }
  }

  &__link {
    display: block;

    &:not(&_disabled):hover {
      .card__title {
        color: var(--neonBlue);
      }
    }

    &_disabled {
      pointer-events: none;
      cursor: default;
    }
  }

  &__image {
    position: relative;
    width: 100%;
    height: 133px;
    overflow: hidden;
    background: white;
    object-fit: contain;

    @include mq($bp-small-medium) {
      height: 150px;
    }

    @include mq($bp-medium-big) {
      height: 187px;
    }
  }

  &__title-container {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 15px;
    align-content: flex-start;
    align-items: center;
    justify-content: space-between;
    min-height: 32px;
    margin-bottom: 20px;
  }

  &__title {
    @include text_medium_bold;

    overflow: hidden;
    font-weight: 700;
    text-overflow: ellipsis;

    @include mq($bp-small-medium) {
      @include h4;
    }

    &_size_small {
      @include mq($bp-small-medium) {
        @include text_big_bold;
      }
    }
  }

  &__qty {
    @include h3;

    display: block;
    color: var(--grayDark);
    opacity: 0.5;

    @include mq($bp-small-medium) {
      @include h1;
    }

    &_size_small {
      @include mq($bp-small-medium) {
        @include h2;
      }
    }
  }

  &__price-container {
    @include text_small_regular;

    color: var(--blackLight);

    @include mq($bp-super-small) {
      @include text_medium_regular;

      font-weight: 500;
    }

    @include mq($bp-small-medium) {
      @include label;
    }

    @include mq($bp-medium-big) {
      text-decoration: none;
    }

    &:hover {
      .card__price {
        color: var(--neonBlue);
      }
    }

    &_indent {
      margin-bottom: 8px;
    }
  }

  &__price {
    @include text_medium_small;

    margin-right: 0;
    color: var(--blackLight);
    text-decoration: underline;
    white-space: nowrap;
  }
}

:deep(.button) {
  color: white;
  background: var(--black);
}
</style>
