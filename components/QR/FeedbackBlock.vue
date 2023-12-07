<template>
  <section class="feedback-block">
    <div class="feedback-block__container">
      <h2 class="feedback-block__title">
        Задайте вопрос дилеру
      </h2>
    </div>
    <form class="feedback-block__form">
      <UIBaseInput
        v-model.trim="form.name.value"
        class="feedback-block__input"
        label="Имя"
        autocomplete="name"
        first-symbol-up
        hide-clear
      />
      <UIBaseInput
        v-model.trim="form.phone.value"
        mask="+# ###-###-##-##"
        class="feedback-block__input feedback-block__input_indent"
        label="Телефон"
        type="tel"
        autocomplete="tel"
        hide-clear
        :on-blur="checkPhone"
        @click="focusPhone"
      />
      <UIBaseSelectInput
        v-model="form.dealer.value"
        :options="optionsDealers"
        class="feedback-block__input"
        fly-placeholder="Дилерский центр"
        :disable="!optionsDealers"
        @onSetSelect="setDealer"
      />
      <UIBaseTextarea v-model.trim="form.text.value" label="Комментарий" />
      <UIBaseButton
        class="feedback-block__button"
        primary
        text="Отправить"
        :disable="false"
      />
    </form>
  </section>
</template>

<script setup>
import uniqBy from 'lodash/uniqBy'

import { getDealers as getDealersPath } from '@/api/routes/dealer'
import { validationPhone } from '@/assets/scripts/validation'

const REQUIRED_MESSAGE = 'Необходимо заполнить поле'
const form = ref({
  name: {
    value: '',
    errors: [],
  },
  phone: {
    value: '',
    errors: [],
  },
  dealer: {
    value: '',
  },
  text: {
    value: '',
  },
})

const getDealers = async () => {
  const {
    $fetchClient,
    $hasErrorResponse,
  } = useNuxtApp()
  const res = await $fetchClient(getDealersPath())
  if (!$hasErrorResponse(res)) {
    return res.data ?? null
  }
}

const dealers = await getDealers()
const setDealer = (value) => {
  form.value.dealer.value = value
}
watch(() => form.value.name.value, (value) => {
  clearErrorsInForm('name')
  if (!value) {
    addErrorInFormErrors('name', REQUIRED_MESSAGE)
  }
})

const initDealers = (dealers) => {
  const dealersFormatted = dealers?.map(({ nameRu }) => ({
    name: nameRu,
    isActive: false,
  }))
  return uniqBy(dealersFormatted, 'name')
}

const optionsDealers = initDealers(dealers)

// methods

const checkPhone = () => {
  clearErrorsInForm('phone')
  const isPhoneEmpty = form.value.phone.value.length === 0

  if (!validationPhone(form.value.phone.value) && !isPhoneEmpty) {
    addErrorInFormErrors('phone', 'Некорректный формат телефона.')
  }
}

const focusPhone = () => {
  clearErrorsInForm('phone')
  if (!form.value.phone.value) {
    form.value.phone.value = '+7 '
  }
}

const addErrorInFormErrors = (formName, message) => {
  form.value[formName].errors.push(message)
}

const clearErrorsInForm = (name) => {
  form.value[name].errors = []
}
</script>

<style lang="scss" scoped>
.feedback-block {
  display: grid;
  padding: 20px 15px 30px;
  background-color: var(--grayLight);

  @include mq($bp-small-medium) {
    padding: 20px 20px 30px;
  }

  @include mq($bp-small) {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: column;
    grid-gap: 50px;
    padding: 44px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 40px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
    max-width: 377px;

    @include mq($bp-small-medium) {
      grid-gap: 20px;
    }

    @include mq($bp-small) {
      justify-self: flex-end;
    }
  }

  &__title {
    @include label;

    @include mq($bp-small) {
      @include h3;
    }

    @include mq($bp-medium-big) {
      @include h2;
    }
  }

  &__text {
    @include text_small_regular;

    margin-bottom: 25px;
    color: var(--blackLight);

    @include mq($bp-small) {
      @include text_big_regular;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
    max-width: 350px;

    @include mq($bp-small) {
      grid-gap: 20px;
    }
  }

  &__input {
    &_indent {
      margin-bottom: 10px;
    }
  }
}
</style>
