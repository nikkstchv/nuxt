<template>
  <section class="credit-block" :class="{ 'credit-block_finally': isFinish }">
    <template v-if="!isFinish">
      <div class="credit-block__container">
        <h2 class="credit-block__title">
          Заявка на кредит
        </h2>
        <p class="credit-block__text">
          Специалист кредитного отдела {{ brand }} свяжется с вами в ближайшее
          время и расскажет о выгодных предложениях покупки автомобиля
          {{ brand }} {{ model }} в кредит.
        </p>
      </div>
      <form v-if="!isFinish" class="credit-block__form">
        <FormInputName
          v-model="form.firstname.value"
          class="credit-block__input"
          name="firstname"
          :errors="form.firstname.errors"
          :required="form.firstname.isRequire"
        />
        <FormInputPhone
          v-model="form.phone.value"
          class="credit-block__input"
          :errors="form.phone.errors"
          :required="form.phone.isRequire"
        />
        <UIBaseSelectInput
          v-model="form.dealer.value"
          :options="optionsDealers"
          :errors="form.dealer.errors"
          :required="form.dealer.isRequire"
          class="credit-block__input credit-block__input_indent"
          fly-placeholder="Дилерский центр"
          :disable="!optionsDealers"
          @onSetSelect="setDealer"
        />
        <UIBaseTextarea
          v-model.trim="form.comment.value"
          class="credit-block__input"
          label="Комментарий"
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
          class="credit-block__button"
          primary
          text="Отправить"
          large
          :is-loading="isLoading"
          :disable="!hasAllRequiredFormData || isLoading"
          @click="handleSubmit"
        />
      </form>
    </template>
    <FormFinallyBlock
      v-else
      class="form__block-finally"
      @handleClose="handleClose"
    />
  </section>
</template>

<script>
import {
  dealers,
  errors,
  firstname,
  handlers,
  phone,
  policy,
  robot,
} from '@/components/Form/mixins'

export default {
  name: 'CreditBlock',
  mixins: [firstname, phone, errors, handlers, dealers, robot, policy],
  props: {
    brandCode: {
      type: String,
      required: false,
      default: '',
    },
    brand: {
      type: String,
      required: false,
      default: '',
    },
    model: {
      type: String,
      required: false,
      default: '',
    },
  },
  data: () => ({
    isFinish: false,
    isLoading: false,
    optionsDealers: null,
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
      comment: {
        value: '',
        errors: [],
        isRequire: false,
      },
      dealer: {
        value: '',
        errors: [],
        isRequire: false,
      },
      policy: {
        value: false,
        error: false,
      },
      robot: {
        value: '',
      },
    },
  }),
  computed: {
    additionalData () {
      const routeKey = this.isAsc ? 'credit' : ''
      return {
        formId: 'form_credit_brands',
        routeKey,
        brandCode: this.brandCode,
        brand: this.brand,
        model: this.model,
      }
    },
  },
  mounted () {
    this.fetchDealers({ markCode: this.brandCode })
  },
  methods: {
    handleClose () {
      this.isFinish = false
    },
  },
}
</script>

<style lang="scss" scoped>
.credit-block {
  display: grid;
  justify-content: center;
  padding: 20px 15px 35px;
  background-color: var(--grayLight);

  @include mq($bp-small-medium) {
    padding: 20px 20px 35px;
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

  &_finally {
    grid-template-columns: 1fr;
  }

  &__container {
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
    max-width: 350px;

    @include mq($bp-small-medium) {
      grid-gap: 20px;
    }

    @include mq($bp-small) {
      justify-self: flex-end;
      max-width: 260px;
    }

    @include mq($bp-medium-big) {
      max-width: 350px;
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
      max-width: 300px;
    }

    @include mq($bp-medium-big) {
      max-width: 350px;
    }
  }

  &__input {
    &_indent {
      margin-bottom: 10px;
    }
  }
}
</style>
