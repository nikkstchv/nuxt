<template>
  <TradeInPage
    :data-mark="dataMark"
    :data-model="dataModel"
    :marks="marks"
    :static-data="staticData"
    :seo="seo"
  />
</template>

<script setup>
import {
  findItemOnCode,
  getMarks,
  getStaticPageBlocksModel,
  handleEmpty,
} from '@/components/TradeIn/asyncDataFunc'

const { $fetchClient, $hasErrorResponse, $errorResponseCatch, $getSeo } = useNuxtApp()
const { params, path } = useRoute()
const markCode = params.mark
const modelCode = params.model
const dataModels = {
  $fetchClient,
  $errorResponseCatch,
  $hasErrorResponse,
  markCode,
  modelCode,
}
const { dataMark, dataModel, staticData } = await getStaticPageBlocksModel(dataModels)
const marks = await getMarks(dataModels)
const seo = await $getSeo(path)

handleEmpty(findItemOnCode(marks, markCode))

useHeadDefault()
</script>
