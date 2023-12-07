<template>
  <main class="orders">
    <OrdersHeader class="orders__header" />
    <ul class="orders__list orders__list_header">
      <OrdersItem gray no-wrap>
        № Заказа
      </OrdersItem>
      <OrdersItem gray no-wrap>
        Дата
      </OrdersItem>
      <OrdersItem gray no-wrap>
        Площадка
      </OrdersItem>
      <OrdersItem gray no-wrap>
        Статус
      </OrdersItem>
      <OrdersItem gray no-wrap>
        Сумма
      </OrdersItem>
      <OrdersItem gray no-wrap>
        Тип заказа
      </OrdersItem>
    </ul>
    <h2 class="orders__title">
      Салон
    </h2>
    <section class="orders__section">
      <nuxt-link class="orders__link" :to="`${$route.path}1/`">
        <ul class="orders__list">
          <OrdersItem key-name="№ Заказа" no-wrap>
            03176294-1
          </OrdersItem>
          <OrdersItem key-name="Дата">
            03 Августа 2021
          </OrdersItem>
          <OrdersItem key-name="Площадка">
            Вернадский
          </OrdersItem>
          <OrdersItem key-name="Статус" bold warning>
            На рассморении
          </OrdersItem>
          <OrdersItem key-name="Сумма" bold no-wrap>
            3 000 000,00 ₽
          </OrdersItem>
          <OrdersItem
            key-name="Тип заказа"
            label
          >
            Заказ на автомобиль
          </OrdersItem>
        </ul>
      </nuxt-link>
      <nuxt-link class="orders__link" :to="`${$route.path}2/`">
        <ul class="orders__list">
          <OrdersItem key-name="№ Заказа" no-wrap>
            03176294-1
          </OrdersItem>
          <OrdersItem key-name="Дата">
            03 Августа 2021
          </OrdersItem>
          <OrdersItem key-name="Площадка">
            Вернадский
          </OrdersItem>
          <OrdersItem key-name="Статус" bold valid>
            Одобрена
          </OrdersItem>
          <OrdersItem
            key-name="Сумма"
            bold
            no-wrap
          >
            <UIBaseButton
              primary
              text="Оплатить"
            />
          </OrdersItem>
          <OrdersItem
            key-name="Тип заказа"
            label
          >
            Заказ на автомобиль
          </OrdersItem>
        </ul>
      </nuxt-link>
    </section>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'lk',
  middleware: 'authenticated',
})
</script>

<style lang="scss" scoped>
.orders {
  display: block;

  &__header {
    padding: 30px 0;

    @include mq($bp-medium) {
      padding: 50px 0 25px;
    }
  }

  &__title {
    @include label_small;

    margin-bottom: 30px;
    color: var(--blackLight);

    @include mq($bp-small-medium) {
      @include text_medium_bold;
    }
  }

  &__section {
    display: grid;
    grid-gap: 40px;
    margin-bottom: 50px;
  }

  &__link {
    @include mq(1px, $bp-small) {
      &:nth-child(even) > .orders__list {
        background: var(--grayLight);

        &::before {
          position: absolute;
          right: 100%;
          z-index: -1;
          width: 50%;
          height: 100%;
          content: '';
          background: var(--grayLight);
        }

        &::after {
          position: absolute;
          left: 100%;
          z-index: -1;
          width: 50%;
          height: 100%;
          content: '';
          background: var(--grayLight);
        }
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        box-shadow: 10px 0 0 #fff, -10px 0 0 #fff,
          15px 8px 12px rgb(153 155 168 / 7%),
          -15px 8px 12px rgb(153 155 168 / 7%);

        & .orders__list {
          border-bottom: 1px solid transparent;
        }
      }
    }
  }

  &__list {
    position: relative;
    display: grid;
    grid-gap: 8px;
    padding-top: 15px;

    @include mq($bp-small) {
      grid-template-columns: repeat(6, 1fr);
      grid-auto-flow: column;
      grid-gap: 20px;
      min-height: 42px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--grayMediumLight);
    }

    & :deep(.item:last-child) {
      border-bottom: none;
    }

    &_header {
      display: none;
      padding-top: 50px;
      padding-bottom: 15px;
      margin-bottom: 25px;

      @include mq($bp-small) {
        display: grid;
      }
    }
  }
}
</style>
