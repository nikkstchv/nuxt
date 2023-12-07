<template>
  <UIBaseOverlay :is-open="isOpenMap" @click="onCloseMap()">
    <UISidePanel class="map map__side-panel" :is-open="isOpenMap">
      <template v-if="isOpenMap">
        <header class="map__header">
          <h2 class="map__title">
            {{ dealer.nameRu }}
          </h2>
          <IconClose class="map__close" @click="onCloseMap" />
        </header>
        <nuxt-img
          v-if="dealer?.photo[0]"
          :src="dealer.photo[0]"
          alt="Дилерский центр"
          class="map__image"
        />
        <h3 class="map__subtitle">
          {{ dealer.address }}
        </h3>
        <a v-if="dealer.phone" class="map__phone" :href="`tel:${dealer.phone}`">{{
          dealer.phone
        }}</a>
        <ContactsDepartmentList v-if="dealer.timeTable" class="map__list">
          <ContactsDepartmentItem
            v-for="item in dealer.timeTable"
            :key="item.department"
            :title="item.department"
            :time="item.time"
          />
        </ContactsDepartmentList>
        <div class="map__button-container">
          <UIBaseButton
            v-if="isShowButton"
            :to="`/contacts/${dealer.mark.code}/${dealer.code}/`"
            large
            primary
            text="Подробнее о центре"
            @click="onCloseMap"
          />
          <div class="map__navigation navigation">
            <button
              v-if="dealer.googleCardUrl"
              class="navigation__button"
              @click="onGoToNavigation(dealer.googleCardUrl)"
            >
              <img
                class="dealer-block__icon"
                src="@/assets/icons/google-point.svg"
                alt="метка на карте google"
              >
              <span class="navigation__button-label">Google Карты</span>
            </button>
            <button
              v-if="dealer.yandexCardUrl"
              class="navigation__button"
              @click="onGoToNavigation(dealer.yandexCardUrl)"
            >
              <img
                class="dealer-block__icon"
                src="@/assets/icons/yandex-point.svg"
                alt="метка на карте yandex"
              >
              <span class="navigation__button-label">Яндекс Карты</span>
            </button>
            <button
              v-if="dealer.yanaviCardUrl"
              class="navigation__button navigation__button--nav"
              @click="onGoToNavigation(dealer.yanaviCardUrl)"
            >
              <img
                class="dealer-block__icon"
                src="@/assets/icons/yandex-navigation.svg"
                alt="стрелка yandex навигации"
              >
              <span class="navigation__button-label">Яндекс Навигатор</span>
            </button>
          </div>
        </div>
        <client-only>
          <div v-if="hasCoords" class="map__container">
            <YandexMaps
              ymap-class="map__view"
              :coords="coord"
              :placemarks="placemarks"
            />
          </div>
        </client-only>
      </template>
    </UISidePanel>
  </UIBaseOverlay>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useHoldingStore } from '../../store/holding'
import { useMapStore } from '../../store/map'

const { isAsc, isAvtodom } = useHoldingStore()
const { onClose: onCloseMap } = useMapStore()
const { isOpen: isOpenMap } = storeToRefs(useMapStore())
const props = defineProps({
  dealer: {
    type: Object,
    required: true,
  },
  holdingId: {
    type: String,
    required: true,
  },
},
)
const isShowButton = (() => {
  const isAvtodomAndHolding = isAvtodom && props.holdingId === '1'
  const isAscAndHolding = isAsc && props.holdingId === '2'
  return isAvtodomAndHolding || isAscAndHolding
})()

const coord = (() => {
  if (
    props.dealer.coordinates.latitude &&
      props.dealer.coordinates.longitude
  ) {
    return [
      props.dealer.coordinates.latitude,
      props.dealer.coordinates.longitude,
    ]
  }
  return []
})()

const placemarks = (() => {
  return [
    {
      coords: coord,
      balloon: {
        name: props.dealer.nameRu,
        address: props.dealer.address,
        time: '',
        phone: props.dealer.phone,
      },
    },
  ]
})()

const hasCoords = !!(coord[0] && coord[1])
const onGoToNavigation = url => process.client && window.open(url, '_blank')
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

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    margin-bottom: 20px;

    @include mq($bp-super-small) {
      margin-bottom: 30px;
    }

    @include mq($bp-small-medium) {
      padding: 0;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 50px;
    }
  }

  &__close {
    align-self: flex-start;
    width: 35px;
    height: 35px;
    padding: 5px;
  }

  &__image {
    position: relative;
    margin-bottom: 20px;

    @include mq($bp-small-medium) {
      margin-bottom: 30px;
    }

    @include mq($bp-small) {
      margin-bottom: 30px;
    }
  }

  &__title {
    @include h5;

    @include mq($bp-super-small) {
      @include h4;
    }

    @include mq($bp-small-medium) {
      @include h3;
    }
  }

  &__subtitle {
    @include text_medium_bold;

    margin-bottom: 10px;

    @include mq($bp-small-medium) {
      @include h4;
    }
  }

  .map &__list {
    margin-bottom: 30px;

    @include mq($bp-small-medium) {
      margin-bottom: 40px;
    }

    @include mq($bp-small) {
      grid-template-columns: 1fr;
    }
  }

  &__phone {
    @include text_medium_regular;

    display: block;
    margin-bottom: 20px;
  }

  &__button-container {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  &__navigation {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    &.navigation {
      .navigation {
        &__button {
          display: flex;
          flex-grow: 1;
          align-items: center;
          justify-content: center;
          min-width: calc(50% - 5px);
          max-width: 100%;
          min-height: 44px;
          background: var(--grayLight);
          border-radius: 6px;

          &-label {
            @include label_small;

            margin-left: 6px;
            color: var(--grayDolphin);
          }

          &--nav {
            @include mq($bp-small) {
              display: none;
            }
          }
        }
      }
    }
  }

  &__container {
    box-sizing: content-box;
    height: 131px;
    padding: 40px 0;

    @include mq($bp-super-small) {
      padding: 50px 0 40px;
    }

    @include mq($bp-small-medium) {
      padding: 70px 0;
    }

    @include mq($bp-small) {
      height: 100%;
      max-height: 200px;
      padding: 60px 0;
    }
  }

  &__link {
    display: block;
  }
}

:deep(.yandex-container) {
  height: 200px;
}

:deep(.side-panel) {
  width: 100px !important;
}
</style>
