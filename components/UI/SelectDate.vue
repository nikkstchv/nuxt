<template>
  <div class="input-date">
    <!--    <VueDatePicker-->
    <!--      v-model="modelDate"-->
    <!--      class="input-date__input"-->
    <!--      no-calendar-icon-->
    <!--      placeholder="Дата"-->
    <!--      no-header-->
    <!--      :min-date="minDate"-->
    <!--      :max-date="maxDate"-->
    <!--      :inline="false"-->
    <!--    />-->
    <IconRequired
      v-if="required && !modelDate"
      class="input-date__required"
      :class="{
        input__required_disabled: disable,
      }"
    />
    <IconArrow
      class="input-date__arrow"
      :disable="disable"
      :active="expanded"
    />
  </div>
</template>

<script>
import IconRequired from '@/components/Icon/Required.vue'
import IconArrow from '@/components/Icon/Arrow.vue'

export default {
  name: 'UISelectDate',
  components: {
    IconRequired,
    IconArrow,
  },
  model: {
    prop: 'modelValue',
    event: 'radio',
  },
  props: {
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    modelValue: {
      type: undefined,
      required: true,
      default: '',
    },
    minDate: {
      type: Date,
      required: false,
      default: null,
    },
    maxDate: {
      type: Date,
      required: false,
      default: null,
    },
    errors: {
      type: Array,
      required: false,
      default: () => [],
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    modelDate: {
      get () {
        return this.model
      },
      set (value) {
        this.$emit('onSetSelect', value)
      },
    },
    expanded () {
      return this.isOpenSelect && !this.disable
    },
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.input-date {
  position: relative;

  &__arrow {
    position: absolute;
    top: 14px;
    right: 13px;
    width: 24px;
    height: 24px;
    pointer-events: none;
  }

  &__required {
    position: absolute;
    top: 19px;
    left: 52px;

    & :deep(.icon__path) {
      fill: var(--error);
    }
  }
}
</style>
