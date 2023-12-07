<template>
  <UIBaseOverlay :is-open="isOpenPanel" @click="onClosePanel('isOpenFeedbackService')">
    <UISidePanel class="form__side-panel" :is-open="isOpenPanel">
      <form v-if="isOpenPanel" class="form" :class="{ form_finally: isFinish }">
        <header class="form__header form__section">
          <h2 class="form__title">
            Обратная связь
          </h2>
          <IconClose class="form__close" @click="onClosePanel" />
        </header>
        <section v-if="!isFinish" class="form__inputs">
          <p class="form__text">
            В данный момент мы не можем осуществить запись на данный номер,
            пожалуйста, отправьте форму обращения для связи
          </p>
          <FormInputName
            v-model="form.firstname.value"
            class="form__input"
            name="firstname"
            :errors="form.firstname.errors"
            :required="form.firstname.isRequire"
          />
          <div class="form__line">
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
          </div>
          <UIBaseTextarea
            v-model.trim="form.comment.value"
            class="form__input form__input_textarea"
            label="Комментарий"
            :max-length="300"
            :rows="6"
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
  firstname,
  handlers,
  phone,
  policy,
  robot,
} from '@/components/Form/mixins'

export default {
  name: 'FormPanelFeedbackService',
  mixins: [firstname, phone, email, errors, policy, handlers, robot],
  data: () => ({
    form: {
      isFinish: false,
      isLoading: false,
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
      comment: {
        value: '',
      },
    },
    additionalData: { formId: 'form_dealer_feedback' },
  }),
  computed: {
    ...mapState(useFormStore, {
      isOpenPanel: 'isOpenFeedbackService',
    }),
  },
  watch: {
    isOpenPanel (isOpen) {
      if (isOpen) {
        this.initForm()
      } else {
        localStorage.removeItem('serviceForm')
        this.clearInitData()
        this.clearAllFormData()
      }
    },
  },
  methods: {
    initForm () {
      let form = localStorage.getItem('serviceForm')
      if (form) {
        form = JSON.parse(form)
        this.form.firstname.value = form.name
        this.form.phone.value = form.phone
        this.form.email.value = form.email
        this.form.comment.value = form.comment
      }
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

.form {
  &__line {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px 20px;

    @include mq($bp-small) {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
