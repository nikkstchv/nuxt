<template>
  <client-only>
    <Datepicker
      :key="allowedDates.length"
      v-model="modelDate"
      class="datePicker"
      inline
      auto-apply
      no-swipe
      :min-date="minDate"
      :max-date="maxDate"
      :allowed-dates="allowedDates"
      :enable-time-picker="false"
      hide-offset-dates
      :month-change-on-scroll="false"
      locale="ru-RU"
      month-name-format="long"
      prevent-min-max-navigation
    />
  </client-only>
</template>

<script setup>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  dates: {
    type: Array,
    required: true,
    default: () => [],
  },
  modelValue: {
    type: String,
    required: true,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue'])
const allowedDates = ref([])
const modelDate = computed({
  get () {
    return props.modelValue
  },
  set (modelDate) {
    const updateValue = new Date(modelDate).toISOString().split('T')[0]
    emit('update:modelValue', updateValue)
  },
})
const currentDate = new Date()

watch(() => props.dates, (dates) => {
  allowedDates.value = dates.map(item => new Date(item.date.substring(0, 10)))
}, { immediate: true })

const minDate = (() => {
  if (currentDate) {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    )
  }
  return ''
})()
const maxDate = (() => {
  if (currentDate) {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
    )
  }
  return ''
})()
</script>
<style lang="scss" scoped>
.datePicker {
  & :deep(.dp__theme_light) {
    --dp-font-family: 'Inter', sans-serif;
    --dp-text-color: var(--black);
    --dp-hover-text-color: var(--blackLight);
    --dp-primary-color: var(--blackLight);
    --dp-secondary-color: rgb(93 106 137 / 20%);
    --dp-success-color: var(--valid);
    --dp-danger-color: var(--error);
    --dp-menu-border-color: #fff;
    --dp-border-color: #fff;
    --dp-font-size: 14px;
    --dp-cell-size: 36px;
    --dp-row-maring: 5px 0;
    --dp-menu-min-width: 307px;
    --dp-menu-padding: 0;
  }

  & :deep(.dp__today) {
    color: var(--orange);
    border: 0;
  }

  & :deep(.dp__month_year_row) {
    grid-gap: 10px;
  }

  & :deep(.dp__month_year_select) {
    @include label;

    width: 30%;
  }

  & :deep(.dp__month_year_wrap) {
    pointer-events: none;
  }

  & :deep(.dp__month_year_col_nav) {
    order: 2
  }

  & :deep(.dp__inner_nav_disabled) {
    color: var(--grayMediumLight);
    background: transparent;
  }

}
</style>
