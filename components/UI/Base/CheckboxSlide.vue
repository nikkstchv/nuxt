<template>
  <label class="checkbox-slide">
    <input
      v-model="model"
      :disabled="disable"
      :value="value"
      class="checkbox-slide__input"
      type="checkbox"
    >
    <span class="checkbox-slide__text">{{ label }} <slot /></span>
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
</script>

<style lang="scss" scoped>
.checkbox-slide {
  position: relative;
  display: block;
  max-width: max-content;
  cursor: pointer;

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
    padding: 20px 0;
  }

  &__input {
    position: absolute;
    z-index: -1;
    display: none;
    opacity: 0;
  }

  &__text {
    @include text_medium_regular;

    position: relative;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 5px;
    align-items: center;
    padding: 0 0 0 48px;
    cursor: pointer;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 42px;
      height: 20px;
      cursor: pointer;
      content: '';
      background: var(--grayLight);
      border: 1px solid var(--grayMediumLight);
      border-radius: 32px;
      transition: 0.2s;
    }

    &::after {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16.5px;
      height: 16px;
      cursor: pointer;
      content: '';
      background: white;
      border: 1px solid rgb(0 0 0 / 4%);
      border-radius: 100px;
      box-shadow: 0 1px 4px rgb(0 0 0 / 15%), 0 1px 1px rgb(0 0 0 / 8%);
      transition: 0.2s;
    }
  }
}

.checkbox-slide__input:checked + .checkbox-slide__text::before {
  background: var(--black);
}

.checkbox-slide__input:checked + .checkbox-slide__text::after {
  left: 23.5px;
  background: white;
}

.checkbox-slide__input:disabled + .checkbox-slide__text::after {
  background: var(--grayLight);
}

.checkbox-slide__input:checked:disabled + .checkbox-slide__text::before {
  background: var(--grayLight);
}

.checkbox-slide:hover
  > .checkbox-slide__input:not(:disabled, :checked)
  + .checkbox-slide__text::after {
  @media (hover: hover) and (pointer: fine) {
    background: var(--black) !important;
  }
}
</style>
