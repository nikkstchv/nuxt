<template>
  <UIBaseOverlay :is-open="isOpenPanel" @click="onClosePanel()">
    <UISidePanel class="form__side-panel" :is-open="isOpenPanel">
      <form v-if="isOpenPanel" class="form" :class="{ form_finally: isFinish }">
        <header class="form__header form__section">
          <h2 class="form__title">
            Узнать о наличии в брендах
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
  </UIBaseOverlay>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useFormStore } from '../../../store/form'
import {
  errors,
  handlers,
  firstname,
  phone,
  robot,
  policy,
} from '@/components/Form/mixins'

export default {
  name: 'FormPanelStock',
  mixins: [firstname, phone, errors, handlers, robot, policy],
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
        formId: 'form_stock_request',
      }
    },
    ...mapState(useFormStore, {
      isOpenPanel: 'isOpenStock',
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
