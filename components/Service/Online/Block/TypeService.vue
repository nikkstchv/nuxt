<template>
  <section class="service-type-block">
    <p class="service-type-block__title">
      Тип ремонта
    </p>
    <div class="service-type-block__content">
      <UIBaseRadio
        v-for="serviceType in serviceTypes"
        :key="serviceType.name"
        v-model="modelValue"
        :value="serviceType.id"
      >
        {{ serviceType.name }}
      </UIBaseRadio>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const serviceTypes = [
  { name: 'Механический ремонт', id: '' },
  { name: 'Кузовной ремонт', id: '4' },
]
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
.service-type-block {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  &__title {
    @include label;
  }

  &__content {
    display: flex;
    grid-gap: 16px;

    @include mq($bp-super-small) {
      grid-gap: 20px;
    }
  }
}
</style>
