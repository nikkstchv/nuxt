<template>
  <label class="radio" :class="{ radio_disabled: disable }">
    <input
      class="radio__input"
      :disabled="disable"
      type="radio"
      :checked="isChecked"
      :value="value"
      @change="$emit('update:modelValue', $event.target.value)"
    >
    <span class="radio__checkmark" />
    <span class="radio__label">{{ label }} <slot /></span>
  </label>
</template>

<script>
export default {
  name: 'UIBaseRadio',
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
  emits: ['update:modelValue'],
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
  align-items: center;
  padding-left: 30px;
  cursor: pointer;
  user-select: none;

  &_disabled {
    cursor: default;
  }

  &__label {
    @include text_medium_regular;

    display: grid;
    grid-auto-flow: column;
    grid-gap: 9px;
    align-items: center;
    width: fit-content;
    color: var(--grayDark);
  }

  &__input {
    position: absolute;
    width: 0;
    height: 0;
    cursor: pointer;
    opacity: 0;

    @media (hover: hover) and (pointer: fine) {
      &:not(:disabled):hover ~ .radio__checkmark {
        background-color: white;
        border: 1px solid var(--black);
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &:not(:disabled):hover ~ .radio__label {
        color: var(--black);
      }
    }

    &:checked ~ .radio__label {
      color: var(--black);
      transition: color 0.2s;
    }

    &:checked ~ .radio__checkmark {
      background-color: white;
      border: 1px solid var(--black);
    }

    &:checked ~ .radio__checkmark::after {
      opacity: 1;
      transition: opacity 0.2s;
    }

    &:disabled ~ .radio__checkmark {
      background-color: var(--grayLight);
      border: 1px solid var(--grayMediumLight) !important;
    }
  }

  &__checkmark {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: white;
    border: 1px solid var(--grayMediumLight);
    border-radius: 32px;

    &::after {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 12px;
      height: 12px;
      content: '';
      background: var(--black);
      border-radius: 50%;
      opacity: 0;
    }
  }
}
</style>
