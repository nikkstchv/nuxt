<template>
  <div class="youtube">
    <iframe
      class="youtube__iframe"
      width="100%"
      height="100%"
      :src="src"
      :title="title"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: '',
  },
  id: {
    type: String,
    required: true,
    default: '',
  },
  playerVars: {
    type: Object,
    required: true,
    default: () => {},
  },
})

const playerVarsQuery = Object.entries(props.playerVars).map(([key, value]) => `${key}=${value}`).join('&')
const src = `https://www.youtube.com/embed/${props.id}?${playerVarsQuery}`
</script>

<style lang="scss" scoped>
.youtube {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__iframe {
    flex-grow: 1;
    padding: 0;
    margin: 0;
    border: none;
  }
}
</style>
