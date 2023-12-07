<template>
  <UIBaseInput
    v-model="modelValue"
    v-maska:[maskOptions]
    :errors="errors"
    :error="errors.length !== 0"
    :label="!placeholder ? label : ''"
    :placeholder="placeholder ? label : ''"
    :required="required"
    event-name="input"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: '',
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
  label: {
    type: String,
    required: false,
    default: 'Гос. номер',
  },
  placeholder: {
    type: Boolean,
    required: false,
    default: false,
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
  mask: 'L DDD LL DDD',
  tokens: {
    L: { pattern: /[АВЕКМНОРСТУХABEKMHOPCTYXавекмнорстухabekmhopctyx]/, transform: chr => chr.toUpperCase() },
    D: { pattern: /[0-9]/ },
  },
}
</script>
