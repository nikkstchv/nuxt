<template>
  <div
    class="sale-calculator"
    :class="{ 'sale-calculator_with_checkboxes': showDiscounts }"
  >
    <section v-if="showDiscounts" class="sale-calculator__container">
      <p class="sale-calculator__title">
        Условия сделки
        <span
          class="sale-calculator__title-info"
          :class="{
            'sale-calculator__title-info_disable': !isSomeCheckedCheckboxes,
          }"
        >Выгода
        </span>
      </p>
      <section class="sale-calculator__checkbox-list">
        <div
          v-for="item in discount"
          :key="item.name"
          class="sale-calculator__checkbox-item"
          :class="{ 'sale-calculator__checkbox-item_hidden': !item.value }"
        >
          <div class="sale-calculator__checkbox-header">
            <UIBaseCheckboxSlide
              v-model="item.checked"
              class="sale-calculator__single-checkbox"
              :label="item.name"
              :value="item.value"
            />
            <span
              v-show="isShowDiscount(item.value)"
              class="sale-calculator__profit"
              :class="{ 'sale-calculator__profit_disable': !item.checked }"
            >- {{ $toLocalPrice(item.value) }} ₽</span>
          </div>
          <UIBaseButton
            v-show="isShowButtonDiscount(item)"
            class="sale-calculator__checkbox-button"
            underline
            :text="item.button_text"
            @click="item.onClick"
          />
        </div>
      </section>
    </section>
    <section class="sale-calculator__prices">
      <ul
        v-if="isSomeDiscount && calculateProfit"
        class="sale-calculator__list"
      >
        <li class="sale-calculator__list-item">
          Базовая стоимость
          <span>{{ $toLocalPrice(price) }} ₽</span>
        </li>
        <li class="sale-calculator__list-item">
          <span class="sale-calculator__list-item-block">
            Выгода
            <UIInfoIconWithPopup
              v-if="calculateProfitSales"
              class="sale-calculator__popup"
            >
              <p
                v-for="{ name, value } in allSalesElements"
                :key="name"
                class="sale-calculator__popup-item"
              >
                {{ name }}
                <span class="sale-calculator__popup-price">{{
                  $toLocalPrice(value)
                }}</span>
              </p>
            </UIInfoIconWithPopup>
          </span>
          -
          {{ $toLocalPrice(calculateProfit) }}
          ₽
        </li>
      </ul>
      <p
        v-if="price"
        class="sale-calculator__list-item sale-calculator__list-item_text_big"
      >
        Итого
        <span>{{ $toLocalPrice(calculatePriceWithSale) }} ₽</span>
      </p>
    </section>
    <section class="sale-calculator__advantages">
      <div v-if="isReserved" class="sale-calculator__reserved">
        <p class="sale-calculator__reserved-text">
          Данный {{ typeOfTransport }} уже забронирован другим покупателем.
          Получите выгодное предложение на похожий {{ typeOfTransport }}.
        </p>
        <UIBaseButton
          secondary-light
          large
          text="Получить предложение"
          @click="onOpenFormPanel"
        />
      </div>
      <div v-else class="sale-calculator__button-container">
        <div v-if="isUsedCar" class="sale-calculator__history-detail">
          <img
            class="history-detail__icon"
            src="@/assets/icons/car-sale-datail.svg"
            alt="icon"
          >
          <h3 class="history-detail__title">
            Узнайте полную историю владения автомобилем
          </h3>
          <UIBaseButton
            primary
            large
            text="Получить отчет"
            class="sale-calculator__button history-detail__button"
            @click="onOpenHistoryPanel"
          />
        </div>
        <UIBaseButton
          secondary
          large
          text="Забронировать"
          class="sale-calculator__button"
          @click="onHandleBookButton"
        />
        <UIBaseButton
          secondary
          large
          text="Получить предложение"
          class="sale-calculator__button"
          @click="onOpenFormPanel"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { usePayStore } from '../../store/pay'
import { useFormStore } from '../../store/form'
import { useCarStore } from '../../store/car'
import { useTradeInStore } from '../../store/tradeIn'

