<template>
  <label :class="{ checkbox_disable: disable }" class="checkbox">
    <input
      v-model="model"
      :name="label"
      :value="value"
      :disabled="disable"
      class="checkbox__input"
      type="checkbox"
    >
    <span class="checkbox__label"><slot />{{ label }}</span>
    <IconCheckboxCheckmark
      class="checkbox__checkmark"
      :show-checkmark="showCheckmark"
    />
  </label>
</template>

<script setup>
const props = defineProps({
  value: {
    type: undefined,
    required: false,
    default: false,
  },
  modelValue: {
    type: [Boolean, Array],
    required: true,
  },
  label: {
    type: undefined,
    required: false,
    default: '',
  },
  disable: {
    type: Boolean,
    required: false,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])
const model = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  },
})
const showCheckmark = computed(() => {
  return true
  // return !this.disable
})
</script>

<style lang="scss" scoped>
.checkbox {
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  padding-left: 30px;
  cursor: pointer;
  user-select: none;

  &_disable {
    order: 1;
    cursor: default;

    @media (hover: hover) and (pointer: fine) {
      &:hover ~ .checkbox__label {
        color: var(--grayDark) !important;
        transition: color 0.2s;
      }
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:not(:disabled):hover ~ .checkbox__label {
      color: var(--black);
      transition: color 0.2s;
    }
  }

  &__label {
    @include text_medium_regular;

    color: var(--blackLight);
  }

  &__input {
    position: absolute;
    width: 0;
    height: 0;
    cursor: pointer;
    visibility: hidden;
    opacity: 0;

    &:checked ~ .checkbox__checkmark::after {
      opacity: 1;
    }

    &:checked ~ .checkbox__checkmark {
      background-color: var(--black);
      border: 0;
      fill: white;
      transition: all 0.2s;
    }

    &:checked ~ .checkbox__label {
      color: var(--black);
      transition: color 0.2s;
    }

    @media (hover: hover) and (pointer: fine) {
      &:not(:disabled):hover ~ .checkbox__label {
        color: var(--black);
        transition: color 0.2s;
      }
    }

    &:disabled ~ .checkbox__checkmark {
      background-color: var(--grayLight);
      border: 0 !important;
    }

    @media (hover: hover) and (pointer: fine) {
      &:not(:disabled, :checked):hover ~ .checkbox__checkmark {
        padding: 3.5px;
        border: 1.5px solid var(--black);
        fill: var(--grayMediumLight);
        transition: all 0.2s;
      }
    }
  }

  &__checkmark {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    padding: 4.5px;
    border: 1.5px solid var(--grayDark);
    border-radius: 4px;
  }
}
</style>
