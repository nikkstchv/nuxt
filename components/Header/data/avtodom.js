export default {
  catalog: [
    {
      name: 'Автомобили',
      link: '/cars/',
      children: [
        { name: 'Новые модели', link: '/cars/new/' },
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
      name: 'Электромобили',
      link: '/electro/',
      children: [
        { name: 'Новые модели электромобилей', link: '/electro/new/' },
        { name: 'Электромобили с пробегом', link: '/electro/used/' },
      ],
    },
    {
      name: 'Мотоциклы',
      link: '/moto/',
      children: [
        { name: 'Новые мотоциклы', link: '/moto/new/' },
        { name: 'Мотоциклы с пробегом', link: '/moto/used/' },
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
      name: 'Гидроциклы',
      link: '/jet-ski/',
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
    { name: 'Онлайн запись на тест-драйв', link: '/services/testdrive/' },
    { name: 'Кредитование', link: '/services/credit/' },
    { name: 'Страхование', link: '/services/insurance/' },
    { name: 'Выкуп автомобилей', link: '/services/trade-in/' },
    { name: 'Лизинг', link: '/services/leasing/' },
    { name: 'Корпоративным клиентам', link: '/services/corporate/' },
    { name: 'Автодом Подписка', link: '/services/subscription/' },
    { name: 'Яндекс Сплит', link: '/services/yandex_split/' },
  ],
  service: [
    { name: 'Онлайн запись на сервис', link: '/service/online/' },
    { name: 'Техническое обслуживание', link: '/service/to/' },
    { name: 'Кузовной ремонт', link: '/service/body-repair/' },
    { name: 'Детейлинг', link: '/service/detaling/' },
    { name: 'Установка дополнительного оборудования', link: '/service/optional/' },
    { name: 'Программа лояльности', link: '/service/loyalty-program/' },
    { name: 'Сезонный шиномонтаж', link: '/service/tire-service/' },
  ],
}
