<template>
  <TradeInPage :marks="marks" :seo="seo" />
</template>

<script setup>
import { getMarks } from '@/components/TradeIn/asyncDataFunc'

const { $fetchClient, $hasErrorResponse, $errorResponseCatch, $getSeo } = useNuxtApp()
const dataMarks = {
  $fetchClient,
  $errorResponseCatch,
  $hasErrorResponse,
}
const { path } = useRoute()
const seo = await $getSeo(path)
const marks = await getMarks(dataMarks)

useHeadDefault()
</script>