export default {
  name: 'BuyBlock',
  data () {
    return {
      discount: {
        tradeIn: {
          value: useCarStore().allData.discounts.tradeinDiscount,
          name: 'Трейд-ин',
          checked: true,
          button_text: 'Заявка на трейд-ин',
          onClick: this.onOpenTradeInPanel,
        },
        credit: {
          value: useCarStore().allData.discounts.creditDiscount,
          name: 'Кредит',
          checked: true,
          button_text: this.credit(useCarStore().allData.credit),
          onClick: this.onOpenCreditPanel,
        },
        kasko: {
          value: useCarStore().allData.discounts.insuranceKaskoDiscount,
          name: 'КАСКО',
          checked: true,
          button_text: 'Заявка на страхование',
          onClick: this.onOpenInsurancePanel,
        },
        insurance: {
          value: useCarStore().allData.discounts.insuranceLiveDiscount,
          name: 'Страхование жизни',
          checked: true,
          button_text: '',
          onClick: () => {},
        },
        additional: {
          value: useCarStore().allData.discounts.doDiscount,
          name: 'Дополнительное оборудование',
          checked: true,
          button_text: '',
          onClick: () => {},
        },
      },
    }
  },
  fetchOnServer: false,
  computed: {
    typeOfTransport () {
      switch (this.car.typeOfTransport) {
        case '1':
          return 'автомобиль'
        case '2':
          return 'мотоцикл'
        default:
          return 'автомобиль'
      }
    },
    isReserved () {
      return this.car.statusForWeb === 'В резерве'
    },
    isUsedCar () {
      const isUsed = this.car?.technicalInfo?.isNew === 'С пробегом'
      const isCar = this.car?.codes?.carType === 'cars'
      return isUsed && isCar
    },
    utp () {
      return this.car.utp
    },
    isSomeDiscount () {
      return (
        this.allSalesElements.length > 0 || this.disprice !== this.price
      // (this.disprice !== this.price || this.price - this.disprice < 100)
      )
    },
    showDiscounts () {
      const sum = Object.values(this.discount).reduce((acc, cur) => {
        return parseInt(acc) + parseInt(cur.value)
      }, 0)
      return sum > 100
    },
    disprice () {
      return this.car.disprice
    },
    price () {
      return this.car.price
    },
    isSomeCheckedCheckboxes () {
      return Object.values(this.discount).some(item => item.checked)
    },
    allSalesElements () {
      return Object.values(this.discount).filter(
        item => item.checked && item.value,
      )
    },
    calculatePriceWithSale () {
      const priceWithSale = this.price - this.calculateProfitSales
      if (priceWithSale !== this.price) {
        this.setPaySum(priceWithSale)
        return priceWithSale
      } else if (this.disprice !== this.price && !this.showDiscounts) {
        this.setPaySum(this.disprice)
        return this.disprice
      } else {
        this.setPaySum(this.price)
        return this.price
      }
    },
    calculateProfitSales () {
      // eslint-disable-next-line array-callback-return
      return Object.values(this.allSalesElements).reduce((acc, cur) => {
        return parseInt(acc) + parseInt(cur.value)
      }, 0)
    },
    calculateProfitWithoutSales () {
      return this.price - this.disprice
    },
    calculateProfit () {
      if (this.calculateProfitSales === 0 && !this.showDiscounts) {
        return this.calculateProfitWithoutSales
      } else if (this.calculateProfitSales === 0) {
        return 0
      } else if (
        this.calculateProfitWithoutSales - this.calculateProfitSales ===
          1000
      ) {
        return this.calculateProfitWithoutSales
      } else {
        return this.calculateProfitSales
      }
    },
    isShowDiscount () {
      return (discount) => {
        return discount && discount !== 0
      }
    },
    discounts () {
      return this.car.discounts
    },
    ...mapState(useCarStore, {
      googleAnalyticsData: 'googleAnalyticsData',
      car: 'allData',
    }),
    ...mapState(useTradeInStore, {
      tradeInResultPrice: 'resultPrice',
      tradeInUserTransport: 'userTransport',
    }),
  },
  watch: {
    allSalesElements (discounts) {
      this.setDiscounts(discounts)
    },
    tradeInResultPrice (value) {
      if (value) {
        this.discount.tradeIn.value = value * 100
      } else {
        // this.discount.tradeIn.value = this.car.discounts.tradeinDiscount
      }
    },
    tradeInUserTransport (value) {
      if (value) {
        this.discount.tradeIn.button_text = `${value.mark} ${value.model}`
      } else {
        this.discount.tradeIn.button_text = 'Указать параметры'
      }
    },
  },
  mounted () {
    this.setDiscounts()
    this.setTradeIn()
  },
  methods: {
    setDiscounts () {
      this.setDiscountsToStore(this.allSalesElements.map(({ name, value }) => ({
        name,
        value,
      })))
    },
    setPaySum (price) {
      this.setPaySumStore(price)
    },
    setTradeIn () {
      try {
        const tradeIn = JSON.parse(localStorage.getItem('tradeIn'))
        if (tradeIn?.resultPrice) {
          this.discount.tradeIn.value = tradeIn.resultPrice * 100
        }
        if (tradeIn?.userTransport?.mark) {
          this.discount.tradeIn.button_text = `${tradeIn.userTransport.mark} ${tradeIn.userTransport.model}`
        }
      } catch (e) {}
    },
    isShowButtonDiscount (item) {
      return item.button_text && item.checked
    },
    credit (creditPayment) {
      if (creditPayment && creditPayment > 0) {
        return `${this.$toLocalPrice(creditPayment)} ₽/мес., 36 мес.`
      }
      return 'Заявка на кредит'
    },
    sendGoogleAnalyticsData () {
      const body = {
        ecommerce: this.googleAnalyticsData,
        event: 'GAEventEC',
        eCategory: 'eEC',
        eAction: 'add_to_cart',
        eLabel: '',
      }
      this.$gtm.trackEvent(body)
    },
    onOpenHistoryPanel () {
      this.onOpenFormPanel('isOpenHistory')
    },
    onOpenCreditPanel () {
      this.onOpenFormPanel('isOpenCredit')
    },
    onOpenInsurancePanel () {
      this.onOpenFormPanel('isOpenInsurance')
    },
    onOpenTradeInPanel () {
      this.onOpenFormPanel('isOpenTradeIn')
    },
    onHandleBookButton () {
      this.onOpenPayPanel()
      this.sendGoogleAnalyticsData()
    },
    ...mapActions(usePayStore, {
      onOpenPayPanel: 'onOpen',
      setDiscountsToStore: 'setDiscounts',
      setPaySumStore: 'setPaySum',
    }),
    ...mapActions(useFormStore, {
      onOpenFormPanel: 'onOpen',
    }),
  },
}
</script>

