<template>
  <form class="form" :class="{ form_finally: isFinish }">
    <header class="form__header form__section">
      <h2 class="form__title">
        Оценка автомобиля
      </h2>
    </header>
    <template v-if="!isFinish">
      <section class="form__inputs">
        <UIBaseSelectInput
          v-model="form.mark.value"
          :options="optionsMark"
          :errors="form.mark.errors"
          :required="form.mark.isRequire"
          class="form__input"
          fly-placeholder="Марка"
          :disable="isDisabledMark"
          @onSetSelect="setMark"
        />
        <UIBaseSelectInput
          v-model="form.model.value"
          :options="optionsModel"
          :errors="form.model.errors"
          :required="form.model.isRequire"
          class="form__input"
          fly-placeholder="Модель"
          :disable="isDisabledModel"
          @onSetSelect="setModel"
        />
        <UIBaseSelectInput
          v-model="form.dealer.value"
          :options="optionsDealers"
          :errors="form.dealer.errors"
          :required="form.dealer.isRequire"
          :disable="isDisabledDealer"
          class="form__input"
          fly-placeholder="Дилерский центр"
          @onSetSelect="setDealer"
        />
        <FormInputName
          v-model="form.firstname.value"
          class="form__input"
          name="firstname"
          :errors="form.firstname.errors"
          :required="form.firstname.isRequire"
        />
        <FormInputPhone
          v-model="form.phone.value"
          class="form__input"
          :errors="form.phone.errors"
          :required="form.phone.isRequire"
        />
        <FormInputRobot
          v-model="form.robot.value"
          class="form__input form__input_robot"
        />
        <FormCheckboxPolicy
          v-model="form.policy.value"
          class="form__input form__input_policy"
          :error="form.policy.error"
        />
      </section>
      <UIBaseButton
        class="form__button form__button_submit"
        big
        large
        text="Оценить"
        :is-loading="isLoading"
        :disable="!hasAllRequiredFormData || isLoading"
        @click="handleSubmit"
      />
    </template>
    <FormFinallyBlock
      v-else
      class="form__block-finally"
      @handleClose="handleClose"
    />
  </form>
</template>

<script>
import { mapState } from 'pinia'
import { useHoldingStore } from '../../../store/holding'
import { getCardsShort } from '@/api/routes/catalog'
import { getTradeIn } from '@/api/routes/trade-in'
import {
  dealers,
  errors,
  firstname,
  handlers,
  phone,
  policy,
  robot,
} from '@/components/Form/mixins'

