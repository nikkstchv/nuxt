<template>
  <label
    :class="{
      input_error: error,
      input_success: success,
      input_disable: disable,
    }"
    class="input"
  >
    <input
      class="input__area"
      :placeholder="placeholder"
      :value="value"
      :type="inputType"
      :class="classInput"
      :min="min"
      :max="max"
      :disabled="disable"
      :maxlength="maxLength"
      :inputmode="inputMode"
      :autocomplete="autocomplete"
      :readonly="readonly"
      @[eventName]="$emit('update:modelValue', emitArgumentValue($event.target.value))"
      @blur="onBlur"
      @focus="onFocus"
    >

    <span
      v-if="label"
      :class="{
        input__label_fly: flyLabel,
        input__label_required: required,
      }"
      class="input__label"
    >
      {{ label }}
      <IconRequired
        v-if="required"
        class="input__required"
        :class="{
          input__required_disabled: disable,
        }"
      />
    </span>

    <IconSuccess
      v-if="success"
      active
      class="input__icon input__icon_type_success"
    />
    <IconInputError
      v-if="error && !passwordEye"
      class="input__icon input__icon_type_error"
    />
    <ul v-if="errors.length" class="input__errors">
      <li v-for="errorName in errors" :key="errorName" class="input__error">
        {{ errorName }}
      </li>
    </ul>
    <IconLoop v-if="isSearch && !modelValue" class="input__icon input__icon_type_loop" />
    <IconInputEye
      v-if="passwordEye"
      class="input__icon"
      :active="isEyeActive"
      @click="handleEye"
    />
    <IconClear
      v-show="!hideClear && modelValue"
      class="input__icon input__icon_type_clear"
      :class="{ input__icon_hide: hideClear }"
      :on-clear="clear"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: 'UIBaseInput',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      required: false,
      default: '',
    },
    placeholder: {
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
    errors: {
      type: Array,
      required: false,
      default: () => [],
    },
    error: {
      type: Boolean,
      required: false,
    },
    success: {
      type: Boolean,
      required: false,
    },
    readonly: {
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
      default: 'change',
    },
    firstSymbolUp: {
      type: Boolean,
      required: false,
      default: false,
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    autocomplete: {
      type: String,
      required: false,
      default: 'off',
    },
    isSearch: {
      type: Boolean,
      required: false,
      default: false,
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
    inputType () {
      if (this.isEyeActive && this.passwordEye) {
        return 'text'
      }
      return this.type
    },
    passwordEye () {
      return this.type === 'password' && this.modelValue
    },
    inputMode () {
      const findedInputMode = [
        'number',
        'tel',
        'email',
        'url',
        'text',
        'search',
        'none',
      ].find(inputMode => inputMode === this.type)

      if (findedInputMode === 'number') {
        return 'numeric'
      }

      return findedInputMode ?? null
    },
    flyLabel () {
      return this.isIssetValue
    },
    classInput () {
      return {
        input__area_with_value: this.isIssetValue,
      }
    },
    isIssetValue () {
      if (Array.isArray(this.value)) {
        return this.value.length > 0
      } else {
        return !!this.value
      }
    },
  },
  methods: {
    handleEye () {
      this.isEyeActive = !this.isEyeActive
    },
    clear () {
      this.$emit('update:modelValue', '')
    },
    // Функция обработки value если он число
    emitArgumentValue (value) {
      const isTypeNumber = this.type === 'numeric' || this.type === 'number'
      if (isTypeNumber && value) {
        return parseInt(value)
      } else if (isTypeNumber && !parseInt(value)) {
        return ''
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
  @include text_medium_regular;

  position: relative;
  width: 100%;

  &_error {
    & .input__area {
      border: 1px solid var(--error);
    }
  }

  &_success {
    & .input__area {
      border: 1px solid var(--valid);
    }
  }

  &_disable {
    & .input__area {
      border: 1px solid var(--grayMediumLight);

      &:focus,
      &:active {
        border: 1px solid var(--grayMediumLight);
      }
    }

    & .input__label {
      color: var(--grayMediumLight);
    }

    & .input__required {
      color: var(--grayMediumLight);
    }
  }

  &__area {
    width: 100%;
    padding: 13.5px 40px 13.5px 16px;
    border: 1px solid var(--grayDark);
    border-radius: 4px;
    opacity: 1;

    &_with_value {
      text-overflow: ellipsis;
      border: 1px solid var(--grayDolphin);
    }

    &::placeholder {
      @include text_medium_regular;

      color: var(--grayDark);
    }

    &:focus ~ .input__label {
      @include text_small_regular;

      top: -9px;
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
      border: 1px solid var(--royalBlue);
      outline: none;
    }

    &:disabled {
      background-color: white;
    }
  }

  &__label {
    @include text_medium_regular;

    position: absolute;
    top: 15px;
    left: 12px;
    display: flex;
    padding: 0 4px;
    color: var(--grayDark);
    pointer-events: none;
    cursor: text;
    background-color: white;
    transition: top 0.1s;

    &_fly {
      @include text_small_regular;

      top: -9px;
    }
  }

  &__required {
    transform: translate(4px, 5px);

    & :deep(.icon__path) {
      fill: var(--error);
    }
  }

  &__icon {
    position: absolute;
    top: 13px;
    right: 15px;

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
    padding-top: 1px;
    color: var(--error);
  }
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  box-shadow: 0 0 0 30px white inset !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
}

input[type='number'] {
  appearance: textfield;
}
</style>
