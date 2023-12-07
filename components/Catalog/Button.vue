<template>
  <button class="button-arrow">
    <span class="button-arrow__text"><slot /></span>
    <IconArrowBig
      right
      class="button-arrow__icon-arrow"
      :class="{ 'button-arrow__icon-arrow_eng': isEng }"
    />
  </button>
</template>

<script>
export default {
  name: 'CatalogButton',
  props: {
    isEng: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.button-arrow {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  align-items: center;
  width: 40px;
  max-width: fit-content;
  height: 40px;
  padding-left: 13px;
  color: white;
  background: white;
  border-radius: 100px;
  transition: all 0.2s linear;

  &__text {
    display: block;
    color: white;
    opacity: 0;
    transition: opacity 0.3s linear;
  }

  .button-arrow &__icon-arrow {
    width: 40px;
    height: 40px;
    padding: 8px;
    background: var(--blackLight);
    border-radius: 100px;
    transition: all 0.2s cubic-bezier(0.42, 0, 0.34, 1.07);
    transform: translateX(-75px) rotate(-180deg);

    & :deep(.icon__path) {
      stroke: white;
    }

    &_eng {
      transform: translateX(-60px) rotate(-180deg);
    }
  }
}
</style>
