<template>
  <form ref="codeForm" class="form-code">
    <p class="form-code__text">
      Мы отправили код подтверждения на номер <br>{{ userPhone }}
      <a href="#" class="form-code__link" @click.prevent="$emit('cancel')">
        Изменить
      </a>
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

      <p v-if="error" class="form-code__error">
        {{ error }}
      </p>
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
      @click="resendCode()"
    />
  </form>
</template>

<script>
import routes from '@/api/routes/testdrive'

import { handlers } from '@/components/Form/mixins'

export default {
  name: 'ServicesTestDriveBlockCode',
  mixins: [handlers],
  props: {
    userPhone: {
      type: String,
      default: '',
    },
    userEmail: {
      type: String,
      default: '',
    },
    userName: {
      type: String,
      default: '',
    },
    userMark: {
      type: String,
      default: '',
    },
    userModel: {
      type: String,
      default: '',
    },
    userGeneration: {
      type: String,
      default: '',
    },
    userSerie: {
      type: String,
      default: '',
    },
    userEquipment: {
      type: String,
      default: '',
    },
    userModification: {
      type: String,
      default: '',
    },
    userDateTime: {
      type: String,
      default: '',
    },
    dealer: {
      type: Object,
      default: () => {},
    },
    clientGuid: {
      type: String,
      default: '',
    },
    routeKey: {
      type: String,
      default: '',
    },
    isIframe: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      formId: 'form_testDrive',
      isLoading: false,
      error: null,
      timer: 120,
    }
  },
  methods: {
    clearErrors () {
      this.error = null
    },
    onChange () {
      this.clearErrors()
    },
    changeTimeInTimer (time) {
      this.timer = time
    },
    sendIframeData (data) {
      return window.parent.postMessage(data, '*')
    },
    async onComplete (code) {
      this.clearErrors()

      const body = {
        guid: this.clientGuid,
        code,
      }

      this.isLoading = true

      const options = {
        method: 'POST',
        body,
      }

      const res = await this.fetchClient(routes.validate(), options)

      if (res?.booked) {
        this.$emit('success')
        const formData = {
          email: this.userEmail,
          routeKey: this.routeKey,
          phone: this.userPhone.replace(/[^0-9]/g, ''),
          firstname: this.userName,
          mark: this.userMark,
          model: this.userModel,
          generation: this.userGeneration,
          serie: this.userSerie,
          equipment: this.userEquipment,
          modification: this.userModification,
          dateTime: this.userDateTime,
          formId: this.formId,
          dealerName: this.dealer?.name ?? '',
          formUrl: window.location.href,
        }
        if (this.isIframe) {
          const dateNow = new Date().toLocaleDateString()
          const timeNow = new Date().toLocaleTimeString()
          const iframeData = {
            email: this.userEmail,
            phone: this.userPhone.replace(/[^0-9+]/g, ''),
            firstname: this.userName,
            dealerID: this.dealer?.id ?? '',
            title: `Заявка на тест-драйв iFrame ${dateNow}, ${timeNow}`,
          }
          this.sendIframeData(iframeData)
        }

        this.amplitudeEvent(formData)
        this.exponeaIdentify(formData)
        this.exponeaForm(formData)
        const subject = await this.getSubject(formData.formId)
        this.calltouchCommit(formData, subject)
        // this.calltouchCall(formData, subject)
      } else {
        this.$refs.codeInput.values = ['', '', '', '']
        this.$refs.codeForm[0].focus()
        this.error = 'Неверный код'
      }
    },

    async resendCode () {
      this.clearErrors()
      this.timer = 120

      const body = {
        guid: this.clientGuid,
      }
      const options = {
        method: 'POST',
        body,
      }
      await this.fetchClient(routes.register(), options)
    },

    async fetchClient (route, options) {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      try {
        this.isLoading = true
        const res = await $fetchClient(route, options)

        if (!$hasErrorResponse(res)) {
          return res
        }
        return null
      } catch (e) {
        return null
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.form-code {
  width: 100%;
  max-width: 310px;

  &__text {
    @include text_medium;

    margin-bottom: 30px;
  }

  &__link {
    font-weight: 500;
    color: var(--marineBlue);
  }

  &__line {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 35px;
  }

  &__error {
    @include text_small_regular;

    padding-top: 10px;
    color: var(--error);
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
