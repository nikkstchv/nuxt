<template>
  <div class="favorites-header">
    <UISimplePageHeader class="favorites-header__top" title="Избранное" />
    <section class="favorites-header__buttons-container">
      <section class="favorites-header__buttons">
        <section class="favorites-header__buttons-main">
          <UIBaseSelectButtons
            ref="sectionButtons"
            :buttons="sections"
            @onChangeButtons="onChangeSections"
          />
        </section>
      </section>
      <section class="favorites-header__links">
        <UIBaseButton
          class="favorites-header__link"
          underline
          text="Очистить избранное"
          @click="onClearAllFavorites"
        />
      </section>
    </section>
  </div>
</template>

<script setup>
import { useFavoritesStore } from '../../store/favorites'

const { clearFavorite } = useFavoritesStore()

defineProps({
  sections: {
    type: Array,
    required: true,
  },
  onChangeSections: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['removeAll'])

const onClearAllFavorites = () => {
  clearFavorite('favoriteCars')
  clearFavorite('favoriteMoto')
  clearFavorite('favoriteAtv')
  clearFavorite('favoriteAccessories')
  emit('removeAll')
}
</script>

<style lang="scss" scoped>
.favorites-header {
  display: grid;

  @media (min-width: $bp-small + 1) and (max-width: $bp-medium) {
    margin-bottom: 29px;
  }

  &__buttons-container {
    position: relative;
    display: flex;
    flex-direction: column;

    @media (max-width: $bp-small-medium) {
      display: grid;
      grid-auto-flow: row;
      grid-gap: 13px;
      align-items: center;
    }

    @include mq($bp-medium) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__button {
    position: relative;

    &_all-filters {
      @include mq($bp-medium) {
        margin-right: 20px;
      }
    }
  }

  &__buttons {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 15px;
    justify-content: space-between;
    white-space: nowrap;

    @media (min-width: $bp-small-medium + 1) and (max-width: $bp-medium) {
      margin-bottom: 20px;
    }

    @media (max-width: $bp-super-small) {
      grid-gap: 5px;
    }

    &-main {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 15px;

      @media (max-width: $bp-super-small) {
        grid-gap: 5px;
      }
    }
  }

  &__links {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 20px;
    align-items: center;
    align-self: flex-end;
    justify-self: flex-end;

    & :deep(.button) {
      @include text_medium_small;
    }

    @media (max-width: $bp-small-medium) {
      grid-gap: 21px;
      align-self: center;

      & :deep(.button) {
        @include text_small_medium;
      }
    }

    @include mq($bp-medium) {
      align-self: center;
    }
  }

  &__link {
    width: max-content;

    &_no-select {
      cursor: default;
      user-select: none;
    }
  }

  &__top :deep(.header__title) {
    @include mq($bp-medium-big) {
      margin-bottom: 30px;
    }

    @include mq($bp-big) {
      margin-bottom: 30px;
    }
  }
}
</style>
