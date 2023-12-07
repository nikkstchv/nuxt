<template>
  <div class="compliance">
    <div class="compliance__card">
      <img
        class="compliance__card-icon"
        src="@/assets/icons/compliance/program.svg"
        alt="логотип"
      >
      <h3 class="compliance__card-title">
        Комплаенс-программа
      </h3>
      <UIBaseButton
        secondary
        text="Читать"
        @click="
          onPushLink(
            'https://webdms-avtodom-ru-media-bank.hb.bizmrg.com/about/compliance/%D0%90%D0%92%D0%A2%D0%9E%D0%94%D0%9E%D0%9C_%D0%9A%D0%BE%D0%BC%D0%BF%D0%BB%D0%B0%D0%B5%D0%BD%D1%81_%D0%9F%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0.docx'
          )
        "
      />
    </div>
    <div class="compliance__card">
      <img
        class="compliance__card-icon"
        src="@/assets/icons/compliance/policy.svg"
        alt="логотип"
      >
      <h3 class="compliance__card-title">
        Комплаенс-политика
      </h3>
      <UIBaseButton
        secondary
        text="Читать"
        @click="
          onPushLink(
            'https://webdms-avtodom-ru-media-bank.hb.bizmrg.com/about/compliance/%D0%90%D0%92%D0%A2%D0%9E%D0%94%D0%9E%D0%9C_%D0%9A%D0%BE%D0%BC%D0%BF%D0%BB%D0%B0%D0%B5%D0%BD%D1%81_%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0.docx'
          )
        "
      />
    </div>
    <div class="compliance__card">
      <img
        class="compliance__card-icon"
        src="@/assets/icons/compliance/ethics.svg"
        alt="логотип"
      >
      <h3 class="compliance__card-title">
        Кодекс корпоративной этики
      </h3>
      <UIBaseButton
        secondary
        text="Читать"
        @click="
          onPushLink(
            'https://webdms-avtodom-ru-media-bank.hb.bizmrg.com/about/compliance/%D0%9A%D0%BE%D0%B4%D0%B5%D0%BA%D1%81%20%D0%BA%D0%BE%D1%80%D0%BF%D0%BE%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%B9%20%D1%8D%D1%82%D0%B8%D0%BA%D0%B8%20%D0%90%D0%9E%20%D0%90%D0%92%D0%A2%D0%9E%D0%94%D0%9E%D0%9C.docx'
          )
        "
      />
    </div>
  </div>
</template>

<script setup>
const onPushLink = (route) => {
  window.location.href = route
}
</script>

<style lang="scss" scoped>
.compliance {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  grid-gap: 35px;
  width: 100%;
  height: fit-content;

  @include mq($bp-small-medium) {
    grid-template-columns: repeat(auto-fill, minmax(377px, 1fr));
    grid-gap: 20px;
  }

  &__card {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-gap: 30px;
    padding: 20px;
    background-color: var(--grayLight);

    @include mq($bp-small-medium) {
      padding: 30px;
    }

    &-title {
      @include text_big_bold;

      @include mq($bp-small-medium) {
        @include h4;
      }
    }

    &-icon {
      position: absolute;
      top: 20px;
      right: 20px;

      @include mq($bp-small-medium) {
        top: 30px;
        right: 30px;
      }
    }
  }
}
</style>
