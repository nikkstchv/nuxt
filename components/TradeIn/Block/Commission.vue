<template>
  <section class="commission">
    <TradeInTitle class="commission__title">
      Комиссионная продажа {{ markNameRu }} {{ modelNameRu }}
    </TradeInTitle>
    <p class="commission__text">
      Комиссионная продажа в {{ holdingName }} позволит вам наиболее выгодно и
      безопасно продать{{ markNameEn ? ` ${markNameEn}` : '' }}{{ modelNameEn ? ` ${modelNameEn}` : '' }}, сэкономив время и деньги. Вы самостоятельно определяете цену, за
      которую Вы готовы продать авто, а мы берем все заботы по продаже
      автомобиля на себя.
    </p>

    <ul class="commission__list">
      <li v-for="(item, i) in list" :key="i" class="commission__item">
        <component :is="item.icon" class="commission__item-icon" />
        <p class="commission__item-text" v-html="item.text" />
      </li>
    </ul>

    <div class="commission__documents">
      <p class="commission__documents-title">
        Для комиссионной продажи вашего автомобиля необходимо:
      </p>

      <ul class="commission__documents-list">
        <li
          v-for="(item, i) in documents"
          :key="i"
          class="commission__documents-item"
        >
          <nuxt-img
            v-if="item.icon"
            class="commission__documents-icon"
            :src="item.icon"
            alt="иконка документа"
          />
          <span v-html="item.text" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
// требуется для динамического компонента иконки
import { mapState } from 'pinia'
import { useHoldingStore } from '../../../store/holding'
import IconMoneyCoins from '@/components/Icon/MoneyCoins.vue'
import IconCarCheckmark from '@/components/Icon/CarCheckmark.vue'
import IconProtection from '@/components/Icon/Protection.vue'
import IconEssential from '@/components/Icon/Essential.vue'
import IconCreditCardCoins from '@/components/Icon/CreditCardCoins.vue'
import document1 from '@/assets/icons/trade-in/documents/document-1.svg'
import document2 from '@/assets/icons/trade-in/documents/document-2.svg'
import document3 from '@/assets/icons/trade-in/documents/document-3.svg'
import document4 from '@/assets/icons/trade-in/documents/document-4.svg'
import document5 from '@/assets/icons/trade-in/documents/document-5.svg'

export default {
  name: 'TradeInBlockCommission',
  components: {
    IconMoneyCoins,
    IconCarCheckmark,
    IconProtection,
    IconEssential,
    IconCreditCardCoins,
  },
  props: {
    markNameEn: {
      type: String,
      required: false,
      default: '',
    },
    markNameRu: {
      type: String,
      required: false,
      default: '',
    },
    modelNameEn: {
      type: String,
      required: false,
      default: '',
    },
    modelNameRu: {
      type: String,
      required: false,
      default: '',
    },
  },
  data () {
    return {
      list: [
        {
          icon: 'IconMoneyCoins',
          text: 'Любую машину из нашего склада можно купить в кредит',
        },
        {
          icon: 'IconCarCheckmark',
          text: 'Каждый автомобиль реализуется с гарантией юридической чистоты',
        },
        {
          icon: 'IconProtection',
          text: 'Безопасное хранение — круглосуточная охрана и бережное отношение к ТС',
        },
        {
          icon: 'IconEssential',
          text: 'Мы используем лучшие инструменты для продажи вашего автомобиля',
        },
        {
          icon: 'IconCreditCardCoins',
          text: 'Расчет наличными или по безналичному расчету в день реализации',
        },
      ],
      documents: [
        {
          text: 'Паспорт транспортного средства (ПТС)',
          icon: document1,
        },
        {
          text: 'Два комплекта ключей',
          icon: document2,
        },
        {
          text: 'Законное право распоряжаться автомобилем',
          icon: document3,
        },
        {
          text: 'Гражданский паспорт владельца',
          icon: document4,
        },
        {
          text: 'Генеральная доверенность в случае, если вы не&nbsp;владелец автомобиля',
          icon: document5,
        },
      ],
    }
  },
  computed: {
    ...mapState(useHoldingStore, {
      holdingName: 'holdingName',
    }),
  },
}
</script>

<style scoped lang="scss">
.commission {
  &__title {
    margin-bottom: 40px;

    @media (width <= 899px) {
      @include h3;

      margin-bottom: 30px;
    }

    @media (width <= 414px) {
      @include h4;
    }
  }

  &__text {
    @include text_medium_regular;

    margin-bottom: 30px;
    color: var(--blackLight);
    text-align: left;

    @include mq($bp-small-medium) {
      @include text_big_regular;
    }

    @include mq($bp-medium) {
      margin-bottom: 40px;
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: -15px 0 35px;

    @include mq($bp-small-medium) {
      margin: -15px -15px 35px;
    }

    @include mq($bp-small) {
      margin: -20px -20px 30px;
    }

    @include mq($bp-medium) {
      margin: -20px -15px 40px;
    }

    @include mq($bp-medium-big) {
      margin: -25px -25px 55px;
    }
  }

  &__item {
    display: flex;
    flex: 0 0 100%;
    flex-direction: column;
    margin: 15px 0;

    @include mq($bp-small-medium) {
      flex: 0 0 calc(100% / 2 - 30px);
      margin: 15px;
    }

    @include mq($bp-small) {
      flex: 0 0 calc(100% / 2 - 40px);
      margin: 20px;
    }

    @include mq($bp-medium) {
      flex: 0 0 calc(100% / 3 - 30px);
      margin: 20px 15px;
    }

    @include mq($bp-medium-big) {
      flex: 0 0 calc(100% / 3 - 50px);
      margin: 25px;
    }

    &-icon {
      margin-bottom: 20px;

      @include mq($bp-medium) {
        margin-bottom: 30px;
      }
    }

    &-text {
      @include text_big_regular;

      max-width: 100%;
      color: var(--blackLight);

      @include mq($bp-medium-big) {
        max-width: 90%;
      }

      @include mq($bp-big) {
        max-width: 70%;
      }
    }
  }

  &__documents {
    display: flex;
    flex-direction: column;

    @include mq($bp-medium) {
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-gap: 20px;
      align-items: center;
    }

    &-title {
      @include h4;

      margin-bottom: 30px;
      text-align: center;

      @include mq($bp-small-medium) {
        @include h3;
      }

      @include mq($bp-medium) {
        margin-bottom: 0;
      }

      @include mq($bp-medium-big) {
        @include h1;
      }
    }

    &-list {
      display: flex;
      flex-direction: column;
      padding: 30px 20px;
      background: var(--blackLight);
      border-radius: 30px;

      @include mq($bp-small-medium) {
        padding: 30px;
      }

      @include mq($bp-small) {
        padding: 40px 50px 40px 40px;
      }

      @include mq($bp-big) {
        padding: 90px 50px;
      }
    }

    &-item {
      @include text_medium_bold;

      display: flex;
      align-items: center;
      margin-bottom: 20px;
      color: white;

      @include mq($bp-small-medium) {
        @include h4;

        margin-bottom: 15px;
      }

      @include mq($bp-medium-big) {
        @include h3;
      }

      @include mq($bp-big) {
        margin-bottom: 20px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &-icon {
      width: 35px;
      margin-right: 10px;

      @include mq($bp-small-medium) {
        width: 40px;
        margin-right: 15px;
      }

      @include mq($bp-medium-big) {
        width: 50px;
      }
    }
  }
}
</style>
