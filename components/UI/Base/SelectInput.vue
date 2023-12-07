<template>
  <div v-click-outside="onCloseSelect" class="select-wrapper">
    <UIBaseInput
      class="select-input"
      :label="flyPlaceholder"
      :placeholder="placeholder"
      :model-value="selectedNames"
      :disable="disable"
      :errors="errors"
      :required="required"
      readonly
      @click="onToggleSelect"
    >
      <IconArrow
        class="select-input__icon-arrow"
        :disable="disable"
        :active="expanded"
      />
    </UIBaseInput>
    <transition name="fade">
      <div
        v-if="expanded"
        ref="select"
        :class="['select', { select_grouped: !isOptionsArray }]"
      >
        <template v-if="isOptionsArray">
          <UIBaseRadio
            v-for="radio in options"
            :id="radio.id"
            :key="radio.id || radio.name"
            v-model="modelRadio"
            class="select-input__radio"
            :label="radio.name"
            :value="radio.id || radio.name"
            :disable="radio.disabled"
          >
            <span v-if="radio.additional" class="select-input__radio-info">
              {{ radio.additional }}
            </span>
          </UIBaseRadio>
        </template>
        <template v-else>
          <div v-for="(item, i) in options" :key="i" class="select-input__box">
            <p v-if="i" class="select-input__title">
              {{ i }}
            </p>
            <UIBaseRadio
              v-for="radio in item"
              :id="radio.id"
              :key="radio.id || radio.name"
              v-model="modelRadio"
              class="select-input__radio select-input__radio_gray"
              :label="radio.name"
              :value="radio.id || radio.name"
              :disable="radio.disabled"
            >
              <span v-if="radio.additional" class="select-input__radio-info">
                {{ radio.additional }}
              </span>
            </UIBaseRadio>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'UIBaseSelectInput',
  // model: {
  //   prop: 'model',
  //   event: 'radio',
  // },
  props: {
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    modelValue: {
      type: String,
      required: true,
      default: '',
    },
    options: {
      type: [Array, Object],
      required: false,
      default: () => [],
    },
    errors: {
      type: Array,
      required: false,
      default: () => [],
    },
    flyPlaceholder: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    isOpenSelect: false,
  }),
  computed: {
    modelRadio: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('onSetSelect', value)
      },
    },
    selectedNames () {
      if (this.isOptionsArray) {
        const hasId = this.options.some(
          ({ id, code }) => id === this.modelRadio || code === this.modelRadio,
        )
        if (hasId) {
          return this.options
            .filter(
              ({ id, code }) =>
                id === this.modelRadio || code === this.modelRadio,
            )
            .map(({ name }) => name)
        }
      }
      return this.modelRadio
    },
    expanded () {
      return this.isOpenSelect && !this.disable
    },
    isOptionsArray () {
      return Array.isArray(this.options)
    },
  },
  watch: {
    modelRadio () {
      this.onCloseSelect()
    },
  },
  methods: {
    onToggleSelect () {
      if (!this.disable) {
        if (!this.isOpenSelect) {
          this.isOpenSelect = true
        } else {
          this.isOpenSelect = false
        }
      }
    },
    onCloseSelect () {
      this.isOpenSelect = false
    },
    handleSelect (selected) {
      const newSelects = this.options.map((select) => {
        return {
          ...select,
          isActive: select.name === selected.name,
        }
      })
      this.$emit('onSetSelect', newSelects)
    },
  },
}
</script>
<style lang="scss" scoped>
.select-wrapper {
  position: relative;
}

.select {
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 2;
  display: grid;
  grid-gap: 10px;
  width: 100%;
  max-height: 200px;
  padding: 15px 16px 20px;
  overflow: auto;
  background-color: white;
  border: 1px solid var(--grayDark);
  border-radius: 4px;
  box-shadow: 0 8px 12px rgb(153 155 168 / 15%);

  &__item {
    @include text_medium_regular;

    color: var(--grayDark);
    text-align: start;
    white-space: nowrap;

    &:hover:not(&_active) {
      color: var(--blackLight);
    }

    &_active {
      @include label_small;

      color: var(--black);
    }
  }

  &_grouped {
    grid-gap: 15px;

    @include mq($bp-small) {
      grid-gap: 20px;
    }
  }
}

.select-input {
  position: initial !important;

  &__icon-arrow {
    position: absolute;
    top: 14px;
    right: 13px;
    width: 24px;
    height: 24px;
    pointer-events: none;
  }

  &__radio {
    :deep(.radio__label) {
      display: flex;
      flex-direction: column;
      grid-gap: 2px;
      align-items: flex-start;
      color: var(--black);
    }

    &-info {
      @include text_small_regular;

      color: var(--blackLight);
    }

    &_gray {
      :deep(.radio__label) {
        color: var(--grayDark);
      }
    }
  }

  &__box {
    display: grid;
    grid-gap: 15px;

    @include mq($bp-small) {
      grid-gap: 10px;
    }
  }

  &__title {
    @include text_medium_small;

    color: var(--blackLight);

    @include mq($bp-small) {
      @include text_big_medium;
    }
  }

  :deep(.input__area) {
    cursor: pointer;
  }
}
</style>
