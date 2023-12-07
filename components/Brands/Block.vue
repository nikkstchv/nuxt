<template>
  <section class="brands">
    <MainTitle :tag="tagTitle" class="brands__title">
      Бренды
    </MainTitle>
    <div class="brands__buttons-container">
      <UIBaseTabs class="brands__tabs brands__tabs-buttons">
        <UIBaseTab selected :name="isAvtodom ? 'Новые модели' : 'Новые'">
          <div v-if="catalogNewItems" class="brands__list">
            <nuxt-link
              v-for="(item, index) in catalogNewItems"
              :key="index"
              :to="`/${item.carType}/new/${item.code}/`"
              class="brands__list-item"
            >
              <span class="brands__list-item-name">
                {{ item.nameEn }}
                <span class="brands__list-item-qty">{{ item.new }}</span>
              </span>
            </nuxt-link>
          </div>
          <UILoader v-else />
        </UIBaseTab>
        <UIBaseTab name="С пробегом">
          <div v-if="catalogUsedItems" class="brands__list">
            <nuxt-link
              v-for="(item, index) in catalogUsedItems"
              :key="index"
              :to="`/${item.carType}/used/${item.code}/`"
              class="brands__list-item"
            >
              <span class="brands__list-item-name">
                {{ item.nameEn }}
                <span class="brands__list-item-qty">{{ item.used }}</span>
              </span>
            </nuxt-link>
          </div>
          <UILoader v-else />
        </UIBaseTab>
      </UIBaseTabs>
    </div>
  </section>
</template>

<script setup>
import { useHoldingStore } from '../../store/holding'
import { getCardsShort } from '@/api/routes/catalog'

const { isAsc, isAvtodom } = useHoldingStore()

const getBrands = async () => {
  const { $fetchClient, $hasErrorResponse } = useNuxtApp()
  const res = await $fetchClient(getCardsShort())
  if (!$hasErrorResponse(res)) {
    return res?.brands
  }
}

const filter = (brands, condition) => {
  return brands.filter(brand => brand[condition] !== '0')
}

const tagTitle = isAsc ? 'p' : 'h2'
const brands = await getBrands()
const catalogNewItems = filter(brands, 'new')
const catalogUsedItems = filter(brands, 'used')
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.brands {
  grid-gap: 40px;

  @include mq($bp-small-medium) {
    grid-gap: 30px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 40px;
  }

  &__list {
    position: relative;
    width: 100%;
    max-height: 500px;
    padding-top: 10px;
    padding-bottom: 20px;
    overflow: auto;
    column-count: 2;

    @include mq($bp-small, $bp-medium-big) {
      column-count: 3;
    }

    @include mq($bp-medium-big, $bp-big) {
      column-count: 4;
    }

    @include mq($bp-big) {
      column-count: 6;
    }
  }

  &__list-item {
    @include label_small;

    position: relative;
    display: block;
    padding-right: 1px;
    margin-bottom: 15px;
    color: var(--blackLight);

    @include mq($bp-small-medium) {
      @include label;
    }

    &:hover {
      color: var(--black);

      & .catalog__list-catalog-item-qty {
        color: var(--black);
      }
    }

    &-name {
      position: relative;
      display: flex;
      grid-gap: 3px;
    }

    &-qty {
      display: block;
      font-size: 10px;
      font-weight: 400;
      line-height: 8px;
      color: var(--blackLight);
    }
  }

  &__tabs :deep(.tabs) {
    padding-bottom: 20px;
  }
}
</style>
