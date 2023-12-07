<template>
  <UIBaseOverlay :is-open="isOpenPanel" @click="onClosePanel()">
    <UISidePanel class="form__side-panel" :is-open="isOpenPanel">
      <form
        v-if="isOpenPanel"
        class="form"
        :class="{ form_finally: formStep === 'finally' }"
      >
        <header class="form__header form__section">
          <h2 class="form__title">
            Получить историю автомобиля
          </h2>
          <IconClose class="form__close" @click="onClosePanel" />
        </header>
        <section v-show="formStep === 'default'" class="form__inputs">
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
          <FormCheckboxPolicy
            v-model="form.policy.value"
            :error="form.policy.error"
          />
          <FormInputRobot
            v-model="form.robot.value"
            class="form__input form__input_robot"
          />
          <UIBaseButton
            class="form__button form__button_submit"
            primary
            large
            text="Отправить"
            :is-loading="isLoading"
            :disable="!hasAllRequiredFormData || isLoading"
            @click="onHandleSubmit"
          />
        </section>

        <SmsCodeForm
          v-if="formStep === 'sms'"
          :user-phone="form.phone.value"
          :send-code="sendCode"
          @cancel="setFormStep('default')"
          @resend="onHandleSubmit"
        />
        <FormFinallyBlock
          v-if="formStep === 'finally'"
          class="form__block-finally"
          text="В ближайшее время отчет придет вам на почту"
          @handleClose="handleClose"
        />
      </form>
    </UISidePanel>
  </UIBaseOverlay>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useFormStore } from '../../../store/form'
import { smsCode } from '@/api/routes/catalog'
import {
  email,
  errors,
  firstname,
  handlers,
  phone,
  policy,
  robot,
} from '@/components/Form/mixins'

export default {
  name: 'FormPanelHistory',
  mixins: [firstname, phone, email, errors, handlers, robot, policy],
  data: () => ({
    formStep: 'default',
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
    formData () {
      return this.getAllFormData(this.additionalData)
    },
    additionalData () {
      const catalogId = this.$route.params.id
      return {
        formId: 'form_diagnostic_Autoteca',
        catalogId,
      }
    },
    ...mapState(useFormStore, {
      isOpenPanel: 'isOpenHistory',
    }),
  },
  methods: {
    async axiosClient (route, options) {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      try {
        this.isLoading = true
        const res = await $fetchClient(route, options)
        if (!$hasErrorResponse(res)) {
          return res
        }
        return null
      } catch (e) {
        return null
      } finally {
        this.isLoading = false
      }
    },
    async sendCode (code) {
      const additionalData = { ...this.additionalData, smsCode: code }
      const formData = this.getAllFormData(additionalData)
      const options = {
        method: 'POST',
        body: formData,
      }
      const res = await this.axiosClient(smsCode(), options)

      if (res) {
        this.setFormStep('finally')
        this.clearAllFormData()
        this.amplitudeEvent(formData)
        this.exponeaIdentify(formData)
        this.exponeaForm(formData)
        const subject = await this.getSubject(formData.formId)
        this.calltouchCommit(formData, subject)
      }

      return res
    },
    async onHandleSubmit () {
      const isAllValid = this.checkForm()
      if (isAllValid) {
        const options = {
          method: 'GET',
          query: {
            phone: this.form.phone.value?.replace(/[^0-9]/g, ''),
            date: new Date().toString(),
          },
        }
        const res = await this.axiosClient(smsCode(), options)
        if (res) {
          this.setFormStep('sms')
        }
      }
    },
    setFormStep (step) {
      this.formStep = step
    },
    handleClose () {
      this.onClosePanel()
      this.setFormStep('default')
    },
    ...mapActions(useFormStore, {
      onClosePanel: 'onClose',
    }),
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/components/FormPanel/style';
</style>
