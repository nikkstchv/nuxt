<template>
  <UIBaseInput
    v-model="modelValue"
    class="input-robot"
    placeholder="robot"
    event-name="input"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
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

<style lang="scss" scoped>
.input-robot {
  position: absolute !important;
  bottom: 0;
  left: 0;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
}
</style>