export default {
  name: 'TradeInBlockForm',
  mixins: [firstname, phone, errors, handlers, robot, policy, dealers],
  props: {
    marksProps: {
      type: Array,
      required: false,
      default: null,
    },
    modelsProps: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data () {
    return {
      isFinish: false,
      isLoading: false,
      optionsMark: null,
      optionsModel: null,
      optionsDealers: null,
      form: {
        mark: {
          value: '',
          errors: [],
          isRequire: true,
        },
        model: {
          value: '',
          errors: [],
          isRequire: true,
        },
        dealer: {
          value: '',
          errors: [],
          isRequire: true,
        },
        firstname: {
          value: '',
          errors: [],
          isRequire: true,
        },
        phone: {
          value: '',
          errors: [],
          isRequire: true,
        },
        policy: {
          value: false,
          error: false,
        },
        robot: {
          value: '',
        },
      },
    }
  },
  computed: {
    markName () {
      return this.getName('mark', this.optionsMark)
    },
    modelName () {
      return this.getName('model', this.optionsModel)
    },
    additionalData () {
      const routeKey = this.isAsc ? 'request_for_evaluation' : ''
      return {
        formId: 'form_trade-in',
        routeKey,
        markName: this.markName,
        modelName: this.modelName,
      }
    },
    isDisabledMark () {
      if (this.isAvtodom) {
        return !!this.form.mark.value
      } else {
        return !this.optionsMark
      }
    },
    isDisabledModel () {
      return !this.optionsModel || !this.form.mark.value
    },
    isDisabledDealer () {
      return !this.optionsDealers || !this.form.mark.value
    },
    ...mapState(useHoldingStore, ['isAvtodom']),
  },
  watch: {
    async 'form.mark.value' (markCode) {
      this.clearModel()
      this.clearDealer()
      this.optionsModel = await this.getModels(markCode)
      await this.fetchDealers({
        markCode,
        hasHolding: this.isAsc,
      })
    },
  },
  async mounted () {
    this.optionsMark = await this.getMarks()
    const isSetMark = this.setMarkValue()
    if (!isSetMark) { await this.fetchDealers() }
    this.setModelValue()
  },
  methods: {
    async getModels (markCode) {
      if (!this.modelsProps) {
        const models = await this.fetchModels(markCode)
        return models ? this.initOptions(models) : null
      } else {
        return this.initOptions(this.modelsProps)
      }
    },
    async getMarks () {
      if (!this.marksProps) {
        const marks = await this.fetchMarks()
        return marks ? this.initOptions(marks) : null
      } else {
        return this.initOptions(this.marksProps)
      }
    },
    clearDealer () {
      this.form.dealer.value = ''
      this.optionsDealers = null
    },
    clearModel () {
      this.form.model.value = ''
      this.optionsModel = null
    },
    setMarkValue () {
      const markParam = this.$route.params.mark ?? ''
      if (markParam) {
        this.form.mark.value = markParam
      }

      return markParam
    },
    setModelValue () {
      this.form.model.value = this.$route.params.model ?? ''
    },
    getDealerId (code) {
      const foundDealer = this.optionsDealers.find(
        dealer => dealer.code === code,
      )
      return foundDealer ? foundDealer.id : ''
    },
    getName (name, options) {
      const found = options.find(item => item.id === this.form[name].value)
      return found?.name ?? ''
    },
    async fetchMarks () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const res = await $fetchClient(getCardsShort())

      if (!$hasErrorResponse(res)) {
        return res.brands
      }
      return null
    },
    async fetchModels (markCode) {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const method = 'POST'
      const body = {
        query: {
          mark: markCode,
        },
      }
      const options = { method, body }
      const res = await $fetchClient(getTradeIn(), options)
      if (!$hasErrorResponse(res)) {
        return res.model
      }
      return null
    },
    setMark (value) {
      this.setFormData(value, 'mark')
    },
    setModel (value) {
      this.setFormData(value, 'model')
    },
    initOptions (options) {
      return options?.map(({ nameEn, code }) => ({
        id: code,
        name: nameEn,
        isActive: false,
      }))
    },
    handleClose () {
      this.isFinish = false
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  display: grid;
  grid-template-rows: auto auto 1fr;
  padding: 40px 10px 60px;
  border: 1px solid var(--grayMediumLight);
  border-radius: 24px;
  box-shadow: 0 8px 12px rgb(153 155 168 / 15%);

  @include mq($bp-super-small) {
    padding: 40px 15px 60px;
  }

  @include mq($bp-small-medium) {
    padding: 40px 20px 60px;
  }

  @include mq($bp-small) {
    padding: 40px 30px 60px;
  }

  @include mq($bp-medium) {
    padding: 40px 40px 60px;
  }

  .form &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
  }

  &__title {
    @include h5;

    margin: auto;

    @include mq($bp-super-small) {
      @include h4;
    }

    @include mq($bp-small-medium) {
      @include h3;
    }
  }

  &__inputs {
    display: grid;
    grid-gap: 30px;
    margin-bottom: 30px;
  }

  & :deep(.policy-checkbox) {
    @include mq($bp-small-medium) {
      margin: 10px 0;
    }
  }

  &__input {
    &_policy {
      font-size: 10px;

      @include mq($bp-small-medium) {
        font-size: 12px;
      }

      & :deep(.button_theme_underline) {
        font-size: 10px;

        @include mq($bp-small-medium) {
          font-size: 12px;
        }
      }
    }
  }

  &__button {
    align-self: flex-end;
    height: fit-content;
  }
}
</style>
