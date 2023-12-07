<template>
  <div v-if="article" class="detail">
    <UISimplePageHeader
      class="detail__header detail__section detail__section_indent"
      :direct-crumbs="directCrumbs"
      :title="h1"
    />
    <DetailMain class="detail__main detail__section detail__section_indent">
      <template #aside>
        <DetailAsideLeftBig
          class="detail__section detail__section_aside"
          title="Узнайте подробности"
          text="Оставьте заявку на обратный звонок, чтобы узнать подробности"
          button-text="Обратный звонок"
          @onButtonClick="onOpenFeedbackPanel"
        />
      </template>
      <template #body>
        <DetailDate :date="article.startAt" />
        <DetailImage
          v-if="article.detailImage"
          :src="article.detailImage"
          class="detail__image"
          alt="Главное изображение"
        />
        <div class="detail__html" v-html="article.content" />
      </template>
    </DetailMain>
    <BlogBlock title="Прочие статьи" class="detail__blog-block" />
  </div>
</template>

<script setup>
import { getArticle } from '@/api/routes/blog'
import { useFormStore } from '@/store/form'
import { useHoldingStore } from '@/store/holding'

const { onOpen: onOpenPanel } = useFormStore()
const { isAsc, holdingName } = useHoldingStore()
const { $getSeo } = useNuxtApp()
const route = useRoute()

// fetch

const fetchArticle = async () => {
  const { $fetchClient, $hasErrorResponse, $errorResponseCatch } = useNuxtApp()
  const res = await $fetchClient(getArticle(route.params.id))
  if ($hasErrorResponse(res)) {
    $errorResponseCatch(res)
  } else {
    return res
  }
}

const article = await fetchArticle()

// seo

const seo = await $getSeo(route.path)
const getTitle = () => {
  if (article) {
    const title = article?.title
    if (title) {
      if (isAsc) {
        return `${decodeString(title)} | ${holdingName}`
      }
      return `Статья ${holdingName}: ${decodeString(title)}`
    }
  }
  return `Статья ${holdingName}`
}
const getDescription = () => {
  return article?.title
    ? `${decodeString(article.title)} - статья официального дилера ${
          holdingName
      }`
    : `Статья официального дилера ${holdingName}`
}

const h1 = seo?.seoH1 || article?.title || ''
const breadcrumb = seo?.seoBreadcrumb || h1.value
const directCrumbs = ['', breadcrumb]
const title = seo?.seoTitle || getTitle()
const description = seo?.seoDescription || getDescription()

useHeadDefault({ title, description })

// methods

const onOpenFeedbackPanel = () => {
  onOpenPanel('isOpenFeedback')
}
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

    color: var(--grayDolphin);
  }

  .detail &__main {
    position: relative;
    display: grid;
    width: 100%;
    height: fit-content;
    margin-bottom: 50px;

    @include mq($bp-small) {
      margin-bottom: 60px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 80px;
    }
  }

  &__date {
    @include text_medium_small;

    margin-bottom: 30px;
    color: var(--grayDark);
  }

  & :deep(.main) {
    @include mq($bp-medium) {
      grid-template-areas:
        'header header'
        'aside body'
        'aside footer';
      grid-template-columns: max-content auto;
      grid-gap: 0 50px;
    }
  }

  & :deep(.main__body) {
    max-width: 622px;
  }

  .detail__html {
    @import 'assets/styles/components/Detail/html-style';
  }
}
</style>
