<template>
  <div class="filter-item">
    <UIBaseAccordion
      :disable="disable"
      :label-value="labelValue"
      :label="accordion.label"
      :is-expand="isExpand"
      :form-item-name="formItemName"
      @handleExpand="handleExpand"
    >
      <FilterItemInput
        v-if="input"
        ref="input"
        v-model="search"
        class="filter-item__input"
        :placeholder="input.label"
        :placeholder-black="hasStringChecked"
      />
      <UICheckboxesAccordion :open="openAccordion">
        <template #default>
          <UIBaseRadio
            v-for="radio in findedRadio"
            :id="radio.id"
            :key="radio.id || radio.name"
            v-model="modelItem"
            :label="radio.name"
            :value="radio.id || radio.name"
            :disable="radio.disabled"
            class="filter-item__checkbox"
          />
          <p v-if="findedRadio.length === 0" class="filter-item_empty">
            Нет результатов
          </p>
        </template>
        <template #button>
          <UIBaseButton
            v-show="findedRadio.length > 5"
            underline
            :text="openAccordion ? 'Свернуть' : 'Посмотреть все'"
            class="filter-item__button"
            @click="toggleAccordion"
          />
        </template>
      </UICheckboxesAccordion>
    </UIBaseAccordion>
  </div>
</template>

<script>
import UIBaseAccordion from '@/components/UI/Base/Accordion.vue'
import UICheckboxesAccordion from '@/components/UI/CheckboxesAccordion.vue'
import UIBaseRadio from '@/components/UI/Base/Radio.vue'

import FilterItemInput from '@/components/Filter/ItemInput.vue'

export default {
  name: 'FilterItem',
  components: {
    UIBaseAccordion,
    UICheckboxesAccordion,
    UIBaseRadio,
    FilterItemInput,
  },
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
    isExpand: {
      type: null,
      required: true,
    },
    handleExpand: {
      type: Function,
      required: true,
    },
    accordion: {
      type: Object,
      required: true,
      validator (object) {
        return typeof object.label === 'string'
      },
    },
    input: {
      type: Object,
      required: false,
      default: null,
      validator (object) {
        return typeof object.label === 'string'
      },
    },
    model: {
      type: undefined,
      required: true,
    },
    formItemName: {
      type: String,
      required: true,
    },
    checkboxesList: {
      type: Array,
      required: true,
    },
    colors: {
      type: Boolean,
      required: false,
      default: false,
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    isClearAll: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      search: '',
      openSearchList: false,
      openAccordion: false,
    }
  },
  computed: {
    labelValue () {
      if (this.checkboxesList && this.model) {
        const findedSelectCheckbox = this.checkboxesList.find(
          item => parseInt(item.id) === parseInt(this.model),
        )
        return findedSelectCheckbox?.name ?? this.model
      }

      return ''
    },
    modelItem: {
      get () {
        return this.model
      },
      set (value) {
        this.$emit('update:model', value)
      },
    },
    sortedRadio () {
      if (!this.filteredRadio) {
        return
      }

      return [...this.filteredRadio].sort((a, b) => {
        return a - b
      })
    },
    // функция поиска
    findedRadio () {
      if (this.search !== '' && this.sortedRadio) {
        return this.sortedRadio.filter((item) => {
          return item.name.toLowerCase().includes(this.search.toLowerCase())
        })
      }
      return this.sortedRadio
    },
    filteredRadio () {
      if (this.checkboxesList) {
        // фильтрация пустых и повторяющихся значений
        return [
          ...new Set(
            this.checkboxesList.filter(item => item.name).map(JSON.stringify),
          ),
        ].map(JSON.parse)
      }
      return null
    },
    hasStringChecked () {
      if (this.model) {
        return this.model.length !== 0
      }
      return null
    },
    // приведение к строке массива для отображения в плейсхолдере
    showSearch () {
      return this.search.length !== 0 && this.openSearchList
    },
  },
  watch: {
    isClearAll () {
      this.clearSearch()
    },
  },
  methods: {
    containsWord (target, pattern) {
      let value = 0
      pattern.forEach(function (word) {
        value = value + target.includes(word)
      })
      return value === 1
    },

    clearSearch () {
      this.search = ''
    },
    toggleAccordion () {
      this.openAccordion = !this.openAccordion
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-item {
  position: relative;

  &_empty {
    @include text_medium_regular;

    color: var(--grayDark);
  }

  &__button {
    padding-top: 15px;
    color: var(--neonBlue);
    border-bottom: 1px solid var(--neonBlue);

    &:hover {
      color: var(--neonBlue);
    }
  }

  &__input {
    margin-bottom: 15px;
  }

  &__checkboxes-accordion-label {
    @include text_small_medium;

    color: var(--grayDark);
  }
}
</style>
