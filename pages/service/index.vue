<template>
  <ServicePageMain :type-of-works="typeOfWorks.types" :brands="brands?.marks" :static-data="staticData" />
</template>

<script setup>
import routes from '@/api/routes/service'
import { useHoldingStore } from '@/store/holding'

const { $hasErrorResponse, $errorResponseCatch, $fetchClient } = useNuxtApp()

const { isAsc } = useHoldingStore()
const staticRoute = isAsc ? routes.getAscStatic() : routes.getAvtodomStatic()
const staticData = await $fetchClient(staticRoute)

const typeOfWorks = await $fetchClient(routes.getTypeOfWorks())
const brands = await $fetchClient(routes.getBrands())

if ($hasErrorResponse(typeOfWorks) || $hasErrorResponse(brands)) {
  $errorResponseCatch(brands)
  $errorResponseCatch(typeOfWorks)
}
</script>
