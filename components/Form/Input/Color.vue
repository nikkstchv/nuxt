<template>
  <UIBaseInput
    v-model="modelValue"
    v-maska:[maskOptions]
    :errors="errors"
    :error="errors.length !== 0"
    :label="!placeholder ? 'Цвет' : ''"
    :placeholder="placeholder ? 'Цвет' : ''"
    :required="required"
    :event-name="eventName"
    first-symbol-up
    type="text"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  name: {
    type: String,
    required: false,
    default: 'firstname',
  },
  errors: {
    type: Array,
    required: true,
    default: () => [],
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
  placeholder: {
    type: Boolean,
    required: false,
    default: false,
  },
  eventName: {
    type: String,
    required: false,
    default: 'change',
  },
})
const emit = defineEmits(['update:modelValue'])
const modelValue = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  },
})

const maskOptions = {
  mask: 'L',
  tokens: {
    L: {
      pattern: /[А-Яа-яA-Za-z]/,
      multiple: true,
    },
  },
}
</script>
