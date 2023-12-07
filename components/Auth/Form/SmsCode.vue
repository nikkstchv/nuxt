<template>
  <form class="smsCodeForm" @submit.prevent="">
    <h2 class="smsCodeForm__title">
      Введите код для продолжения
    </h2>
    <p class="smsCodeForm__info">
      Мы отправили код подтверждения на номер {{ phone }}
      <UIBaseButton
        underline
        text="Изменить номер"
        @click="$emit('setPhone', '')"
      />
    </p>
    <div class="smsCodeForm__code-container">
      <client-only>
        <!--        <CodeInput-->
        <!--          :fields="4"-->
        <!--          :loading="false"-->
        <!--          :field-width="53"-->
        <!--          :field-height="60"-->
        <!--          @change="onChange"-->
        <!--          @complete="onComplete"-->
        <!--        />-->
      </client-only>
      <ul v-if="errors.length !== 0" class="smsCodeForm__errors">
        <li v-for="error in errors" :key="error" class="smsCodeForm__error">
          {{ error }}
        </li>
      </ul>
    </div>
    <p v-if="timer !== 0" class="smsCodeForm__footnote">
      Получить новый код можно через
      <UITimer
        class="authorizationForm__timer"
        :start-time="timer"
        @changeTimeInTimer="changeTimeInTimer"
      />
      с.
    </p>
    <UIBaseButton v-else primary text="Получить новый код" large />
  </form>
</template>

<script>
export default {
  name: 'AuthFormSmsCode',
  props: {
    phone: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    code: '',
    errors: [],
    timer: 60,
    footnote: '',
    codeInputs: null,
  }),
  mounted () {
    this.codeInputs = document.querySelectorAll('.react-code-input input')
  },
  methods: {
    clearErrors () {
      this.errors = []
    },
    onChange () {
      this.errors = []

      this.codeInputs.forEach((el) => {
        el.removeAttribute('class')
        if (el.value) {
          el.classList.add('input_has-value')
        } else {
          el.classList.remove('input_has-value')
        }
      })
    },
    onComplete (code) {
      this.errors = []
      if (code === '0000') {
        this.clearErrors()
        this.setClassOnInputs('input_valid')
        this.$emit('setCode', code)
      } else {
        this.errors.push('Неверный код')
        this.setClassOnInputs('input_invalid')
      }
    },
    setClassOnInputs (className) {
      this.codeInputs.forEach((el) => {
        el.removeAttribute('class')
        el.classList.add(className)
      })
    },
    changeTimeInTimer (time) {
      this.timer = time
    },
  },
}
</script>

<style lang="scss" scoped>
.smsCodeForm {
  @import './authFormStyles';

  @include formStyles;
  @include title;

  &__info {
    @include text_small_regular;
  }

  &__footnote {
    @include text_small_medium;

    color: var(--grayDark);
  }
}
</style>
