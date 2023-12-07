<template>
  <header class="header">
    <section class="header__top">
      <IconBurger
        class="header__button header__button_burger"
        @click="onOpenNavBar"
      />
      <div class="header__container">
        <div class="header__logo-container">
          <IconLogoABTODOM class="header__logo" />
        </div>
        <section class="header__navigation">
          <button class="header__navigation-item">
            <IconPhone class="header__icon" />
            <a :href="`tel:${holdingPhone}`">{{ holdingPhone }}</a>
          </button>
          <nuxt-link class="header__navigation-item" to="/">
            <IconWorld class="header__icon" />
            RU
          </nuxt-link>
        </section>
      </div>
    </section>
  </header>
</template>

<script>

import { mapActions, mapState } from 'pinia'
import { useNavBarStore } from '../../store/navBar'
import { useHoldingStore } from '../../store/holding'

export default {
  name: 'HeaderEnglish',
  computed: {
    ...mapState(useHoldingStore, ['holdingPhone']),
  },
  methods: {
    ...mapActions(useNavBarStore, {
      onOpenNavBar: 'onOpen',
    }),
  },
}
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-gap: 15px;
  padding: 10px 15px 0;

  @include mq($bp-small-medium) {
    grid-gap: 30px;
    padding: 10px 15px 0;
  }

  @include mq($bp-small) {
    grid-gap: 30px;
    padding: 10px 32px 0;
  }

  @include mq($bp-medium) {
    grid-gap: 30px;
    padding: 10px 50px 0;
  }

  @include mq($bp-medium-big) {
    grid-gap: 40px;
    padding: 10px 81px 0;
  }

  @include mq($bp-big) {
    grid-gap: 40px;
    padding: 20px 146px 0;
  }

  &__title {
    @include h4;

    @include mq($bp-small-medium, $bp-medium-big) {
      @include h2;
    }

    @include mq($bp-medium-big) {
      @include h1;
    }
  }

  &__top {
    display: grid;
    grid-template-areas: 'burger nav';
    grid-gap: 15px;
    align-items: center;
    width: fit-content;
    height: fit-content;

    @include mq($bp-medium) {
      grid-template-areas: 'nav';
      grid-gap: 100px;
      width: 100%;
    }
  }

  &__logo-container {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }

  &__navigation {
    display: none;

    @include mq($bp-medium) {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 30px;
      align-items: center;
      justify-self: flex-end;
      width: max-content;
    }

    &-item {
      @include text_medium_regular;

      display: flex;
      grid-gap: 5px;
      align-items: center;
      color: var(--grayDolphin);
    }
  }

  &__geo {
    display: none;

    @include mq($bp-medium) {
      display: flex;
      grid-gap: 5px;
      align-items: center;
    }

    &-text {
      @include text_medium_regular;

      color: var(--grayDolphin);
    }

    .header &-icon {
      width: 18px;
      height: 18px;

      & :deep(.icon__path) {
        stroke: var(--grayDolphin);
      }
    }
  }

  &__button {
    &_burger {
      z-index: 2;
      display: block;
      justify-self: flex-start;

      @include mq($bp-medium) {
        display: none;
      }

      @include mq($bp-medium-big) {
        position: fixed;
        top: 57px;
        left: 39px;
      }

      @include mq($bp-big) {
        left: 73px;
      }

      @media (max-width: $bp-medium-big) {
        grid-area: burger;
      }
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    width: 110px;
    height: 30px;

    @include mq($bp-medium) {
      margin: 10px 0;
    }

    @include mq($bp-medium-big) {
      width: 140px;
      height: 39px;
      margin: 0;
    }

    & :deep(.icon) {
      height: 100%;
    }
  }

  &__container {
    display: flex;
    grid-area: nav;
    grid-auto-flow: column;
    grid-gap: 15px;
    align-items: center;
    justify-content: space-between;

    @include mq($bp-small-medium) {
      grid-gap: 30px;
    }

    @include mq($bp-medium) {
      grid-gap: 50px;
    }

    @include mq($bp-medium-big) {
      grid-gap: 100px;
    }
  }

  .header &__icon {
    width: 18px;
    height: 18px;

    & :deep(.icon__path) {
      stroke: var(--grayDolphin);
    }
  }
}
</style>
