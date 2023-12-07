<template>
  <main class="reports">
    <ReportsHeader
      class="reports__header"
      title="Еженедельный итог"
      text="Получите сводку ваших еженедельных онлайн-транзакций здесь."
    />
    <div class="reports__list">
      <nuxt-link to="nps/" class="reports__item">
        NPS - Тандем
      </nuxt-link>
      <nuxt-link to="aeb/" class="reports__item">
        Cтатистика АЕБ
      </nuxt-link>
    </div>
  </main>
</template>

<script setup>
import { useHoldingStore } from '../../store/holding'

definePageMeta({
  layout: 'reports',
  middleware: 'authenticated-reports',
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
})
</script>

<style lang="scss" scoped>
.reports {
  display: flex;
  flex-direction: column;
  padding-left: 45px;

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
  }

  &__item {
    display: flex;
    align-items: center;
    width: 350px;
    height: 100px;
    padding: 18px 24px;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    color: var(--blackLight);
    background: #fff;
    border-radius: 19.0044px;
    box-shadow: 0 16px 24px rgb(0 0 0 / 6%), 0 2px 6px rgb(0 0 0 / 4%),
      0 0 1px rgb(0 0 0 / 4%);

    &:hover {
      color: var(--grayDolphin);
      opacity: 0.9;
    }
  }
}
</style>
