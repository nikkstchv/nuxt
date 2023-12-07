<template>
  <UIBody>
    <UISimplePageHeader :title="h1" has-back-button />
    <DetailMain class="detail">
      <template #aside>
        <DetailAsideLeft
          :title="h1"
          text="Выгодные условия и лучшие предложения банков по автокредитованию"
          @onButtonClick="onOpenCreditPanel"
        />
      </template>
      <template #body>
        <DetailText>
          Мы рады, что вы остановили свой выбор на наших дилерских центрах.
          Компания АВТОДОМ сотрудничает с рядом банков, предлагающих услуги в
          области кредитования покупки автомобилей и мотоциклов.
          <br><br>Желание предоставить нашим клиентам удобное обслуживание с
          возможностью выбора банка, программа которого отвечает их текущим
          потребностям, позволило нам реализовать данный вид услуги в полной
          мере. Мы не ограничиваем жёсткими рамками условий одного банка, тем
          более что на сегодняшний день рынок авто-кредитования находится на
          достаточно высокой ступени развития. Это дает нам возможность
          предлагать каждому клиенту наиболее интересный для него вариант
          кредитования. <br><br>Таким образом, мы поможем вам не только
          выбрать свой будущий автомобиль или мотоцикл, но и получить полную и
          детальную информацию об оформлении его покупки в кредит, что позволит
          существенно расширить ваши финансовые возможности и получить хорошую
          кредитную историю в банке.
        </DetailText>
        <UIBaseAccordion
          class="detail__accordion detail__accordion_indent"
          label="Преимущества кредитования от BMW Bank"
        >
          <DetailList class="detail__list">
            <li class="detail__list-item">
              Получение кредита по привлекательной фиксированной процентной
              ставке.
            </li>
            <li class="detail__list-item">
              Отсутствие необходимости обращаться непосредственно в банк –
              подача заявки и выдача кредита осуществляется в дилерском центре
              компании АВТОДОМ.
            </li>
            <li class="detail__list-item">
              Возможность приобретения в кредит подержанного автомобиля.
            </li>
            <li class="detail__list-item">
              Упрощенная процедура кредитования.
            </li>
            <li class="detail__list-item">
              Наличие специальных программ.
            </li>
            <li class="detail__list-item">
              Отсутствие ограничения по максимальному возрасту. Минимальный
              возраст – 18 лет.
            </li>
          </DetailList>
        </UIBaseAccordion>
        <UIBaseAccordion
          class="detail__accordion"
          label="Преимущества кредитования Porsche Financial Services"
        >
          <DetailList class="detail__list">
            <li class="detail__list-item">
              Подача документов и подписание кредитного договора происходит
              непосредственно в дилерском центре;
            </li>
            <li class="detail__list-item">
              Заявка каждого клиента Porsche рассматривается в индивидуальном
              порядке;
            </li>
            <li class="detail__list-item">
              Кредит предоставляется по фиксированной процентной ставке;
            </li>
            <li class="detail__list-item">
              Cумму страховой премии КАСКО можно включить в сумму кредита;
            </li>
            <li class="detail__list-item">
              Штрафы за досрочное погашение кредита отсутствуют;
            </li>
            <li class="detail__list-item">
              Дополнительное оборудование на сумму до 30% от стоимости
              автомобиля можно включить в сумму кредита;
            </li>
          </DetailList>
        </UIBaseAccordion>
      </template>
    </DetailMain>
    <FormPanelCredit form-id="form_credit" />
  </UIBody>
</template>

<script setup>
import { useFormStore } from '@/store/form'
import { useHoldingStore } from '@/store/holding'

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
})

const h1 = 'Кредитование'
const title = 'Кредитование – АВТОДОМ'
const description = 'Компания АВТОДОМ сотрудничает с рядом банков-партнёров, предлагающих услуги в области кредитования покупки автомобилей и мотоциклов. Выберите свой будущий автомобиль или мотоцикл и получите полную информацию об оформлении его покупки в кредит'

useHeadDefault({ title, description })

const { onOpen: onOpenFormPanel } = useFormStore()

const onOpenCreditPanel = () => {
  onOpenFormPanel('isOpenCredit')
}
</script>

<style lang="scss" scoped>
.detail {
  &__accordion {
    @include mq($bp-medium, $bp-medium-big) {
      max-width: 736px;
    }

    & :deep(.accordion__icon) {
      align-self: flex-start;
      margin-top: 5px;
    }

    & :deep(.accordion__label) {
      @include h5;

      grid-template-columns: auto;
      grid-gap: 15px;

      @include mq($bp-small-medium) {
        @include h4;

        grid-gap: 30px;
      }

      @include mq($bp-small) {
        @include h3;
      }
    }

    &_indent {
      margin-bottom: 15px;
    }
  }

  &__list {
    padding-bottom: 15px;
  }
}
</style>
