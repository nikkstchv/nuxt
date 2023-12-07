<template>
  <div class="accordion" :class="{ accordion_disabled: disable, accordion__selected: expanded }">
    <label
      class="accordion__label"
      :class="{
        accordion__label_with_value: labelValue,
        'accordion__label_with_items-array': itemsArray,
        accordion__label_with_icon: $slots.icon,
      }"
      @click="toggleList"
    >
      <span class="accordion__label-key">
        {{ label }}{{ labelValue ? ':' : '' }}

        <span v-if="labelValue" class="accordion__label-value">
          {{ labelValue }}
        </span>
      </span>

      <span v-if="itemsArray" class="accordion__label-value-array">
        {{ values }}
      </span>
      <slot name="icon" />
      <IconArrow
        v-if="!isExpand"
        class="accordion__icon"
        :disable="disable"
        :active="expanded"
      />
    </label>
    <section
      class="accordion__list"
      :class="{ accordion__list_open: expanded }"
    >
      <div v-if="expanded" class="accordion__wrapper-content">
        <slot />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'UIBaseAccordion',
  props: {
    label: {
      type: String,
      required: true,
    },
    itemsArray: {
      type: Array,
      required: false,
      default: null,
    },
    labelValue: {
      type: [String, Number],
      required: false,
      default: '',
    },
    formItemName: {
      type: String,
      required: false,
      default: '',
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    isExpand: {
      type: Boolean,
      required: false,
      default: false,
    },
    initExpand: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      open: false,
    }
  },
  computed: {
    isOpen () {
      return this.isExpand || this.open
    },
    expanded () {
      return this.isOpen && !this.disable
    },
    values () {
      if (this.itemsArray) {
        return this.itemsArray.join(', ')
      }
      return null
    },
  },
  created () {
    this.open = this.initExpand
  },
  methods: {
    toggleList () {
      if (this.isExpand) {
        this.$emit('handleExpand', this.formItemName)
      } else {
        this.open = !this.open
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.accordion {
  width: 100%;
  height: max-content;

  &_disabled {
    & .accordion__label {
      color: var(--grayMediumLight);
      cursor: default;
    }

    & .accordion__label-key {
      color: var(--grayMediumLight);
    }
  }

  &__label {
    @include text_medium_bold;

    display: grid;
    grid-template-columns: auto;
    grid-auto-flow: column;
    justify-content: space-between;
    padding-bottom: 20px;
    cursor: pointer;

    &-key {
      display: flex;
      align-items: center;
      color: var(--blackLight);
    }

    &-value {
      padding: 0 10px;
      color: var(--black);
    }

    &-value-array {
      @include text_medium_regular;

      margin-right: 25px;
      overflow: hidden;
      color: var(--grayDark);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &_with_value {
      color: var(--grayDark);
    }

    &_with_items-array {
      grid-gap: 15px;
    }

    &_with_icon {
      grid-gap: 10px;
      justify-content: flex-start;
    }
  }

  &__list {
    position: relative;
    display: grid;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s linear;

    &_open {
      max-height: fit-content;
      overflow: visible;
    }
  }

  &__icon {
    align-self: center;
    justify-self: flex-end;
    width: 20px;
    height: 18px;
  }

  &__wrapper-content {
    position: inherit;
    display: inherit;
    max-height: inherit;
    padding-bottom: 20px;
    overflow: inherit;
    transition: inherit;
  }
}
</style>
