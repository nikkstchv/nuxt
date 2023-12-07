<template>
  <UIBaseInput
    v-model.trim="modelValue"
    :errors="errors"
    :error="errors.length !== 0"
    :label="!placeholder ? 'E-mail' : ''"
    :placeholder="placeholder ? 'E-mail' : ''"
    autocomplete="email"
    type="email"
    :required="required"
    :max-length="254"
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
</script>
