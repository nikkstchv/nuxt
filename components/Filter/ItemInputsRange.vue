<template>
  <section class="inputs-range">
    <UIBaseInput
      v-model="localMinValue"
      v-maska:[maskOptions]
      :label="getPlaceholder('min')"
      event-name="input"
      :on-blur="handleBlur"
    />
    <UIBaseInput
      v-model="localMaxValue"
      v-maska:[maskOptions]
      :label="getPlaceholder('max')"
      event-name="input"
      :on-blur="handleBlur"
    />
  </section>
</template>

<script>
export default {
  name: 'FilterItemInputsRange',
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
    isParseStr: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      localMinValue: this.values[0],
      localMaxValue: this.values[1],
      isChange: false,
      maskOptions: {
        mask: 'FD',
        tokens: {
          D: { pattern: /[0-9\s]/, multiple: true },
          F: { pattern: /[1-9]/ },
        },
      },
    }
  },
  watch: {
    localMinValue: {
      handler (value) {
        if (value !== '' && this.isParseStr) {
          this.localMinValue = (+value
            .toString()
            .replace(/\s/g, '')).toLocaleString()
        }
      },
      immediate: true,
    },

    localMaxValue: {
      handler (value) {
        if (value !== '' && this.isParseStr) {
          this.localMaxValue = (+value
            .toString()
            .replace(/\s/g, '')).toLocaleString()
        }
      },
      immediate: true,
    },

    clear (isClear) {
      if (isClear) {
        this.localMinValue = ''
        this.localMaxValue = ''

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
  mounted () {
    this.setDefault()
  },
  methods: {
    setDefault () {
      const localMin = this.values[0]
      const localMax = this.values[1]
      if (Array.isArray(localMin)) {
        this.localMinValue = ''
      }

      if (Array.isArray(localMax)) {
        this.localMaxValue = ''
      }
    },

    handleBlur () {
      const minValue = +this.min
      const maxValue = +this.max

      let localMinValue = +this.localMinValue.toString().replace(/\s/g, '')
      let localMaxValue = +this.localMaxValue.toString().replace(/\s/g, '')

      if (!localMinValue !== '' && !isNaN(minValue)) {
        if (localMinValue < minValue) {
          this.localMinValue = localMinValue = minValue
        } else if (localMinValue > maxValue) {
          this.localMinValue = localMinValue = maxValue
        }
      }

      if (localMaxValue && !isNaN(maxValue)) {
        if (localMaxValue > maxValue) {
          this.localMaxValue = localMaxValue = maxValue
        } else if (localMaxValue < minValue) {
          this.localMaxValue = localMaxValue = minValue
        }
      }

      if (localMinValue > localMaxValue && !isNaN(maxValue)) {
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
      let holder = this.placeholders[name === 'min' ? 0 : 1]

      if (this.placeholderUnit === '₽') {
        holder += ` ${this.$toLocalPrice(this[name] * 100)}`
      } else if (this.isParseStr) {
        holder += ` ${(+this[name]).toLocaleString()}`
      } else {
        holder += ` ${this[name]}`
      }

      holder += ` ${this.placeholderUnit}`

      return holder
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
