<template>
  <UIBaseInput
    v-model="modelValue"
    v-maska:[maskOptions]
    :errors="errors"
    :error="errors.length !== 0"
    :label="!placeholder ? 'Телефон' : ''"
    :placeholder="placeholder ? 'Телефон' : ''"
    type="tel"
    autocomplete="tel"
    :required="required"
    :on-focus="focusPhone"
    :event-name="eventName"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
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
    default: 'input',
  },
})
const emit = defineEmits(['update:modelValue', 'focusPhone'])
const modelValue = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  },
})

const focusPhone = () => {
  if (!modelValue.value) {
    modelValue.value = '+7 '
  }
}

const maskOptions = {
  mask: '+7 ###-###-##-##',
}
</script>
