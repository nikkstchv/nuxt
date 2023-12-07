<template>
  <div class="sale-calculator">
    <section class="sale-calculator__prices">
      <div class="sale-calculator__price-container">
        <p
          v-if="price"
          class="sale-calculator__price sale-calculator__price_text_big"
        >
          {{ $toLocalPrice(calculatePriceWithSale) }} ₽
        </p>
        <p
          v-if="isSomeDiscount && calculateProfit && !isReserved"
          class="sale-calculator__price sale-calculator__price_crossed-out"
        >
          {{ $toLocalPrice(price) }} ₽
        </p>
      </div>
      <p
        v-if="!isReserved"
        class="sale-calculator__price sale-calculator__price_text_bold"
        :class="{
          'sale-calculator__price_hide': !isSomeDiscount && !calculateProfit,
        }"
      >
        Выгода: {{ $toLocalPrice(calculateProfit) }} ₽
      </p>
    </section>
    <section
      v-if="showDiscounts && !isReserved"
      class="sale-calculator__container"
    >
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
            >- {{ $toLocalPrice(item.value) }} ₽
            </span>
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
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { usePayStore } from '../../../store/pay'
import { useFormStore } from '../../../store/form'
import { useCarStore } from '../../../store/car'
import { useTradeInStore } from '../../../store/tradeIn'

export default {
  name: 'DetailQrBuyBlock',
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
      return sum >= 100
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
      this.setDiscounts(this.allSalesElements.map(({ name, value }) => ({
        name,
        value,
      })))
    },
    setPaySum () {
      this.setPaySum(this.price - this.calculateProfit)
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
    onOpenInsurancePanel () {
      this.onOpenFormPanel('isOpenInsurance')
    },
    onOpenCreditPanel () {
      this.onOpenFormPanel('isOpenCredit')
    },
    onOpenTradeInPanel () {
      this.onOpenFormPanel('isOpenTradeIn')
    },
    onHandleBookButton () {
      this.onOpenPayPanel()
    },
    ...mapActions(useFormStore, {
      onOpenFormPanel: 'onOpen',
    }),
    ...mapActions(usePayStore, {
      onOpenPayPanel: 'onOpen',
      setPaySum: 'setPaySum',
      setDiscounts: 'setDiscounts',
    }),
  },
}
</script>

<style lang="scss" scoped>
.sale-calculator {
  display: grid;
  grid-gap: 28px;

  &__prices {
    display: grid;
    grid-gap: 10px;

    @include mq($bp-small) {
      margin-bottom: 0;
    }
  }

  &__price {
    @include text_small_regular;

    display: flex;
    justify-content: space-between;
    color: var(--blackLight);

    &_text_big {
      @include h2;

      color: var(--black);
    }

    &_text_bold {
      @include label;

      color: var(--black);
    }

    &_crossed-out {
      @include text_big_regular;

      color: var(--grayDark);
      text-decoration: line-through;
    }

    &_hide {
      visibility: hidden;
      opacity: 0;
    }

    &-title {
      text-decoration: line-through;
    }

    &-container {
      display: flex;
      grid-gap: 12px;
      align-items: center;
    }
  }

  &__container {
    display: grid;
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
    display: flex;
    flex-direction: column-reverse;
    grid-gap: 10px;
  }

  &__checkbox-list {
    display: grid;
    grid-auto-rows: max-content;
    grid-auto-flow: column;
    grid-gap: 40px;
    align-items: flex-start;
    width: fit-content;
  }

  &__checkbox-item {
    display: grid;
    grid-gap: 10px;
    align-items: flex-start;
    min-width: 140px;
    min-height: 80px;

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
}
</style>
