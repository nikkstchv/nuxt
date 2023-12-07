<template>
  <div class="detail">
    <ReportsHeader class="reports__header" :title="title" has-back-button />
    <main class="detail__main">
      <iframe
        v-if="section === 'aeb'"
        class="detail__iframe"
        title="AEB - AEB новые ам РФ"
        width="100%"
        height="700px"
        src="https://app.powerbi.com/view?r=eyJrIjoiZmI4MTM0NjktNmE4Mi00ZWZhLTg0YTktOTcxNTEzYmZiNjUxIiwidCI6IjE3YTVjMmIxLWI2YTAtNGJmNS05Y2FkLWMyOWRkZjljYjRkYiIsImMiOjl9"
        allowfullscreen
      />
      <iframe
        v-if="section === 'nps'"
        class="detail__iframe"
        title="NPS - Тандем"
        width="100%"
        height="700px"
        src="https://app.powerbi.com/view?r=eyJrIjoiMDNhNTg4NDMtNGQzZS00YWIyLWIzOWYtZGFjMDA1MzJhMDQ3IiwidCI6IjE3YTVjMmIxLWI2YTAtNGJmNS05Y2FkLWMyOWRkZjljYjRkYiIsImMiOjl9"
        allowfullscreen
      />
    </main>
  </div>
</template>

<script setup>
import { useHoldingStore } from '../../../store/holding'

definePageMeta({
  layout: 'reports',
  middleware: 'authenticated-reports',
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
})

const getTitle = (section) => {
  switch (section) {
    case 'aeb':
      return 'Статистика АЕБ'
    case 'nps':
      return 'NPS - Тандем'
    default:
      return ''
  }
}

const route = useRoute()
const section = route.params.section
const title = getTitle(section)
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  padding-left: 45px;

  &__iframe {
    max-width: 1100px;
    max-height: 900px;
  }
}
</style>
