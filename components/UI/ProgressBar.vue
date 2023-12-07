<template>
  <div class="progress-bar">
    <div
      v-for="([key, value], index) in steps"
      :key="key"
      :class="[
        'progress-bar__item',
        {'progress-bar__item_active': active === index},
        {'progress-bar__item_fill': value},
        {'progress-bar__item_empty': !value},
      ]"
    />
  </div>
</template>

<script>

export default {
  name: 'UIProgressBar',
  props: {
    steps: {
      type: Array,
      required: true,
      default: () => [],
    },
    active: {
      type: Number,
      required: true,
      default: 1,
    },
  },
}
</script>

<style scoped lang="scss">
.progress-bar {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 6px;

  &__item {
    height: 4px;
    background: var(--grayMediumLight);

   .progress-bar &_active {
     background: rgba(var(--neonBlue-rgba), 0.4);
    }

    &_fill {
      background: var(--neonBlue);
    }
  }

  .progress-bar__item_active.progress-bar__item_empty {
    background: var(--grayDolphin);
  }
}

</style>
