<template>
  <div class="brands-catalog">
    <BrandsHeader
      :title="h1"
      class="brands-catalog__header"
      :description="description"
    />
    <main class="brands-catalog__main">
      <div class="brands-catalog__list">
        <nuxt-link
          v-for="brand in brands"
          :key="brand.markId"
          class="brands-catalog__card"
          :to="`${route.path}${brand.code}/`"
        >
          <nuxt-img
            v-if="brand.mark?.logo"
            class="brands-catalog__card-image"
            sizes="sm:15vw s:12vw mb:10vw sb:3vw"
            :src="brand.mark.logo"
            :alt="`логотип ${brand.nameEn}`"
          />
          <h2 class="brands-catalog__card-title">
            {{ brand.nameEn }}
          </h2>
        </nuxt-link>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useHoldingStore } from '../../store/holding'
import { getBrands as getBrandsPath } from '@/api/routes/brands'
const { $fetchClient, $hasErrorResponse, $errorResponseCatch } = useNuxtApp()
const { holdingName } = useHoldingStore()
const { $getSeo } = useNuxtApp()
const route = useRoute()

const seo = await $getSeo(route.path)
const seoDefault = {
  h1: 'Бренды',
  title: `Марки авто новые и с пробегом в наличии в ${holdingName}`,
  description: `Автомобильные марки официального дилера ${holdingName}. Авто в наличии и под заказ`,
}
const h1 = seo?.seoH1 || seoDefault.h1
const title = seo?.seoTitle || seoDefault.title
const description = seo?.seoDescription || seoDefault.description

useHeadDefault({ title, description })

const getBrands = async () => {
  const res = await $fetchClient(getBrandsPath())
  if ($hasErrorResponse(res)) {
    $errorResponseCatch(res)
  }

  return res.data
}

const brands = await getBrands()
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.brands-catalog {
  @include indentsMainHorizontal;
  @include indentsMainVertical;

  display: grid;
  align-content: flex-start;
  width: 100%;
  height: fit-content;

  &__header :deep(.brands__title-container) {
    margin: 0;
  }

  &__main {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 13px;
    align-items: center;

    @include mq($bp-small-medium) {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    @include mq($bp-medium) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__title {
    @include h5;

    margin-bottom: 25px;

    @include mq($bp-small-medium, $bp-medium) {
      @include h3;

      margin-bottom: 30px;
    }

    @include mq($bp-medium) {
      @include h2;

      margin-bottom: 40px;
    }
  }

  &__list {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
    column-gap: 15px;
    place-items: flex-start;
    width: 100%;
    padding-top: 30px;

    @include mq($bp-super-small) {
      row-gap: 40px;
      padding-top: 40px;
    }

    @include mq($bp-small-medium) {
      row-gap: 40px;
      column-gap: 60px;
      padding-top: 40px;
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
      row-gap: 70px;
      column-gap: 25px;
      padding-top: 50px;
    }

    @include mq($bp-medium) {
      column-gap: 60px;
    }

    @include mq($bp-medium-big) {
      column-gap: 100px;
    }

    @include mq($bp-big) {
      column-gap: 150px;
      padding-top: 60px;
    }
  }

  &__card {
    position: relative;
    display: grid;
    grid-gap: 15px;
    justify-content: center;
    max-width: 145px;
    height: 100%;
    padding: 7px 15px;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        .brands-catalog__card-title {
          color: var(--neonBlue);
        }
      }
    }

    &-title {
      @include label_small;

      color: var(--grayDolphin);
      text-align: center;
    }

    &-image {
      justify-self: center;
      width: 115px;
      height: 100px;
      object-fit: contain;
    }
  }
}
</style>
