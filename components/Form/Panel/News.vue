<template>
  <UISidePanel class="form__side-panel" :is-open="isOpenPanel">
    <form v-if="isOpenPanel" class="form">
      <header class="form__header form__section">
        <h2 class="form__title">
          Подписка на новости
        </h2>
        <IconClose class="form__close" @click="onClosePanel" />
      </header>
      <section class="form__inputs">
        <FormInputEmail
          v-model="form.email.value"
          class="form__input"
          :errors="form.email.errors"
          :required="form.email.isRequire"
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
    </form>
  </UISidePanel>
</template>

<script>
import {
  email,
  errors,
  handlers,
  policy,
  robot,
} from '@/components/Form/mixins'

export default {
  name: 'FormPanelNews',
  mixins: [email, errors, handlers, robot, policy],
  data: () => ({
    isFinish: false,
    isLoading: false,
    form: {
      email: {
        isRequire: true,
      },
    },
  }),
  computed: {
    additionalData () {
      return {
        formId: 'form_subscribe_news',
      }
    },
    ...mapState({
      isOpenPanel: state => state.form.isOpen,
    }),
  },

  methods: {
    ...mapMutations({
      onClosePanel: 'form/onClose',
    }),
  },
}
</script>

<style lang="scss" scoped>
.form {
  z-index: 10;
  display: grid;
  grid-template-rows: min-content min-content 1fr;
  height: fit-content;
  padding: 20px 15px;
  margin-bottom: 40px;

  @include mq($bp-small-medium) {
    padding: 20px;
  }

  @include mq($bp-small) {
    padding: 60px;
  }

  &__side-panel {
    padding: 0 !important;
  }

  .form &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
  }

  &__close {
    width: 35px;
    height: 35px;
    padding: 5px;
  }

  &__title {
    @include h5;

    @include mq($bp-super-small) {
      @include h4;
    }

    @include mq($bp-small-medium) {
      @include h3;
    }
  }

  &__text {
    @include text_medium_regular;

    margin-bottom: 10px;
    color: var(--grayDark);

    @include mq($bp-small-medium) {
      @include text_big_regular;
    }
  }

  &__inputs {
    display: grid;
    grid-gap: 25px;
  }
}
</style>
