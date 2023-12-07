<template>
  <main v-cloak class="detail">
    <OrdersDetailSection main-info>
      <OrdersDetailItemMain key-name="Дата">
        20 Октября 2021
      </OrdersDetailItemMain>
      <OrdersDetailItemMain key-name="Срок бронирования">
        5 дней
      </OrdersDetailItemMain>
      <OrdersDetailItemMain key-name="Дилерский центр">
        Одинцовский р-н, п.г.т.р.п. Заречье, ул. Луговая, д.1, 51 км
        МКАД
      </OrdersDetailItemMain>
      <OrdersDetailItemMain
        key-name="Сумма"
        warning
      >
        Ожидает оплаты
      </OrdersDetailItemMain>
    </OrdersDetailSection>
    <OrdersDetailList header>
      <OrdersDetailItem bold gray no-wrap>
        Наименование
      </OrdersDetailItem>
      <OrdersDetailItem bold gray no-wrap>
        Количество
      </OrdersDetailItem>
      <OrdersDetailItem bold gray no-wrap>
        Сумма
      </OrdersDetailItem>
    </OrdersDetailList>
    <OrdersDetailSection>
      <OrdersDetailList>
        <OrdersDetailItem key-name="Наименование">
          Сменный элемент топливного фильтра
        </OrdersDetailItem>
        <OrdersDetailItem key-name="Количество" bold>
          2
        </OrdersDetailItem>
        <OrdersDetailItem
          key-name="Сумма"
          label
        >
          3 000 000,00 ₽
        </OrdersDetailItem>
      </OrdersDetailList>
      <OrdersDetailList>
        <OrdersDetailItem key-name="Наименование">
          Свинцовый противовес с клеящейся пленкой
        </OrdersDetailItem>
        <OrdersDetailItem key-name="Количество" bold>
          2
        </OrdersDetailItem>
        <OrdersDetailItem
          key-name="Сумма"
          label
        >
          3 000 000,00 ₽
        </OrdersDetailItem>
      </OrdersDetailList>
    </OrdersDetailSection>
    <div class="detail__button-wrapper">
      <UIBaseButton large secondary text="Отменить заказ" />
      <div class="detail__button-container">
        <UIBaseButton
          class="detail__button"
          large
          primary
          text="Оплатить картой"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'lk',
  middleware: 'authenticated',
})
</script>

<style lang="scss" scoped>
.detail {
  position: relative;
  display: grid;
  height: fit-content;
  padding-bottom: 50px;

  &__button-container {
    position: relative;
    display: grid;
    grid-gap: 13px;

    @include mq($bp-small) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-flow: column;
      align-items: center;
      justify-items: flex-end;
      justify-self: flex-end;
      width: fit-content;
    }
  }

  &__button-wrapper {
    display: grid;
    grid-gap: 20px;

    @include mq($bp-small) {
      grid-auto-flow: column;
      justify-content: flex-start;
    }
  }
}

.detail__button-container :deep(.button) {
  width: 100%;
  height: 100%;
  padding: 6px 20px !important;

  @include mq($bp-small) {
    width: fit-content;
    white-space: nowrap;
  }

  @include mq($bp-medium) {
    padding: 6px 39px !important;
  }
}
</style>
