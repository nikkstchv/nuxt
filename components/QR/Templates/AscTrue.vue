<template>
  <div
    class="qr-template"
    :class="{
      'qr-template_orientation_landscape': orientation === 'landscape',
    }"
  >
    <img
      v-if="template === 'asc'"
      class="qr-template__logo"
      src="@/assets/images/qr/asc-true.jpg"
      alt="ASC TRUE Logo"
    >
    <IconLogoABTODOM v-else class="qr-template__logo" />

    <div class="qr-template__wrapper">
      <div class="qr-template__content">
        <DetailTitle class="qr-template__title">
          {{ mark }}
        </DetailTitle>
        <DetailTitle class="qr-template__title qr-template__title_indent">
          {{
            model
          }}
        </DetailTitle>
        <ul class="qr-template__list">
          <li
            v-for="item in transportInfo"
            :key="item.label"
            class="qr-template__item"
          >
            {{ item.label }}:
            <span class="qr-template__item-value">
              {{ item.value }}
            </span>
          </li>
        </ul>

        <template v-if="phone">
          <h3 class="qr-template__subtitle">
            Остались вопросы?
          </h3>
          <a :href="`tel:${phone}`" class="qr-template__phone">
            {{ phone }}
          </a>
        </template>
      </div>
      <div class="qr-template__qr-container">
        <QrCode class="qr-template__qr" :value="url" :size="150" />
        <p class="qr-template__text">
          Отсканируйте QR-код и узнайте стоимость
          {{ schema[carType] ?? schema['default'] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  orientation: {
    type: String,
    required: false,
    default: 'portrait',
  },
  mark: {
    type: String,
    required: true,
    default: '',
  },
  model: {
    type: String,
    required: true,
    default: '',
  },
  transportInfo: {
    type: Object,
    required: true,
  },
  url: {
    type: String,
    required: true,
    default: '',
  },
  template: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: '',
  },
  carType: {
    type: String,
    required: true,
  },
})

const schema = {
  trucks: 'автомобиля',
  commercial: 'автомобиля',
  cars: 'автомобиля',
  atv: 'квадроцикла',
  moto: 'мотоцикла',
  'jet-ski': 'гидроцикла',
  default: 'транспортного средства',
}
</script>

<style lang="scss" scoped>
.qr-template {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  grid-gap: 80px;
  padding: 40px 50px;

  &_orientation {
    &_landscape {
      grid-gap: 0;
      padding: 15px 50px;

      &.qr-template {
        .qr-template {
          &__wrapper {
            flex-direction: row;
            grid-gap: 20px;
          }

          &__qr-container {
            grid-template-areas:
              'qr'
              'text'
              'subtitle'
              'phone';
            justify-items: center;
          }

          &__text {
            max-width: 260px;
          }

          &__content {
            width: max-content;
          }

          &__title_indent {
            margin-bottom: 30px;
          }

          &__list {
            grid-gap: 10px;
            margin-bottom: 30px;
          }
        }
      }
    }
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__qr-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__qr {
    grid-area: qr;
    margin: auto auto 20px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    margin-bottom: 50px;
  }

  &__item {
    @include h4;

    display: grid;
    grid-template-columns: minmax(max-content, 300px) 1fr;
    font-weight: 500;
    color: var(--grayDolphin);
  }

  &__item-value {
    font-weight: 800;
    color: var(--black);
  }

  &__logo {
    width: 250px;
    height: 80px;
    margin: auto;
  }

  .qr-template &__title {
    display: flex;
    flex-wrap: nowrap;
    grid-gap: 10px;
    margin-bottom: 0;
    font-size: 42px;
    font-weight: bold;
    line-height: 54px;

    &_indent {
      margin-bottom: 40px;
    }
  }

  &__subtitle {
    @include h2;

    grid-area: subtitle;
    align-self: flex-end;
    width: max-content;
    margin-bottom: 10px;
    color: var(--blackLight);
  }

  &__phone {
    @include h1;

    grid-area: phone;
    align-self: flex-start;
    width: max-content;
    color: var(--blackLight);
  }

  &__text {
    @include text_big_bold;

    grid-area: text;
    max-width: 200px;
    margin-bottom: 40px;
    font-weight: 500;
    color: var(--grayDolphin);
    text-align: center;
  }
}
</style>
