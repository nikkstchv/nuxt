<template>
  <section class="inputs-range">
    <UIBaseInput
      v-model.lazy.trim="localMinValue"
      :label="getPlaceholder('min')"
      event-name="input"
      :on-blur="handleBlur"
    />
    <UIBaseInput
      v-model.lazy.trim="localMaxValue"
      :label="getPlaceholder('max')"
      event-name="input"
      :on-blur="handleBlur"
    />
  </section>
</template>

<script>
import UIBaseInput from '@/components/UI/Base/Input.vue'

export default {
  name: 'FilterItemInputsRangePrice',
  components: {
    UIBaseInput,
  },
  props: {
    min: {
      type: [String, Number],
      required: false,
      default: '',
    },
    max: {
      type: [String, Number],
      required: false,
      default: '',
    },
    values: {
      type: Array,
      required: false,
      default: () => [],
    },
    placeholders: {
      type: Array,
      required: true,
    },
    placeholderUnit: {
      type: String,
      required: false,
      default: '',
    },
    formItemName: {
      type: String,
      required: true,
    },
    clear: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      localMinValue: this.values[0],
      localMaxValue: this.values[1],
    }
  },
  watch: {
    localMinValue (value) {
      if (value) {
        this.localMinValue = (+value
          .toString()
          .replace(/\s/g, '')).toLocaleString()
      }
    },

    localMaxValue (value) {
      if (value) {
        this.localMaxValue = (+value
          .toString()
          .replace(/\s/g, '')).toLocaleString()
      }
    },

    clear (isClear) {
      if (isClear) {
        this.$emit('setFormData', {
          formItemName: this.formItemName + 'Min',
          value: '',
        })
        this.$emit('setFormData', {
          formItemName: this.formItemName + 'Max',
          value: '',
        })
      }
    },
  },
  methods: {
    handleBlur () {
      const minValue = +this.min
      const maxValue = +this.max

      let localMinValue = +this.localMinValue.toString().replace(/\s/g, '')
      let localMaxValue = +this.localMaxValue.toString().replace(/\s/g, '')

      if (localMinValue) {
        if (localMinValue < minValue) {
          this.localMinValue = localMinValue = minValue
        } else if (localMinValue > maxValue) {
          this.localMinValue = localMinValue = maxValue
        }
      }

      if (localMaxValue) {
        if (localMaxValue > maxValue) {
          this.localMaxValue = localMaxValue = maxValue
        } else if (localMinValue < minValue) {
          this.localMaxValue = localMaxValue = minValue
        }
      }

      if (localMinValue > localMaxValue) {
        this.localMaxValue = localMaxValue = maxValue
      }

      this.$emit('setFormData', {
        formItemName: this.formItemName + 'Min',
        value: localMinValue,
      })
      this.$emit('setFormData', {
        formItemName: this.formItemName + 'Max',
        value: localMaxValue,
      })
    },
    getPlaceholder (name) {
      return `${this.placeholders[name === 'min' ? 0 : 1]} ${this.$toLocalPrice(
        this[name] * 100,
      )} ${this.placeholderUnit}`
    },
  },
}
</script>

<style lang="scss">
.inputs-range {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: column;
  grid-gap: 10px;
  align-items: center;
  margin-bottom: 15px;
}
</style>
