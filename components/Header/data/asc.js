export default {
  catalog: [
    {
      name: 'Автомобили',
      link: '/cars/',
      children: [
        { name: 'Новые автомобили', link: '/cars/new/' },
        { name: 'Автомобили с пробегом', link: '/cars/used/' },
        {
          name: 'C НДС для юр. лиц',
          link: '/cars/vat/',
        },
        { name: 'Эксклюзивно на сайте', link: '/cars/on-sale-soon/' },
        { name: 'Распродажа', link: '/cars/sale/' },
      ],
    },
    {
      name: 'Квадроциклы',
      link: '/atv/',
      children: [
        { name: 'Новые квадроциклы', link: '/atv/new/' },
        { name: 'Квадроциклы  с пробегом', link: '/atv/used/' },
      ],
    },
    {
      name: 'Коммерческий транспорт',
      link: '/commercial/',
      children: [
        {
          name: 'Легкий коммерческий транспорт',
          link: '/commercial/fleet/',
        },
        {
          name: 'Грузовой коммерческий транспорт',
          link: '/commercial/trucks/',
        },
      ],
    },
  ],
  services: [
    {
      name: 'Онлайн запись на тест-драйв',
      link: '/services/testdrive/',
    },
    {
      name: 'Выкуп автомобилей с пробегом',
      link: '/services/trade-in/',
    },
    {
      name: 'Страхование и Кредит',
      link: '/services/insurance_and_credit/',
    },
    {
      name: 'Продление полисов ОСАГО и КАСКО',
      link: '/services/prolongatsiya/',
    },
    {
      name: 'Выкуп коммерческого транспорта',
      link: '/services/commercial/',
    },
    {
      name: 'Корпоративным клиентам',
      link: '/services/fleet/',
    },
    {
      name: 'Удаленное урегулирование убытков',
      link: '/services/remote_settlement_losses/',
    },
    {
      name: 'Комиссионные продажи',
      link: '/services/commission/',
    },
    { name: 'Оплата и возврат', link: '/services/pay/' },
    { name: 'Яндекс Сплит', link: '/services/yandex_split/' },
  ],
  service: [
    { name: 'Онлайн запись на сервис', link: '/service/online/' },
    { name: 'Техническое обслуживание', link: '/service/to/' },
    { name: 'Кузовной ремонт', link: '/service/body-repair/' },
    { name: 'Детейлинг', link: '/service/detaling/' },
    { name: 'Установка дополнительного оборудования', link: '/service/optional/' },
    { name: 'Запасные части и аксессуары', link: '/service/accessories/' },
    { name: 'Сезонный шиномонтаж', link: '/service/tire-service/' },
  ],
}
