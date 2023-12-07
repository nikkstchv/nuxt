<template>
  <label class="indicator">
    <div
      class="indicator__indication"
      :class="[`indicator__indication_theme_${color}`]"
    />
    {{ type }}
  </label>
</template>

<script>
export default {
  name: 'UIIndicator',
  props: {
    type: {
      type: String,
      required: true,
      default: '',
    },
  },
  computed: {
    color () {
      switch (this.type) {
        case 'В ближайшей поставке':
          return 'grass'
        case 'В наличии':
          return 'grass'
        case 'Предзаказ':
          return 'orange'
        case 'В резерве':
          return 'gray'
        default:
          return 'gray'
      }
    },
  },
}
</script>

<style scoped lang="scss">
.indicator {
  @include text_small_medium;

  display: flex;
  grid-gap: 8px;
  align-items: center;
  color: var(--grayDolphin);

  &__indication {
    width: 12px;
    height: 12px;
    border-radius: 50%;

    &_theme {
      &_grass {
        background-color: var(--valid);
      }

      &_orange {
        background-color: rgba(var(--orange-rgba), 0.6);
      }

      &_gray {
        background-color: var(--grayDark);
      }
    }
  }
}
</style>
