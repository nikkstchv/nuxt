<template>
  <UIBody>
    <UISimplePageHeader has-back-button title="Запасные части и аксессуары" />
    <DetailMain>
      <template #aside>
        <DetailAsideLeft
          title="Заказать запчасть"
          @onButtonClick="onOpenAccessoriesOrder"
        />
      </template>
      <template #body>
        <DetailTitle>
          Сервисные центры компании предлагают полный комплекс услуг по ремонту
          и обслуживанию автомобилей, установке запасных частей и
          дополнительного оборудования
        </DetailTitle>
        <DetailText>
          В дилерских центрах ГК «АвтоСпецЦентр» вы можете на выгодных условиях
          приобрести оригинальные запчасти от известных производителей,
          сертифицированные для установки на автомобили разных брендов, а также
          аксессуары, повышающие функциональность и комфорт авто.
        </DetailText>
        <DetailText>
          На складах в наличии широкий ассортимент комплектующих для Porsche,
          Volkswagen, INFINITI, Nissan, SKODA, Kia, Peugeot, Geely, Haval, Chery
          и прочих брендов.
        </DetailText>
        <DetailText>
          Благодаря прямым поставкам непосредственно от производителей АСЦ
          гарантирует максимальное качество запчастей по оптимальной цене.
        </DetailText>
        <DetailText> Мы предлагаем: </DetailText>
        <DetailList>
          <li>детали кузова;</li>
          <li>запчасти для двигателя, подвески, тормозной системы;</li>
          <li>шины от известных производителей;</li>
          <li>охранные сигнализации, автомагнитолы и другую электронику;</li>
          <li>косметические средства по уходу за кузовом и салоном машины;</li>
          <li>
            дополнительное оборудование, аксессуары и сувенирную продукцию.
          </li>
        </DetailList>
        <DetailText>
          На запчасти, приобретенные в АСЦ, действует гарантия.
        </DetailText>
        <DetailText>
          Вы можете узнать о наличии запчастей через форму обратной связи или по
          телефону. Наши специалисты проконсультируют вас и окажут помощь в
          приобретении запчастей.
        </DetailText>
      </template>
    </DetailMain>
    <FormPanelAccessoriesOrder />
  </UIBody>
</template>

<script setup>
import { useFormStore } from '../../../store/form'
import { useHoldingStore } from '../../../store/holding'

definePageMeta({
  validate: () => {
    const { isAsc } = useHoldingStore()
    return isAsc
  },
})

const title = 'Купить запасные части и аксессуары для автомобилей от официального дилера| ГК АвтоСпецЦентр'
const description = 'Купить запасные части и аксессуары для автомобилей от официального дилера. Официальный дилерский центр ГК АвтоСпецЦентр предлагает сервисное обслуживание легковых, грузовых и коммерческих автомобилей популярных марок. Специальные предложения и акции на ТО и ремонт. Гарантия.'

useHeadDefault({ title, description })

const formStore = useFormStore()
const onOpenAccessoriesOrder = formStore.onOpen
</script>
