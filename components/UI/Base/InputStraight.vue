<template>
  <label
    :class="{
      input_error: error,
      input_success: success,
      input_disable: isShowEye && isEyeActive,
    }"
    class="input"
  >
    <input
      v-maska="mask"
      class="input__area"
      :data-maska="mask"
      :placeholder="placeholder"
      :value="value"
      :type="type"
      :disabled="isEyeActive"
      :class="classInput"
      :min="min"
      :max="max"
      :maxlength="maxLength"
      :inputmode="inputMode"
      :autocomplete="autocomplete"
      @[eventName]="$emit('update:modelValue', emitArgumentValue($event.target.value))"
      @blur="onBlur"
      @focus="onFocus"
    >
    <span v-if="label" class="input__label">{{ label }} </span>
    <ul v-if="errors.length" class="input__errors">
      <li v-for="errorName in errors" :key="errorName" class="input__error">
        {{ errorName }}
      </li>
    </ul>
    <IconInputEye
      v-if="isShowEye"
      class="input__icon"
      :active="isEyeActive"
      @click="handleEye"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: 'UIBaseInputStraight',
  props: {
    modelValue: {
      type: undefined,
      required: false,
      default: '',
    },
    errors: {
      type: Array,
      required: false,
      default: () => [],
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    mask: {
      type: String,
      required: false,
      default: '',
    },
    label: {
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
    error: {
      type: Boolean,
      required: false,
    },
    success: {
      type: Boolean,
      required: false,
    },
    onBlur: {
      type: Function,
      required: false,
      default: () => {},
    },
    onFocus: {
      type: Function,
      required: false,
      default: () => {},
    },
    hideClear: {
      type: Boolean,
      required: false,
      default: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    min: {
      type: Number,
      required: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    max: {
      type: Number,
      required: false,
    },
    maxLength: {
      type: Number,
      required: false,
      default: null,
    },
    eventName: {
      type: String,
      required: false,
      default: 'input',
    },
    firstSymbolUp: {
      type: Boolean,
      required: false,
      default: false,
    },
    autocomplete: {
      type: String,
      required: false,
      default: 'off',
    },
    isShowEye: {
      type: Boolean,
      required: false,
      default: false,
    },
    onChangeDisable: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
  emits: ['update:modelValue', 'input'],
  data () {
    return {
      focused: false,
      isEyeActive: false,
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
    inputMode () {
      if (this.type === 'numeric') {
        return 'numeric'
      }
      return null
    },
    patternNumber () {
      if (this.type === 'number' || this.type === 'numeric') {
        return '[0-9]*'
      }
      return null
    },
    classInput () {
      return {
        input__area_with_value: this.value,
      }
    },
  },
  methods: {
    handleEye () {
      this.isEyeActive = !this.isEyeActive
      this.onChangeDisable(this.isEyeActive)
    },
    clear () {
      this.$emit('input', '')
    },
    // Функция обработки value если он число
    emitArgumentValue (value) {
      if (this.type === 'number' && value) {
        return parseInt(value)
      } else if (!value) {
        return ''
      } else if (this.firstSymbolUp) {
        return value[0].toUpperCase() + value.slice(1)
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
  margin-bottom: 20px;

  &:hover {
    & .input__icon {
      opacity: 1;
    }
  }

  &_disable {
    & .input__icon {
      opacity: 1;
    }

    & .input__area {
      opacity: 0.3;
    }

    & .input__label {
      opacity: 0.3;
    }
  }

  &_error {
    & .input__area {
      border-bottom: 1px solid var(--error);
    }

    & .input__label {
      color: var(--error);
    }
  }

  &_success {
    & .input__area {
      border-bottom: 1px solid var(--green);
    }

    & .input__label {
      color: var(--green);
    }
  }

  &__area {
    @include text_medium_regular;

    width: 100%;
    padding: 15px 40px 0 0;
    border-bottom: 1px solid var(--blackLight);

    &_with_value {
      text-overflow: ellipsis;
    }

    &:focus ~ .input__icon_type_error {
      display: none;
    }

    &:active ~ .input__icon_type_error {
      display: none;
    }

    &:focus ~ .input__icon_type_success {
      display: none;
    }

    &:active ~ .input__icon_type_success {
      display: none;
    }

    &:focus ~ .input__icon_type_clear {
      display: block;
    }

    &:active ~ .input__icon_type_clear {
      display: block;
    }

    &:focus,
    &:active {
      outline: none;
      //border-bottom: 1px solid var(--grayMediumLight);
    }
  }

  &__label {
    @include label_small;

    position: absolute;
    top: -9px;
    left: 0;
    color: var(--blackLight);
    cursor: text;
    background-color: white;
    transition: top 0.1s;
  }

  &__icon {
    position: absolute;
    top: 10px;
    right: 0;
    transition: opacity 0.1s;

    @include mq($bp-medium-big) {
      opacity: 0;
    }

    &_hide {
      display: none;
    }

    &_type_clear {
      display: none;
      cursor: pointer;
    }
  }

  &__errors {
    @include text_small_regular;

    position: absolute;
    left: 0;
    padding-top: 5px;
    color: var(--error);
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
