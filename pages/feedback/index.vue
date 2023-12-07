<template>
  <FeedbackPageAvtodom v-if="isAvtodom" />
  <FeedbackPageAsc v-else />
</template>

<script setup>
import { useHoldingStore } from '../../store/holding'

const { isAvtodom } = useHoldingStore()

const title = isAvtodom
  ? 'Оставить отзыв о нашей работе - ГК АВТОДОМ'
  : 'Форма обратной связи'
const description = isAvtodom
  ? 'Оставляя отзыв о компании Автодом, вы помогаете улучшить нашу работу. Мы прислушиваемся ко всем пожеланиям и замечаниям.'
  : 'Вы можете задать интересующий вас вопрос нашим специалистам и получить информацию по телефону'

useHeadDefault({ title, description })
</script>
