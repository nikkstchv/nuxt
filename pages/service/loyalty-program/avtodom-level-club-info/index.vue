<template>
  <UIBody>
    <UISimplePageHeader
      :title="h1"
      has-back-button
    />
    <DetailMain class="loyalty-program">
      <template #aside>
        <DetailAsideLeftBig
          class="loyalty-program__aside"
          title="On-line запись на сервис"
          text="Воспользуйтесь преимуществами программы лояльности уже сегодня."
          button-text="Записаться"
          @onButtonClick="onOpenServicePanel"
        />
      </template>
      <template #body>
        <img
          class="loyalty-program__image"
          src="@/assets/images/loyalty-program/detail.jpg"
          alt="горы"
        >
        <p class="loyalty-program__text">
          Участником программы АВТОDОМ Level Club можно стать, если вы
          пользуетесь сервисными услугами и/или приобретаете запасные части в
          любом дилерском центре компании «АВТОДОМ» и заполнили заявление на
          участие в программе АВТОDОМ Level Club.
          <br>
          <br>
          Бонусы и Привилегии участников программы АВТОDОМ Level Club
          определяются по сумме и количеству квалификационных заказов, согласно
          таблице:
        </p>
      </template>
      <template #footer>
        <LoyaltyProgramSlider class="loyalty-program__slider" />

        <p class="loyalty-program__text loyalty-program__text_indent">
          Клиенты, являющиеся участниками дисконтной программы ABTODOM Pilot и
          программы АВТОDОМ Level Club, могут воспользоваться либо скидками,
          либо бонусами при оплате заказ-наряда. Скидка и бонусы не суммируются.
          <br>
          <br>
          Отслеживать бонусы можно в личном кабинете
          <a
            href="https://my.avtodom.ru/"
            target="_blank"
          >https://my.avtodom.ru/</a>
          <br>
          <br>
          Квалификационные заказы – оплаченные сервисные заказ-наряды с суммой
          работ более 3000 рублей (кроме заказ-нарядов Страховых Компаний).
          <br>
          <br>
          Для присвоения заказ-наряду статуса «квалификационный», с момента
          закрытия предыдущего квалификационного заказ-наряда должно пройти не
          менее 7 дней.
          <br>
          <br>
          Неквалификационные заказы – все остальные заказ-наряды, а также счета
          за покупку запасных частей и аксессуаров в любом дилерском центре BMW,
          MINI, BMW Motorrad компании «АВТОДОМ». Неквалификационные заказы
          используются только для начисления бонусов.
          <br>
          <br>
          Бонусы начисляются через 7 дней после оплаты.
          <br>
          <br>
          Срок действия уровня – календарный год.
          <br>
          <br>
          Перерасчёт вниз по уровню производится 31.12 ежегодно, если за
          предыдущий календарный год уровень не был подтвержден. Перерасчёт
          вверх – по мере достижения условий перехода в период с 1 января
          текущего года.
        </p>
        <br>
        <p
          class="loyalty-program__text loyalty-program__text_indent loyalty-program__text_theme_gray"
        >
          *На работы и запасные части, в отношении которых на момент выполнения
          работ установлены специальные цены, услуги субподряда (такси,
          эвакуация и т.п.), франшизу и пр. действие бонусов не
          распространяется.
        </p>
      </template>
    </DetailMain>

    <ServicePanel />
  </UIBody>
</template>

<script setup>
import { useServiceStore } from '../../../../store/service'
import { useHoldingStore } from '@/store/holding'

const { onOpen: onOpenServicePanel } = useServiceStore()

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
})

const h1 = 'Программа лояльности АВТОDОМ Level Club для физических лиц'
const title = 'Программа лояльности – АВТОДОМ'
const description = 'Участвуйте в программе лояльности АВТОDОМ Level Club и копите бонусные баллы и привилегии за каждое обращение в сервисные центры АВТОDОМ. Оформите заявку на участие'

useHeadDefault({ title, description })
</script>
<style lang="scss" scoped>
@mixin content {
  @include mq($bp-medium) {
    padding-right: 20px;
    padding-left: 20px;
  }

  @include mq($bp-medium-big) {
    max-width: 614px;
  }

  @include mq($bp-big) {
    max-width: 813px;
  }
}

.loyalty-program {
  grid-template-areas:
    'body'
    'footer'
    'aside';
  grid-gap: 40px;

  @include mq($bp-small) {
    grid-gap: 60px;
  }

  @include mq($bp-medium) {
    grid-template-areas:
      'aside body'
      'aside footer';
    grid-template-columns: max-content auto;
    grid-gap: 60px 7px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 60px 20px;
  }

  @include mq($bp-big) {
    grid-gap: 60px 20px;
  }

  &__image {
    margin-bottom: 20px;

    @include mq($bp-small-medium) {
      margin-bottom: 30px;
    }
  }

  &__text {
    @include text_medium_regular;

    @include mq($bp-small-medium) {
      @include text_big_regular;

      color: var(--blackLight);
    }

    &_indent {
      @include content;
    }

    &_theme_gray {
      @include text_small;

      color: var(--grayDark);
    }
  }

  &__slider {
    margin-bottom: 30px;

    @include mq($bp-small-medium) {
      margin-bottom: 40px;
    }

    @include mq($bp-small) {
      margin-bottom: 50px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 60px;
    }
  }

  :deep(.main__body) {
    @include content;
  }

  :deep(.main__footer) {
    overflow: hidden;
  }
}
</style>
