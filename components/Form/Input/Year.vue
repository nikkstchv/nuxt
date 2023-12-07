<template>
  <UIBaseInput
    v-model="modelValue"
    v-maska:[maskOptions]
    :errors="errors"
    :error="errors.length !== 0"
    :label="!placeholder ? 'Год' : ''"
    :placeholder="placeholder ? 'Год' : ''"
    :required="required"
    type="number"
    event-name="input"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
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
  mask: 'DDDD',
  tokens: {
    D: { pattern: /[0-9]/ },
  },
}
</script>
