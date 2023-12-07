<template>
  <client-only>
    <popper
      arrow
      class="info"
      trigger="hover"
      :options="{
        placement: 'bottom',
        modifiers: {
          flip: {
            enabled: false,
          },
        },
      }"
      @click.stop.prevent
    >
      <template #content>
        <div class="info__popup content">
          <slot />
        </div>
      </template>

      <button slot="reference">
        <IconInfo class="info__icon" />
      </button>
    </popper>
  </client-only>
</template>

<script>
import Popper from 'vue3-popper'

import IconInfo from '@/components/Icon/Info.vue'

export default {
  name: 'UIInfoIconWithPopup',
  components: {
    popper: Popper,
    IconInfo,
  },
}
</script>

<style lang="scss" scoped>
.info {
 .info &__icon {
    width: 16px;
    height: 16px;
  }

  &__popup {
    @include text_medium_regular;

    width: min-content;
    min-width: 250px;
    padding: 8px 10px;
    color: white;
    background: var(--blackLight);
    border-radius: 8px;
  }
}

:deep(.popper) {
  border-radius: 8px;
}

:deep(.popper #arrow::before) {
  background:  var(--blackLight);
}
</style>