<style lang="scss" scoped>
.sale-calculator {
  display: grid;
  grid-template-areas:
    'price'
    'advantages';
  grid-auto-flow: column;
  padding: 20px 15px 40px;
  margin-bottom: 25px;

  @include mq($bp-super-small) {
    grid-gap: 15px;
    padding: 30px 15px 40px;
  }

  @include mq($bp-small-medium) {
    grid-gap: 15px;
    padding: 30px 20px 40px;
    margin-bottom: 0;
  }

  @include mq($bp-small) {
    grid-auto-flow: column;
    grid-gap: 20px;
    column-gap: 50px;
    padding: 40px 32px;
  }

  @include mq($bp-medium) {
    padding: 0;
    background: transparent;
  }

  &__history-detail {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    padding: 20px;
    overflow: hidden;
    border: 1px solid var(--grayMediumLight);
    border-radius: 8px;

    @include mq($bp-medium-big) {
      padding: 28px 24px;
    }

    .history-detail {
      &__title {
        max-width: 70%;
        margin-bottom: 16px;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: var(--black);
      }

      &__icon {
        position: absolute;
        top: calc(50% - 61px);
        right: 0;
        width: 116px;
        height: auto;

        @include mq($bp-medium) {
          right: -30px;
        }

        @include mq($bp-big) {
          right: -25px;
        }
      }

      &__button {
        display: flex;
        flex-shrink: 1;
        width: auto;
        margin-right: auto;
      }
    }
  }

  &_with_checkboxes {
    grid-template-areas:
      'checkboxes'
      'price'
      'advantages';

    @include mq($bp-small) {
      grid-template-areas: 'checkboxes price' 'checkboxes advantages';
      grid-template-columns: 1fr 1fr;
    }

    @include mq($bp-medium) {
      grid-template-areas:
        'checkboxes'
        'price'
        'advantages';
      grid-template-columns: 1fr;
    }
  }

  &__title {
    @include label;

    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;

    @media (max-width: $bp-super-small) {
      @include text_medium_bold;

      font-weight: 600;
    }

    @media (min-width: $bp-medium + 1) {
      margin-bottom: 20px;
    }

    &-info {
      @include text_medium_regular;

      color: var(--blackLight);

      &_disable {
        color: var(--grayDark);
      }
    }
  }

  &__list {
    display: grid;
    grid-gap: 10px;
    margin-bottom: 15px;
  }

  &__list-item {
    @include text_small_regular;

    display: flex;
    justify-content: space-between;
    color: var(--blackLight);

    &_text_big {
      @include label;

      margin-bottom: 3px;
      color: var(--black);

      @media (max-width: $bp-super-small) {
        @include text_medium_bold;

        margin-bottom: 7px;
      }

      @media (min-width: $bp-small + 1) and (max-width: $bp-medium) {
        margin-bottom: 5px;
      }

      @media (min-width: $bp-big + 1) {
        margin-bottom: 1px;
      }
    }

    &_text_bold {
      font-weight: 500;
      color: var(--black);

      @media (min-width: $bp-super-small + 1) {
        @include text_medium_small;
      }
    }

    &-block {
      position: relative;
      display: grid;
      grid-auto-flow: column;
      grid-gap: 10px;
      align-items: center;
    }
  }

  &__prices {
    display: grid;
    grid-area: price;
    margin-bottom: 20px;

    @include mq($bp-small) {
      margin-bottom: 0;
    }
  }

  &__price {
    &-title {
      text-decoration: line-through;
    }
  }

  &__container {
    display: grid;
    grid-area: checkboxes;
    grid-auto-rows: max-content;
    padding-bottom: 25px;

    @include mq($bp-small) {
      padding-bottom: 0;
    }

    @include mq($bp-medium) {
      padding-bottom: 30px;
    }
  }

  &__profit {
    @include text_medium;

    color: var(--blackLight);

    &_disable {
      color: var(--grayDark);
    }
  }

  &__checkbox-header {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
    align-items: center;
    justify-content: space-between;
  }

  &__checkbox-list {
    display: grid;
    grid-auto-rows: max-content;
    grid-gap: 30px;
  }

  &__checkbox-item {
    display: grid;
    grid-gap: 10px;

    &_hidden {
      display: none;
    }
  }

  &__checkbox {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 5px;
    align-items: center;
    width: fit-content;

    & :deep(.checkbox__label) {
      color: var(--black);
    }

    .sale-calculator &-button {
      @include text_medium_small;

      color: var(--neonBlue);
      border-bottom: none;
    }
  }

  &__reserved {
    padding: 20px;
    background-color: var(--black);
    border-radius: 10px;

    @include mq($bp-medium) {
      margin-top: 20px;
    }

    &-text {
      @include text_big_regular;

      margin-bottom: 20px;
      color: white;
    }
  }

  &__popup {
    display: flex;

    & :deep(.icon) {
      width: 17px;
      height: 17px;
    }

    &-item {
      @include text_medium_regular;

      display: grid;
      grid-auto-flow: column;
      grid-gap: 15px;
      justify-content: space-between;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &-price {
      @include label_small;

      font-weight: 600;

      &::before {
        margin-right: 5px;
        content: '−';
      }

      &::after {
        padding-left: 5px;
        content: '₽';
      }
    }
  }

  &__button {
    margin-bottom: 15px;

    @include mq($bp-small-medium) {
      margin-bottom: 0;
    }
  }

  &__button-container {
    display: grid;

    @include mq($bp-small-medium) {
      grid-gap: 15px;
    }
  }

  .sale-calculator &__widget-sbp {
    @include mq($bp-medium) {
      display: none;
    }
  }

  &__advantages {
    grid-area: advantages;

    &-utp {
      padding-top: 25px;

      @include mq($bp-small-medium) {
        margin-bottom: 0;
      }

      & :deep(ul) {
        @include label;

        list-style-type: disc;

        @media (max-width: $bp-super-small) {
          @include text_medium_bold;
        }
      }

      & :deep(li) {
        @include text_medium_regular;

        margin-bottom: 4px;
        margin-left: 13px;
        color: var(--blackLight);

        @media (max-width: $bp-super-small) {
          @include text_small_regular;
        }
      }

      & :deep(li:first-child) {
        padding-top: 15px;
      }

      & :deep(li:last-child) {
        margin-bottom: 0;
      }
    }

    &-list {
      padding-left: 13px;
      list-style-type: disc;
    }

    &-item {
      @include text_medium_regular;

      margin-bottom: 4px;
      color: var(--blackLight);

      &:last-child {
        margin-bottom: 0;
      }

      @media (max-width: $bp-super-small) {
        @include text_small_regular;
      }
    }

    &-title {
      @include label;

      margin-bottom: 14px;

      @media (max-width: $bp-super-small) {
        @include text_medium_bold;

        margin-bottom: 15px;
      }
    }
  }
}
</style>
