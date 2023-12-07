<template>
  <div class="select">
    <p v-if="title" class="select__title">
      {{ title }}
    </p>
    <UIBaseInput
      v-if="hasSearch"
      v-model="search"
      class="select__input"
      :label="flyPlaceholder"
      :placeholder="placeholder"
      :disable="disable"
      :errors="errors"
      :required="required"
      event-name="input"
      is-search
    />
    <div ref="list" class="select__list">
      <UIBaseRadioImage
        v-for="item in filteredOptions"
        :ref="item.value"
        :key="item.value"
        v-model="modelRadio"
        class="select__radio"
        :value="item.value"
        :image-src="item.logo"
        :label="item.label"
        :no-logo="isNoLogo"
        lazy-load
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  disable: {
    type: Boolean,
    required: false,
    default: false,
  },
  modelValue: {
    type: [String, Number],
    required: true,
    default: '',
  },
  options: {
    type: Array,
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
  title: {
    type: String,
    required: false,
    default: '',
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
  hasSearch: {
    type: Boolean,
    required: false,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])
const search = ref('')
const list = ref(null)
const isNoLogo = props.options.every(option => !option.logo)
const modelRadio = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})
const filteredOptions = computed(() => {
  if (search.value) {
    return props.options.filter(option => option.label.toLowerCase().includes(search.value.toLowerCase()))
  }
  return props.options
})

const scrollIntoViewCheckedCheckbox = () => {
  list.value.querySelector('.radio-image_checked')?.scrollIntoView()
}

onMounted(scrollIntoViewCheckedCheckbox)
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;

  &__title {
    @include text_big_medium;

    color: var(--grayDolphin);
  }

  &__list {
    display: grid;
    max-height: 308px;
    overflow: auto;

    @include mq($bp-small-medium) {
      max-height: 385px;
    }
  }

  &__radio {
    height: 56px;
    padding: 0 8px;

    @include mq($bp-small-medium) {
      height: 70px;
      padding: 0 12px;
    }
  }
}

</style>
