<template>
  <aside class="navBar" :class="{ navBar_open: isOpenNavBar }">
    <IconClose
      class="navBar__close navBar__icon"
      @click="onCloseNavBar"
    />
    <button class="navBar__item">
      <img class="navBar__icon" src="@/assets/icons/phone.svg" alt="логотип">
      <a :href="`tel:+7 495 500 50 08`"> +7 495 500 50 08</a>
    </button>
    <nuxt-link class="navBar__item" to="/" @click="onChangeLanguage">
      <IconWorld class="navBar__icon" />
      RU
    </nuxt-link>
  </aside>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useNavBarStore } from '../../store/navBar'

export default {
  name: 'NavBarEnglish',
  computed: {
    ...mapState(useNavBarStore, {
      isOpenNavBar: 'isOpen',
    }),
  },
  methods: {
    onChangeLanguage () {
      this.onCloseNavBar()
    },
    ...mapActions(useNavBarStore, {
      onCloseNavBar: 'onClose',
      // onOpenCityPanel: 'city/onOpen',
    }),
  },
}
</script>

<style lang="scss" scoped>
.navBar {
  position: fixed;
  top: 0;
  right: auto;
  bottom: 0;
  left: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 100%;
  min-height: 100vh;
  padding: 5px 18px;
  overflow-x: hidden;
  overflow-y: auto;
  background: white;
  transition: transform 200ms 0s;
  transform: translateX(-480px);

  @include mq($bp-small) {
    width: 446px;
    padding: 5px 23px;
  }

  @include mq($bp-medium) {
    width: 446px;
    padding: 10px 35px;
  }

  @include mq($bp-big) {
    width: 480px;
  }

  &_open {
    transform: translateX(0);
  }

  .navBar &__close {
    padding: 5px;
    margin-bottom: 20px;
  }

  &__item {
    display: flex;
    grid-gap: 20px;
    align-items: center;
    margin-bottom: 25px;
  }

  &__icon {
    width: 35px;
    height: 35px;
    padding: 2.5px;
  }

  .exact-active-link {
    cursor: default;
  }
}
</style>
