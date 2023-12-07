<template>
  <UIBaseOverlay :is-open="isOpenPay" @click="onClosePay">
    <UISidePanel class="pay-panel__side-panel" :is-open="isOpenPay" big>
      <form
        v-if="isOpenPay"
        class="pay-panel"
        :class="{ 'pay-panel_finally': isFinish }"
      >
        <header class="pay-panel__header pay-panel__section">
          <h2 class="pay-panel__title">
            Бронирование {{ typeCarTitle }}
          </h2>
          <IconClose class="pay-panel__close" @click="onClosePay" />
        </header>
        <template v-if="!isFinish">
          <section class="pay-panel__main">
            <section class="pay-panel__section">
              <h3 class="pay-panel__name">
                {{ car.mark }} {{ car.model }}
              </h3>
              <p class="pay-panel__text">
                {{ car.modification }}
              </p>
              <p class="pay-panel__text pay-panel__text_indent">
                {{ car.serie }} {{ car.generation }}
              </p>
              <ul class="pay-panel__list-sale">
                <li v-if="isShowCarPrice" class="pay-panel__item-sale">
                  Стоимость автомобиля
                  <span class="pay-panel__item-sale-value">{{ $toLocalPrice(car.price) }} ₽</span>
                </li>
                <li
                  v-for="discount in discounts"
                  :key="discount.name"
                  class="pay-panel__item-sale"
                >
                  {{ discount.name }}
                  <span class="pay-panel__item-sale-value">{{ $toLocalPrice(discount.value) }} ₽</span>
                </li>
              </ul>
              <p class="pay-panel__sum">
                Итого
                <span>{{ $toLocalPrice(paySum) }} ₽</span>
              </p>
            </section>
            <section class="pay-panel__section">
              <h3 class="pay-panel__subtitle">
                Персональные данные
              </h3>
              <div class="pay-panel__inputs">
                <FormInputName
                  v-model="form.lastname.value"
                  class="feedback__input"
                  name="lastname"
                  :errors="form.lastname.errors"
                  :required="form.lastname.isRequire"
                />
                <FormInputName
                  v-model="form.firstname.value"
                  class="feedback__input"
                  name="firstname"
                  :errors="form.firstname.errors"
                  :required="form.firstname.isRequire"
                />
                <FormInputName
                  v-model="form.middlename.value"
                  class="feedback__input"
                  name="middlename"
                  :errors="form.middlename.errors"
                  :required="form.middlename.isRequire"
                />
                <FormInputPhone
                  v-model="form.phone.value"
                  class="feedback__input"
                  :errors="form.phone.errors"
                  :required="form.phone.isRequire"
                />
                <FormInputEmail
                  v-model="form.email.value"
                  class="feedback__input"
                  :errors="form.email.errors"
                />
                <FormInputRobot
                  v-model="form.robot.value"
                  class="form__input form__input_robot"
                />
                <FormCheckboxPolicy
                  v-model="form.policy.value"
                  :error="form.policy.error"
                />
              </div>
            </section>
          </section>
          <footer class="pay-panel__footer pay-panel__section">
            <!-- <div class="pay-panel__buttons"> -->
            <UIBaseButton
              class="pay-panel__button pay-panel__button_submit"
              large
              primary
              text="Забронировать"
              :is-loading="isLoading"
              :disable="!hasAllRequiredFormData || isLoading"
              @click="handleSubmitButton"
            />
          <!--          <WidgetSBP class="sale-calculator__widget-sbp" />-->
          <!-- </div> -->
          </footer>
        </template>
        <FormFinallyBlock
          v-else
          class="form__block-finally"
          @handleClose="onClosePay"
        />
      </form>
    </UISidePanel>
  </UIBaseOverlay>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCarStore } from '../../store/car'
import { usePayStore } from '../../store/pay'
import {
  email,
  errors,
  firstname,
  handlers,
  lastname,
  middlename,
  phone,
  policy,
  robot,
} from '@/components/Form/mixins'

