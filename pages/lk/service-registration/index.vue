<template>
  <main class="service-registration">
    <h2 class="service-registration__title">
      На странице ведутся работы.
      <br>Вы можете записаться на сервис <br>нажав на кнопку ниже
    </h2>
    <UIBaseButton
      text="Записаться на сервис"
      primary
      @click="onOpenServicePanel"
    />
  </main>
</template>

<script setup>
import { useFormStore } from '../../../store/form'

const { onOpen: onOpenPanel } = useFormStore()

definePageMeta({
  layout: 'lk',
  middleware: 'authenticated',
})

const onOpenServicePanel = () => {
  onOpenPanel('isOpenService')
}

</script>

<style lang="scss" scoped>
.service-registration {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;

  @include mq($bp-super-small) {
    padding: 200px 0;
  }

  @include mq($bp-medium) {
    padding: 250px 0;
  }

  &__title {
    @include h5;

    margin-bottom: 30px;
    text-align: center;

    @include mq($bp-super-small) {
      @include h4;
    }

    @include mq($bp-small-medium) {
      @include h3;
    }
  }
}
</style>
