<template>
  <form ref="codeForm" class="form-code">
    <p class="form-code__title">
      Введите код
    </p>
    <p class="form-code__text">
      Мы отправили код подтверждения на номер <br>{{ userPhone }}
      <button class="form-code__link" @click.prevent="$emit('cancel')">
        Изменить
      </button>
    </p>

    <div class="form-code__line">
      <client-only>
        <SmsCodeInput
          ref="codeInput"
          :fields="4"
          :loading="isLoading"
          :field-width="56"
          :field-height="60"
          :has-error="!!error"
          @change="onChange"
          @complete="onComplete"
        />
      </client-only>

      <div v-if="error" class="form-code__error">
        <img src="@/assets/icons/error.svg" alt="иконка ошибки">
        {{ error }}
      </div>
    </div>

    <p v-if="timer !== 0" class="form-code__time">
      Получить новый код можно через
      <UITimer
        type="minutes"
        :start-time="timer"
        @changeTimeInTimer="changeTimeInTimer"
      />
    </p>
    <UIBaseButton
      v-else
      secondary
      text="Получить новый код"
      large
      @click="resendCode"
    />
  </form>
</template>

<script>
export default {
  name: 'SmsCodeForm',
  props: {
    userPhone: {
      type: String,
      required: true,
      default: '',
    },
    sendCode: {
      type: Function,
      required: true,
    },
  },
  data () {
    return {
      isLoading: false,
      error: false,
      timer: 120,
    }
  },
  methods: {
    clearErrors () {
      this.error = false
    },
    onChange () {
      this.clearErrors()
    },
    changeTimeInTimer (time) {
      this.timer = time
    },
    async onComplete (code) {
      this.clearErrors()
      this.isLoading = true

      const res = await this.sendCode(code)

      this.isLoading = false

      if (!res) {
        this.error = 'Неверный код'
      }
    },

    resendCode () {
      this.clearErrors()
      this.timer = 120
      this.$emit('resend')
    },
  },
}
</script>

<style lang="scss" scoped>
.form-code {
  width: 100%;
  margin: auto;

  &__title {
    @include text_big_bold;

    margin-bottom: 24px;
    text-align: center;
  }

  &__text {
    @include text_medium;

    margin-bottom: 24px;
    text-align: center;
  }

  &__link {
    font-weight: 500;
    color: var(--marineBlue);
  }

  &__line {
    position: relative;
    display: grid;
    grid-template-rows: 1fr 20px;
    grid-gap: 10px;
    align-items: center;
    margin-bottom: 12px;
  }

  &__error {
    @include text_small_regular;

    display: flex;
    grid-gap: 6px;
    align-items: center;
    margin: auto;
    color: var(--error);
    text-align: center;
  }

  &__time {
    @include text_small_medium;

    color: var(--grayDark);
    text-align: center;

    span {
      font-weight: bold;
    }
  }
}
</style>
