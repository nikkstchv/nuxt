<template>
  <section :name="formItemName" class="filter-item">
    <UIBaseAccordion
      ref="accordion"
      class="filter-item__accordion"
      :disable="disable"
      :label="accordion.label"
      is-expand
    >
      <template v-if="isShowTooltip" #icon>
        <UIInfoIconWithPopup class="filter-item__info-icon">
          {{ tooltipText }}
        </UIInfoIconWithPopup>
      </template>
      <FilterItemInput
        v-if="input"
        v-model="search"
        class="filter-item__input"
        :click-clear="unCheckAllCheckboxes"
        :placeholder="stringCheckedCheckboxes"
        :placeholder-black="hasStringCheckedCheckboxes"
      />
      <UICheckboxesAccordion :open="openFullAccordion">
        <template #default>
          <UIBaseCheckbox
            v-for="checkbox in findedCheckbox"
            :key="checkbox.name"
            v-model="modelItem"
            :label="checkbox.name"
            :value="checkbox.code"
            :disable="checkbox.disabled"
            :style="orderStyleCheckbox(checkbox)"
            class="filter-item__checkbox"
          >
            <span
              v-if="!checkbox.disabled"
              class="filter-item__checkbox-label"
            >{{ checkbox.count }}</span>
          </UIBaseCheckbox>
          <p v-if="findedCheckbox.length === 0" class="filter-item_empty">
            Нет результатов
          </p>
        </template>
        <template #button>
          <UIBaseButton
            v-show="findedCheckbox.length > 5"
            underline
            :text="openFullAccordion ? 'Свернуть' : 'Посмотреть все'"
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
import UIInfoIconWithPopup from '@/components/UI/InfoIconWithPopup.vue'
import UICheckboxesAccordion from '@/components/UI/CheckboxesAccordion.vue'
import UIBaseCheckbox from '@/components/UI/Base/Checkbox.vue'
import UIBaseButton from '@/components/UI/Base/Button.vue'

import FilterItemInput from '@/components/Filter/ItemInput.vue'

export default {
  name: 'FilterItem',
  components: {
    UIBaseAccordion,
    UIInfoIconWithPopup,
    UICheckboxesAccordion,
    UIBaseCheckbox,
    UIBaseButton,
    FilterItemInput,
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
      type: [Array, Object],
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
      openFullAccordion: false,
      checkboxesListLocal: this.checkboxesList,
      isMainAccordionOpen: null,
    }
  },
  computed: {
    tooltipText () {
      switch (this.formItemName) {
        case 'vatType':
          return 'Можно вернуть часть денежных средства с уплаты налога при покупке ТС'
        case 'demo':
          return 'ТС из корпоративного парка компании'
        default:
          return ''
      }
    },
    isShowTooltip () {
      return this.formItemName === 'vatType' || this.formItemName === 'demo'
    },
    isSomeChecked () {
      if (this.modelItem) {
        return this.modelItem.length > 0
      }
      return false
    },
    modelItem: {
      get () {
        return this.model
      },
      set (value) {
        this.$emit('setFormData', { formItemName: this.formItemName, value })
      },
    },
    sortedCheckboxes () {
      const filteredCheckboxes = [...this.filteredCheckboxes]
      // return this.filteredCheckboxes
      // // Сортировка по цвету
      if (!filteredCheckboxes && filteredCheckboxes.length === 0) {
        return
      }
      // if (this.colors) {
      //   // Выше выводятся слова записанные в массив (обязательно с маленькой буквы)
      //   const colors = ['черный', 'серый', 'синий']
      //   return filteredCheckboxes.sort((a, b) => {
      //     const fa = a.name.toLowerCase()
      //     const fb = b.name.toLowerCase()
      //     if (this.containsWord(fa, colors)) {
      //       return -1
      //     }
      //     if (fa > fb) {
      //       return 1
      //     }
      //     return 0
      //   })
      // }
      // // Сортировка по алфавиту
      return filteredCheckboxes.sort((a, b) => {
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
    },
    findedCheckbox () {
      if (this.search !== '' && this.sortedCheckboxes) {
        return this.sortedCheckboxes.filter((item) => {
          return item.name.toLowerCase().includes(this.search.toLowerCase())
        })
      }

      return this.sortedCheckboxes
    },
    // функция поиска внутри чекбоксов
    filteredCheckboxes () {
      return this.checkboxesList.filter(item => item.name === 0 || item.name)
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
  },
  methods: {
    onClickAccordion () {
      this.isMainAccordionOpen = this.$refs.accordion.isOpen
      if (!this.isMainAccordionOpen) {
        this.checkboxesListLocal = this.checkboxesList
      }
    },
    orderStyleCheckbox (checkbox) {
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
      this.openFullAccordion = !this.openFullAccordion
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

  &__input {
    margin-bottom: 15px;
  }

  &__checkboxes-accordion-label {
    @include text_small_medium;

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

  &__info-icon {
    display: flex;

   & :deep(.icon) {
      width: 17px;
      height: 17px;
    }

   & :deep(.info__popup) {
      @media (max-width: $bp-small-medium) {
        left: -132px;
      }
    }

   & :deep(.info__popup-icon) {
      @media (max-width: $bp-small-medium) {
        left: 130px;
      }
    }
  }
}
</style>
