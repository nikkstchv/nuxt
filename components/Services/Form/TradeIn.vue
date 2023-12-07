<template>
  <div class="services-form-trade-in">
    <div class="services-form-trade-in__content">
      <p class="services-form-trade-in__title">
        Оценка вашего автомобиля в два клика
      </p>
      <FormInputStateNumber
        v-model="form.stateNumber.value"
        :errors="form.stateNumber.errors"
        :required="form.stateNumber.isRequire"
        label="Гос. номер авто"
        class="services-form-trade-in__input services-form-trade-in__input_state-number"
      />
      <UIBaseButton
        class="services-form-trade-in__button"
        text="Рассчитать стоимость"
        big
        large
        :disable="!hasAllRequiredFormData"
        @click="onHandleCalculate"
      />
    </div>
    <img
      src="@/assets/icons/trade-in/car-loop.svg"
      class="services-form-trade-in__image"
      alt="иконка автомобиля под лупой"
    >
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useFormStore } from '@/store/form'
import { useTradeInStore } from '@/store/tradeIn'
import {
  errors,
  handlers,
  stateNumber,
} from '@/components/Form/mixins'

export default defineNuxtComponent({
  name: 'ServicesFormTradeIn',
  mixins: [errors, handlers, stateNumber],
  props: {
    formId: {
      type: String,
      required: false,
    },
  },
  data: () => ({
    isLoading: false,
    form: {
      stateNumber: {
        value: '',
        errors: [],
        isRequire: true,
      },
    },
  }),
  computed: {
    additionalData () {
      return {
        formId: this.formId,
      }
    },
    ...mapState(useTradeInStore, ['stateNumber']),
  },
  watch: {
    stateNumber (value) {
      if (!value) {
        this.form.stateNumber.value = ''
      }
    },
  },
  methods: {
    onHandleCalculate () {
      const isAllValid = this.checkForm()
      if (isAllValid) {
        this.setStateNumber(this.form.stateNumber.value)
        this.onOpenTradeInPanel()
      }
    },
    onOpenTradeInPanel () {
      this.onOpenFormPanel('isOpenTradeIn')
    },
    ...mapActions(useFormStore, {
      onOpenFormPanel: 'onOpen',
    }),
    ...mapActions(useTradeInStore, ['setStateNumber']),
  },
})
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.services-form-trade-in {
  position: relative;
  display: grid;
  grid-gap: 30px;
  padding: 32px 0;
  border-top: 1px solid var(--grayMediumLight);
  border-bottom: 1px solid var(--grayMediumLight);

  @include mq($bp-small-medium) {
    padding: 40px 0;
  }

  @include mq($bp-small) {
    grid-auto-flow: column;
    justify-content: space-between;
  }

  @include mq($bp-medium) {
    padding: 40px;
  }

  @include mq($bp-medium-big) {
    padding: 40px 60px;
  }

  @include mq($bp-big) {
    padding: 40px 80px;
  }

  &__content {
    z-index: 1;
    display: grid;
    grid-gap: 30px;
    align-content: center;
    justify-self: flex-start;
    width: 100%;
    text-align: left;
  }

  &__input {
    @include mq($bp-small) {
      max-width: fit-content;
    }
  }

  &__title {
    @include h4;

    @include mq($bp-small) {
      @include h3;

       max-width: 310px;
    }

    @include mq($bp-medium) {
      @include h2;

      max-width: 400px;
    }

    @include mq($bp-medium-big) {
      @include h1;

      max-width: 500px;
    }
  }

  &__button {
    @include text_medium_regular;

    padding: 12px 24px;
    font-weight: 500;

    @include mq($bp-small) {
      max-width: fit-content;
    }
  }

  &__image {
    grid-row-start: 1;
    align-self: center;
    max-width: 140px;

    @include mq($bp-super-small) {
      max-width: 160px;
    }

    @include mq($bp-small-medium) {
      max-width: 220px;
    }

    @include mq($bp-small) {
      max-width: 260px;
    }

    @include mq($bp-medium) {
      max-width: 345px;
    }

    @include mq($bp-medium-big) {
      max-width: 463px;
    }

    @include mq($bp-super-big) {
      max-width: 627px;
    }
  }
}
</style>
