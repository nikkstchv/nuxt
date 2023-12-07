<template>
  <main class="main">
    <MainSelectionBlock class="main__selection" />

    <ActionsBlockDefault hide-header class="main__actions" />

    <BrandsBlock class="main__brands" />

    <OnSaleBlock
      title="Новинки"
      link-see-all="/cars/"
      in-stock
      :is-seo-title="!isAsc"
      is-main-page
      class="main__on-sale"
      sort="newest-desc"
      slider-name="main-on-sale-block"
    />
    <!--      <MainAccessoriesBlock class="main__accessories" />-->

    <MainCollectionsBlock class="main__collections" />

    <MainCategoriesBlock class="main__categories" />

    <MainServicesAndServiceBlockService class="main__service" />

    <MainMobileAppBlock v-if="isAvtodom" class="main__mobile-app" />

    <MainServicesAndServiceBlockServices class="main__services" />

    <DealersBlock
      is-show-button-see-all
      :is-seo-title="!isAsc"
      class="main__dealers"
    />

    <NewsBlock class="main__news" />

    <AdvantagesBlock
      :title="advantages.title"
      :cards="advantages.cards"
      :is-seo-title="!isAsc"
      class="main__advantages"
    />

    <MainAscBlock v-if="isAsc" class="main__asc" />

    <SeoMainAndAbout />

    <LazyServicePanel />
  </main>
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'

const { $getSeo } = useNuxtApp()
const { domain, isAsc, isAvtodom } = useHoldingStore()
const route = useRoute()
const { path } = route
const seo = await $getSeo(path)
const seoDefault = {
  avtodom: {
    title:
        'ABTODOM - продажа новых иномарок от официального дилера в Москве',
    description: 'АВТОДОМ - автомобильный холдинг, специализирующийся на продаже и техническом обслуживании автомобилей сегментов Люкс и Премиум. ✔ Все авто в наличии с возможностью онлайн покупки. ✔ Дилерские центры расположены в Москве и Санкт-Петербурге',
  },
  asc: {
    title:
        'Продажа новых и подержанных автомобилей в Москве в автосалоне | ГК АвтоСпецЦентр',
    description: 'Купить автомобили с пробегом и новые в Москве в салонах официального дилера ГК АвтоСпецЦентр ✔ 24 дилерских центра ✔ Сервисные услуги ✔ Подбор автомобиля ✔ Послепродажное обслуживание ✔ Авто в кредит',
  },
}
const advantagesData = {
  avtodom: {
    title: 'Преимущества АВТОДОМ',
    cards: [
      {
        iconComponent: 'IconCarBoard',
        title: 'Непрерывное развитие',
        description:
            'Компания постоянно развивается, строит новые дилерские центры и пересматривает инфраструктуру существующих. Компания «АВТОДОМ» одна из первых в России предложила клиентам услуги по Выкупу автомобиля и принятия а/м в зачет стоимости нового.',
      },
      {
        iconComponent: 'IconCarGarage',
        title: 'Удобное расположение',
        description:
            'Дилерские центры в Москве, Санкт-Петербурге и Краснодаре расположены в местах, до которых вы можете быстро и удобно добраться.',
      },
      {
        iconComponent: 'IconBriefcase',
        title: 'Ассортимент',
        description:
            'На сегодняшний день в портфеле компании тринадцать брендов: BMW, BMW Motorrad, MINI, Lamborghini, Mercedes Benz, smart, Porsche, Audi, Aurus, Volvo, Land Rover, Jaguar, Ducati и KTM. Также есть подержанные автомобили и коммерческий транспорт.',
      },
      {
        iconComponent: 'IconAwardAdvantages',
        title: 'Награды',
        description:
            'Дилерские центры АВТОДОМ получают награду «Лучший дилер по итогам года» несколько лет подряд.',
      },
      {
        iconComponent: 'IconHeartAdvantages',
        title: 'Услуги',
        description:
            'Компания АВТОДОМ предоставляет широкий спектр услуг: от гарантийного обслуживания до лизинга.',
      },
    ],
  },
  asc: {
    title: 'Преимущества АвтоСпецЦентр',
    cards: [
      {
        iconComponent: 'IconCarGarage',
        title: 'Удобное расположение',
        description:
            'Дилерские центры в Москве и Московской области расположены в местах, до которых вы можете быстро и удобно добраться.',
      },
      {
        iconComponent: 'IconBriefcase',
        title: 'Ассортимент',
        description:
            'На сегодняшний день в портфеле компании четырнадцать брендов: Porsche, Infiniti, Volkswagen, Nissan, Mazda, Skoda, Kia, Hyundai, Haval, Changan, Chery, Geely, Exeed, Hisun. Также есть подержанные автомобили и коммерческий транспорт.',
      },
      {
        iconComponent: 'IconAwardAdvantages',
        title: 'Награды',
        description:
            'Победитель в номинации «Организация сервиса» среди автомобильных холдингов «Автодилер года – 2022».200 крупнейших частных компаний России (по версии Forbes 2021).400 крупнейших российских компаний (по версии журнала «Эксперт» 2021).500 крупнейших по выручке компаний России (по версии РБК 2021).',
      },
      {
        iconComponent: 'IconHeartAdvantages',
        title: 'Услуги',
        description:
            'Дилерские центры компании предлагают полный комплекс услуг, связанных с продажей, гарантийным и сервисным обслуживанием автомобилей, реализацией оригинальных запасных частей и аксессуаров, комиссионной торговле, а также дополнительные услуги, автокредитование и страхование.',
      },
    ],
  },
}
const advantages = advantagesData[domain]
const title = seo.seoTitle || seoDefault[domain].title
const description = seo.seoDescription || seoDefault[domain].description

