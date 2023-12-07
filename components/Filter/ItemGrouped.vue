<template>
  <section class="filter-item" :name="formItemName">
    <UIBaseAccordion
      ref="accordion"
      class="filter-item__accordion"
      :disable="disable"
      :label="accordion.label"
      is-expand
    >
      <UICheckboxesAccordion :open="openAccordion">
        <template #default>
          <div
            v-for="(mark, name) in sortedCheckboxes"
            :key="name"
            class="filter-item__checkbox-container"
            :style="{
              order: someActiveCheckboxInArray(mark) ? '-1' : mark.order,
            }"
          >
            <span
              v-if="!isOnlyOne"
              class="filter-item__checkboxes-accordion-label"
            >{{ getUpperName(name) }}</span>
            <div v-if="!mark.childrens" class="filter-item__checkbox-container">
              <UIBaseCheckbox
                v-for="(checkbox, index) in mark.items"
                :key="index"
                v-model="modelItem"
                :label="checkbox.name"
                :value="checkbox.code"
                :disable="checkbox.disabled"
                class="filter-item__checkbox"
                :style="orderStyleCheckbox(checkbox)"
              >
                <span
                  v-if="!checkbox.disabled"
                  class="filter-item__checkbox-label"
                >{{ checkbox.count }}</span>
              </UIBaseCheckbox>
            </div>
            <div v-if="mark.childrens" class="filter-item__checkbox-container">
              <div
                v-for="(modelCar, modelName) in mark.childrens"
                :key="modelName"
                class="filter-item__checkbox-container"
              >
                <span
                  v-if="!isOnlyOne"
                  class="filter-item__checkboxes-accordion-label"
                >{{ modelName }}</span>
                <div
                  v-if="!modelCar.childrens"
                  class="filter-item__checkbox-container"
                >
                  <UIBaseCheckbox
                    v-for="(checkbox, index) in modelCar.items"
                    :key="index"
                    v-model="modelItem"
                    :label="checkbox.name"
                    :value="checkbox.code"
                    :disable="checkbox.disabled"
                    class="filter-item__checkbox"
                    :style="orderStyleCheckbox(checkbox)"
                  >
                    <span
                      v-if="!checkbox.disabled"
                      class="filter-item__checkbox-label"
                    >{{ checkbox.count }}</span>
                  </UIBaseCheckbox>
                </div>
                <div v-if="modelCar.childrens">
                  <div
                    v-for="(generation, generationName) in modelCar.childrens"
                    :key="generationName"
                    class="filter-item__checkbox-container"
                  >
                    <span
                      v-if="!isOnlyOne"
                      class="filter-item__checkboxes-accordion-label"
                    >{{ generationName }}</span>
                    <div
                      v-if="!generation.childrens"
                      class="filter-item__checkbox-container"
                    >
                      <UIBaseCheckbox
                        v-for="(checkbox, index) in generation.items"
                        :key="index"
                        v-model="modelItem"
                        :label="checkbox.name"
                        :value="checkbox.code"
                        :disable="checkbox.disabled"
                        class="filter-item__checkbox"
                        :style="orderStyleCheckbox(checkbox)"
                      >
                        <span
                          v-if="!checkbox.disabled"
                          class="filter-item__checkbox-label"
                        >{{ checkbox.count }}</span>
                      </UIBaseCheckbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #button>
          <UIBaseButton
            v-show="isShowButton"
            underline
            :text="openAccordion ? 'Свернуть' : 'Посмотреть все'"
            class="filter-item__button"
            @click="toggleAccordion"
          />
        </template>
      </UICheckboxesAccordion>
    </UIBaseAccordion>
  </section>
</template>

<script>
import UIBaseAccordion from '@/components/UI/Base/Accordion.vue'
import UICheckboxesAccordion from '@/components/UI/CheckboxesAccordion.vue'
import UIBaseCheckbox from '@/components/UI/Base/Checkbox.vue'
import UIBaseButton from '@/components/UI/Base/Button.vue'

