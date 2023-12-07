<template>
  <section class="services">
    <TradeInServicesCardAsc
      v-for="(card, index) in cards"
      :key="index"
      class="services__card"
      :icon="card.icon"
      :title="card.title"
      :description="card.description"
    />
    <TradeInBlockForm class="services__form" />
  </section>
</template>

<script>
import icon1 from '@/assets/icons/trade-in/asc/trade-in-asc.svg'
import icon2 from '@/assets/icons/trade-in/asc/trade-in-asc-2.svg'
import icon3 from '@/assets/icons/trade-in/asc/trade-in-asc-3.svg'

export default {
  name: 'TradeInServicesBlockAsc',
  data () {
    return {
      cards: [
        {
          icon: icon1,
          title: 'Выкуп автомобиля',
          description:
            'Услуга выкупа позволяет быстро продать автомобиль и сразу получить за него деньги. Вам не придётся ждать продажи вашего автомобиля, как это происходит в случае комиссионной продажи автомобиля.',
        },
        {
          icon: icon2,
          title: 'Трейд-ин',
          description:
            'Программа Трейд-ин позволяет купить новый автомобиль в обмен на старый с доплатой. Покупатель не ждет, пока продастся его прежнее транспортное средство, а сразу может уехать из автосалона на желанном авто.',
        },
        {
          icon: icon3,
          title: 'Комиссионная продажа',
          description:
            'При постановке автомобиля на комиссию в ГК "АвтоСпецЦентр" вы гарантированно получите помощь высокопрофессиональных специалистов, сэкономите собственные денежные и временные ресурсы и обезопасите себя от возможных неприятностей.',
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/indents/main';

.services {
  display: grid;
  grid-gap: 30px;
  justify-content: center;

  @include mq($bp-small) {
    grid-gap: 30px 40px;
    justify-self: center;
  }

  @include mq($bp-medium) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px 50px;
  }

  @include mq(1700px) {
    grid-template-columns: initial;
    grid-auto-flow: column;
  }

  @include mq($bp-big) {
    grid-gap: 40px;
  }

  &__form {
    @include mq($bp-medium) {
      grid-row: 1 / 3;
      grid-column-start: 2;
    }

    @include mq($bp-big) {
      grid-column-start: 3;
    }

    & :deep(.policy-checkbox) {
      max-width: initial;
    }
  }
}
</style>
