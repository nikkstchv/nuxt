<template>
  <label
    class="radio-image"
    :class="{
      'radio-image_disable': disable,
      'radio-image_checked': isChecked,
      'radio-image_no-logo': noLogo,
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
    <span class="radio-image__label">{{ label }}</span>
    <IconRadioCheckmark
      class="radio-image__checkmark"
      :class="{
        'radio-image__checkmark_checked': isChecked,
      }"
    />
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
    noLogo: {
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
  display: grid;
  grid-template-columns: 36px 1fr auto;
  grid-auto-flow: column;
  grid-gap: 12px;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 8px;
  cursor: pointer;
  border-bottom: 1px solid var(--grayMediumLight);
  transition: background 0.1s ease;

  @include mq($bp-small-medium) {
    grid-template-columns: 40px 1fr auto;
    grid-gap: 16px;
    padding: 20px 12px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:not(.radio-image_disable):hover .radio-image__checkmark {
      opacity: 1;
    }
  }

  &:last-child {
    border-bottom: none;
  }

  &_checked {
    cursor: default;
    background: var(--grayLight);
    opacity: 1;
  }

  &_disable {
    cursor: default;
    opacity: 0.4;
  }

  &_no-logo {
    grid-template-columns: 1fr auto;

    & .radio-image__label {
      grid-column-start: 1;
    }
  }

  &__label {
    @include text_big_regular;

    grid-column-start: 2;
    color: var(--black);
  }

  &__input {
    position: absolute;
    width: 0;
    height: 0;
    cursor: pointer;
    opacity: 0;
  }

  &__image {
    justify-self: center;
  }

  &__checkmark {
    grid-column-start: 3;
    opacity: 0;
    transition: opacity 0.1s ease;

    &_checked {
      opacity: 1;
    }
  }
}
</style>
