<template>
  <UIBaseOverlay :is-open="isOpenPanelCity" @click="onCloseCityPanel">
    <UISidePanelLeft
      class="city__side-panel"
      :is-open="isOpenPanelCity"
      @onClose="onCloseCityPanel"
    >
      <div v-if="isOpenPanelCity" class="city">
        <header class="city__header">
          <h2 class="city__title" @click="fetch">
            Город
          </h2>
          <IconClose class="city__close" @click="onCloseCityPanel" />
        </header>
        <div class="city__list">
          <UIBaseRadio
            v-for="radio in suggestionsDefault"
            :id="`${radio.city} (${radio.region_with_type})`"
            :key="radio.city"
            v-model="modelSuggestions"
            :label="radio.city"
            :value="radio.code"
            class="city__checkbox"
          >
            <span class="city__checkbox-region">({{ radio.region_with_type }})</span>
          </UIBaseRadio>
        </div>
      </div>
    </UISidePanelLeft>
  </UIBaseOverlay>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCityStore } from '@/store/city'

const cityStore = useCityStore()
const { onClose: onCloseCityPanel, onSetCityCode } = cityStore
const { siteCityCode } = storeToRefs(cityStore)
const modelSuggestions = ref(siteCityCode.value)
const { isPanelOpen: isOpenPanelCity } = storeToRefs(cityStore)
const route = useRoute()
const suggestionsDefault = [
  { city: 'Москва', region_with_type: 'г. Москва', code: 'msk' },
  { city: 'Санкт-Петербург', region_with_type: 'г. Санкт-Петербург', code: 'spb' },
  { city: 'Краснодар', region_with_type: 'Краснодарский край', code: 'krasnodar' },
]

const changeCityRoute = (code) => {
  location.href = route.path + `?city=${code}`
}

watch(() => modelSuggestions.value, (modelSuggestionsCode, oldValue) => {
  if (oldValue) {
    const { code } = suggestionsDefault.find(city => city.code === modelSuggestionsCode)
    onSetCityCode(code)
    changeCityRoute(code)
  }
})
watch(() => siteCityCode.value, (code) => {
  modelSuggestions.value = code
})
</script>

<style lang="scss" scoped>
.city {
  display: grid;
  grid-template-rows: min-content min-content 1fr;
  height: 100%;

  &__list {
    display: grid;
    grid-gap: 15px;
    padding-bottom: 40px;
  }

  .city &__input {
    margin-bottom: 25px;

    @include mq($bp-small-medium) {
      width: 300px;
    }
  }

  &__side-panel {
    z-index: 6 !important;
  }

  &__close {
    position: absolute;
    top: 20px;
    left: 15px;
    width: 24px;
    height: 24px;

    @include mq($bp-small-medium) {
      top: 38px;
      left: 20px;
    }

    @include mq($bp-small) {
      left: 38px;
    }

    @include mq($bp-medium) {
      top: 32px;
      left: 45px;
      width: 35px;
      height: 35px;
      padding: 5.5px;
    }

    @include mq($bp-medium-big) {
      top: 58px;
      left: 39px;
    }

    @include mq($bp-big) {
      left: 76px;
    }
  }

  &__title {
    @include h3;

    padding-left: 15px;

    @media (max-width: $bp-small-medium) {
      @include h4;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    @media (max-width: $bp-small-medium) {
      margin-bottom: 30px;
    }
  }

  &__finded {
    @include label;
  }

  &__checkbox-region {
    color: var(--grayDark);
  }

  & :deep(.radio__label) {
    display: block;
    align-items: flex-start;
    width: max-content;
    max-width: 220px;
    color: var(--blackLight);

    @include mq($bp-super-small, $bp-small-medium) {
      max-width: 250px;
    }

    @include mq($bp-small-medium) {
      max-width: 300px;
    }
  }
}
</style>
