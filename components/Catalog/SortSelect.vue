<template>
  <div class="select-wrapper">
    <UIBaseSelectButton
      :text="label"
      class="select-button"
      :class="{ 'select-button_disable': disable }"
      @click="onOpenSelect"
    >
      <IconArrow class="select-button__icon-arrow" :active="isOpenSelect" />
    </UIBaseSelectButton>
    <transition v-if="isOpenSelect" name="fade">
      <div
        v-if="isOpenSelect"
        ref="select"
        v-click-outside="onCloseSelect"
        class="select"
        :style="{ minWidth: minWidthSelect + 'px' }"
      >
        <button
          v-for="option in showedOptions"
          :key="option.name"
          class="select__item"
          :class="{ select__item_active: option.isActive }"
          @click="handleSelect(option)"
        >
          <IconSort v-if="isShowToggle(option)" :top="!isAsc(option)" />
          {{ option.name }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CatalogSortSelect',
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
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    isOpenSelect: false,
    minWidthSelect: null,
  }),
  computed: {
    isShowTotalTrip () {
      const condition = this.$route.query?.condition ?? ''
      return condition && condition[0] && condition[0] === 'used'
    },
    showedOptions () {
      if (!this.isShowTotalTrip) {
        return this.options?.filter(option => option.name !== 'По пробегу')
      }
      return this.options
    },
  },
  methods: {
    isAsc ({ query }) {
      return query.includes('asc') ?? false
    },
    isShowToggle ({ isActive, hasToggle }) {
      return isActive && hasToggle
    },
    setMinWidthSelect () {
      this.$nextTick(() => {
        // что бы не скакал контент при жирном начертании
        this.minWidthSelect = this.$refs.select.offsetWidth + 4
      })
    },
    onOpenSelect () {
      if (!this.isOpenSelect) {
        setTimeout(() => {
          this.isOpenSelect = true
          this.setMinWidthSelect()
        }, 0)
      }
    },
    onCloseSelect () {
      this.isOpenSelect = false
    },
    handleSelect (selected) {
      const newSelects = this.options.map((select) => {
        const queryName = select.query.split('-')[0]
        const newActiveSelect = {
          ...select,
          isActive: select.name === selected.name,
        }
        const newActiveSelectAsc = {
          ...newActiveSelect,
          query: `${queryName}-asc`,
        }
        const newActiveSelectDesc = {
          ...newActiveSelect,
          query: `${queryName}-desc`,
        }
        if (select === selected && selected.hasToggle) {
          if (select.query.includes('asc')) {
            return newActiveSelectDesc
          }
          return newActiveSelectAsc
        }
        return newActiveSelectDesc
      })
      this.$emit('onSetSort', newSelects)
      setTimeout(this.onCloseSelect, 500)
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
  display: grid;
  grid-gap: 9px;
  padding: 20px;
  background-color: var(--grayLight);
  border-radius: 20px;

  &__item {
    @include text_medium_regular;

    display: grid;
    grid-auto-flow: column;
    grid-gap: 9px;
    width: fit-content;
    height: fit-content;
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
  &_disable {
    color: var(--grayDolphin);
    pointer-events: none;
    cursor: default;
    background: rgb(13 10 25 / 5%);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: rgb(13 10 25 / 5%);
      }
    }
  }

  &__icon-arrow {
    width: 18px;
    height: 18px;
    margin-left: 10px;
  }
}
</style>
