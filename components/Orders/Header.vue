<template>
  <header class="filter-header">
    <UIBaseSelect
      label="Сортировка"
      :options="[
        { name: 'По популярности', isActive: true },
        { name: 'Сначала дешевле' },
        { name: 'Сначала дороже' },
      ]"
      class="filter-header__select"
      @onSetSelect="onSetSort"
    />
    <div class="filter-header__buttons-slider">
      <UIBaseSelectButton text="Сервис" class="filter-header__button" />
      <UIBaseSelectButton text="Салон" class="filter-header__button" />
      <UIBaseSelectButton text="Все фильтры" class="filter-header__button">
        <IconFilter class="filter-header__icon" />
      </UIBaseSelectButton>
    </div>
  </header>
</template>

<script>
export default {
  name: 'OrdersHeader',
}
</script>

<style lang="scss" scoped>
.filter-header {
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 15px;
  align-items: center;
  width: fit-content;

  &__buttons-slider {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 15px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__icon {
    margin-left: 10px;
  }
}
</style>
