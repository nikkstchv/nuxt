<template>
  <section class="feedback-dealer-block">
    <div class="feedback-dealer-block__container">
      <h2 class="feedback-dealer-block__title">
        Нам очень жаль
      </h2>
      <p class="feedback-dealer-block__text">
        Расскажите, подробнее, что пошло не так?
      </p>
    </div>
    <form class="feedback-dealer-block__form">
      <UIBaseSelectInput
        v-model="form.dealer.value"
        :options="optionsDealers"
        :errors="form.dealer.errors"
        :required="form.dealer.isRequire"
        class="feedback-dealer-block__input"
        fly-placeholder="Дилерский центр"
        :disable="$route.params.dealer"
        @onSetSelect="setDealer"
      />
      <FormInputName
        v-model="form.firstname.value"
        class="feedback-dealer-block__input"
        name="firstname"
        :errors="form.firstname.errors"
        :required="form.firstname.isRequire"
      />
      <FormInputPhone
        v-model="form.phone.value"
        class="feedback-dealer-block__input"
        :errors="form.phone.errors"
        :required="form.phone.isRequire"
      />
      <UIBaseTextarea
        v-model.trim="form.comment.value"
        :required="form.comment.isRequire"
        class="
          feedback-dealer-block__input feedback-dealer-block__input_textarea
        "
        label="Комментарий"
      />
      <FormCheckboxPolicy
        v-model="form.policy.value"
        :error="form.policy.error"
      />
      <FormInputRobot
        v-model="form.robot.value"
        class="feedback-dealer-block__input feedback-dealer-block__input_robot"
      />
      <UIBaseButton
        class="feedback-dealer-block__button"
        :is-loading="isLoading"
        :disable="!hasAllRequiredFormData || isLoading"
        primary
        text="Отправить отзыв"
        @click="handleSubmitButton"
      />
    </form>
  </section>
</template>

<script>
import {
  errors,
  handlers,
  dealers,
  firstname,
  phone,
  robot,
  policy,
} from '@/components/Form/mixins'

export default {
  name: 'FeedbackDealerForm',
  mixins: [dealers, firstname, phone, errors, handlers, robot, policy],
  props: {
    dealerName: {
      type: String,
      required: false,
      default: '',
    },
  },
  data () {
    return {
      isLoading: false,
      isFinish: false,
      optionsDealers: null,
      form: {
        dealer: {
          value: this.dealerName,
          errors: [],
          isRequire: true,
        },
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
    }
  },
  computed: {
    additionalData () {
      return {
        formId: 'form_dealer_feedback',
      }
    },
  },
  async mounted () {
    await this.fetchDealers()
  },
  methods: {
    async handleSubmitButton () {
      const res = await this.handleSubmit()
      if (res) {
        this.$emit('handlePhaseChange', 'finally')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.feedback-dealer-block {
  display: grid;
  grid-gap: 40px;
  width: 100%;
  max-width: 400px;
  margin: auto;

  @include mq($bp-small) {
    grid-gap: 50px;
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
  }

  &__title {
    @include label;

    @include mq($bp-small) {
      @include h4;
    }

    @include mq($bp-medium-big) {
      @include h3;
    }
  }

  &__text {
    @include text_small_regular;

    color: var(--blackLight);

    @include mq($bp-small) {
      @include text_big_regular;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    grid-gap: 25px;
  }
}
</style>
