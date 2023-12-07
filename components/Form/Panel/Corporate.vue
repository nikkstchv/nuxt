<template>
  <UIBaseOverlay :is-open="isOpenPanel" @click="onClosePanel()">
    <UISidePanel class="form__side-panel" :is-open="isOpenPanel">
      <form v-if="isOpenPanel" class="form" :class="{ form_finally: isFinish }">
        <header class="form__header form__section">
          <h2 class="form__title">
            Заявка корпоративным клиентам
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
          <FormInputEmail
            v-model="form.email.value"
            class="form__input"
            :errors="form.email.errors"
            :required="form.email.isRequire"
          />
          <UIBaseSelectInput
            v-model="form.dealer.value"
            :options="optionsDealers"
            :errors="form.dealer.errors"
            class="form__input"
            fly-placeholder="Дилерский центр"
            :disable="!optionsDealers"
            @onSetSelect="setDealer"
          />
          <UIBaseTextarea
            v-model.trim="form.comment.value"
            class="form__input"
            label="Комментарий"
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
  phone,
  dealers,
  robot,
  policy,
} from '@/components/Form/mixins'

export default {
  name: 'FormPanelCorporate',
  mixins: [firstname, phone, email, errors, handlers, dealers, robot, policy],
  data: () => ({
    isFinish: false,
    isLoading: false,
    optionsDealers: null,
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
  }),
  computed: {
    additionalData () {
      return {
        formId: 'form_corpClients',
      }
    },
    ...mapState(useFormStore, {
      isOpenPanel: 'isOpen',
    }),
  },
  methods: {
    handleClose () {
      this.onClosePanel()
      this.isFinish = false
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
