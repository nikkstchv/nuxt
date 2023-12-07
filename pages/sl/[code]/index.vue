<template>
  <main class="detail" />
</template>

<script setup>
import { shortLinks } from '@/api/routes/short-links'

const { $fetchClient, $errorResponseCatch } = useNuxtApp()
const route = useRoute()

try {
  const code = route.params.code
  const { data: res } = await useAsyncData('shortLinks', () => $fetchClient(shortLinks(code)))
  $errorResponseCatch(res.value)
  const url = res.value?.url ?? null

  if (url) {
    await navigateTo(url, { external: true })
  } else {
    await navigateTo('/404/')
  }
} catch (e) {
  await navigateTo('/404/')
}
</script>
