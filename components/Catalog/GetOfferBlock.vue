<template>
  <section
    class="get-offer-block"
    :class="{ 'get-offer-block_finally': isFinish }"
  >
    <template v-if="!isFinish">
      <div class="get-offer-block__container">
        <h2 class="get-offer-block__title">
          {{ title }}
        </h2>
        <p class="get-offer-block__text">
          Отправьте заявку. Мы найдем для вас другое выгодное предложение.
        </p>
      </div>
      <form class="get-offer-block__form">
        <FormInputName
          v-model="form.firstname.value"
          class="get-offer-block__input"
          name="firstname"
          placeholder
          :errors="form.firstname.errors"
          :required="form.firstname.isRequire"
        />
        <FormInputPhone
          v-model="form.phone.value"
          class="get-offer-block__input"
          :errors="form.phone.errors"
          :required="form.phone.isRequire"
          placeholder
        />
        <UIBaseTextarea
          v-model.trim="form.comment.value"
          class="get-offer-block__input get-offer-block__input_textarea"
          label="Предпочтения"
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
          class="get-offer-block__button"
          primary
          large
          text="Отправить"
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
  errors,
  handlers,
  firstname,
  phone,
  robot,
  policy,
} from '@/components/Form/mixins'

export default {
  name: 'DetailGetOfferBlock',
  mixins: [firstname, phone, errors, handlers, robot, policy],
  props: {
    formId: {
      type: String,
      required: false,
      default: '',
    },
    markName: {
      type: String,
      required: false,
      default: '',
    },
    modelName: {
      type: String,
      required: false,
      default: '',
    },
  },
  data: () => ({
    isFinish: false,
    isLoading: false,
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
    title () {
      if (this.markName || this.modelName) {
        return `${this.markName} ${this.modelName} сейчас нет в наличии`
      }
      return 'Сейчас нет в наличии'
    },
    additionalData () {
      return {
        formId: this.formId,
      }
    },
  },
  methods: {
    handleClose () {
      this.isFinish = false
    },
  },
}
</script>

<style lang="scss" scoped>
.get-offer-block {
  display: grid;
  padding: 20px 15px 30px;
  background-color: var(--grayLight);

  @include mq($bp-small-medium) {
    padding: 20px 20px 30px;
  }

  @include mq($bp-small) {
    padding: 40px;
  }

  @include mq(700px) {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: column;
    grid-gap: 50px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 40px;
    padding: 44px;
  }

  &_finally {
    grid-template-columns: 1fr;
  }

  &__container {
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
    max-width: 377px;

    @include mq($bp-small-medium) {
      grid-gap: 20px;
    }

    @include mq(700px) {
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
    grid-gap: 25px;

    @include mq(700px) {
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
