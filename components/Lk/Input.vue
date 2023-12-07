<template>
  <label :class="{ input_error: error, input_success: success }" class="input">
    <input
      ref="input"
      v-maska="mask"
      min="0"
      :data-maska="mask"
      :value="value"
      :type="type"
      class="input__area"
      :class="classInput"
      @input="$emit('update:modelValue', emitArgumentValue($event.target.value))"
      @blur="onBlur"
      @click="error = ''"
    >
    <span class="input__error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  name: 'LKInput',
  props: {
    modelValue: {
      type: undefined,
      required: false,
      default: '',
    },
    mask: {
      type: String,
      required: false,
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    disable: {
      type: Boolean,
      required: false,
    },
    // error: {
    //   type: Boolean,
    //   required: false,
    // },
    success: {
      type: Boolean,
      required: false,
    },
    focus: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:modelValue', 'input'],
  data () {
    return {
      error: '',
    }
  },
  computed: {
    value: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      },
    },
    classInput () {
      return {
        input__area_with_value: this.value,
      }
    },
  },
  mounted () {
    if (this.focus) {
      this.focusInput()
    }
  },
  methods: {
    onBlur () {
      if (!this.value) {
        this.error = 'Не указано'
      }
      this.$emit('input', this.value)
    },
    clear () {
      this.$emit('input', '')
    },
    focusInput () {
      this.$refs.input.focus()
    },
    // Функция обработки value если он число
    emitArgumentValue (value) {
      if (this.type === 'number' && value) {
        return parseInt(value)
      } else if (!value) {
        return ''
      }
      return value
    },
  },
}
</script>

<style lang="scss" scoped>
.input {
  @include text_small_regular;

  position: relative;
  width: 100%;
  cursor: text;

  &_error {
    & .input__area {
      border-bottom: 1px solid var(--blackLight);
    }
  }

  &__error {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--error);
  }

  &_success {
    & .input__area {
      //border: 1px solid var(--green);
    }
  }

  &__area {
    width: 100%;

    &_with_value {
      padding: 0 40px 0 0;
      text-overflow: ellipsis;
    }

    &:focus,
    &:active {
      border-bottom: 1px solid var(--blackLight);
      outline: none;

      & .input__error {
        display: none;
      }

      &::placeholder {
        color: transparent;
      }
    }

    &__icon {
      position: absolute;
      top: 13px;
      right: 15px;

      &_type_clear {
        cursor: pointer;
      }
    }
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
}

input[type='number'] {
  appearance: textfield;
}
</style>
