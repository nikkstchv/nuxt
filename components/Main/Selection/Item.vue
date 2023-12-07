<template>
  <div v-click-outside="onCloseList" class="filter-item">
    <FilterItemInput
      ref="input"
      v-model="search"
      :model-item="modelItem"
      :is-open-list="isOpenList"
      class="filter-item__input"
      :placeholder-label="placeholder"
      :placeholder="stringCheckedCheckboxes"
      :placeholder-black="hasStringCheckedCheckboxes"
      :ellipsis="true"
      :disable="disable"
      readonly
      hide-clear
      @setFocused="setFocused"
      @onCloseOptions="onCloseOptions"
    />
    <div v-if="isOpenList" class="filter-item__select-container-wrapper">
      <div class="filter-item__select-container">
        <template v-if="!Array.isArray(foundCheckboxes) && !search">
          <div
            v-for="(mark, name) in foundCheckboxes"
            :key="name"
            class="filter-item__checkboxes-container"
          >
            <span v-if="!isOnlyOne" class="filter-item__checkboxes-label">{{
              name
            }}</span>
            <div
              v-if="!mark.childrens"
              class="filter-item__checkboxes-container"
            >
              <UIBaseCheckbox
                v-for="(checkbox, index) in mark.items"
                :key="index"
                v-model="modelItem"
                :label="checkbox.name"
                :value="checkbox.code"
                :disable="checkbox.disabled"
                class="filter-item__checkbox"
              >
                <span class="filter-item__checkbox-label">{{
                  checkbox.count
                }}</span>
              </UIBaseCheckbox>
            </div>
            <div
              v-if="mark.childrens"
              class="filter-item__checkboxes-container"
            >
              <div
                v-for="(modelCar, modelName) in mark.childrens"
                :key="modelName"
                class="filter-item__checkboxes-container"
              >
                <span v-if="!isOnlyOne" class="filter-item__checkboxes-label">{{
                  modelName
                }}</span>
                <div
                  v-if="!modelCar.childrens"
                  class="filter-item__checkboxes-container"
                >
                  <UIBaseCheckbox
                    v-for="(checkbox, index) in modelCar.items"
                    :key="index"
                    v-model="modelItem"
                    :label="checkbox.name"
                    :value="checkbox.code"
                    :disable="checkbox.disabled"
                    class="filter-item__checkbox"
                  >
                    <span class="filter-item__checkbox-label">{{
                      checkbox.count
                    }}</span>
                  </UIBaseCheckbox>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <UIBaseCheckbox
            v-for="checkbox in foundCheckboxes"
            :key="checkbox.name"
            v-model="modelItem"
            :label="checkbox.name"
            :value="checkbox.code"
            :disable="checkbox.disabled"
            class="filter-item__checkbox"
          >
            <span class="filter-item__checkbox-label">{{
              checkbox.count
            }}</span>
          </UIBaseCheckbox>
          <p v-if="foundCheckboxes.length === 0" class="filter-item_empty">
            Нет результатов
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainSelectionItem',
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
    placeholder: {
      type: String,
      required: true,
      default: '',
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
      isOpenList: false,
      focusInput: false,
      timeToClose: false,
    }
  },
  computed: {
    sortedCheckboxes () {
      if (this.filteredCheckboxes) {
        const filteredCheckboxes = [...this.filteredCheckboxes]
        if (!filteredCheckboxes && filteredCheckboxes.length === 0) {
          return
        }
        if (!filteredCheckboxes[0]?.mark) {
          return filteredCheckboxes
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
      }
      return null
    },
    isOnlyOne () {
      return Object.keys(this.sortedCheckboxes).length === 1
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
    foundCheckboxes () {
      if (this.search && this.sortedCheckboxes) {
        const search = (item) => {
          return item.name.toLowerCase().includes(this.search.toLowerCase())
        }
        if (!Array.isArray(this.sortedCheckboxes)) {
          return this.filteredCheckboxes.filter(search)
        }
        return this.sortedCheckboxes.filter(search)
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
      let countSymbols = 0
      let indexLastShowed
      const maxSymbols = 18
      const namesCheckedCheckboxes = this.model.map((code, i) => {
        const findCheckbox = this.checkboxesList.find(
          item => item.code === code,
        )
        const name = findCheckbox?.name ?? ''
        if (countSymbols < maxSymbols) {
          countSymbols += name.toString().length
          indexLastShowed = i + 1
        }
        return name
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
  },
  watch: {
    focusInput (value) {
      if (value) {
        this.isOpenList = value
      }
    },
    isOpenList (value) {
      this.focusInput = value
    },
  },
  methods: {
    onCloseList () {
      this.isOpenList = false
    },
    setFocused (value) {
      this.focusInput = value
    },
    onCloseOptions (value) {
      this.isOpenList = value
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
    margin-bottom: 10px;
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

  &__select-container {
    display: flex;
    flex-direction: column;
    grid-gap: 12px;
    min-width: 180px;
    max-height: 278px;
    padding-right: 5px;
    overflow: auto;
  }

  &__select-container-wrapper {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    z-index: 2;
    padding: 20px 0 20px 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 8px 12px rgb(153 155 168 / 15%);
  }

  & :deep(.input__icon) {
    top: -3px;
  }

  &__checkboxes-label {
    @include text_small_medium;

    display: block;
    color: var(--grayDark);
  }

  &__checkboxes-container {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
    margin-bottom: 10px;
  }
}
</style>
