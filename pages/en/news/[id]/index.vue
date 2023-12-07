<template>
  <div class="detail">
    <template v-if="news">
      <div v-if="!isArchive" class="detail__main">
        <DetailImage
          v-if="news.detailImage"
          class="detail__image"
          :src="news.detailImage"
          alt="Main image"
        />
        <DetailTitle tag="h1">
          {{ news.title }}
        </DetailTitle>
        <div class="detail__html" v-html="news.content" />
        <p class="detail__date">
          {{ $toLocalDate(news.startAt, 'en') }}
        </p>
      </div>
      <template v-else>
        <DetailTitle tag="h1">
          News in the archive
        </DetailTitle>
      </template>
      <div v-if="isArchive" class="detail__archive">
        <DetailImage
          v-if="news.detailImage"
          class="detail__image"
          :src="news.detailImage"
          alt="Главное изображение"
        />
        <DetailTitle>
          {{ news.title }}
        </DetailTitle>
        <div class="detail__html" v-html="news.content" />
        <p class="detail__date">
          {{ $toLocalDate(news.startAt, 'en') }}
        </p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { getOneNews } from '@/api/routes/news'

definePageMeta({
  layout: 'english',
})

const route = useRoute()

// fetch

const fetchNews = async () => {
  const { $fetchClient, $hasErrorResponse, $errorResponseCatch } = useNuxtApp()
  const res = await $fetchClient(getOneNews(route.params.id))
  if ($hasErrorResponse(res)) {
    $errorResponseCatch(res)
  } else {
    return res
  }
}

const news = await fetchNews()
const isArchive = news?.archive === 'true'
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.detail {
  &__archive {
    color: var(--grayDolphin);
  }

  &__main {
    position: relative;
    display: grid;
    width: 100%;
    height: fit-content;

    &_archive {
      margin-bottom: 40px;

      @include mq($bp-medium-big) {
        margin-bottom: 50px;
      }
    }
  }

  &__date {
    @include text_medium_small;

    margin-bottom: 60px;
    color: var(--grayDark);

    @include mq($bp-small-medium) {
      margin-bottom: 80px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 100px;
    }
  }
}

.detail__html {
  @import 'assets/styles/components/Detail/html-style';
}
</style>
