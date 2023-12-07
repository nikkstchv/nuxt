<template>
  <TradeInPage
    :data-mark="dataMark"
    :models="models"
    :marks="marks"
    :static-data="staticData"
    :seo="seo"
  />
</template>

<script setup>
import {
  findItemOnCode,
  getMarks,
  getStaticPageBlocksMark,
  handleEmpty,
} from '@/components/TradeIn/asyncDataFunc'

const { $fetchClient, $hasErrorResponse, $errorResponseCatch, $getSeo } = useNuxtApp()
const { params, path } = useRoute()
const markCode = params.mark
const dataMarks = {
  $fetchClient,
  $errorResponseCatch,
  $hasErrorResponse,
  markCode,
}
const { dataMark, models, staticData } = await getStaticPageBlocksMark(dataMarks)
const marks = await getMarks(dataMarks)
const seo = await $getSeo(path)

handleEmpty(findItemOnCode(marks, markCode))

useHeadDefault()
</script>
