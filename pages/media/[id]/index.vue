<template>
  <div class="detail">
    <template v-if="media">
      <UISimplePageHeader
        class="detail__header detail__section"
        :direct-crumbs="directCrumbs"
      />
      <DetailMain class="detail__main detail__section">
        <template #aside>
          <aside class="detail__section_aside">
            <MediaContactsCard is-detail />
          </aside>
        </template>
        <template #body>
          <DetailDate :date="media.startAt" />
          <DetailImage
            v-if="media.detailImage"
            class="detail__image"
            :src="media.detailImage"
            alt="Главное изображение"
          />
          <DetailTitle tag="h1">
            <span v-html="h1" />
          </DetailTitle>
          <div class="detail__html" v-html="media.content" />
        </template>
      </DetailMain>
    </template>
    <UILoader v-else />
  </div>
</template>

<script setup>
import { getOneMedia } from '@/api/routes/media'
import { useHoldingStore } from '@/store/holding'

const { $getSeo } = useNuxtApp()
const { holdingName } = useHoldingStore()
const route = useRoute()

// fetch

const fetchMedia = async () => {
  const { $fetchClient, $hasErrorResponse, $errorResponseCatch } = useNuxtApp()
  const res = await $fetchClient(getOneMedia(route.params.id))
  if ($hasErrorResponse(res)) {
    $errorResponseCatch(res)
  } else {
    return res?.data[0] ?? null
  }
}

const media = await fetchMedia()

// seo
const seo = await $getSeo(route.path)

const h1 = computed(() => seo?.seoH1 || media?.title || '')
const breadcrumb = seo?.seoBreadcrumb || h1.value
const directCrumbs = ['', breadcrumb]
const getTitle = () => {
  if (media && media.title) {
    return `${decodeString(media.title)} | ${holdingName}`
  }
  return ''
}
const getDescription = () => {
  return `${decodeString(title)} - публикация о компании ${
      holdingName
  }`
}

const title = getTitle()
const description = getDescription()

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.detail {
  @include indentsMainVertical;

  &__header {
    margin-bottom: 15px;
  }

  &__section {
    @include indentsMainHorizontal;

    &_aside {
      display: grid;
      grid-template-columns: minmax(100px, 100%);

      @include mq($bp-small) {
        grid-template-columns: minmax(220px, 260px);
      }

      @include mq($bp-medium) {
        grid-template-columns: minmax(260px, 310px);
      }

      @include mq($bp-medium-big) {
        grid-template-columns: minmax(260px, 271px);
      }

      @include mq($bp-big) {
        grid-template-columns: minmax(260px, 377px);
      }
    }
  }

  .detail &__main {
    position: relative;
    grid-gap: 0;
    width: 100%;
    height: fit-content;

    &.main_with_aside {
      grid-template-areas:
        'body'
        'aside'
        'footer';
      grid-gap: 50px 0;

      @include mq($bp-small) {
        grid-template-areas:
          'aside body'
          'aside footer';
        grid-template-columns: max-content auto;
        grid-gap: 0 27px;
      }

      @include mq($bp-medium) {
        grid-gap: 0 35px;
      }

      @include mq($bp-medium-big) {
        grid-gap: 0 40px;
      }
    }
  }

  &__image {
    border-radius: 6px;
  }

  .detail__html {
    @import 'assets/styles/components/Detail/html-style';
  }
}
</style>
