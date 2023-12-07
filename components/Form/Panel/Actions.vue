<template>
  <UISidePanel class="form__side-panel" :is-open="isOpenPanel">
    <form v-if="isOpenPanel" class="form">
      <header class="form__header form__section">
        <h2 class="form__title">
          Подписка на акции
        </h2>
        <IconClose class="form__close" @click="onClosePanel" />
      </header>
      <section class="form__inputs">
        <FormInputEmail
          v-model="form.email.value"
          class="form__input"
          :errors="form.email.errors"
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
    </form>
  </UISidePanel>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import {
  email,
  robot,
  errors,
  handlers,
  policy,
} from '@/components/Form/mixins'

import UISidePanel from '@/components/UI/SidePanel.vue'
import UIBaseButton from '@/components/UI/Base/Button.vue'

import IconClose from '@/components/Icon/Close.vue'

import FormInputEmail from '@/components/Form/Input/Email.vue'
import FormInputRobot from '@/components/Form/Input/Robot.vue'
import FormCheckboxPolicy from '@/components/Form/CheckboxPolicy.vue'

export default {
  name: 'FormPanelActions',
  components: {
    UISidePanel,
    UIBaseButton,
    IconClose,
    FormInputEmail,
    FormInputRobot,
    FormCheckboxPolicy,
  },
  mixins: [email, robot, errors, handlers, policy],
  data: () => ({
    isFinish: false,
    isLoading: false,
  }),
  computed: {
    additionalData () {
      return {
        formId: 'form_subscribe_specials',
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
