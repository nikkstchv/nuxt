<template>
  <label class="input">
    <input
      v-model="value"
      :placeholder="placeholder"
      :value="value"
      :type="type"
      class="input__area"
      :class="classInput"
      :min="min"
      :max="max"
      :disabled="disable"
      inputmode="numeric"
      @focus="onFocus"
      @blur="onBlur"
      @keypress="isNumber($event)"
      @keyup.enter="$emit('input', emitArgumentValue($event.target.value))"
    >
    <IconClear
      v-if="hideClear"
      v-show="value"
      class="input__icon input__icon_type_clear"
      :class="{ input__icon_hide: hideClear }"
      :on-clear="clear"
    />
  </label>
</template>

<script>
// https://www.npmjs.com/package/v-money3

export default {
  name: 'FilterRangeSliderInput',
  props: {
    mask: {
      type: Boolean,
      required: false,
      default: false,
    },
    modelValue: {
      type: undefined,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    hideClear: {
      type: Boolean,
      required: false,
      default: false,
    },
    disable: {
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
    unit: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['update:modelValue', 'input'],
  data () {
    return {
      focus: false,
      value: '',
      moneyConfig: {
        thousands: ' ',
        suffix: ` ${this.unit}`,
        precision: 0,
      },
    }
  },
  computed: {
    classInput () {
      return {
        input__area_with_value: this.value,
      }
    },
  },
  watch: {
    value: {
      handler (value) {
        if (value !== '') {
          this.value = (+value
            .toString()
            .replace(/\s/g, '')).toLocaleString()
        }
      },
      immediate: true,
    },
  },
  methods: {
    onFocus () {
      this.focus = true
    },
    onBlur (event) {
      this.$emit('update:modelValue', event.target.value)
      this.focus = false
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
      }
      return value
    },

    // Ввод только числа
    isNumber (evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
          (charCode < 48 || charCode > 57) &&
          charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.input {
  @include text_medium_regular;

  position: relative;
  width: 100%;

  &__area {
    width: 100%;
    padding: 13.5px 16px;
    border: 1px solid var(--grayDark);
    border-radius: 4px;

    &:focus ~ .input__label {
      top: -9px;
    }

    &:focus,
    &:active {
      border: 1px solid var(--royalBlue);
      outline: none;
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
      cursor: pointer;
    }
  }
}
</style>
