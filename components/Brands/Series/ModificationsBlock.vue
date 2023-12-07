<template>
  <section
    v-if="modificationsBlockInfo?.data?.length"
    class="modifications-block"
  >
    <h2 class="modifications-block__title">
      {{ title }}
    </h2>
    <div class="modifications-block__select-buttons-wrapper">
      <UIBaseSelectButtons
        ref="selectButtons"
        class="modifications-block__select-buttons"
        is-seo-title
        :buttons="sectionButtons"
        @onChangeButtons="onChangeButtons"
      />
    </div>
    <div v-if="activeSectionInfoValues" class="modifications-block__tab">
      <div v-for="item in activeSectionInfoValues" :key="item" class="modifications-block__item">
        <h4 class="modifications-block__item-label">
          {{ schema[item] }}
        </h4>
        <p class="modifications-block__item-value">
          {{ activeSectionInfo[item] }}
        </p>
      </div>
      <UIBaseButton
        v-if="isShowButtonLinkToCatalog"
        :to="linkToCatalog"
        class="modifications-block__button"
        secondary
        text="Смотреть в каталоге"
      />
    </div>
  </section>
</template>

<script setup>
import { getModificationsBlockInfo as getModificationsBlockInfoPath } from '@/api/routes/brands'

const { $fetchClient, $hasErrorResponse } = useNuxtApp()
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: '',
  },
  transportTypeCode: {
    type: String,
    required: true,
  },
  markId: {
    type: String,
    required: true,
  },
  markCode: {
    type: String,
    required: true,
  },
  modelCode: {
    type: String,
    required: true,
  },
  generationCode: {
    type: String,
    required: true,
  },
  bodyTypeCode: {
    type: String,
    required: true,
  },
  modelId: {
    type: String,
    required: true,
  },
  generationId: {
    type: String,
    required: true,
  },
  seriesId: {
    type: String,
    required: true,
  },
})

const getModificationsBlockInfo = async () => {
  const res = await $fetchClient(getModificationsBlockInfoPath(props.markId, props.modelId, props.generationId, props.seriesId))
  if (!$hasErrorResponse(res)) {
    return res
  }
  return null
}
const onChangeButtons = () => {
  activeSectionLabel.value = selectButtons.value.getActiveButton().label
}

const selectButtons = ref()
const modificationsBlockInfo = await getModificationsBlockInfo()
const activeSectionLabel = ref(modificationsBlockInfo?.data[0]?.nameEn ?? '')
const schema = modificationsBlockInfo?.schema
const activeSectionInfo = computed(() => modificationsBlockInfo?.data?.find(item => item.nameEn === activeSectionLabel.value))
const isShowButtonLinkToCatalog = computed(() => activeSectionInfo.value?.catCountAll > 0)
const linkToCatalog = (() => {
  const hasCommercial = ['commercial', 'trucks'].includes(props.transportTypeCode)
  const modificationCode = activeSectionInfo.value?.code ?? ''
  const transportTypeCode = hasCommercial
    ? 'commercial'
    : props.transportTypeCode
  return `/${transportTypeCode}/?mark=${props.markCode}&model=${props.modelCode}&generation=${props.generationCode}&modification=${modificationCode}&bodyType=${props.bodyTypeCode}`
})()
const sectionButtons = modificationsBlockInfo.data.map((item, index) => ({ label: item.nameEn, isActive: index === 0 }))
const activeSectionInfoValues = activeSectionInfo.value && ['power', 'powerReserve', 'volume', 'wheelDrive', 'transmission'].filter(item => activeSectionInfo.value[item] && activeSectionInfo.value[item] !== '0')

</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.modifications-block {
  @include indentsMainHorizontal;

  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 30px;
  overflow: hidden;
  background-color: var(--grayLight);

  @include mq($bp-small-medium) {
    padding-top: 30px;
    padding-bottom: 40px;
  }

  @include mq($bp-small) {
    grid-auto-flow: column;
    padding-bottom: 60px;
  }

  @include mq($bp-medium) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding-top: 50px;
  }

  &::before {
    position: absolute;
    right: 100%;
    z-index: -1;
    width: 50%;
    height: 100%;
    content: '';
    background: var(--grayLight);
  }

  &::after {
    position: absolute;
    left: 100%;
    z-index: -1;
    width: 50%;
    height: 100%;
    content: '';
    background: var(--grayLight);
  }

  &__tab {
    display: grid;
    grid-gap: 15px;

    @include mq($bp-small-medium) {
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px 40px;
    }

    @include mq($bp-small) {
      grid-gap: 20px 50px;
    }

    @include mq($bp-medium) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  &__item {
    display: grid;
    align-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--grayMediumLight);

    @include mq($bp-medium) {
      padding-bottom: 0;
      border-bottom: none;
    }

    &-label {
      @include text_small_regular;

      margin-bottom: 10px;
      color: var(--grayDolphin);

      @include mq($bp-small) {
        @include text_medium_regular;
      }

      @include mq($bp-medium) {
        margin-bottom: 15px;
      }
    }

    &-value {
      @include h4;

      @include mq($bp-small-medium) {
        @include h3;
      }

      @include mq($bp-medium) {
        @include h2;
      }

      @include mq($bp-medium-big) {
        @include h1;
      }
    }
  }

  &__title {
    @include label;

    margin-bottom: 30px;

    @include mq($bp-small-medium) {
      margin-bottom: 40px;
    }

    @include mq($bp-small) {
      @include h3;
    }

    @include mq($bp-medium-big) {
      @include h2;
    }
  }

  &__select-buttons {
    position: relative;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 25px;
    justify-content: flex-start;
    width: 100%;
    height: fit-content;
    padding: 0;
    overflow: auto;
    border-bottom: 1px solid var(--grayMediumLight);

    @include mq($bp-small-medium) {
      grid-gap: 30px;
    }

    &-wrapper {
      width: 100%;
      margin-bottom: 30px;
      border-bottom: 1px solid var(--grayMediumLight);
    }

    &::-webkit-scrollbar {
      display: none;
    }

    & :deep(.select-buttons__button) {
      position: relative;
    }

    & :deep(.select-buttons__button_active) {
      color: var(--blackLight) !important;
      background-color: transparent !important;
    }

    & :deep(.select-buttons__button_active::after) {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      content: '';
      background-color: var(--royalBlue);
    }

    & :deep(.select-buttons__button_active:hover) {
      color: var(--blackLight) !important;
      background-color: transparent !important;
    }

    & :deep(.select-button) {
      @include text_big_regular;

      display: flex;
      align-items: center;
      width: max-content;
      padding: 0;
      color: var(--blackLight);
      background-color: transparent;
      border-radius: 0;

      @media (max-width: $bp-small-medium) {
        @include text_big_regular;
      }
    }

    & :deep(.select-button__title) {
      padding-bottom: 10px;
    }

    & :deep(.select-button__title:hover) {
      background-color: transparent;
    }
  }

  &__button {
    margin-top: 15px;

    @include mq($bp-small-medium) {
      margin-top: 20px;
    }

    @include mq($bp-small) {
      margin-top: 25px;
    }

    @include mq($bp-medium) {
      grid-column: 1 / 4;
      margin-top: 35px;
    }

    @include mq($bp-medium) {
      grid-column: 1 / 4;
      margin-top: 45px;
    }

    @include mq($bp-medium-big) {
      grid-column: 1 / 4;
      margin-top: 55px;
    }
  }
}
</style>
