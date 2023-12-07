<template>
  <div class="feedback">
    <UISimplePageHeader class="feedback__header" title="Форма обратной связи" />
    <main v-if="!isFinish" class="feedback__container">
      <p class="feedback__text">
        Вы можете задать интересующий вас вопрос нашим специалистам и получить
        исчерпывающую информацию по телефону
      </p>
      <form class="feedback__form">
        <FormInputName
          v-model="form.firstname.value"
          class="feedback__input"
          name="firstname"
          :errors="form.firstname.errors"
          :required="form.firstname.isRequire"
        />
        <FormInputPhone
          v-model="form.phone.value"
          class="feedback__input"
          :errors="form.phone.errors"
          :required="form.phone.isRequire"
        />
        <FormInputEmail
          v-model="form.email.value"
          class="feedback__input"
          :errors="form.email.errors"
          :required="form.email.isRequire"
        />
        <UIBaseSelectInput
          v-model="form.reasons.value"
          :options="optionsReason"
          class="feedback__input"
          fly-placeholder="Причина обращения"
          :disable="!optionsReason"
          @onSetSelect="setReason"
        />
        <UIBaseSelectInput
          v-model="form.dealer.value"
          :options="optionsDealers"
          :errors="form.dealer.errors"
          class="feedback__input"
          fly-placeholder="Дилерский центр"
          :disable="!optionsDealers"
          :required="form.dealer.isRequire"
          @onSetSelect="setDealer"
        />
        <UIBaseTextarea
          v-model.trim="form.comment.value"
          class="feedback__input feedback__input_textarea"
          label="Комментарий"
        />
        <FormInputRobot
          v-model="form.robot.value"
          class="form__input form__input_robot"
        />
        <UIBaseButton
          class="feedback__button"
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
      </form>
    </main>
    <FormFinallyBlock
      v-else
      class="form__block-finally"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import {
  dealers,
  email,
  errors,
  firstname,
  handlers,
  phone,
  policy,
  robot,
} from '@/components/Form/mixins'

export default {
  mixins: [firstname, phone, email, errors, policy, handlers, dealers, robot],
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
      },
      dealer: {
        value: '',
        errors: [],
        isRequire: true,
      },
      comment: {
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
  }),
  computed: {
    additionalData () {
      return {
        formId: 'form_feedback',
      }
    },
  },
  mounted () {
    this.fetchDealers()
  },
  methods: {
    handleClose () {
      this.isFinish = false
    },
    setReason (value) {
      this.setFormData(value, 'reasons')
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.feedback {
  @include indentsMainVertical;
  @include indentsMainHorizontal;

  display: grid;
  align-content: flex-start;

  &__container {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    max-width: 740px;
    margin: auto;

    @include mq($bp-super-small) {
      grid-gap: 25px;
    }

    @include mq($bp-small-medium) {
      grid-gap: 30px;
    }
  }

  &__text {
    @include text_big_regular;

    color: var(--blackLight);
  }

  &__form {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;

    @include mq($bp-small) {
      display: grid;
      grid-template-columns: minmax(max-content, 350px) auto;
      grid-gap: 25px 40px;
    }
  }

  &__input {
    &_textarea {
      grid-row: 1 / 7;
      grid-column-start: 2;
    }
  }

  &__button {
    max-width: 350px;
    margin-top: 10px;

    @include mq($bp-medium-big) {
      margin-top: 20px;
    }
  }

  &__checkbox {
    max-width: 350px;

    & :deep(.checkbox__label) {
      @include text_small_regular;

      display: flex;
      flex-wrap: wrap;
    }

    &-button {
      margin-right: 3px;
      margin-left: 3px;
    }

    &_error {
      & :deep(.checkbox__label) {
        color: var(--error);
      }

      & :deep(.checkbox__checkmark) {
        border: 1.5px solid var(--error);
      }

      & :deep(.button) {
        color: var(--error);
        border-bottom: 1px solid var(--error);
      }
    }
  }
}
</style>
