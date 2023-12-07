<template>
  <form class="testdrive-online-form">
    <div
      :class="[
        'testdrive-online-form__body',
        { 'testdrive-online-form__body_offset-bottom': isBtnFixed },
      ]"
    >
      <UIBaseInput
        v-model.trim="form.name.value"
        label="ФИО"
        autocomplete="name"
        first-symbol-up
        hide-clear
        :required="form.name.isRequire"
        :errors="form.name.errors"
        :error="hasError(form.name.errors)"
      />
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
      <FormCheckboxPolicy
        v-model="form.policy.value"
        :error="form.policy.error"
        @setFormData="setFormData($event, 'policy'); validFormRequired()"
      />
    </div>

    <div
      :class="[
        'testdrive-online-form__footer',
        { 'testdrive-online-form__footer_fixed': isBtnFixed },
      ]"
    >
      <UIBaseButton
        class="testdrive-online-form__button"
        primary
        large
        text="Записаться на тест-драйв"
        :disable="isLoading"
        :is-loading="isLoading"
        @click="submit()"
      />
    </div>

    <div id="bottomBorderForm" />

    <div class="disclaimer">
      <IconInfo class="disclaimer__icon" />
      Тест-драйв в зависимости от модели и ДЦ может быть платным. Сумма компенсируется при покупке автомобиля
    </div>
  </form>
</template>

<script>
import { mapState } from 'pinia'
import { policy, errors, email, phone, name, handlers } from '@/components/Form/mixins'
import { useResizeStore } from '@/store/resize'

export default {
  name: 'ServicesTestDriveFormsMain',
  mixins: [policy, errors, email, phone, name, handlers],
  props: {
    markId: {
      type: [Number, String],
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      default: '',
    },
    dealerId: {
      type: [Number, String],
      default: '',
    },
    modelId: {
      type: [Number, String],
      default: '',
    },
  },
  data () {
    return {
      isLoading: false,
      form: {
        name: {
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
        },
        policy: {
          value: false,
          error: false,
        },
        comment: {
          value: '',
          errors: [],
        },
      },
      observer: null,
      isBtnFixed: false,
    }
  },
  computed: {
    hasError () {
      return (errors) => {
        return Boolean(errors.length)
      }
    },
    runSuffixPosition () {
      const startPosition = 25
      const value = this.form.run.value
      const length = value.toString().length

      if (length) {
        return startPosition + length * 8
      }

      return startPosition
    },
    ...mapState(useResizeStore, ['windowWidth']),
  },
  watch: {
    windowWidth () {
      this.toggleObserver()
    },
  },
  mounted () {
    this.toggleObserver()
  },
  beforeUnmount () {
    const target = document.querySelector('#bottomBorderForm')

    if (target && this.observer) {
      this.observer.unobserve(target)
      this.observer = null
    }
  },
  methods: {
    submit () {
      const isAllValid = this.validFormRequired()

      if (!isAllValid) {
        return false
      }

      this.isLoading = true
      this.$emit('submit', this.form)

      setTimeout(() => {
        this.isLoading = false
      }, 5000)
    },
    toggleObserver () {
      const target = document.querySelector('#bottomBorderForm')

      if (!target) {
        return false
      }

      if (this.windowWidth < 600 && !this.observer) {
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              this.isBtnFixed = !entry.isIntersecting
            })
          },
          {
            threshold: 1.0,
          },
        )

        this.observer.observe(target)
      } else if (this.windowWidth >= 600 && this.observer) {
        this.isBtnFixed = false
        this.observer.unobserve(target)
        this.observer = null
      }
    },
    setFormData (value, formName) {
      this.form[formName].value = value
    },
    hasAllValidProps () {
      return [this.time, this.date, this.dealerId, this.markId, this.modelId].every(Boolean)
    },
    validFormRequired () {
      this.clearErrorsInForms()

      const isAllMainValid = this.checkForm()
      const isAllPropsValid = this.hasAllValidProps()
      const isAllValid = this.hasAllRequiredFormData && isAllMainValid && isAllPropsValid

      this.$emit('setValuesErrors', !isAllValid)

      return isAllValid
    },
    clearErrorsInForms () {
      for (const key in this.form) {
        if (Array.isArray(this.form[key].errors)) {
          this.form[key].errors = []
        } else {
          this.form[key].error = false
        }
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.testdrive-online-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: fit-content;

  &__body {
    display: grid;
    grid-gap: 30px;
    border-bottom: 1px solid var(--grayLight);

    &_offset-bottom {
      margin-bottom: 85px;
    }
  }

  &__row {
    display: grid;
    grid-gap: 30px;

    @include mq($bp-small) {
      grid-template-columns: 1fr 1fr;
      grid-gap: 15px;
    }
  }

  &__input {
    position: relative;
    display: grid;
  }

  &__suffix {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 25px;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  &__hr {
    border-color: var(--grayMediumLight);
  }

  &__block {
    display: flex;
    flex-direction: column;

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }

    &-title {
      @include label;
    }

    &-arrow {
      width: 24px;
      height: 24px;

      &_open {
        transform: rotate(180deg);
      }
    }

    &-box {
      display: grid;
      grid-gap: 30px;
      height: 0;
      overflow: hidden;
      transition: height 0.3s;

      &_open {
        overflow: visible;
      }

      & > div {
        &:first-child {
          margin-top: 30px;
        }
      }
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 0;
    background: #fff;

    &_fixed {
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 20px 0;
    }

    @include mq($bp-small) {
      padding: 40px 0;
    }

    @include mq($bp-medium) {
      position: sticky;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }

  .disclaimer {
    @include text_medium_regular;

    display: grid;
    grid-auto-flow: column;
    gap: 8px;
    align-items: flex-start;
    padding: 16px;
    color: var(--blackLight);
    background: var(--grayLight);
    border-radius: 6px;

    &__icon {
      width: 24px;
      height: 24px;
      padding: 2px;

      :deep(.icon__circle)  {
        stroke: var(--blackLight);
      }

      :deep(.icon__path) {
        fill: var(--blackLight);
      }
    }
  }
}
</style>
