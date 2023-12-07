<template>
  <label class="input">
    <input
      ref="input"
      min="0"
      :placeholder="placeholder || placeholderLabel"
      :value="value"
      :type="type"
      class="input__area"
      :class="classInput"
      :disabled="disable"
      :readonly="readonly"
      @input="$emit('input', emitArgumentValue($event.target.value))"
      @click="click"
      @focus="setFocus()"
    >

    <IconArrow
      :disable="disable"
      :active="focused"
      class="input__icon input__icon_arrow"
      :class="{
        input__icon_arrow_focused: focused,
        input__icon_arrow_readonly: readonly,
      }"
      @mousedown="onMousedown"
      @mouseup="onMouseup"
      @click.prevent="toggle"
    />
  </label>
</template>

<script>
import IconArrow from '@/components/Icon/Arrow.vue'

export default {
  name: 'FilterItemInput',
  components: {
    IconArrow,
  },
  props: {
    value: {
      type: undefined,
      required: false,
      default: '',
    },
    modelItem: {
      type: undefined,
      required: false,
      default: '',
    },
    isOpenList: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholderLabel: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: undefined,
      required: false,
      default: '',
    },
    placeholderBlack: {
      type: Boolean,
      required: false,
      default: false,
    },
    ellipsis: {
      type: Boolean,
      required: false,
      default: false,
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
    readonly: {
      type: Boolean,
      required: false,
    },
    click: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
  data () {
    return {
      focused: false,
      mousedown: false,
    }
  },
  computed: {
    classInput () {
      return {
        input__area_placeholder_black: this.placeholderBlack,
        input__area_placeholder_default: !this.placeholderBlack,
        'input__area_text-overflow_ellipsis': this.ellipsis,
        input__area_with_value: this.value,
        input__area_readonly: this.readonly,
      }
    },
  },
  watch: {
    focused (value) {
      this.$emit('setFocused', value)
    },
    modelItem () {
      this.setBlur()
    },
    isOpenList (isOpen) {
      if (!isOpen) {
        this.setBlur()
      }
    },
  },
  methods: {
    setBlur () {
      if (!this.mousedown) {
        this.$emit('onCloseList')
        this.focused = false
      }
    },

    setFocus () {
      this.focused = true
    },

    toggle () {
      if (this.focused) {
        this.setBlur()
      } else {
        this.$refs.input.focus()
      }
    },

    onMousedown () {
      this.mousedown = true
    },

    onMouseup () {
      this.mousedown = false
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
    padding: 13.5px 40px 13.5px 16px;
    background-color: white;
    border: 1px solid var(--grayDark);
    border-radius: 4px;
    opacity: 1;

    &_with_value {
      text-overflow: ellipsis;
      border: 1px solid var(--grayDolphin);
    }

    &_readonly {
      cursor: pointer;
    }

    &_text-overflow_ellipsis {
      text-overflow: ellipsis;
    }

    &:not(:disabled) {
      &:focus,
      &:active {
        border: 1px solid var(--grayMediumLight);
        outline: none;

        &::placeholder {
          color: transparent;
        }
      }
    }

    &::placeholder {
      @include text_medium_regular;
    }

    &_placeholder_black::placeholder {
      color: var(--black) !important;
    }

    &_placeholder_default::placeholder {
      color: var(--grayDark) !important;
      text-overflow: ellipsis;
    }
  }

  &__icon {
    position: absolute;
    top: 13px;
    right: 15px;

    &_arrow {
      top: 15px;
      width: 24px;
      height: 24px;

      &_readonly {
        cursor: pointer;
      }

      &_focused {
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
