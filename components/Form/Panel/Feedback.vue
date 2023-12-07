<template>
  <UIBaseOverlay :is-open="isOpenPanel" @click="onClosePanel('isOpenFeedback')">
    <UISidePanel class="form__side-panel" :is-open="isOpenPanel">
      <form v-if="isOpenPanel" class="form" :class="{ form_finally: isFinish }">
        <header class="form__header form__section">
          <h2 class="form__title">
            Обратная связь
          </h2>
          <IconClose class="form__close" @click="onClosePanel('isOpenFeedback')" />
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
          <FormInputEmail
            v-model="form.email.value"
            class="form__input"
            :errors="form.email.errors"
            :required="form.email.isRequire"
          />
          <UIBaseSelectInput
            v-model="form.reasons.value"
            :options="optionsReason"
            class="form__input"
            fly-placeholder="Причина обращения"
            :disable="!optionsReason"
            @onSetSelect="setReason"
          />
          <UIBaseSelectInput
            v-model="form.dealer.value"
            :options="optionsDealers"
            class="form__input"
            fly-placeholder="Дилерский центр"
            :errors="form.dealer.errors"
            :disable="!optionsDealers"
            :required="form.dealer.isRequire"
            @onSetSelect="setDealer"
          />
          <UIBaseTextarea
            v-model.trim="form.comment.value"
            class="form__input form__input_textarea"
            label="Комментарий"
          />
          <FormInputRobot
            v-model="form.robot.value"
            class="form__input form__input_robot"
          />
          <FormCheckboxPolicy
            v-model="form.policy.value"
            :error="form.policy.error"
          />
          <UIBaseButton
            class="form__button"
            primary
            large
            text="Отправить"
            :is-loading="isLoading"
            :disable="!hasAllRequiredFormData || isLoading"
            @click="handleSubmit"
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
import {
  email,
  errors,
  handlers,
  firstname,
  dealers,
  phone,
  policy,
  robot,
} from '@/components/Form/mixins'

export default {
  name: 'FormPanelFeedback',
  mixins: [
    firstname,
    phone,
    email,
    errors,
    policy,
    handlers,
    dealers,
    robot,
    policy,
  ],
  data: () => ({
    isFinish: false,
    isLoading: false,
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
      email: {
        value: '',
        errors: [],
        isRequire: true,
      },
      reasons: {
        value: '',
        errors: [],
        isRequire: false,
      },
      dealer: {
        value: '',
        errors: [],
        isRequire: true,
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
    optionsReason: [
      {
        name: 'Предложение',
        isActive: false,
      },
      {
        name: 'Обращение в Отдел продаж',
        isActive: false,
      },
      {
        name: 'Обращение в Отдел сервиса',
        isActive: false,
      },
      {
        name: 'Обращение в Отдел страхования/Кредитования',
        isActive: false,
      },
      {
        name: 'Обращение в Отдел З/Ч',
        isActive: false,
      },
    ],
    optionsDealers: null,
    additionalData: { formId: 'form_feedback' },
  }),
  computed: {
    markCode () {
      return this.$route.params.mark ?? this.initData?.markCode ?? ''
    },
    ...mapState(useFormStore, {
      isOpenPanel: 'isOpenFeedback',
      initData: 'initData',
    }),
  },
  watch: {
    async isOpenPanel (isOpen) {
      if (isOpen) {
        await this.fetchDealers(this.markCode)
      } else {
        this.clearInitData()
        this.clearAllFormData()
      }
    },
  },
  methods: {
    setReason (value) {
      this.setFormData(value, 'reasons')
    },
    handleClose () {
      this.onClosePanel()
      this.isFinish = false
    },
    ...mapActions(useFormStore, {
      clearInitData: 'clearInitData',
      onClosePanel: 'onClose',
    }),
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/components/FormPanel/style';
</style>
