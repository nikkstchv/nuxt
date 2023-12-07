<template>
  <popper
    v-if="description"
    trigger="hover"
    :options="{
      placement: 'bottom-start',
    }"
  >
    <template #content>
      <div class="content">
        <img
          x-arrow
          class="icon"
          src="@/assets/icons/arrow-popup.svg"
          alt="инонка стрелки"
        >
        {{ description }}
      </div>
    </template>

    <label
      slot="reference"
      class="popper__label label"
      :class="[`label_theme_${color}`]"
    >{{ name }}</label>
  </popper>
  <label v-else class="label" :class="[`label_theme_${color}`]">{{
    name
  }}</label>
</template>

<script>
import Popper from 'vue3-popper'

export default {
  name: 'UILabel',
  components: {
    popper: Popper,
  },
  props: {
    name: {
      type: String,
      required: false,
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    color () {
      switch (this.type) {
        case 'custom':
          return 'sea'
        case 'special':
          return 'orange'
        default:
          return 'custom'
      }
    },
  },
}
</script>

<style scoped lang="scss">
.label {
  @include text_small_medium;

  position: relative;
  height: fit-content;
  padding: 5px 10px;
  border-radius: 2px;

  &_theme {
    &_sea {
      color: var(--royalBlue);
      background-color: rgba(var(--neonBlue-rgba), 0.07);
    }

    &_orange {
      color: var(--orange);
      background-color: rgba(var(--orange-rgba), 0.07);
    }
  }
}

.content {
  @include text_medium_regular;

  position: absolute;
  top: 10px !important;
  left: 0;
  z-index: 1;
  width: min-content;
  min-width: 250px;
  padding: 8px 10px;
  color: white;
  background: var(--blackLight);
  border-radius: 8px;
}

.icon {
  position: absolute;
  top: -11px;
}
</style>