useHeadDefault({ title, description })

</script>

<style scoped lang="scss">
@import 'assets/styles/indents/main';

.main {
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  padding-bottom: 100px;

  &__selection {
    margin-bottom: 20px;

    @include mq($bp-small-medium) {
      margin-bottom: 30px;
    }

    @include mq($bp-medium) {
      margin-bottom: 50px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 60px;
    }
  }

  &__actions {
    margin-bottom: 40px;

    @include mq($bp-small-medium) {
      margin-bottom: 50px;
    }

    @include mq($bp-medium) {
      margin-bottom: 60px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 70px;
    }
  }

  &__brands {
    padding: 0 0 0 15px;
    margin-bottom: 40px;

    @include mq($bp-super-small) {
      margin-bottom: 50px;
    }

    @include mq($bp-small-medium) {
      margin-bottom: 60px;
    }

    @include mq($bp-small) {
      padding: 0 0 0 30px;
    }

    @include mq($bp-medium) {
      padding: 0 0 0 50px;
      margin-bottom: 80px;
    }

    @include mq($bp-medium-big) {
      padding: 0 81px;
      margin-bottom: 100px;
    }

    @include mq($bp-big) {
      padding: 0 146px;
    }
  }

  &__on-sale {
    margin-bottom: 40px;

    @include mq($bp-super-small) {
      margin-bottom: 50px;
    }

    @include mq($bp-small-medium) {
      margin-bottom: 60px;
    }

    @include mq($bp-medium) {
      margin-bottom: 80px;
    }
  }

  &__accessories {
    margin-bottom: 40px;

    @include mq($bp-super-small) {
      margin-bottom: 50px;
    }

    @include mq($bp-small-medium) {
      margin-bottom: 60px;
    }

    @include mq($bp-medium) {
      margin-bottom: 80px;
    }

    @include mq($bp-big) {
      margin-bottom: 100px;
    }
  }

  &__collections {
    margin-bottom: 30px;

    @include mq($bp-super-small) {
      margin-bottom: 40px;
    }

    @include mq($bp-small-medium) {
      margin-bottom: 60px;
    }

    @include mq($bp-medium) {
      margin-bottom: 80px;
    }

    @include mq($bp-big) {
      margin-bottom: 100px;
    }
  }

  &__categories {
    margin-bottom: 50px;

    @include mq($bp-small-medium) {
      margin-bottom: 60px;
    }

    @include mq($bp-medium) {
      margin-bottom: 80px;
    }

    @include mq($bp-big) {
      margin-bottom: 100px;
    }
  }

  &__service {
    margin-bottom: 40px;

    @include mq($bp-small-medium) {
      margin-bottom: 60px;
    }

    @include mq($bp-medium) {
      margin-bottom: 80px;
    }

    @include mq($bp-big) {
      margin-bottom: 100px;
    }
  }

  &__mobile-app {
    margin-bottom: 40px;

    @include mq($bp-small-medium) {
      margin-bottom: 60px;
    }

    @include mq($bp-medium) {
      margin-bottom: 80px;
    }

    @include mq($bp-big) {
      margin-bottom: 100px;
    }
  }

  &__services {
    margin-bottom: 50px;

    @include mq($bp-small-medium) {
      margin-bottom: 60px;
    }

    @include mq($bp-medium) {
      margin-bottom: 80px;
    }

    @include mq($bp-big) {
      margin-bottom: 100px;
    }
  }

  &__dealers {
    margin-bottom: 50px;

    @include mq($bp-small-medium) {
      margin-bottom: 60px;
    }

    @include mq($bp-medium) {
      margin-bottom: 80px;
    }

    @include mq($bp-big) {
      margin-bottom: 100px;
    }
  }

  &__news {
    margin-bottom: 50px;

    @include mq($bp-small-medium) {
      margin-bottom: 60px;
    }

    @include mq($bp-medium) {
      margin-bottom: 80px;
    }

    @include mq($bp-big) {
      margin-bottom: 100px;
    }
  }

  &__advantages {
    @include indentsMainHorizontal;

    margin-bottom: 50px;

    @include mq($bp-small-medium) {
      padding-top: 40px;
      padding-bottom: 40px;
      margin-bottom: 60px;
    }

    @include mq($bp-medium) {
      margin-bottom: 80px;
    }

    @include mq($bp-big) {
      padding-top: 50px;
      padding-bottom: 50px;
      margin-bottom: 100px;
    }
  }

  &__asc {
    @include indentsMainHorizontal;
  }
}
</style>
