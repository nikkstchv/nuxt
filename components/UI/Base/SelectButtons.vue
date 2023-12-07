<template>
  <div class="select-buttons select-buttons__container">
    <UIBaseSelectButton
      v-for="button in buttonsLocal"
      :key="button.label"
      :text="button.label"
      :is-seo-title="isSeoTitle"
      class="select-buttons__button"
      :class="{ 'select-buttons__button_active': button.isActive }"
      :path="button.path"
      @click="handleSelect(button)"
    />
  </div>
</template>

<script>

export default {
  name: 'UIBaseSelectButtons',
  props: {
    buttons: {
      type: Array,
      required: false,
      default: () => [{
        label: '',
        isActive: false,
      }],
    },
    isSeoTitle: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      buttonsLocal: this.buttons,
    }
  },
  watch: {
    buttons: {
      handler (newValue) {
        this.buttonsLocal = newValue
      },
      deep: true,
    },
  },
  methods: {
    setButtons (buttons) {
      this.buttonsLocal = buttons
      this.$emit('onChangeButtons', buttons)
    },
    getActiveButton () {
      return this.buttonsLocal.find(button => button.isActive)
    },
    handleSelect (selectedButton) {
      const newSelectButtons = this.buttonsLocal.map(({
        label,
        ...rest
      }) => {
        return {
          ...rest,
          label,
          isActive: label === selectedButton.label,
        }
      })

      this.setButtons(newSelectButtons)
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
    height: fit-content;

    @include mq($bp-small-medium) {
      grid-gap: 15px;
    }
  }

  .select-buttons &__button {
    &_active {
      color: white;
      background-color: var(--blackLight);

      &:hover {
        background-color: var(--blackLight);
      }
    }
  }
}
</style>
