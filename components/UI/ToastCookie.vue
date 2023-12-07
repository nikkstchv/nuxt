<template>
  <transition name="fade">
    <div v-if="isOpen" class="toast-cookie">
      <p class="toast-cookie__text">
        На нашем сайте используются файлы cookie, помогающие сделать его удобнее
        для вас. <br>
        Оставаясь на сайте,
        <nuxt-link
          to="/cookie/"
          class="toast-cookie__link"
        >
          вы соглашаетесь
        </nuxt-link>
        с
        <nuxt-link
          to="/consent-to-processing/"
          class="toast-cookie__link"
        >
          политикой обработки персональных данных.
        </nuxt-link>
        <IconClose class="toast-cookie__close" @click="handleClose" />
      </p>
    </div>
  </transition>
</template>

<script setup>
const isOpen = ref(false)

const onSetCookie = () => {
  localStorage.setItem('wd_0101001', `${new Date()}`)
}

const handleClose = () => {
  onSetCookie()
  isOpen.value = false
}

const cookie = localStorage.getItem('wd_0101001')

if (!cookie) {
  isOpen.value = true
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.toast-cookie {
  @include indentsMainHorizontal;

  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 4;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto;
  background: var(--grayLight);
  box-shadow: 0 -4px 20px rgb(13 10 25 / 10%);

  &__text {
    @include text_medium_regular;

    position: relative;
    width: 100%;
    padding: 20px 33px 20px 0;
    color: var(--blackLight);
    text-align: center;

    @include mq($bp-small-medium) {
      padding: 20px 50px 20px 0;
    }

    @include mq($bp-medium) {
      padding: 20px 0;
    }
  }

  &__link {
    color: var(--neonBlue);
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 0;
    width: 30px;
    height: 30px;

    @include mq($bp-small) {
      width: 42px;
      height: 42px;
    }

    & :deep(.icon__path) {
      stroke: var(--black);
      stroke-width: 1px;
    }
  }
}
</style>
