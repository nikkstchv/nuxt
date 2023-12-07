<template>
  <label class="radio">
    <input
      class="radio__input"
      :disabled="disable"
      type="radio"
      :checked="isChecked"
      :value="value"
      @change="$emit('change', $event.target.value)"
    >
    <span class="radio__label"><slot>{{ label }}</slot></span>
  </label>
</template>

<script>
export default {
  name: 'UIRadioTime',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    label: {
      type: String,
      default: '',
      required: false,
    },
    modelValue: {
      type: [String, Array, Number],
      required: false,
      default: '',
    },
    value: {
      type: [String, Number],
      default: undefined,
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    isChecked () {
      return String(this.modelValue) === String(this.value)
    },
  },
  watch: {
    modelValue (value) {
      return Array.isArray(value) ? '' : ''
    },
  },
}
</script>

<style lang="scss" scoped>
.radio {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  height: 40px;
  cursor: pointer;
  user-select: none;
  border: 1px solid var(--grayMediumLight);
  border-radius: 4px;

  @media (hover: hover) and (pointer: fine) {
    &:not(:disabled):hover ~ .radio__label {
      color: white;
      background-color: var(--blackLight);
    }
  }

  &__label {
    @include text_small_regular;

    display: grid;
    grid-auto-flow: column;
    grid-gap: 9px;
    align-items: center;
    width: fit-content;
    padding: 11px 15px;
    color: var(--black);
    border-radius: 4px;
  }

  &__input {
    position: absolute;
    width: 0;
    height: 0;
    cursor: pointer;
    opacity: 0;

    &:disabled ~ .radio__label {
      color: var(--blackLight);
      background-color: white;
      opacity: 0.75;
    }

    &:checked ~ .radio__label {
      color: white;
      background-color: var(--blackLight);
      transition: all 0.2s;
    }
  }
}
</style>
