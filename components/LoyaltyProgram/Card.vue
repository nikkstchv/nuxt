<template>
  <div class="card">
    <p class="card__main-title">
      {{ program.title }}
    </p>
    <UIBaseAccordion
      :init-expand="true"
      class="card__accordion"
      label="Условия"
    >
      <div class="card__accordion-content">
        <ul class="card__list card__list_terms">
          <li class="card__list-item">
            Кол-во квалификационных з/н<span class="card__list-item-value">{{
              program.terms.count
            }}</span>
          </li>
          <li class="card__list-item">
            Сумма по квалификационным з/н<span class="card__list-item-value">{{
              program.terms.sum
            }}</span>
          </li>
        </ul>
        <hr class="card__hr">
        <section class="card__section card__section_accrual">
          <p class="card__subtitle">
            <img
              class="card__subtitle-icon"
              src="@/assets/icons/loyalty-program/wallet-add-plus.svg"
              alt="иконка кошелька с плюсом"
            >
            Начисление
          </p>
          <ul class="card__list card__list_indent_small">
            <li class="card__list-item">
              На сервисное обслуживание
              <span class="card__list-item-value">{{
                program.accrual.service
              }}</span>
            </li>
            <li class="card__list-item">
              На заказ запасных частей и аксессуаров<span
                class="card__list-item-value"
              >{{ program.accrual.accessories }}</span>
            </li>
          </ul>
        </section>
        <section class="card__section card__section_writeOff">
          <p class="card__subtitle">
            <img
              class="card__subtitle-icon"
              src="@/assets/icons/loyalty-program/wallet-minus.svg"
              alt="иконка кошелька с минусом"
            >
            Списание
          </p>
          <ul class="card__list card__list_indent_small">
            <li class="card__list-item">
              За сервисное обслуживание
              <span class="card__list-item-value">{{
                program.writeOff.service
              }}</span>
            </li>
            <li class="card__list-item">
              За заказ запасных частей и аксессуаров<span
                class="card__list-item-value"
              >{{ program.writeOff.accessories }}</span>
            </li>
          </ul>
        </section>
      </div>
    </UIBaseAccordion>
    <p class="card__title">
      Привилегии
    </p>
    <ul class="card__list">
      <li class="card__list-item card__list-item_with_icon">
        <IconLoyaltyProgramCup />
        <div class="card__list-item-content">
          Чай / Кофе
          <span class="card__list-item-value">{{ program.privilege.tea }}</span>
        </div>
      </li>
      <li
        class="card__list-item card__list-item_with_icon"
        :class="{
          'card__list-item_disable': program.title === 'Стандартный',
        }"
      >
        <IconLoyaltyProgramTransmission
          :disable="program.title === 'Стандартный'"
        />
        <div class="card__list-item-content">
          Эвакуация в пределах МКАД/КАД + 15 км
          <span class="card__list-item-value">{{
            program.privilege.evacuation
          }}</span>
        </div>
      </li>
      <li
        class="card__list-item card__list-item_with_icon"
        :class="{
          'card__list-item_disable': program.title === 'Стандартный',
        }"
      >
        <IconLoyaltyProgramParking :disable="program.title === 'Стандартный'" />
        <div class="card__list-item-content">
          Стоянка а/м сроком до 30 дней
          <span class="card__list-item-value">{{
            program.privilege.parking
          }}</span>
        </div>
      </li>
      <li class="card__list-item card__list-item_with_icon">
        <IconLoyaltyProgramCarWashing />
        <div class="card__list-item-content">
          Прием а/м на обслуживание
          <span class="card__list-item-value">{{
            program.privilege.service
          }}</span>
        </div>
      </li>
      <li class="card__list-item card__list-item_with_icon">
        <IconLoyaltyProgramWheel />
        <div class="card__list-item-content">
          Сезонная замена колес
          <span class="card__list-item-value">{{
            program.privilege.wheels
          }}</span>
        </div>
      </li>
      <li class="card__list-item card__list-item_with_icon">
        <IconLoyaltyProgramBox />
        <div class="card__list-item-content">
          Хранение колес
          <span class="card__list-item-value">{{
            program.privilege.wheelStorage
          }}</span>
        </div>
      </li>
      <li
        class="card__list-item card__list-item_with_icon"
        :class="{
          'card__list-item_disable': program.title !== 'ЗОЛОТОЙ',
        }"
      >
        <IconLoyaltyProgramCroissant :disable="program.title !== 'ЗОЛОТОЙ'" />
        <div class="card__list-item-content">
          Бесплатный завтрак (до 11:00)
          <span class="card__list-item-value">{{
            program.privilege.breakfast
          }}</span>
        </div>
      </li>
      <li
        class="card__list-item card__list-item_with_icon"
        :class="{
          'card__list-item_disable': program.title !== 'ЗОЛОТОЙ',
        }"
      >
        <IconLoyaltyProgramTaxi :disable="program.title !== 'ЗОЛОТОЙ'" />
        <div class="card__list-item-content">
          Такси для клиентов Москвы и Санкт-Петербурга
          <span class="card__list-item-value">{{
            program.privilege.taxi
          }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  program: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.card {
  &__main-title {
    @include h5;

    margin-bottom: 25px;

    @include mq($bp-small) {
      @include h3;

      margin-bottom: 40px;
    }
  }

  &__title {
    @include h5;

    margin-bottom: 20px;
    color: var(--blackLight);

    @include mq($bp-small) {
      @include h3;

      margin-bottom: 30px;
    }
  }

  &__subtitle {
    @include text_medium_bold;

    display: flex;
    margin-bottom: 15px;

    @include mq($bp-small) {
      @include text_big_bold;

      margin-bottom: 20px;
    }

    &-icon {
      margin-right: 10px;
    }
  }

  &__accordion {
    &-content {
      display: grid;
      grid-template-areas:
        'terms'
        'hr'
        'accrual'
        'writeOff';
      grid-gap: 15px;
      margin-bottom: 20px;

      @include mq($bp-small) {
        grid-gap: 25px;
      }

      @include mq($bp-big) {
        grid-template-areas:
          'terms terms'
          'hr hr'
          'accrual writeOff';
        grid-gap: 25px 20px;
      }
    }

    & :deep(.accordion__label) {
      padding-bottom: 25px;

      @include mq($bp-small) {
        padding-bottom: 40px;
      }
    }

    & :deep(.accordion__label-key) {
      @include h5;

      @include mq($bp-small) {
        @include h3;
      }
    }

    & :deep(.accordion__icon) {
      width: 24px;
      height: 24px;

      @include mq($bp-small) {
        width: 32px;
        height: 32px;
      }
    }
  }

  &__section {
    &_accrual {
      grid-area: accrual;
    }

    &_writeOff {
      grid-area: writeOff;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 15px;

    @include mq($bp-small) {
      grid-gap: 25px;
    }

    &_indent_small {
      grid-gap: 10px;

      @include mq($bp-small) {
        grid-gap: 15px;
      }
    }

    &_terms {
      grid-area: terms;
    }

    &-item {
      @include text_medium_regular;

      display: flex;
      flex-direction: column;
      grid-gap: 4px;
      color: var(--grayDolphin);

      @include mq($bp-small) {
        @include text_big_regular;
      }

      &_disable {
        .card__list-item-value {
          color: var(--grayDark);
        }

        .card__list-item-content {
          color: var(--grayDark);
        }
      }

      &_with_icon {
        flex-direction: row;
        grid-gap: 15px;
      }

      &-content {
        display: flex;
        flex-direction: column;
        grid-gap: 5px;
      }

      &-value {
        @include text_medium_small;

        color: var(--black);

        @include mq($bp-small) {
          font-weight: 500;
        }
      }
    }
  }

  &__hr {
    grid-area: hr;
    height: 2px;
    border: 1px solid var(--grayLight);
    border-radius: 2px;
  }
}
</style>
