<template>
  <div class="select-wrapper">
    <UIBaseSelectButton
      :text="dynamicLabel"
      class="select-button"
      :class="{ 'select-button_active': isActiveSelect }"
      @click="onOpenSelect"
    >
      <IconArrow
        :white="isActiveSelect"
        class="select-button__icon-arrow"
        :active="isOpenSelect"
      />
    </UIBaseSelectButton>
    <transition name="fade">
      <div
        v-if="options && hasOptions"
        v-show="isOpenSelect"
        ref="select"
        v-click-outside="onCloseSelect"
        class="select"
        :style="{ minWidth: minWidthSelect + 'px' }"
      >
        <div class="select__container">
          <button
            v-for="option in options"
            :key="option.name"
            class="select__item"
            :class="{ select__item_active: option.isActive }"
            @click="handleSelect(option)"
          >
            {{ option.name }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'UIBaseSelect',
  props: {
    options: {
      type: Array,
      required: false,
      default: () => [],
    },
    label: {
      type: String,
      required: true,
      default: '',
    },
  },
  data: () => ({
    timeToClose: false,
    isOpenSelect: false,
    minWidthSelect: null,
    dynamicLabel: '',
  }),
  computed: {
    hasOptions () {
      return this.options && this.options.length
    },
    isActiveSelect () {
      return !this.labelSelect.includes('Все')
    },
    labelSelect () {
      const active = this.options?.find(option => option.isActive)
      if (active) {
        return active?.name ?? ''
      }
      return this.label
    },
  },
  watch: {
    options: {
      handler (options) {
        if (options?.length) {
          const active = options?.find(option => option.isActive)
          if (active) {
            this.dynamicLabel = active.name
          } else {
            this.dynamicLabel = this.labelSelect
          }
        }
      },
      deep: true,
    },
  },
  created () {
    this.dynamicLabel = this.labelSelect
  },
  methods: {
    setMinWidthSelect () {
      this.$nextTick(() => {
        // что бы не скакал контент при жирном начертании
        this.minWidthSelect = this.$refs.select.offsetWidth + 4
      })
    },
    onOpenSelect () {
      if (!this.isOpenSelect && this.hasOptions) {
        setTimeout(() => {
          this.isOpenSelect = true
          this.setMinWidthSelect()
        }, 0)
      }
    },
    onCloseSelect () {
      if (this.isOpenSelect && this.timeToClose) {
        this.isOpenSelect = false
        this.timeToClose = false
      } else {
        this.timeToClose = true
      }
    },
    handleSelect (selected) {
      const newSelects = this.options.map((select) => {
        if (select.name === selected.name) {
          this.dynamicLabel = select.name
        }
        return {
          ...select,
          isActive: select.name === selected.name,
        }
      })
      this.$emit('onSetSelect', newSelects)
      this.onCloseSelect()
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
  top: 50px;
  left: 0;
  z-index: 2;
  padding: 20px 15px 20px 20px;
  background-color: var(--grayLight);
  border-radius: 20px;

  &__container {
    display: grid;
    grid-gap: 9px;
    max-height: 320px;
    overflow: auto;
  }

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
}

.select-button {
  &__icon-arrow {
    width: 18px;
    height: 18px;
    margin-left: 10px;
  }

  &_active {
    color: white !important;
    background-color: var(--blackLight) !important;
  }

  &_active:hover {
    background-color: var(--blackLight);
  }
}
</style>
