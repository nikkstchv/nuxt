<template>
  <div
    class="qr-template"
    :class="{
      'qr-template_orientation_landscape': orientation === 'landscape',
    }"
  >
    <div class="qr-template__title-container">
      <h2 class="qr-template__title">
        BMW <span class="qr-template__title-small">PREMIUM</span> SELECTION
      </h2>
      <h2 class="qr-template__subtitle">
        СЕРТИФИЦИРОВАННЫЕ АВТОМОБИЛИ BMW С ПРОБЕГОМ
      </h2>
    </div>
    <div class="qr-template__wrapper">
      <div class="qr-template__content">
        <DetailTitle class="qr-template__main-title">
          {{ mark }} {{ model }} {{ serie }}
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
      </div>
      <div class="qr-template__qr-container">
        <QrCode class="qr-template__qr" :value="url" :size="180" />
        <p class="qr-template__qr-label">
          УЗНАТЬ ЦЕНУ
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QRTemplatesBmwPremiumSelection',
  props: {
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
    serie: {
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
  },
}
</script>

<style lang="scss" scoped>
.qr-template {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  grid-gap: 50px;
  padding: 100px 50px;

  &_orientation {
    &_landscape {
      padding: 20px 100px;
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

  &__qr-label {
    margin-top: 15px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
  }

  &__item {
    display: grid;
    grid-template-columns: minmax(max-content, 240px) 1fr;
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
    color: var(--grayDolphin);
  }

  &__title-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__title {
    display: flex;
    flex-wrap: nowrap;
    grid-gap: 10px;
    font-size: 44px;
    font-weight: 800;
    line-height: 52px;
  }

  &__title-small {
    font-weight: 400;
  }

 &__main-title {
   @include h2;

   margin-bottom: 30px;
  }

  &__subtitle {
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    white-space: nowrap;
  }

  &__item-value {
    font-weight: 800;
    color: var(--black);
  }
}
</style>