export default {
  name: 'FilterItemGrouped',
  components: {
    UIBaseAccordion,
    UICheckboxesAccordion,
    UIBaseCheckbox,
    UIBaseButton,
  },
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
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
  },
  data () {
    return {
      search: '',
      openSearchList: false,
      openAccordion: false,
      modifications: null,
      checkboxesListLocal: this.checkboxesList,
      isMainAccordionOpen: null,
    }
  },
  computed: {
    modelItem: {
      get () {
        return this.model
      },
      set (value) {
        this.$emit('setFormData', { formItemName: this.formItemName, value })
      },
    },
    isSomeChecked () {
      if (this.modelItem) {
        return this.modelItem.length > 0
      }
      return false
    },
    isOnlyOne () {
      return Object.keys(this.sortedCheckboxes).length === 1
    },
    orderStyleCheckbox () {
      return (checkbox) => {
        const foundCheckbox = this.checkboxesListLocal.find(
          item => item.name === checkbox.name,
        )
        let order
        if (foundCheckbox?.checked) {
          order = '-1'
        } else if (checkbox.disabled) {
          order = '1'
        } else {
          order = '0'
        }

        return { order }
      }
    },
    sortedCheckboxes () {
      const filteredCheckboxes = [...this.filteredCheckboxes]
      if (!filteredCheckboxes && filteredCheckboxes.length === 0) {
        return
      }
      const groupedCheckboxes = {}
      filteredCheckboxes.forEach((item) => {
        if (item.mark) {
          if (!groupedCheckboxes[item.mark]) {
            groupedCheckboxes[item.mark] = {}
            groupedCheckboxes[item.mark].items = []
          }
          groupedCheckboxes[item.mark].items.push(item)
        }
        if (item.model) {
          if (!groupedCheckboxes[item.mark].childrens) {
            groupedCheckboxes[item.mark].childrens = {}
          }
          if (!groupedCheckboxes[item.mark].childrens[item.model]) {
            groupedCheckboxes[item.mark].childrens[item.model] = {}
            groupedCheckboxes[item.mark].childrens[item.model].items = []
          }
          groupedCheckboxes[item.mark].childrens[item.model].items.push(item)
        }
        if (item.generation) {
          if (!groupedCheckboxes[item.mark].childrens[item.model].childrens) {
            groupedCheckboxes[item.mark].childrens[item.model].childrens = {}
          }
          if (
            !groupedCheckboxes[item.mark].childrens[item.model].childrens[
              item.generation
            ]
          ) {
            groupedCheckboxes[item.mark].childrens[item.model].childrens[
              item.generation
            ] = {}
            groupedCheckboxes[item.mark].childrens[item.model].childrens[
              item.generation
            ].items = []
          }
          groupedCheckboxes[item.mark].childrens[item.model].childrens[
            item.generation
          ].items.push(item)
        }
      })
      const orderedGroupedCheckboxes = {}
      Object.keys(groupedCheckboxes)
        .sort()
        .forEach((key, index) => {
          groupedCheckboxes[key].items.sort((a, b) => {
            if (a.name && b.name) {
              const fa = a.name
              const fb = b.name
              if (fa < fb) {
                return -1
              }
              if (fa > fb) {
                return 1
              }
            }
            return 0
          })
          orderedGroupedCheckboxes[key] = groupedCheckboxes[key]
          orderedGroupedCheckboxes[key].order = index
        })
      return orderedGroupedCheckboxes
    },
    findedCheckboxes () {
      return (checkboxes) => {
        if (this.modifications === null) {
          this.modifications = { ...checkboxes }
        }
        if (this.search !== '') {
          const findedCheckboxes = { ...this.modifications }
          for (const name in findedCheckboxes) {
            findedCheckboxes[name].items = findedCheckboxes[name].items.filter(
              (item) => {
                return item.name
                  .toLowerCase()
                  .includes(this.search.toLowerCase())
              },
            )
          }
          return findedCheckboxes
        }
        return checkboxes
      }
    },
    // функция поиска внутри чекбоксов
    filteredCheckboxes () {
      return this.checkboxesList.filter(
        item => item.name, /* && !item.disabled */
      )
    },
    hasStringCheckedCheckboxes () {
      return this.model.length !== 0
    },
    // приведение к строке массива чекбоксов для отображения в плейсхолдере
    stringCheckedCheckboxes () {
      if (this.model.length === 0) {
        return 'Введите модификацию'
      }
      let countSymbols = 0
      let indexLastShowed
      const maxSymbols = 18
      const namesCheckedCheckboxes = this.model.map((el, i) => {
        if (countSymbols < maxSymbols) {
          countSymbols += el.toString().length
          indexLastShowed = i + 1
        }
        return el
      })
      const slicedCheckedCheckboxes = namesCheckedCheckboxes.slice(
        0,
        indexLastShowed,
      )
      const restCheckedCheckboxes = namesCheckedCheckboxes.slice(
        indexLastShowed,
        namesCheckedCheckboxes.length,
      )
      const restLength = restCheckedCheckboxes.length
      const stringCheckedCheckboxes = slicedCheckedCheckboxes.join(', ')
      if (restLength > 0) {
        return `${stringCheckedCheckboxes}, +${restLength}`
      }
      return stringCheckedCheckboxes
    },
    showSearch () {
      return this.search.length !== 0 && this.openSearchList
    },
    isShowButton () {
      return this.filteredCheckboxes.length > 5
    },
  },
  mounted () {
    this.init = true
  },
  methods: {
    getUpperName (str) {
      if (!str) { return str }

      return str[0].toUpperCase() + str.slice(1)
    },
    onClickAccordion () {
      this.isMainAccordionOpen = this.$refs.accordion.isOpen
      if (!this.isMainAccordionOpen) {
        this.checkboxesListLocal = this.checkboxesList
      }
    },
    containsWord (target, pattern) {
      let value = 0
      pattern.forEach(function (word) {
        value = value + target.includes(word)
      })
      return value === 1
    },
    unCheckAllCheckboxes () {
      this.$emit('clearFormData', { formItemName: this.formItemName })
    },
    clearSearch () {
      this.search = ''
    },
    toggleAccordion () {
      this.openAccordion = !this.openAccordion
    },
    someActiveCheckboxInArray (arr) {
      if (arr.items) {
        return arr.items.some(item => !item.disabled)
      }
      return false
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

  &__checkbox {
    padding-bottom: 15px;

    @media (min-width: $bp-medium-big) {
      padding-bottom: 10px;
    }
  }

  &__input {
    margin-bottom: 15px;
  }

  &__checkbox :deep(.checkbox__label) {
    display: flex;
    grid-gap: 2px;
  }

  &__checkbox-label {
    display: block;
    order: 1;
    font-size: 9px;
    font-weight: 300;
    line-height: 8px;
    color: var(--blackLight);
  }

  &__checkbox-container {
    display: grid;
  }

  &__checkboxes-accordion-label {
    @include text_small_medium;

    display: block;
    order: -100;
    margin-bottom: 10px;
    color: var(--grayDark);
  }

  &__accordion {
   & :deep(.accordion__label) {
      cursor: default;
    }

   & :deep(.accordion__icon) {
      display: none;
    }
  }
}
</style>
