<template>
  <section
    v-if="staticPageInfo"
    class="brand-model-about detail__html"
    v-html="staticPageInfo"
  />
</template>

<script setup>
const props = defineProps({
  staticPageId: {
    type: String,
    required: true,
  },
})

const staticPageOptions = { staticPageId: props.staticPageId }
const staticPageInfo = await useGetStaticPageService(staticPageOptions)
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.brand-model-about {
  @include indentsMainHorizontal;

  @import 'assets/styles/components/Brands/html-style';

  display: grid;
  grid-gap: 20px;
}
</style>
