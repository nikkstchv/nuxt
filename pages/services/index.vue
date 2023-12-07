<template>
  <ServicesPageAsc v-if="isAsc" />
  <ServicesPageAvtodom v-else />
</template>

<script setup>
import { useHoldingStore } from '../../store/holding'

const { isAsc } = useHoldingStore()
</script>
