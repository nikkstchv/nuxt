<template>
  <UIBaseOverlay :is-open="isOpenMap" @click="onCloseMap()">
    <UISidePanel class="map map__side-panel" :is-open="isOpenMap">
      <template v-if="isOpenMap">
        <header class="map__header">
          <h2 class="map__title">
            Дилерские центры
          </h2>
          <IconClose class="map__close" @click="onCloseMap" />
        </header>
        <client-only>
          <div class="map__container">
            <YandexMaps
              ymap-class="map__view"
              :coords="coords"
              :placemarks="placemarks"
            />
          </div>
        </client-only>
      </template>
    </UISidePanel>
  </UIBaseOverlay>
</template>

<script>
import { mapActions, mapState } from 'pinia'

import { useMapStore } from '../../store/map'

export default {
  name: 'ContactsMapPanel',
  props: {
    dealersMapItems: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  data: () => ({
    coords: [55.7522, 37.6156],
  }),
  computed: {
    placemarks () {
      const placemarks = this.dealersMapItems.map((item) => {
        return {
          coords: item.coords,
          balloon: {
            name: item.name,
            address: item.address,
            time: item.timeTable,
            phone: item.phone,
          },
          markerId: item.id,
          clusterName: '1',
        }
      })

      return placemarks
    },
    ...mapState(useMapStore, {
      isOpenMap: 'isOpen',
    }),
  },
  methods: {
    ...mapActions(useMapStore, {
      onCloseMap: 'onClose',
    }),
  },
}
</script>

<style lang="scss" scoped>
.map {
  &__side-panel {
    padding: 0 15px;

    @include mq($bp-small-medium) {
      padding: 50px 50px 0;
    }

    @include mq($bp-medium-big) {
      padding: 60px 60px 0;
    }
  }

  &__container {
    height: 444px;
    margin-bottom: 50px;

    @media (max-width: $bp-small) {
      height: 400px;
      margin-bottom: 40px;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;

    @media (min-width: $bp-super-small + 1) and (max-width: $bp-small) {
      margin-bottom: 40px;
    }
  }

  &__close {
    align-self: flex-start;
    width: 35px;
    height: 35px;
    padding: 5px;
  }

  &__title {
    @include h3;
  }

  &__list {
    display: grid;
    grid-gap: 50px;
    padding-bottom: 50px;

    @media (max-width: $bp-small) {
      padding-bottom: 40px;
    }
  }

  &__list-item {
    &-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }

    &-body {
      display: grid;
      grid-auto-flow: row;
      grid-gap: 5px;

      @media (max-width: $bp-small-medium) {
        grid-auto-flow: row;
        grid-gap: 5px;
      }
    }

    &-main {
      display: grid;
      grid-auto-flow: column;
      justify-content: space-between;
    }

    &-count-price {
      @include text_small_medium;

      width: fit-content;
      height: fit-content;
      padding: 6px 10px;
      color: var(--blackLight);
      background: var(--grayLight);
      border-radius: 4px;
    }

    &-title {
      @include text_medium_small;
    }

    &-text {
      @include text_small_regular;

      color: var(--blackLight);
    }
  }
}

:deep(.yandex-container) {
  height: 400px;
}

:deep(.side-panel) {
  width: 100px !important;
}
</style>
