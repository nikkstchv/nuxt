<template>
  <UIBody>
    <UISimplePageHeader
      :direct-crumbs="directCrumbs"
      title="Для корпоративных клиентов"
      has-back-button
    />
    <DetailMain>
      <template #aside>
        <DetailAsideLeft
          title="Корпоративные продажи"
          @onButtonClick="onOpenFormPanel"
        />
      </template>
      <template #body>
        <DetailTitle>
          Группа компаний «АвтоСпецЦентр» предлагает корпоративным клиентам
          следующие услуги:
        </DetailTitle>
        <DetailList>
          <li>
            выгодные кредитные условия и возможность приобрести автомобиль в
            лизинг;
          </li>
          <li>
            возможность вне очереди проходить обслуживание и ремонт автомобилей
            в любое время суток;
          </li>
          <li>тест-драйв автомобилей на протяжении длительного времени;</li>
          <li>выкуп по системе Трейд-ин;</li>
          <li>
            автопарк подменных транспортных средств, предлагаемых клиентам на
            время ремонта авто;
          </li>
          <li>
            возможность внести платеж за предоставленный сервис позже срока,
            указанного в договоре;
          </li>
          <li>оптимальные тарифы страхования от угона и прочих рисков;</li>
          <li>
            сезонный шиномонтаж корпоративного автопарка и хранение резины;
          </li>
          <li>
            проведение поощрительных акций для сотрудников компаний-партнеров.
          </li>
        </DetailList>
        <DetailText>
          За каждым клиентом закрепляется персональный менеджер, который
          проконсультирует, поможет решить любой вопрос, связанный с покупкой,
          продажей или обслуживанием автомобилей мировых брендов: Volkswagen,
          Porsche, SKODA, INFINITI, Nissan, Kia, Hyundai и пр. В дилерских
          центрах представлены коммерческие транспортные средства Hyundai,
          Foton, Hino и Fuso Motors, эффективные для развития
          бизнеса.
        </DetailText>
        <DetailText>
          Предусмотренные программой корпоративного сервиса комплексные
          мероприятия позволяют поддерживать клиентский автопарк в исправном
          техническом состоянии.
        </DetailText>
        <DetailText>
          Все задачи, связанные с продажей, обслуживанием и ремонтом
          автомобилей решаются в сжатые сроки на высоком уровне.
        </DetailText>
      </template>
    </DetailMain>
    <FormPanelCorporate />
  </UIBody>
</template>

name: 'PageServicesFleet'

<script setup>
import { useFormStore } from '../../../store/form'
import { useHoldingStore } from '../../../store/holding'

definePageMeta({
  validate: () => {
    const { isAsc } = useHoldingStore()
    return isAsc
  },
})

const directCrumbs = ['', 'Корпоративные продажи']
const title = 'Корпоративные продажи | Автомобили для бизнеса | ГК АвтоСпецЦентр'
const description = 'Автомобили для бизнеса - продажа машин корпоративным клиентам | Разнообразные программы корпоративных продаж в автосалонах официального дилера АвтоСпецЦентр.'

useHeadDefault({ title, description })

const { onOpen: onOpenFormPanel } = useFormStore()
</script>
