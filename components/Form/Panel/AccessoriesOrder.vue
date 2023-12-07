<template>
  <UIBaseOverlay :is-open="isOpenPanel" @click="onClosePanel()">
    <UISidePanel class="form__side-panel" :is-open="isOpenPanel">
      <form v-if="isOpenPanel" class="form" :class="{ form_finally: isFinish }">
        <header class="form__header form__section">
          <h2 class="form__title">
            Заказать запчасть
          </h2>
          <IconClose class="form__close" @click="onClosePanel()" />
        </header>
        <section v-if="!isFinish" class="form__inputs">
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
          <UIBaseSelectInput
            v-model="form.mark.value"
            :options="optionsMark"
            :errors="form.mark.errors"
            :required="form.mark.isRequire"
            class="form__input"
            fly-placeholder="Марка"
            :disable="!optionsMark"
            @onSetSelect="(value) => setData('mark')(value)"
          />
          <UIBaseSelectInput
            v-model="form.model.value"
            :options="optionsModel"
            :errors="form.model.errors"
            :required="form.model.isRequire"
            class="form__input"
            fly-placeholder="Модель"
            :disable="!optionsModel && !form.mark.value"
            @onSetSelect="(value) => setData('model')(value)"
          />
          <FormInputYear
            v-model="form.year.value"
            class="form__input"
            :errors="form.year.errors"
            label="Год выпуска"
          />
          <UIBaseTextarea
            v-model.trim="form.comment.value"
            class="form__input"
            label="Прочие работы и VIN нужной детали"
          />
          <UIBaseButton
            class="form__button form__button_submit"
            primary
            large
            text="Отправить"
            :is-loading="isLoading"
            :disable="!hasAllRequiredFormData || isLoading"
            @click="handleSubmit"
          />
          <FormCheckboxPolicy
            v-model="form.policy.value"
            :error="form.policy.error"
          />
          <FormInputRobot
            v-model="form.robot.value"
            class="form__input form__input_robot"
          />
        </section>
        <FormFinallyBlock
          v-else
          class="form__block-finally"
          @handleClose="handleClose"
        />
      </form>
    </UISidePanel>
  </UIBaseOverlay>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useFormStore } from '../../../store/form'
import { useBrandsStore } from '../../../store/brands'
import {
  errors,
  handlers,
  firstname,
  phone,
  robot,
  policy,
  year,
} from '@/components/Form/mixins'

import { getTradeIn } from '@/api/routes/trade-in'

export default {
  name: 'FormPanelAccessoriesOrder',
  mixins: [firstname, phone, errors, handlers, robot, policy, year],
  data: () => ({
    isFinish: false,
    isLoading: false,
    optionsMark: null,
    optionsModel: null,
    form: {
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
      mark: {
        value: '',
        errors: [],
        isRequire: false,
      },
      year: {
        value: '',
        errors: [],
        isRequire: false,
      },
      model: {
        value: '',
        errors: [],
        isRequire: false,
      },
      comment: {
        value: '',
        errors: [],
        isRequire: false,
      },
      policy: {
        value: false,
        error: false,
      },
      robot: {
        value: '',
      },
    },
  }),
  computed: {
    additionalData () {
      const routeKey = this.isAsc ? 'order_spare_part' : ''
      return {
        formId: 'form_parts_request',
        routeKey,
      }
    },
    ...mapState(useFormStore, {
      isOpenPanel: 'isOpen',
    }),
  },
  watch: {
    async isOpenPanel (isOpen) {
      if (isOpen) {
        const isFetch = !this.optionsMark
        if (isFetch) {
          await this.fetchMarks()
        }
      } else {
        this.clearAllFormData()
      }
    },
    'form.mark.value' (markCode) {
      this.clearModel()
      this.fetchModels(markCode)
    },
  },
  methods: {
    async fetchMarks () {
      const brands = await this.getBrands()
      this.optionsMark = this.initOptions(brands)
    },
    async fetchModels (markCode) {
      const { $fetchClient } = useNuxtApp()
      const method = 'POST'
      const body = {
        query: {
          mark: markCode,
        },
      }
      const options = { method, body }
      const res = await $fetchClient(getTradeIn(), options)
      this.optionsModel = this.initOptions(res.model)
    },
    initOptions (options) {
      return options?.map(({ nameEn, code }) => ({
        id: code,
        name: nameEn,
        isActive: false,
      }))
    },
    clearModel () {
      this.form.model.value = ''
      this.optionsModel = null
    },
    setData (name) {
      return (value) => {
        this.setFormData(value, name)
      }
    },
    handleClose () {
      this.onClosePanel()
      this.isFinish = false
    },
    ...mapActions(useFormStore, {
      onClosePanel: 'onClose',
    }),
    ...mapActions(useBrandsStore, ['getBrands']),
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/components/FormPanel/style';
</style>
