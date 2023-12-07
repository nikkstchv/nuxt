<template>
  <aside class="aside">
    <div class="aside__container">
      <h3 class="aside__price">
        {{ $toLocalPrice(car.disprice) }} ₽
      </h3>
      <p class="aside__info">
        {{ car.serie }} / {{ car.generation }} / {{ car.modification }}
        {{ !isBaseEquipment ? ' / ' + equipment : '' }}
      </p>
      <p v-if="car.technicalInfo.isNew === 'С пробегом'" class="aside__info">
        {{ car.technicalInfo.manufactureYear }},
        {{ formatTotalTrip(car.totalTrip) }}
      </p>
    </div>
    <UIBaseButton
      class="aside__button"
      big
      text="Получить предложение"
      large
      @click="onOpenFormPanel"
    />
  </aside>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useFormStore } from '@/store/form'
import { useCarStore } from '@/store/car'

export default {
  name: 'GalleryAsideMobile',
  computed: {
    equipment () {
      return this.car.technicalInfo.equipment
    },
    isBaseEquipment () {
      return this.equipment === 'Базовая' || this.equipment === 'Base'
    },
    ...mapState(useCarStore, {
      car: 'allData',
    }),
  },
  methods: {
    ...mapActions(useFormStore, {
      onOpenFormPanel: 'onOpen',
    }),
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.aside {
  @include indentsMainHorizontalMargin;

  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: column;
  grid-gap: 10px;
  align-self: flex-end;
  padding: 10px;
  color: white;
  background: var(--black);
  border-radius: 6px;

  @include mq($bp-small-medium) {
    padding: 20px;
  }

  @include mq($bp-small) {
    padding: 30px 32px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }

  &__info {
    @include text_small_medium;

    overflow: hidden;
    color: var(--grayLight);
    text-overflow: ellipsis;
    white-space: nowrap;

    @include mq($bp-small) {
      @include text_medium_regular;
    }
  }

  &__price {
    @include label_small;

    @include mq($bp-small) {
      @include label;
    }
  }

  &__button {
    @include text_small_super;

    padding: 8px 10px;

    @include mq($bp-super-small) {
      @include text_medium_small;

      padding: 12px 15px;
    }

    @include mq($bp-small) {
      padding: 13px 20px;
    }
  }
}
</style>
