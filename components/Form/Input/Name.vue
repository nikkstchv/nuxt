<template>
  <UIBaseInput
    v-model.trim="modelValue"
    v-maska:[maskOptions]
    :errors="errors"
    :error="errors.length !== 0"
    :label="!placeholder ? label : ''"
    :placeholder="placeholder ? label : ''"
    :autocomplete="autocomplete"
    :required="required"
    :max-length="254"
    first-symbol-up
    :event-name="eventName"
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
    default: 'input',
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

const autocomplete = (() => {
  switch (props.name) {
    case 'firstname':
      return 'given-name'
    case 'lastname':
      return 'family-name'
    case 'middlename':
      return 'additional-name'
    default:
      return 'given-name'
  }
})()
const label = (() => {
  switch (props.name) {
    case 'firstname':
      return 'Имя'
    case 'lastname':
      return 'Фамилия'
    case 'middlename':
      return 'Отчество'
    default:
      return 'Имя'
  }
})()

const maskOptions = {
  mask: 'L',
  tokens: {
    L: { pattern: /[А-Яа-яA-Za-z]/, multiple: true },
  },
}
</script>
