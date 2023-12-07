<template>
  <div class="testdrive-online-values">
    <div class="testdrive-online-values__box">
      <div
        v-if="!currentMark"
        :class="[
          'testdrive-online-values__value',
          { 'testdrive-online-values__value_active': !!markId },
          { 'testdrive-online-values__value_error': valuesArrayErrors.markId },
        ]"
      >
        {{ getMarkName }}
      </div>
      <div
        :class="[
          'testdrive-online-values__value',
          { 'testdrive-online-values__value_active': !!modelId},
          { 'testdrive-online-values__value_error': valuesArrayErrors.modelId },
        ]"
        @click="!!modelId ? resetValue('modelModel') : ''"
      >
        {{ getModelName }}

        <IconClose v-if="!!modelId" class="testdrive-online-values__clear" />
      </div>
      <div
        :class="[
          'testdrive-online-values__value',
          { 'testdrive-online-values__value_active': !!date },
          { 'testdrive-online-values__value_error': valuesArrayErrors.date },
        ]"
        @click="!!date ? resetValue('modelDate') : ''"
      >
        {{ getDate }}

        <IconClose v-if="!!date" class="testdrive-online-values__clear" />
      </div>
      <div
        :class="[
          'testdrive-online-values__value',
          { 'testdrive-online-values__value_active': !!dealerId },
          { 'testdrive-online-values__value_error': valuesArrayErrors.dealerId },
        ]"
        @click="!!dealerId ? resetValue('modelDealer') : ''"
      >
        {{ getDealerName }}

        <IconClose v-if="!!dealerId" class="testdrive-online-values__clear" />
      </div>
      <div
        :class="[
          'testdrive-online-values__value',
          { 'testdrive-online-values__value_active': !!time },
          { 'testdrive-online-values__value_error': valuesArrayErrors.time },
        ]"
        @click="!!time ? resetValue('modelTime') : ''"
      >
        {{ time || 'Время' }}

        <IconClose v-if="!!time" class="testdrive-online-values__clear" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServicesTestDriveBlocksValues',
  props: {
    currentMark: {
      type: String,
      default: null,
    },
    marks: {
      type: Array,
      default: () => [],
    },
    models: {
      type: Array,
      default: () => [],
    },
    markId: {
      type: [Number, String],
      default: '',
    },
    modelId: {
      type: [Number, String],
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      default: '',
    },
    dealerId: {
      type: [Number, String],
      default: '',
    },
    dealers: {
      type: Array,
      default: () => [],
    },
    valuesErrors: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      months: [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
      ],
    }
  },
  computed: {
    getMarkName () {
      return (
        this.marks?.find(item => +item.markId === +this.markId)?.nameEn ?? 'Марка'
      )
    },
    getModelName () {
      return (
        this.models?.find(item => +item.vehicleId === +this.modelId)?.nameEn ?? 'Модель'
      )
    },

    getDate () {
      if (this.date) {
        const date = new Date(this.date)
        return date.getDate() + ' ' + this.months[date.getMonth()]
      }

      return 'Дата'
    },

    getDealerName () {
      return (
        this.dealers?.find(item => item.code === this.dealerId)?.name ??
        'Дилерский центр'
      )
    },

    valuesArrayErrors () {
      if (this.valuesErrors) {
        return {
          markId: !this.markId,
          modelId: !this.modelId,
          date: !this.date,
          time: !this.time,
          dealerId: !this.dealerId,
        }
      }
      return {}
    },
  },
  methods: {
    resetValue (name) {
      this.$emit('resetValue', name)
    },
  },
}
</script>

<style lang="scss" scoped>
.testdrive-online-values {
  margin-bottom: 40px;

  &__box {
    display: flex;
    flex-wrap: wrap;
    margin: -5px;
  }

  &__value {
    @include text_medium_small;

    display: flex;
    align-items: center;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    background: var(--grayLight);
    border-radius: 4px;

    &_active {
      color: #fff;
      background: var(--blackLight);
    }

    &_error {
      color: var(--error);
      border: 1px solid var(--error);
    }
  }

  &__clear {
    width: 18px;
    height: 18px;
    padding: 3px;
    margin-left: 10px;
    background: #fff;
    border-radius: 50%;

    :deep(.icon__path) {
      stroke-width: 4px;
    }
  }
}
</style>
