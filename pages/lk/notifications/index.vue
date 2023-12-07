<template>
  <main class="notifications">
    <UIBaseTabs class="notifications__tabs">
      <UIBaseTab class="notifications__tab" selected name="Все">
        <ul class="notifications__list">
          <NotificationsItem
            v-for="notification in notifications"
            :key="notification.id"
            :is-new="notification.isNew"
            :title="notification.title"
            :text="notification.text"
            :date="notification.date"
          />
        </ul>
      </UIBaseTab>
      <UIBaseTab class="notifications__tab" name="Новые">
        <ul class="notifications__list">
          <NotificationsItem
            v-for="notification in newNotifications"
            :key="notification.id"
            :is-new="notification.isNew"
            :title="notification.title"
            :text="notification.text"
            :date="notification.date"
          />
        </ul>
      </UIBaseTab>
    </UIBaseTabs>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'lk',
  middleware: 'authenticated',
})

const notifications = [
  {
    id: 1,
    isNew: true,
    title: 'Продление полиса ОСАГО',
    text: 'Уважаемый клиент, Ваш электронный полис ОСАГО заканчивается через 15 дней, рекомендуем вам оформить продлени в нашей компании и ваша история страхования автоматически будет учтена.',
    date: '28.09.2021',
  },
  {
    id: 2,
    isNew: true,
    title: 'Заказ запчастей',
    text: 'Аксессуары по заказу №533 ожидают получения в дилероском центре на Зорге 17',
    date: '26.09.2021',
  },
  {
    id: 3,
    isNew: false,
    title: 'Отзывная компания',
    text:
        'Компания Takata, поставляющая подушки безопасности для Вашего автомобиля, сообщила, что с течением времени существует вероятность возникновения неисправности подушки безопасности.\n' +
        'Во время аварии внутреннее давление газогенератора может чрезмерно возрасти, что может привести к разрушению корпуса подушки безопасности при ее срабатывании и попаданию обломков в салон автомобиля.\n' +
        'Просим вас незамедлительно обратиться по этому номеру телефона: 8 800-500-50-00',
    date: '15.09.2021',
  },
  {
    id: 4,
    isNew: false,
    title: 'Персональное предложение',
    text: 'Уважаемый Ярослав Вячеславович, специально для вас, мы подготовили подборку оригинальных аксессуаров BMW Motorrad. Количество товаров ограничено и действует только до 10 ноября.',
    date: '26.09.2021',
  },
]

const newNotifications = notifications.filter(notification => notification.isNew)
</script>

<style lang="scss" scoped>
.notifications {
  display: block;
  padding-top: 50px;

  &__list {
    display: grid;
    grid-gap: 20px;
    height: fit-content;
  }

  &__tabs {
    padding-bottom: 30px;
  }
}
</style>
