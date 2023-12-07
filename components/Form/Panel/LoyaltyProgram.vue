<template>
  <UIBaseOverlay :is-open="isOpenPanel" @click="onClosePanel()">
    <UISidePanel class="form__side-panel" :is-open="isOpenPanel">
      <form v-if="isOpenPanel" class="form" :class="{ form_finally: isFinish }">
        <header class="form__header form__section">
          <h2 class="form__title">
            Зарегистрироваться в программе лояльности
          </h2>
          <IconClose class="form__close" @click="onClosePanel()" />
        </header>
        <section v-if="!isFinish" class="form__inputs">
          <FormInputName
            v-model="form.lastname.value"
            class="form__input"
            name="lastname"
            :errors="form.lastname.errors"
            :required="form.lastname.isRequire"
          />
          <FormInputName
            v-model="form.firstname.value"
            class="form__input"
            name="firstname"
            :errors="form.firstname.errors"
            :required="form.firstname.isRequire"
          />
          <FormInputName
            v-model="form.middlename.value"
            class="form__input"
            name="middlename"
            :errors="form.middlename.errors"
            :required="form.middlename.isRequire"
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
            class="form__input"
            fly-placeholder="Дилерский центр"
            :errors="form.dealer.errors"
            :disable="!optionsDealers"
            :required="form.dealer.isRequire"
            @onSetSelect="setDealer"
          />
          <FormInputRobot
            v-model="form.robot.value"
            class="form__input form__input_robot"
          />
          <UIBaseTextarea
            v-model.trim="form.address.value"
            class="form__input"
            label="Адрес проживания"
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
  </UIBaseOverlay>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useFormStore } from '../../../store/form'
import {
  errors,
  handlers,
  lastname,
  firstname,
  middlename,
  phone,
  robot,
  policy,
  dealers,
} from '@/components/Form/mixins'

export default {
  name: 'FormPaneLoyaltyProgram',
  mixins: [
    lastname,
    firstname,
    middlename,
    phone,
    dealers,
    errors,
    handlers,
    robot,
    policy,
  ],
  data: () => ({
    isFinish: false,
    isLoading: false,
    optionsDealers: null,
    form: {
      lastname: {
        value: '',
        errors: [],
        isRequire: true,
      },
      firstname: {
        value: '',
        errors: [],
        isRequire: true,
      },
      middlename: {
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
      address: {
        value: '',
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
        formId: 'form_loyalty_program',
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
