<template>
  <UIBody>
    <UISimplePageHeader :title="title" has-back-button />
    <DetailMain class="detail">
      <template #aside>
        <DetailAsideLeft
          title="Заявка на подписку авто"
          @onButtonClick="onOpenForm"
        />
      </template>
      <template #body>
        <DetailText class="detail__text detail__text_indent">
          Компания «АВТОДОМ» предлагает вам услугу -
          <DetailLink
            class="detail__link"
            target="_blank"
            href="https://autopodpiska.ru/?roistat_visit=9272182"
            rel="nofollow"
          >
            автомобиль по подписке
          </DetailLink>. Для развития этого проекта в декабре 2020 года была создана
          компания «АВТОСМАРТ». <br><br>
          Подписка на автомобиль - наиболее доступный способ приобретения
          транспортного средства. Это выгоднее, чем каршеринг или аренда, а
          также покупка в лизинг или кредит: клиент получает понравившийся
          автомобиль на год за фиксированный ежемесячный платеж без
          первоначального взноса, при этом он избавлен от всех забот и расходов,
          таких как поиск автомобиля, сравнение цен, кредитование, страхование,
          техническое обслуживание, сезонная замена шин, продажа автомобиля с
          пробегом.
        </DetailText>
        <ul class="detail__list">
          <li class="detail__list-item">
            <DetailLink
              target="_blank"
              href="https://autopodpiska.ru/?roistat_visit=9272182#catalog"
              rel="nofollow"
            >
              Автомобили
            </DetailLink>
          </li>
          <li class="detail__list-item">
            <DetailLink
              target="_blank"
              href="https://autopodpiska.ru/?roistat_visit=9272182#faq"
              rel="nofollow"
            >
              FAQ
            </DetailLink>
          </li>
          <li class="detail__list-item">
            <DetailLink
              target="_blank"
              href="https://autopodpiska.ru/?roistat_visit=9272182#about"
              rel="nofollow"
            >
              О нас
            </DetailLink>
          </li>
        </ul>
        <DetailText class="detail__text">
          В дальнейшем автомобиль из подписки может быть приобретен клиентом по
          его остаточной стоимости либо заменен на новый автомобиль по подписке.
          Подписка, как альтернативный способ владения автомобилем, происходит
          из культуры интеллектуального потребления, экологичного использования
          и бережливости, которая хорошо развита в США и Западной Европе, а в
          России только начинает быть популярной. <br><br>
          Дилерские центры «АВТОДОМ» расположены в Москве и Санкт-Петербурге, в
          компании представлено 10 автомобильных брендов: Audi, BMW, Jaguar,
          Lamborghini, Land Rover, Mercedes Benz, MINI, Smart, Porsche и Volvo.
          <br><br>
          Автомобили всех этих брендов доступны клиентам «АВТОДОМ» для
          приобретения по подписке. Подписка - это возможность выбрать
          максимально подходящий автомобиль по выгодным тарифам, а также быстро
          и качественно получать услугу по обслуживанию и ремонту автомобилей.
          Теперь новый автомобиль премиум класса доступен каждому!
        </DetailText>
      </template>
    </DetailMain>
    <FormPanelSubscription />
  </UIBody>
</template>

<script setup>
import { useFormStore } from '../../../store/form'
import { useHoldingStore } from '../../../store/holding'

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
})

const title = 'Автодом Подписка'
const description = 'Подписка на автомобиль - наиболее доступный способ приобретения транспортного средства. Это выгоднее, чем каршеринг или аренда, а также покупка автомобиля сразу. Выбирайте Подписки, как альтернативный способ владения автомобилем'

useHeadDefault({ title, description })

const { onOpen: onOpenForm } = useFormStore()
</script>

<style lang="scss" scoped>
.detail {
  &__list {
    display: grid;
    grid-gap: 20px;
    margin-bottom: 30px;

    @include mq($bp-super-small) {
      margin-bottom: 40px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 50px;
    }

    &-item {
      @include text_big_regular;
    }
  }

  &__text {
    line-height: 27px;

    &_indent {
      margin-bottom: 20px;
    }
  }
}
</style>
