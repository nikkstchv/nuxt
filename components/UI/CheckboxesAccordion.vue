<template>
  <div class="checkboxes-accordion">
    <div
      class="
        checkboxes-accordion
        checkboxes-accordion__list
        checkboxes-accordion__list_open
      "
    >
      <slot name="default" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UICheckboxesAccordion',
}
</script>

<style lang="scss" scoped>
.checkboxes-accordion {
  width: 100%;
  height: max-content;

  &__label {
    @include text_medium_bold;

    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    cursor: pointer;
  }

  &__list {
    display: grid;
    grid-gap: 15px;
    height: fit-content;
    max-height: 191px;
    overflow-y: hidden;
    transition: max-height 0.3s cubic-bezier(0, 0, 0.2, 1);

    @media (min-width: $bp-medium-big) {
      max-height: 166px;
    }

    &_open {
      max-height: 336px;
      overflow-y: auto;

      @media (min-width: $bp-medium-big) {
        max-height: 290px;
      }
    }
  }
}
</style>
