<template>
  <UISidePanel class="form__side-panel" :is-open="isOpenPanel">
    <form v-if="isOpenPanel" class="form" :class="{ form_finally: isFinish }">
      <header class="form__header form__section">
        <h2 class="form__title">
          Заявка на тест-драйв
        </h2>
        <IconClose class="form__close" @click="onClosePanel" />
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
          v-model="form.dealer.value"
          :options="optionsDealers"
          :errors="form.dealer.errors"
          :required="form.dealer.isRequire"
          class="form__input"
          fly-placeholder="Дилерский центр"
          :disable="!optionsDealers"
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
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useFormStore } from '../../../store/form'
import {
  errors,
  handlers,
  firstname,
  phone,
  dealers,
  robot,
  policy,
} from '@/components/Form/mixins'

export default {
  name: 'FormPanelTestDrive',

  mixins: [firstname, phone, errors, handlers, dealers, robot, policy],
  props: {
    markCode: {
      type: String,
      required: false,
      default: '',
    },
  },
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
    },
  }),
  computed: {
    additionalData () {
      return {
        formId: 'form_testDrive',
      }
    },
    ...mapState(useFormStore, {
      isOpenPanel: 'isOpenTestDrive',
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
