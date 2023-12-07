<template>
  <UISidePanel
    class="garage-panel__side-panel"
    :is-open="isOpenGaragePanel"
    @onClose="onCloseGaragePanel"
  >
    <form
      v-if="isOpenGaragePanel"
      class="garage-panel"
      @submit.prevent="sendData"
    >
      <header class="garage-panel__header">
        <h2 class="garage-panel__title">
          Мой автомобиль
        </h2>
        <IconClose
          class="garage-panel__close"
          @click="onCloseGaragePanel"
        />
      </header>
      <div v-show="!showResult" class="garage-panel__items">
        <UIBaseInputStraight
          v-model="form.VIN"
          label="VIN-номер"
          name="VIN"
          type="numeric"
        />
        <UIBaseInputStraight
          v-model="form.run"
          label="Пробег"
          name="run"
          type="numeric"
          :max-length="10"
        />
        <UIBaseInputStraight
          v-model="form.stateNumber"
          mask="X ### XX ###"
          label="Гос. номер"
          name="stateNumber"
        />
        <UIBaseAccordion
          :is-expand="expand.year"
          :label-value="form.year"
          :label="'Год выпуска'"
          form-item-name="year"
          @handleExpand="handleExpand"
        >
          <UIBaseInput
            v-model="form.year"
            mask="####"
            label="Введите год"
            name="year"
            type="numeric"
          />
        </UIBaseAccordion>
        <FormItem
          class="garage-panel__item"
          :disable="!form.year"
          :model.sync="form.mark"
          :input="{ label: 'Введите марку' }"
          :accordion="{ label: 'Марка' }"
          :checkboxes-list="tradeInData.marks"
          form-item-name="mark"
          :handle-expand="handleExpand"
          :is-expand="expand.mark"
        />
        <FormItem
          class="garage-panel__item"
          :disable="!form.mark"
          :model.sync="form.model"
          :input="{ label: 'Введите модель' }"
          :accordion="{ label: 'Модель' }"
          :checkboxes-list="tradeInData.models"
          form-item-name="model"
          :handle-expand="handleExpand"
          :is-expand="expand.model"
        />
        <FormItem
          class="garage-panel__item"
          :disable="!form.model"
          :model.sync="form.modification"
          :accordion="{ label: 'Модификация' }"
          :checkboxes-list="tradeInData.modifications"
          form-item-name="modification"
          :handle-expand="handleExpand"
          :is-expand="expand.modification"
        />
      </div>
      <UIBaseButton
        class="garage-panel__button"
        :disable="hasAllFormData"
        primary
        text="Сохранить"
        @click="sendData"
      />
    </form>
  </UISidePanel>
</template>

<script>
export default {
  name: 'GarageFormPanel',
  data () {
    return {
      form: {
        VIN: '',
        stateNumber: '',
        run: '',
        year: '',
        mark: '',
        model: '',
        modification: '',
      },
      expand: {
        year: false,
        mark: false,
        model: false,
        modification: false,
      },
      tradeInData: {
        VIN: [],
        stateNumber: [],
        run: [],
        year: [],
        marks: [],
        models: [],
        modifications: [],
      },
      baseUrlTradeIn: 'https://dev.webdms.online/api/tradein/',
      showResult: false,
      runValue: null,
      run: {
        thousands: ' ',
        suffix: ' км',
        precision: 0,
        max: 999999,
        min: 0,
      },
    }
  },
  async fetch () {},
  computed: {
    resultPrice () {
      return this.$store.state.tradeIn.resultPrice?.toLocaleString()
    },
    isOpenTradeIn () {
      return this.$store.state.garage.isOpenPanel
    },
    hasFormData () {
      return Object.entries(this.form).every(([_key, value]) => {
        return value.length === 0
      })
    },
    hasAllFormData () {
      return Object.values(this.form).includes('')
    },
    // ...mapState({
    //   isOpenGaragePanel: state => state.garage.isOpenPanel,
    // }),
  },
  watch: {
    runValue (value) {
      try {
        const formatedRunValue = parseInt(
          value.slice(0, -3).split(' ').join(''),
        )
        if (formatedRunValue === 0) {
          this.form.run = ''
        } else if (formatedRunValue > 999999) {
          this.form.run = 999999
          this.runValue = '999 999 км'
        } else {
          this.form.run = formatedRunValue
        }
      } catch (e) {}
    },
  },
  methods: {
    getYearNow () {
      return new Date().toLocaleString('ru', { year: 'numeric' })
    },
    setFormDataIfOnlyOneValue (name) {
      if (this.tradeInData[name + 's'].length === 1) {
        this.form[name] = this.tradeInData[name + 's'][0].id
      }
    },
    handleExpand (expandName) {
      this.expand[expandName] = !this.expand[expandName]
    },
    createOwners (count) {
      return [...Array(count).keys()]
        .map((item) => {
          return { name: item.toString() }
        })
        .splice(1)
    },
    hasFormValue (value) {
      return typeof value !== 'object' && value !== ''
    },
    sendData () {
      this.onCloseGaragePanel()
      this.clearAllFormData()
    },
    findNameById (name) {
      const findedItem = this.tradeInData[name + 's'].find(
        item => parseInt(item.id) === parseInt(this.form[name]),
      )
      return findedItem.name
    },
    convertFormDataToNames () {
      const mark = this.findNameById('mark')
      const model = this.findNameById('model')
      const generation = this.findNameById('generation')
      const bodywork = this.findNameById('bodywork')
      const modification = this.findNameById('modification')

      return { ...this.form, mark, model, generation, bodywork, modification }
    },
    clearAllFormData () {
      this.clearTradeInData()

      for (const key in this.form) {
        this.form[key] = ''
      }
    },
    // ...mapMutations({
    //   onCloseGaragePanel: 'garage/onClose',
    // }),
  },
}
</script>

<style lang="scss" scoped>
.garage-panel {
  display: grid;
  grid-template-rows: min-content min-content min-content 1fr;
  padding: 20px 15px 0;

  @include mq($bp-small-medium) {
    padding: 20px 20px 0;
  }

  @include mq($bp-small) {
    padding: 60px 60px 0;
  }

  &__items {
    display: grid;
    grid-gap: 20px;
    margin-bottom: 60px;
  }

  &__close {
    width: 24px;
    height: 24px;
  }

  &__title {
    @include h5;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 60px;
  }
}
</style>
