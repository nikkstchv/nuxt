<template>
  <div v-if="isPopupOpen && definiteCity" class="popup">
    <UIBaseOverlay
      class="popup__overlay"
      :is-open-prop="isPopupOpen"
      @click="onClosePopup"
    />
    <div class="popup__item">
      <IconClose class="popup__close" @click="onClosePopup" />
      <p class="popup__text">
        Ваш город: <span class="popup__text_bold">{{ definiteCity }}</span>
      </p>
      <div class="popup__button-container">
        <UIBaseButton
          class="popup__button"
          primary
          text="Да, верно"
          @click="onAgree"
        />
        <UIBaseButton
          class="popup__button"
          secondary
          text="Выбрать другой"
          @click="onChangeCity"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCityStore } from '@/store/city'
import { useHoldingStore } from '@/store/holding'
import { getClientIp as getClientIpPath, getSuggestionLocation } from '@/api/routes/city'

const { $fetchClient, $hasErrorResponse } = useNuxtApp()
const { path, query } = useRoute()
const cityStore = useCityStore()
const {
  onClosePopup,
  onOpenPopup,
  onOpen: onOpenCityPanel,
  onClose: onCloseCityPanel,
  onSetCityCode,
} = cityStore
const { isAvtodom } = useHoldingStore()
const { isPopupOpen, definiteCity, siteCityCode } = storeToRefs(cityStore)

const setDefault = () => {
  onSetCityCode('msk')
}
const onChangeCity = () => {
  onClosePopup()
  onOpenCityPanel()
}
const onAgree = () => {
  onClosePopup()
  onCloseCityPanel()
  navigateWithCity()
}

const navigateWithCity = () => {
  const city = query.city
  if (!city || city !== siteCityCode) {
    navigateTo({
      path,
      query: {
        ...query,
        city: siteCityCode.value,
      },
    })
  }
}

const setCloseTimer = () => {
  setTimeout(() => {
    onClosePopup()
    if (!siteCityCode.value) {
      setDefault()
    }
  }, 10000)
}

const getClientCity = async (ip) => {
  const options = {
    query: {
      ip,
    },
  }
  const res = await $fetchClient(getSuggestionLocation(), options, false)

  if (!$hasErrorResponse(res)) {
    return res
  }

  return null
}

const getClientIp = async () => {
  const { data: ip } = await useFetch(getClientIpPath()).catch(console.error)
  return ip?.value ?? null
}

const setClientCityCode = (clientCity) => {
  if (clientCity?.siteCityCode) {
    onSetCityCode(clientCity.siteCityCode)
  }
}

const handleClientIpAndCity = () => {
  setTimeout(async () => {
    if (!siteCityCode.value && isAvtodom) {
      const ip = await getClientIp()
      if (ip) {
        const clientCity = await getClientCity(ip)
        setClientCityCode(clientCity)
        onOpenPopup()
        setCloseTimer()
      }
    }
  }, 1000)
}

onMounted(async () => {
  await handleClientIpAndCity()
})
</script>

<style lang="scss" scoped>
.popup {
  &__overlay {
    @include mq($bp-medium) {
      display: none;
    }
  }

  &__item {
    position: fixed;
    top: 50px;
    left: calc(50% - 290px / 2);
    z-index: 5;
    max-width: 400px;
    padding: 30px 20px;
    margin: auto;
    background: var(--blackLight);
    border-radius: 4px;

    @include mq($bp-small-medium) {
      left: calc(50% - 374px / 2);
      padding: 30px;
    }

    @include mq($bp-medium) {
      left: 50px;
    }

    @include mq($bp-medium-big) {
      top: 105px;
      left: 81px;
    }

    @include mq($bp-big) {
      left: 146px;
    }
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;

    & :deep(.icon__path) {
      stroke: white;
    }
  }

  &__text {
    @include text_medium_regular;

    margin-bottom: 15px;
    color: white;

    &_bold {
      font-weight: 600;
    }
  }

  &__button-container {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 15px;
    width: fit-content;
  }

  & :deep(.button_theme_primary) {
    color: white;
    white-space: nowrap;
    background: var(--neonBlue);
  }

  & :deep(.button_theme_primary:not(:disabled):hover) {
    @media (hover: hover) and (pointer: fine) {
      background: var(--neonBlue);
      opacity: 0.9;
    }
  }

  & :deep(.button_theme_secondary) {
    color: var(--neonBlue);
    white-space: nowrap;
    background-color: white;
    border: none;
  }

  & :deep(.button_theme_secondary:not(:disabled):hover) {
    @media (hover: hover) and (pointer: fine) {
      color: var(--neonBlue);
      background-color: white;
      border: none;
      opacity: 0.9;
    }
  }

  & :deep(.button) {
    @media (max-width: $bp-small-medium - 1) {
      padding: 9.5px 14px;
    }
  }
}
</style>
