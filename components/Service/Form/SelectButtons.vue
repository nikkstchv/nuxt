<template>
  <div class="select-buttons__container">
    <UIBaseSelectButton
      v-for="button in buttons"
      :key="button.label"
      :text="button.label"
      :disabled="!button.length"
      class="select-buttons__button"
      :class="{ 'select-buttons__button_active': button.isActive }"
      @click="handleSelect(button)"
    />
  </div>
</template>

<script>
export default {
  name: 'ServiceFormSelectButtons',
  props: {
    buttons: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data: () => ({}),
  methods: {
    onSetSelectButtons (buttons) {
      this.$emit('onSetSelectButtons', buttons)
    },
    handleSelect (selected) {
      const newSelectButtons = this.buttons.map((select) => {
        return {
          ...select,
          isActive: select.label === selected.label,
        }
      })
      this.$emit('onSetSelectButtons', newSelectButtons)

      if (selected.action) {
        selected.action()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.select-buttons {
  &__container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    grid-gap: 10px;
    justify-content: flex-start;
    width: 100%;
    height: 48px;

    @include mq($bp-small-medium) {
      grid-gap: 15px;
    }
  }

  &__button {
    padding: 0 !important;
    background-color: transparent !important;

    &_active :deep(.select-button__title) {
      color: var(--black) !important;
    }

    &_active:hover {
      background: transparent;
    }

    & :deep(.select-button__title) {
      @include label;

      color: var(--grayDark);
    }
  }
}
</style>
