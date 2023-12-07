<template>
  <div class="service-online-values">
    <div class="service-online-values__box">
      <div
        v-if="!currentMark"
        :class="[
          'service-online-values__value',
          { 'service-online-values__value_active': !!markId },
          { 'service-online-values__value_error': valuesArrayErrors.markId },
        ]"
      >
        {{ getMarkName }}
      </div>
      <div
        :class="[
          'service-online-values__value',
          { 'service-online-values__value_active': !!date },
          { 'service-online-values__value_error': valuesArrayErrors.date },
        ]"
        @click="!!date ? resetValue('modelDate') : ''"
      >
        {{ getDate }}

        <IconClose v-if="!!date" class="service-online-values__clear" />
      </div>
      <div
        :class="[
          'service-online-values__value',
          { 'service-online-values__value_active': !!dealerId },
          { 'service-online-values__value_error': valuesArrayErrors.dealerId },
        ]"
        @click="!!dealerId && !isOneQueryDc ? resetValue('modelDealer') : ''"
      >
        {{ getDealerName }}

        <IconClose v-if="!!dealerId && !isOneQueryDc" class="service-online-values__clear" />
      </div>
      <div
        :class="[
          'service-online-values__value',
          { 'service-online-values__value_active': !!time },
          { 'service-online-values__value_error': valuesArrayErrors.time },
        ]"
        @click="!!time ? resetValue('modelTime') : ''"
      >
        {{ time || 'Время' }}

        <IconClose v-if="!!time" class="service-online-values__clear" />
      </div>
      <div
        v-if="consultants && consultants.length"
        :class="[
          'service-online-values__value',
          { 'service-online-values__value_active': !!consultantId },
        ]"
        @click="!!consultantId ? resetValue('modelConsultant') : ''"
      >
        {{ getConsultantName }}

        <IconClose v-if="!!consultantId" class="service-online-values__clear" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceOnlineBlocksValues',
  props: {
    currentMark: {
      type: String,
      default: null,
    },
    marks: {
      type: Array,
      default: () => [],
    },
    markId: {
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
    allDealers: {
      type: Array,
      default: () => [],
    },
    consultantId: {
      type: [Number, String],
      default: '',
    },
    consultants: {
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
    isOneQueryDc () {
      return this.$route.query.dc?.split(',')?.length === 1
    },
    getMarkName () {
      return (
        this.marks?.find(item => +item.id === +this.markId)?.name ?? 'Марка'
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
      return this.allDealers?.find(item => item.id === this.dealerId)?.nameRu ?? 'Дилерский центр'
    },
    getConsultantName () {
      return (
        this.consultants?.find(item => +item.adviserId === +this.consultantId)
          ?.adviserFullName ?? 'Консультант'
      )
    },
    valuesArrayErrors () {
      if (this.valuesErrors) {
        return {
          markId: !this.markId,
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
.service-online-values {
  margin-bottom: 30px;

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
