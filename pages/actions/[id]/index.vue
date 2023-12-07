<template>
  <div class="detail">
    <template v-if="action && seo">
      <UISimplePageHeader
        class="detail__header detail__section detail__section_indent"
        :direct-crumbs="directCrumbs"
      />
      <DetailMain
        class="detail__main detail__section detail__section_indent"
        :class="{ detail__main_archive: isArchive }"
      >
        <template v-if="!isArchive" #aside>
          <DetailAsideLeftBig
            class="detail__aside"
            :title="
              isSalesDepartment ? `Узнайте подробности` : 'Запись на сервис'
            "
            :text="
              isSalesDepartment
                ? `Оставьте заявку на обратный звонок в отдел продаж и узнайте подробности об акциях`
                : 'Воспользуйтесь акцией при на обращении сервис. Оставьте заявку онлайн'
            "
            :button-text="
              isSalesDepartment ? `Обратный звонок` : 'Записаться на сервис'
            "
            @onButtonClick="
              isSalesDepartment
                ? onOpenFormPanelFeedback()
                : onOpenServicePanelBtn()
            "
          />
        </template>
        <template v-if="!isArchive" #body>
          <DetailImage
            v-if="action.detailImage"
            :src="action.detailImage"
            class="detail__image"
            alt="Главное изображение"
          />
          <DetailTitle tag="h1">
            <span v-html="h1" />
          </DetailTitle>
          <div class="detail__html" v-html="action.content" />
        </template>
        <template v-else #body>
          <DetailTitle tag="h1">
            <span v-html="h1" />
          </DetailTitle>
          <p class="detail__archive-text">
            Акция завершилась {{ $toLocalDate(action.endAt) }}
          </p>
        </template>
      </DetailMain>
      <ActionsBlockDefault
        v-if="isArchive"
        title="Актуальные акции"
        class="detail__actual-block"
        :class="{ 'detail__actual-block_archive': isArchive }"
      />
      <div v-if="isArchive" class="detail__archive">
        <DetailImage
          v-if="action.detailImage"
          :src="action.detailImage"
          alt="Главное изображение"
          class="detail__image"
        />
        <DetailTitle tag="h1">
          <span v-html="h1" />
        </DetailTitle>
        <div class="detail__html" v-html="action.content" />
      </div>
      <DealersBlock
        is-show-button-see-all
        :mark-name-en="action.mark.nameEn"
        :mark-code="markCode || action.model.markCode"
        :marks="action.marks"
        :models="action.models"
        :dealer-code="dealerCode"
        :dealer-mark-code="dealerCode"
        :dealers-relation="action.dealers"
      />
      <LazyServicePanel />
      <LazyFormPanelFeedbackService />
    </template>
    <div v-else />
  </div>
</template>

<script setup>
import { useFormStore } from '../../../store/form'
import { useHoldingStore } from '../../../store/holding'
import { useServiceStore } from '../../../store/service'
import { getAction } from '@/api/routes/action'

const { $getSeo } = useNuxtApp()
const { setInitData, clearInitData, onOpen: onOpenFormPanel } = useFormStore()
const { onOpen: onOpenServicePanel } = useServiceStore()
const { domain, holdingName } = useHoldingStore()
const route = useRoute()

// fetch

const getMarkCode = (action) => {
  const code = action?.mark?.code
  const isAscCode = code === 'asc'
  const isAvtodomCode = code === 'avtodom'
  if (code && !isAscCode && !isAvtodomCode) {
    return code
  }
  return ''
}

const fetchAction = async () => {
  const { $fetchClient, $hasErrorResponse, $errorResponseCatch } = useNuxtApp()
  const { data: res } = await useAsyncData('getAction', () => $fetchClient(getAction(route.params.id)))
  if ($hasErrorResponse(res.value)) {
    $errorResponseCatch(res.value)
  } else {
    const markCode = getMarkCode(res.value)
    if (markCode) {
      setInitData({
        markCode,
      })
    }
    return { action: res.value, markCode }
  }
}

const { action, markCode } = await fetchAction()

// seo

const getDescriptionHoldingText = () => {
  switch (domain) {
    case 'asc':
      return 'Специальные предложения на покупку и обслуживание автомобилей в Москве. Воспользуйтесь особыми предложениями от группы компаний АвтоСпецЦентр.'
    case 'avtodom':
      return 'Актуальные спецпредложения АВТОДОМ  по продаже и обслуживанию автомобилей и мотоциклов'
    default:
      return ''
  }
}

const seo = await $getSeo(route.path)

const descriptionHoldingText = getDescriptionHoldingText()
const titleText = computed(() => {
  if (seo?.seoTitle) {
    return `${decodeString(seo?.seoTitle)}`
  } else if (action?.title) {
    return `${decodeString(action?.title)} | Акции ${holdingName}`
  } else {
    return `Акция ${holdingName}`
  }
})

const descriptionText = computed(() => {
  if (seo?.seoDescription) {
    return decodeString(seo?.seoDescription)
  } else if (action?.title) {
    return `${decodeString(action?.title)}. ${descriptionHoldingText}`
  } else {
    return descriptionHoldingText
  }
})
const seoDefault = {
  title: titleText,
  description: descriptionText,
}
const h1 = computed(() => seo?.seoH1 || action?.title || '')
const title = seoDefault.title
const description = seoDefault.description

useHeadDefault({ title, description })

const isArchive = action?.archive === 'true'
const breadcrumb = seo?.seoBreadcrumb || action?.title
const directCrumbs = ['', breadcrumb]
const isSalesDepartment = action?.department === 'sale'
const dealerCode = action?.dealer?.code ?? ''
const dealerId = action?.dealer?.id ?? ''

const setInitFormData = () => {
  const hasSomeInfo = markCode || dealerCode
  if (hasSomeInfo) {
    setInitData({
      ...(markCode && { markCode }),
      ...(dealerCode && { dealer: dealerCode }),
      ...(dealerId && { dealerId }),
    })
  }
}

const onOpenFormPanelFeedback = () => {
  setInitFormData()
  onOpenFormPanel('isOpenFeedback')
}

const onOpenServicePanelBtn = () => {
  setInitFormData()
  onOpenServicePanel()
}

onBeforeUnmount(() => {
  clearInitData()
})
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.detail {
  @include indentsMainVertical;

  &__header {
    margin-bottom: 15px;
  }

  &__section {
    &_indent {
      @include indentsMainHorizontal;
    }
  }

  &__archive {
    @include indentsMainHorizontal;

    margin-bottom: 40px;
    color: var(--grayDolphin);

    @include mq($bp-medium-big) {
      margin-bottom: 60px;
    }

    @include mq($bp-big) {
      margin-bottom: 80px;
    }

    &-text {
      color: var(--grayDolphin);
    }
  }

  &__image {
    border-radius: 6px;
  }

  .detail &__main {
    position: relative;
    display: grid;
    grid-template-areas:
      'body'
      'aside';
    width: 100%;
    height: fit-content;
    margin-bottom: 40px;

    @include mq($bp-medium-big) {
      grid-template-areas: 'aside body';
    }

    @include mq($bp-medium-big) {
      margin-bottom: 60px;
    }

    @include mq($bp-big) {
      margin-bottom: 80px;
    }

    &_archive {
      grid-gap: 0 !important;
    }
  }

  &__actual-block {
    &_archive {
      margin-bottom: 50px;

      @include mq($bp-medium-big) {
        margin-bottom: 60px;
      }
    }
  }
}

.detail__html {
  @import 'assets/styles/components/Detail/html-style';
}

.detail :deep(.aside__button) {
  padding: 10.5px 25px;
}
</style>
