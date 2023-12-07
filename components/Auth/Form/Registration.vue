<template>
  <form class="registrationForm">
    <h2 class="registrationForm__title">
      Зарегистрируйтесь для продолжения
    </h2>
    <UIBaseInput
      v-model.trim="form.surname.value"
      class="registrationForm__input"
      label="Фамилия"
      autocomplete="family-name"
      first-symbol-up
      hide-clear
      :error="form.surname.errors.length !== 0"
      :errors="form.surname.errors"
      :on-blur="() => validFormRequired('surname')"
    />
    <UIBaseInput
      v-model.trim="form.name.value"
      label="Имя"
      autocomplete="name"
      first-symbol-up
      hide-clear
      :error="form.name.errors.length !== 0"
      :errors="form.name.errors"
      :on-blur="() => validFormRequired('name')"
    />
    <!--    <UIBaseInput-->
    <!--      v-model.trim="form.patronymic.value"-->
    <!--      label="Отчество"-->
    <!--      autocomplete="additional-name"-->
    <!--      first-symbol-up-->
    <!--      hide-clear-->
    <!--      :error="form.patronymic.errors.length !== 0"-->
    <!--      :errors="form.patronymic.errors"-->
    <!--      :on-blur="() => validFormRequired('patronymic')"-->
    <!--    />-->
    <UIBaseInput
      v-model.trim="form.phone.value"
      label="Телефон"
      type="tel"
      autocomplete="tel"
      hide-clear
      :errors="form.phone.errors"
      :error="form.phone.errors.length !== 0"
      :on-blur="checkPhone"
      @click="focusPhone"
    />
    <!--    <UIBaseInput-->
    <!--      v-model.trim="form.email.value"-->
    <!--      label="E-mail"-->
    <!--      type="email"-->
    <!--      autocomplete="email"-->
    <!--      hide-clear-->
    <!--      :error="form.email.errors.length !== 0"-->
    <!--      :errors="form.email.errors"-->
    <!--      :on-blur="validEmail"-->
    <!--      :on-focus="() => clearErrorsInForm('email')"-->
    <!--    />-->
    <UIBaseInput
      v-model.trim="form.pass.value"
      label="Пароль"
      type="password"
      hide-clear
      :error="form.repeatPass.errors.length !== 0"
    />
    <UIBaseInput
      v-model.trim="form.repeatPass.value"
      label="Повторите пароль"
      type="password"
      hide-clear
      :error="form.repeatPass.errors.length !== 0"
      :errors="form.repeatPass.errors"
      :on-blur="validPass"
      :on-focus="() => clearErrorsInForm('repeatPass')"
    />
    <footer class="registrationForm__footer">
      <UIBaseButton
        class="registrationForm__button"
        primary
        large
        text="Зарегистрироваться"
        :disable="isActiveSubmit"
        @click="checkForm"
      />
      <client-only>
        <UIBaseCheckbox
          v-model="form.policy.value"
          :value="form.policy.value"
          class="registrationForm__checkbox"
          :class="{ registrationForm__checkbox_error: form.policy.error }"
        >
          Согласен с

          <UIBaseButton
            to="/terms-of-use/"
            class="registrationForm__checkbox-button"
            underline
            text="пользовательское соглашение"
          />

          и
          <UIBaseButton
            to="/consent-to-processing/"
            class="registrationForm__checkbox-button"
            underline
            text="условия обработки персональных данных"
          />
        </UIBaseCheckbox>
      </client-only>
    </footer>
  </form>
</template>

<script>
import { validationEmail, validationPhone } from '@/assets/scripts/validation'

const requiredMessage = 'Необходимо заполнить поле'

