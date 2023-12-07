<template>
  <ServicesSellCarPage />
</template>

<script setup>
import { useHoldingStore } from '../../../store/holding'

definePageMeta({
  validate: () => {
    const { isAsc } = useHoldingStore()
    return isAsc
  },
})
</script>
