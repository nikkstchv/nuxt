<template>
  <UIBody class="commercial">
    <UISimplePageHeader :title="h1" />
    <DetailTitle>Выкупим ваш автомобиль выше любого предложения!</DetailTitle>
    <DetailText class="commercial__text commercial__text_with_button">
      <UIBaseButton
        class="commercial__button commercial__button_type_txt"
        txt
        @click="onScrollToForm"
      >
        Оставьте заявку
      </UIBaseButton>, чтобы получить максимально выгодную цену.
    </DetailText>
    <DetailText>
      Именно в ГК АвтоСпецЦентр вы сможете выгодно и быстро продать грузовой
      автомобиль, полуприцеп с пробегом или коммерческий транспорт вне
      зависимости от года выпуска и состояния вашего автомобиля, а взамен
      приобрести новый грузовой автомобиль или с пробегом с дополнительной
      скидкой и увеличенной гарантией.
    </DetailText>
    <DetailTitle>
      Обмен и выкуп грузовиков в ГК АвтоСпецЦентр — это удобно, быстро и
      выгодно!
    </DetailTitle>
    <section class="commercial__services">
      <TradeInServicesCardAsc
        v-for="(card, index) in cardsServices"
        :key="index"
        :icon="card.icon"
        :title="card.title"
        :description="card.description"
      >
        <UIBaseButton
          class="commercial__services-button"
          big
          @click="onScrollToForm"
        >
          {{ card.buttonText }}
        </UIBaseButton>
      </TradeInServicesCardAsc>
    </section>
    <section class="commercial__advantages">
      <TradeInServicesCardAsc
        v-for="(card, index) in cardsAdvantages"
        :key="index"
        class="services__card"
        :icon="card.icon"
        :title="card.title"
        :description="card.description"
      />
    </section>
    <DetailText>
      Специалисты нашего дилерского центра абсолютно бесплатно:
    </DetailText>
    <DetailList>
      <li>
        Осуществят полную предпродажную подготовку вашего авто, включая его
        диагностику;
      </li>
      <li>Выполнят мойку кузова и чистку салона;</li>
      <li>
        При срочной продаже грузового автомобиля самостоятельно снимут его с
        учёта;
      </li>
      <li>Предоставят на реализуемое авто гарантию на 12 месяцев!</li>
      <li>Произведут выезд оценщика к месту осмотра.</li>
    </DetailList>

    <TradeInBlockForm ref="form" class="commercial__form" />
  </UIBody>
  <DealersBlock class="dealers" dealer-code="376" />

  <LazyServicePanel />
  <LazyFormPanelFeedbackService />
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'
import asc from '@/assets/icons/trade-in/asc/trade-in-asc.svg'
import commercial from '@/assets/icons/trade-in/asc/trade-in-commercial.png'
import commercial1 from '@/assets/icons/trade-in/asc/commercial/1.png'
import commercial2 from '@/assets/icons/trade-in/asc/commercial/2.png'
import commercial3 from '@/assets/icons/trade-in/asc/commercial/3.png'
import commercial4 from '@/assets/icons/trade-in/asc/commercial/4.png'
import commercial5 from '@/assets/icons/trade-in/asc/commercial/5.png'
import commercial6 from '@/assets/icons/trade-in/asc/commercial/6.png'
import commercial7 from '@/assets/icons/trade-in/asc/commercial/7.png'
import commercial8 from '@/assets/icons/trade-in/asc/commercial/8.png'

definePageMeta({
  validate: () => {
    const { isAsc } = useHoldingStore()
    return isAsc
  },
})

const h1 = 'Продажа и выкуп коммерческого транспорта в Москве'
const title = 'Продажа | Выкуп коммерческого транспорта с пробегом в салоне официального дилера | ГК АвтоСпецЦентр'
const description = 'Продать коммерческий легковой или грузовой транспорт с пробегом в Москве. Официальный дилер ГК АвтоСпецЦентр предлагает услуги по оценке, выкупу и продаже коммерческих автомобилей.'

useHeadDefault({ title, description })

const cardsServices = [
  {
    icon: commercial,
    title: 'Продажа',
    description: 'HINO, Hyundai',
    buttonText: 'Узнать цену',
  },
  {
    icon: asc,
    title: 'Выкуп автомобиля',
    description: 'Быстро и по максимальной цене',
    buttonText: 'Оценить автомобиль',
  },
]
const cardsAdvantages = [
  {
    icon: commercial1,
    title: 'Более 20 лет',
    description: 'на рынке',
  },
  {
    icon: commercial2,
    title: 'Выкуп автопарков',
    description: 'любых размеров',
  },
  {
    icon: commercial3,
    title: 'Выкуп лизинговых',
    description: 'и кредитных автомобилей',
  },
  {
    icon: commercial4,
    title: 'Оплата',
    description: 'любым способом',
  },
  {
    icon: commercial5,
    title: 'Юридическое',
    description: 'сопровождение',
  },
  {
    icon: commercial6,
    title: 'Выгодная',
    description: 'оценка',
  },
  {
    icon: commercial7,
    title: 'Быстрое',
    description: 'оформление',
  },
  {
    icon: commercial8,
    title: 'Деньги сразу',
    description: 'после сделки',
  },
]
const form = ref(null)

const onScrollToForm = () => {
  const formElOffsetTop = form.value.$el.offsetTop - 100
  window.scrollTo({
    top: formElOffsetTop,
    behavior: 'smooth',
  })
}
</script>

<style lang="scss" scoped>
.commercial {
  overflow: hidden;

  &__button {
    &_type_txt {
      @include text_big_bold;

      display: inline-flex;
    }
  }

  &__text {
    &_with_button {
      @include text_big_bold;
    }
  }

  &__services {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
    grid-gap: 20px;
    margin-bottom: 50px;

    @include mq($bp-medium-big) {
      grid-template-columns: 1fr 1fr;
    }

    &-button {
      justify-self: center;
      margin-top: 20px;
    }
  }

  &__advantages {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
    grid-gap: 20px;
    justify-content: center;
    margin-bottom: 50px;
  }

  &__form {
    max-width: 600px;
  }
}

.dealers {
  padding-left: 15px;
  margin-bottom: 80px;

  @include mq($bp-small-medium) {
    padding-left: 20px;
  }

  @include mq($bp-small) {
    padding-left: 32px;
  }

  @include mq($bp-medium) {
    padding-left: 50px;
  }

  @include mq($bp-medium-big) {
    padding-left: 81px;
    margin-bottom: 90px;
  }

  @include mq($bp-big) {
    padding-left: 146px;
  }
}
</style>
