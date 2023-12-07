<template>
  <div class="award">
    <IconAward class="award__year">
      {{ year }}
    </IconAward>
    <p class="award__title">
      {{ title }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.award {
  display: grid;
  grid-gap: 10px;
  place-items: center;

  &__title {
    @include text_medium_regular;

    max-width: 120px;
    color: var(--black);
    text-align: center;

    @include mq($bp-medium-big) {
      max-width: 150px;
    }
  }
}
</style>
