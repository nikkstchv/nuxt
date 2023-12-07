<template>
  <aside class="aside">
    <header class="aside__header">
      <UIIndicator
        v-if="!!car.statusForWeb"
        class="aside__status"
        :type="car.statusForWeb"
      />
      <p class="aside__id">
        {{ `#${car.carId}` }}
      </p>
    </header>
    <h2 class="aside__title">
      {{ car.mark }}
      {{ car.model }}
    </h2>
    <h3 class="aside__subtitle">
      {{ car.serie }}
    </h3>
    <h3 class="aside__subtitle aside__subtitle_indent">
      {{ car.generation }}
    </h3>
    <div class="aside__characteristics">
      <p class="aside__label">
        Модификация
      </p>
      <h3 class="aside__subtitle aside__subtitle_indent">
        {{ car.modification }}
      </h3>
      <template v-if="!isBaseEquipment">
        <p class="aside__label">
          Комплектация
        </p>
        <h3 class="aside__subtitle aside__subtitle_indent">
          {{ car.technicalInfo.equipment }}
        </h3>
      </template>
      <template v-if="car.technicalInfo.isNew === 'С пробегом'">
        <p class="aside__label">
          Пробег
        </p>
        <h3 class="aside__subtitle aside__subtitle_indent">
          {{ formatTotalTrip(car.totalTrip) }}
        </h3>
        <p class="aside__label">
          Год выпуска
        </p>
        <h3 class="aside__subtitle aside__subtitle_indent">
          {{ car.technicalInfo.manufactureYear }}
        </h3>
      </template>
      <template v-if="car.performanceIndicators.from0To100Kmh !== 0">
        <p class="aside__label">
          Разгон до 100 км/ч
        </p>
        <h3 class="aside__subtitle aside__subtitle_indent">
          {{ car.performanceIndicators.from0To100Kmh }} сек
        </h3>
      </template>
      <template
        v-if="car.engine.engineType === 'Электрический' ||
          car.engine.engineType === 'Гибридный'"
      >
        <template v-if=" car.engine.batteryCapacity !== 0">
          <p class="aside__label">
            Емкость батареи
          </p>
          <h3 class="aside__subtitle aside__subtitle_indent">
            {{ car.engine.batteryCapacity }} кВт/ч
          </h3>
        </template>

        <template v-if="car.engine.powerReserve !== '0'">
          <p class="aside__label">
            Запас хода на электричестве
          </p>
          <h3 class="aside__subtitle aside__subtitle_indent">
            {{ car.engine.powerReserve }} км
          </h3>
        </template>
      </template>
    </div>
    <p class="aside__price">
      Стоимость <span>{{ $toLocalPrice(car.disprice) }} ₽</span>
    </p>
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
  name: 'GalleryAsideDefault',
  computed: {
    isBaseEquipment () {
      const equipment = this.car.technicalInfo.equipment
      return equipment === 'Базовая' || equipment === 'Base'
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
.aside {
  z-index: 1;
  max-width: 260px;
  height: fit-content;
  padding: 15px;
  color: white;
  background: var(--black);
  border-radius: 6px;

  @include mq($bp-big) {
    max-width: 300px;
    padding: 20px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__title {
    @include h3;

    margin-bottom: 10px;
  }

  &__subtitle {
    @include text_big_regular;

    &_indent {
      margin-bottom: 15px;
    }
  }

  &__label {
    @include text_small_medium;

    margin-bottom: 2px;
    color: var(--grayDark);
  }

  &__id {
    @include text_medium_small;

    width: fit-content;
    padding: 5px;
    color: var(--black);
    background-color: white;
  }

  &__status {
    color: white;
  }

  &__price {
    @include label_small;

    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    margin-bottom: 15px;

    @include mq($bp-big) {
      @include label;
    }
  }

  &__button {
    padding: 10px 13px;

    @include mq($bp-medium-big) {
      padding: 12px 20px;
    }

    @include mq($bp-big) {
      padding: 12px 30px;
    }
  }

  &__characteristics {
    max-height: 59vh;
    overflow: auto;
  }
}
</style>
