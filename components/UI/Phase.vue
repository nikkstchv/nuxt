<template>
  <div class="phase">
    <div
      class="phase__label"
      :class="{
        phase__label_done: done,
      }"
    >
      <template v-if="!done">
        {{ label }}
      </template>
      <IconPhase v-else class="phase__icon" />
    </div>
    <p class="phase__text">
      <slot />
    </p>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  done: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.phase {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 20px;
  align-items: center;
  width: fit-content;

  &__label {
    display: grid;
    place-items: center;
    width: 92px;
    height: 92px;
    padding: 22px;
    border: 2px solid var(--grayMediumLight);
    border-radius: 16px;
    transition: all 0.2s;

    &_done {
      background: var(--grayLight);
    }
  }

  &__text {
    @include label;
  }
}
</style>
