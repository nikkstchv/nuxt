<template>
  <label
    class="radio-image"
    :class="{
      'radio-image_disable': disable,
      'radio-image_checked': isChecked,
    }"
  >
    <input
      class="radio-image__input"
      type="radio"
      :checked="isChecked"
      :value="value"
      @change="$emit('update:modelValue', $event.target.value)"
    >
    <nuxt-img
      v-if="imageSrc"
      class="radio-image__image"
      :src="imageSrc"
      :width="resizeImageSize"
      :loading="lazyLoad ? 'lazy' : 'eager'"
      alt=""
    />
    <span class="radio-image__label">
      <slot>{{ label }}</slot></span>
  </label>
</template>

<script>
export default {
  name: 'UIRadioImage',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    resizeImageSize: {
      type: String,
      required: false,
      default: '',
    },
    lazyLoad: {
      type: Boolean,
      required: false,
      default: false,
    },
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
  emits: ['update:modelValue', 'input'],
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
.radio-image {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  user-select: none;

  @media (hover: hover) and (pointer: fine) {
    &:not(.radio-image_disable):hover ~ .radio__label {
      font-weight: 700;
    }
  }

  &_checked {
    opacity: 1;
  }

  &_disable {
    opacity: 0.4;
  }

  &__label {
    @include text_medium_regular;

    display: grid;
    grid-auto-flow: column;
    grid-gap: 9px;
    align-items: center;
    width: fit-content;
    color: var(--black);
  }

  &__input {
    position: absolute;
    width: 0;
    height: 0;
    cursor: pointer;
    opacity: 0;

    &:disabled ~ .radio__image {
      opacity: 0.4;
    }

    &:checked ~ .radio__label {
      font-weight: 700;
    }
  }
}
</style>
