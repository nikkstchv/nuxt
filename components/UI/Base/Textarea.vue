<template>
  <div
    :class="{
      textarea_error: error,
      textarea_disable: disable,
    }"
    class="textarea"
  >
    <textarea
      :value="value"
      :cols="cols"
      :rows="rows"
      class="textarea__area"
      :disabled="disable"
      :maxlength="maxLength"
      :spellcheck="spellcheck"
      @input="$emit('update:modelValue', emitArgumentValue($event.target.value))"
    />
    <label
      v-if="label"
      :class="{ textarea__label_fly: flyLabel }"
      class="textarea__label"
    >{{ label }}
      <IconRequired
        v-if="required"
        class="textarea__required"
        :class="{
          input__required_disabled: disable,
        }"
      />
    </label>
    <span
      v-if="maxLength"
      class="textarea__count"
    >{{ value ? value.length : '0' }} / {{ maxLength }}</span>
    <ul v-if="errors.length" class="textarea__errors">
      <li v-for="errorName in errors" :key="errorName" class="textarea__error">
        {{ errorName }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UIBaseTextarea',
  props: {
    modelValue: {
      type: undefined,
      required: false,
      default: '',
    },
    label: {
      type: String,
      required: false,
      default: '',
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
    cols: {
      type: Number || String,
      required: false,
      default: 30,
    },
    rows: {
      type: Number || String,
      required: false,
      default: 7,
    },
    maxLength: {
      type: Number || String,
      required: false,
      default: 1500,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    spellcheck: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: ['update:modelValue', 'input'],
  computed: {
    value: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      },
    },
    flyLabel () {
      return this.modelValue
    },
  },
  methods: {
    emitArgumentValue (value) {
      if (!value) {
        return ''
      }
      return value
    },
  },
}
</script>

<style lang="scss" scoped>
.textarea {
  @include text_medium_regular;

  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  &__area {
    @include text_medium_regular;

    position: relative;
    width: 100%;
    min-height: 50px;
    padding: 16px;
    border: 1px solid var(--grayDark);
    border-radius: 4px;

    &_disable {
      color: var(--grayMediumLight);
      border: 1px solid var(--grayMediumLight);

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

    &_with_value {
      text-overflow: ellipsis;
      border: 1px solid var(--grayDolphin);
    }

    &::placeholder {
      @include text_medium_regular;

      color: var(--grayDark);
    }

    &:focus ~ .textarea__label {
      @include text_small_regular;

      top: -9px;
    }

    &:focus ~ .textarea__icon_type_error {
      display: none;
    }

    &:active ~ .textarea__icon_type_error {
      display: none;
    }

    &:focus,
    &:active {
      border: 1px solid var(--royalBlue);
      outline: none;
    }
  }

  &__label {
    @include text_medium_regular;

    position: absolute;
    top: 18px;
    left: 12px;
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

  &__required {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(4px, 5px);

    & :deep(.icon__path) {
      fill: var(--error);
    }
  }

  &__count {
    @include disclaimer;

    display: block;
    align-self: flex-end;
    padding-top: 5px;
    color: var(--grayDark);
  }
}
</style>
