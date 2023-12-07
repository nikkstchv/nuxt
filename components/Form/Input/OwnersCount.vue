<template>
  <UIBaseInput
    v-model.number="modelValue"
    v-maska:[maskOptions]
    :errors="errors"
    :error="errors.length !== 0"
    :label="!placeholder ? 'Кол-во владельцев' : ''"
    :placeholder="placeholder ? 'Кол-во владельцев' : ''"
    :required="required"
    :event-name="eventName"
    type="numeric"
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
  mask: '##',
}
</script>