export default {
  name: 'AuthRegistrationForm',
  data: () => ({
    form: {
      name: {
        value: '',
        errors: [],
      },
      surname: {
        value: '',
        errors: [],
      },
      patronymic: {
        value: '',
        errors: [],
      },
      phone: {
        value: '',
        errors: [],
      },
      email: {
        value: '',
        errors: [],
      },
      pass: {
        value: '',
        errors: [],
      },
      repeatPass: {
        value: '',
        errors: [],
      },
      policy: {
        value: false,
        error: false,
      },
    },
  }),
  computed: {
    isActiveSubmit () {
      return Object.values(this.form).some(item => !item.value)
    },
  },
  watch: {
    'form.name.value' (value) {
      this.clearErrorsInForm('name')
      if (!value) {
        this.addErrorInFormErrors('name', requiredMessage)
      }
    },
    'form.surname.value' (value) {
      this.clearErrorsInForm('surname')
      if (!value) {
        this.addErrorInFormErrors('surname', requiredMessage)
      }
    },
    'form.patronymic.value' (value) {
      this.clearErrorsInForm('patronymic')
      if (!value) {
        this.addErrorInFormErrors('patronymic', requiredMessage)
      }
    },
    'form.email.value' () {
      this.validEmail()
    },
    'form.policy.value' () {
      this.form.policy.error = false
    },
  },
  methods: {
    getTokenHashWS () {
      // const year = new Date().getUTCFullYear()
      // const month = new Date().getUTCMonth() + 1
      // const date = new Date().getUTCDate()
      // const token = '171a4632247a29875b37233de8e5b2a0'
      // return md5(`${token}${year}${month}${date}`).toString()
    },
    formatedPhone () {
      return this.form.phone.value
        .replace('+', '')
        .replace(' ', '')
        .replaceAll('-', '')
    },
    registerUser () {
      // const userInfo = await this.$axios.$post(
      //   '/mttest/api/dev/GetClientWebAccessInfo',
      //   {
      //     Surname: this.form.surname.value, // Фамилия
      //     FirstAndMiddleName: this.form.name.value, // Имя Отчество
      //     PhoneNumber: this.formatedPhone(), // Номер мобильного телефона (только цифры)
      //     AppInfo: {
      //       AppID: '0012', // идентификатор приложения, текстовое поле
      //       TokenHashWS: this.getTokenHashWS(), // MD5 хеш токена с солью
      //     },
      //   }
      // )
    },
    checkPhone () {
      this.clearErrorsInForm('phone')
      const isPhoneEmpty = this.form.phone.value.length === 0

      if (!validationPhone(this.form.phone.value) && !isPhoneEmpty) {
        this.addErrorInFormErrors('phone', 'Некорректный формат телефона.')
      } else if (!isPhoneEmpty) {
        this.addErrorInFormErrors(
          'phone',
          'Пользователь с таким телефоном уже существует.',
        )
      }
    },
    focusPhone () {
      this.clearErrorsInForm('phone')
      if (!this.form.phone.value) {
        this.form.phone.value = '+7 '
      }
    },
    addErrorInFormErrors (formName, message) {
      this.form[formName].errors.push(message)
    },
    clearErrorsInForm (name) {
      this.form[name].errors = []
    },
    validEmail () {
      this.clearErrorsInForm('email')
      if (
        !validationEmail(this.form.email.value) &&
        this.form.email.value.length !== 0
      ) {
        this.addErrorInFormErrors('email', 'Некорректный формат e-mail')
      }
    },
    validPass () {
      this.clearErrorsInForm('repeatPass')
      if (this.form.pass.value !== this.form.repeatPass.value) {
        this.addErrorInFormErrors('repeatPass', 'Введенные пароли не совпадают')
      }
    },
    validFormRequired (formName) {
      this.clearErrorsInForm(formName)
      if (!this.form[formName].value) {
        this.addErrorInFormErrors(formName, requiredMessage)
      }
    },
    checkForm () {
      this.checkName()
      this.validEmail()
      this.checkPolicy()
    },
    checkName () {
      this.clearErrorsInForm('name')
      if (!this.form.name.value) {
        this.addErrorInFormErrors('name', requiredMessage)
      }
    },
    checkPolicy () {
      if (this.form.policy.value === false) {
        this.form.policy.error = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.registrationForm {
  display: grid;
  grid-gap: 40px;
  width: 100%;
  max-width: 400px;

  @media (min-width: $bp-small-medium + 1) and (max-width: $bp-medium) {
    padding-top: 100px;
  }

  @media (max-width: $bp-small-medium) {
    grid-gap: 30px;
    max-width: 290px;
    padding-top: 50px;
  }

  &__title {
    @include h3;

    @media (max-width: $bp-super-small) {
      @include h5;
    }
  }

  &__footer {
    @media (max-width: $bp-small-medium) {
      padding-top: 10px;
    }
  }

  &__button {
    margin-bottom: 20px;
  }

  &__checkbox {
    & :deep(.checkbox__checkmark) {
      border: 1.5px solid var(--grayDark);
    }

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

  &__link-to {
    justify-self: center;
    margin-top: 60px;

    @media (min-width: $bp-medium + 1) {
      display: none;
    }
  }
}
</style>