export default {
  name: 'PayPanel',
  mixins: [
    firstname,
    lastname,
    middlename,
    phone,
    email,
    errors,
    handlers,
    robot,
    policy,
  ],
  props: {
    calltouchWidgetSaleId: {
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
      lastname: {
        value: '',
        errors: [],
        isRequire: true,
      },
      middlename: {
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
    typeCarTitle: 'автомобиля',
  }),
  computed: {
    isShowCarPrice () {
      return this.car.price !== this.paySum
    },
    additionalData () {
      const routeKeyDefault = this.isAsc ? 'book_car' : ''
      return {
        formId: 'form_orderCar',
        routeKey: this.calltouchWidgetSaleId || routeKeyDefault,
        mark: this.car.mark,
        model: this.car.model,
        modification: this.car.modification,
        serie: this.car.serie,
        generation: this.car.generation,
        equipment: this.car.technicalInfo.equipment,
        priceForClient: this.removePenny(this.paySum),
        discounts: JSON.stringify(this.discounts),
        price: this.removePenny(this.car.price),
        disprice: this.removePenny(this.car.disprice),
        isNew: this.car.technicalInfo.isNew,
        color: this.car.technicalInfo.exteriorColorGroup,
        dealerName: this.car.technicalInfo.dealer,
        dealer: this.car.technicalInfo.dealerId,
      }
    },
    ...mapState(useCarStore, {
      googleAnalyticsData: 'googleAnalyticsData',
      car: 'allData',
    }),
    ...mapState(usePayStore, {
      isOpenPay: 'isOpen',
      paySum: 'paySum',
      discounts: 'discounts',
    }),
  },
  watch: {
    isOpenPay (isOpen) {
      if (!isOpen && !this.isFinish) {
        this.sendGoogleAnalyticsData('remove_from_cart')
      }
    },
  },

  mounted () {
    this.setTitleCarType()
  },
  methods: {
    async handleSubmitButton () {
      const isAllValid = this.checkForm()
      if (!isAllValid) {
        // this.sendErrorGoogleAnalytics()
      }
      const res = await this.handleSubmit()
      if (res) {
        this.sendGoogleAnalyticsData('purchase', res)
      }
    },
    sendErrorGoogleAnalytics () {
      const schema = {
        firstname: 'Name',
        lastname: 'Surname',
        middlename: 'Midname',
        phone: 'Tel',
        email: 'Mail',
      }
      Object.entries(this.form).forEach(([key, value]) => {
        if (value.errors?.length > 0) {
          const code = schema[key]
          const body = {
            event: 'GAEventEC',
            eCategory: 'eEC',
            eAction: 'error-purchase',
            eLabel: code,
          }
          this.$gtm.trackEvent(body)
        }
      })
    },
    sendGoogleAnalyticsData (action, data) {
      const transactionId = data?.id ?? ''
      const ecommerce = {
        transaction_id: transactionId,
        ...this.googleAnalyticsData,
      }
      const body = {
        ecommerce,
        event: 'GAEventEC',
        eCategory: 'eEC',
        eAction: action,
        eLabel: '',
      }
      this.$gtm.trackEvent(body)
    },
    removePenny (price) {
      return price.toString().slice(0, -2)
    },
    setTitleCarType () {
      const carsTypes = this.car.codes.carType
      const carTitles = {
        moto: 'мотоцикла',
        atv: 'квадроцикла',
        'jet-ski': 'гидроцикла',
      }

      this.typeCarTitle = carTitles[carsTypes] || 'автомобиля'
    },
    ...mapActions(usePayStore, {
      onClosePay: 'onClose',
    }),
  },
}
</script>

<style lang="scss" scoped>
.pay-panel {
  z-index: 10;
  display: grid;
  grid-template-rows: min-content min-content 1fr;
  height: fit-content;
  padding: 20px 0;

  @include mq($bp-small) {
    padding: 60px 0;
  }

  &_finally {
    grid-template-rows: max-content 1fr;
    height: 90%;
  }

  &__side-panel {
    padding: 0 !important;
  }

  .pay-panel &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
  }

  &__close {
    width: 35px;
    height: 35px;
    padding: 5px;
  }

  &__main {
    display: grid;
  }

  &__section {
    padding: 0 15px;
    margin-bottom: 40px;

    @include mq($bp-small-medium) {
      padding: 0 20px;
      margin-bottom: 50px;
    }

    @include mq($bp-small) {
      padding: 0 60px;
    }

    &_theme_gray {
      padding-top: 30px;
      padding-bottom: 40px;
      background-color: var(--grayLight);
    }
  }

  &__name {
    @include label;

    padding-top: 10px;
    margin-bottom: 15px;

    @include mq($bp-small-medium) {
      @include h4;
    }
  }

  &__title {
    @include h5;

    @include mq($bp-super-small) {
      @include h4;
    }

    @include mq($bp-small-medium) {
      @include h3;
    }
  }

  &__sum {
    @include label;

    display: flex;
    justify-content: space-between;
  }

  &__subtitle {
    @include label_small;

    margin-bottom: 30px;

    @include mq($bp-small-medium) {
      @include label;
    }

    &_indent_small {
      margin-bottom: 25px;
    }
  }

  &__text {
    @include text_medium_regular;

    margin-bottom: 5px;
    color: var(--grayDark);

    @include mq($bp-small-medium) {
      @include text_big_regular;

      margin-bottom: 2px;
    }

    &_indent {
      margin-bottom: 20px;

      @include mq($bp-small-medium) {
        margin-bottom: 25px;
      }
    }
  }

  &__list-sale {
    display: grid;
    grid-gap: 10px;
    height: fit-content;
    margin-bottom: 20px;
  }

  &__item {
    @include text_medium_small;

    display: flex;
    justify-content: space-between;

    &-sale {
      @include label_small;

      display: flex;
      justify-content: space-between;
      color: var(--blackLight);

      &-value {
        white-space: nowrap;
      }
    }

    &_bold {
      @include label_small;

      @include mq($bp-small-medium) {
        @include label;
      }
    }

    &-value {
      @include label_small;

      display: block;

      @include mq($bp-small-medium) {
        @include label;
      }
    }

    &_indent {
      margin-bottom: 10px;
    }
  }

  &__inputs {
    display: grid;
    grid-gap: 25px;
  }

  &__footer {
    display: grid;
    grid-gap: 40px;
    align-self: flex-end;
    height: fit-content;
  }

  &__buttons {
    display: grid;
    grid-gap: 15px;
    padding-top: 10px;

    @include mq(340px) {
      grid-template-columns: 1fr 1fr;
      grid-auto-flow: column;
      grid-gap: 20px;
    }

    @include mq($bp-small-medium) {
      padding-top: 20px;
    }
  }
}
</style>
