<template>
  <div
    class="card-header"
    :class="{ 'card-header_indent': showExteriorBtn || showInterierBtn }"
  >
    <CardIconCompare
      :class="{ 'card-header__compare_active': isCompare }"
      class="card-header__compare"
      @click="handleCompare"
    />
    <CardButtonRotate
      v-if="showExteriorBtn"
      text="Экстерьер"
      class="card-header__rotate card-header__rotate_ext"
      @click="handleExterior"
    />
    <CardButtonRotate
      v-if="showInterierBtn"
      class="card-header__rotate card-header__rotate_int"
      text="Интерьер"
      @click="handleInterier"
    />
    <CardIconHeart
      class="card-header__heart"
      :class="{ 'card-header__heart_active': isFavorite }"
      @click="handleFavorite"
    />
    <UIPopup ref="popupAddFavorites">
      <template #body>
        <p class="popup__text">
          Добавлено в избранное
        </p>
      </template>
      <template #footer>
        <UIBaseButton
          class="popup__button"
          secondary-light
          large
          text="Перейти"
          @click="goToInPopup('favorites')"
        />
      </template>
    </UIPopup>
    <UIPopup ref="popupRemoveFavorites" :agree-remove="agreeRemove">
      <template #body>
        <p class="popup__text">
          Удалено из избранного
        </p>
      </template>
      <template #footer>
        <UIBaseButton
          class="popup__button"
          secondary-light
          large
          text="Отменить"
          @click="onClosePopup();addFavorite({ id, name: favoriteName })"
        />
      </template>
    </UIPopup>
    <UIPopup ref="popupAddCompare">
      <template #body>
        <p class="popup__text">
          Добавлено в сравнение
        </p>
      </template>
      <template v-if="isMoreThenOneCompare" #footer>
        <UIBaseButton
          class="popup__button"
          secondary-light
          large
          text="Перейти"
          @click="goToInPopup('compare')"
        />
      </template>
    </UIPopup>
    <UIPopup ref="popupRemoveCompare">
      <template #body>
        <p class="popup__text">
          Удалено из сравнения
        </p>
      </template>
      <template #footer>
        <UIBaseButton
          class="popup__button"
          secondary-light
          large
          text="Отменить"
          @click="onClosePopup();addCompare({ id, name: compareName })"
        />
      </template>
    </UIPopup>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCompareStore } from '../../store/compare'
import { useFavoritesStore } from '../../store/favorites'
import { useCarStore } from '../../store/car'

export default {
  name: 'CardHeader',
  props: {
    id: {
      type: String,
      required: true,
    },
    typeOfTransport: {
      type: String,
      required: true,
      default: '1',
    },
    showInterierBtn: {
      type: Boolean,
      default: false,
    },
    showExteriorBtn: {
      type: Boolean,
      default: false,
    },
    exponeaItemData: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data () {
    return {
      compare: null,
      favorites: null,
      typeOfTransportName: {
        code: {
          1: 'cars',
          2: 'moto',
          3: 'cars',
          4: 'atv',
          6: 'jet-ski',
        },
        en: {
          1: 'Cars',
          2: 'Moto',
          3: 'Cars',
          4: 'Atv',
          6: 'JetSki',
        },
        ru: {
          1: 'Автомобили',
          2: 'Мотоциклы',
          3: 'Автомобили',
          4: 'Квадроциклы',
          6: 'Гидроциклы',
        },
      },
    }
  },
  computed: {
    isMoreThenOneCompare () {
      const compareLength = this.compare?.length ?? 0
      return compareLength > 1
    },
    favoriteName () {
      return `favorite${this.typeOfTransportName.en[this.typeOfTransport]}`
    },
    compareName () {
      return `compare${this.typeOfTransportName.en[this.typeOfTransport]}`
    },
    isFavorite () {
      if (this.favorites) {
        return this.favorites.find(id => this.id === id)
      }
      return null
    },
    isCompare () {
      if (this.compare) {
        return this.compare.find(id => this.id === id)
      }
      return null
    },
    favoriteState () {
      const store = useFavoritesStore()
      return store[this.favoriteName]
    },
    compareState () {
      const store = useCompareStore()
      return store[this.compareName]
    },
    ...mapState(useCarStore, ['googleAnalyticsData']),
  },
  watch: {
    favoriteState (value) {
      this.favorites = value
    },
    compareState (value) {
      this.compare = value
    },
  },
  mounted () {
    try {
      this.compare =
        JSON.parse(localStorage.getItem(this.compareName)) ??
        this.compareState ??
        []
      this.favorites =
        JSON.parse(localStorage.getItem(this.favoriteName)) ??
        this.favoriteState ??
        []
    } catch (e) {}
  },
  methods: {
    agreeRemove () {
      this.$emit('agreeRemove')
    },
    handleExterior () {
      this.$emit('openExterior')
    },
    handleInterier () {
      this.$emit('openInterier')
    },
    handleCompare () {
      const payload = { id: this.id, name: this.compareName }
      if (this.isCompare) {
        this.removeCompare(payload)
        this.onOpenRemoveComparePopup()
        this.$exponeaItem('remove_compare', this.exponeaItemData)
      } else {
        this.addCompare(payload)
        this.onOpenAddComparePopup()
        this.$exponeaItem('add_compare', this.exponeaItemData)
      }
    },
    handleFavorite () {
      const payload = { id: this.id, name: this.favoriteName }
      if (this.isFavorite) {
        this.removeFavorite(payload)
        this.onOpenRemoveFavoritesPopup()
        this.$exponeaItem('remove_favorite', this.exponeaItemData)
      } else {
        this.addFavorite(payload)
        this.onOpenAddFavoritesPopup()
        this.sendGoogleAnalyticsData()
        this.$exponeaItem('add_favorite', this.exponeaItemData)
      }
    },
    sendGoogleAnalyticsData () {
      const body = {
        ecommerce: this.googleAnalyticsData,
        event: 'GAEventEC',
        eCategory: 'eEC',
        eAction: 'add_to_wishlist',
        eLabel: '',
      }
      this.$gtm.trackEvent(body)
    },
    onOpenAddFavoritesPopup () {
      this.onClosePopup()
      this.$refs.popupAddFavorites.open()
    },
    onOpenRemoveFavoritesPopup () {
      this.onClosePopup()
      this.$refs.popupRemoveFavorites.open()
    },
    onOpenAddComparePopup () {
      this.onClosePopup()
      this.$refs.popupAddCompare.open()
    },
    onOpenRemoveComparePopup () {
      this.onClosePopup()
      this.$refs.popupRemoveCompare.open()
    },
    onClosePopup () {
      this.$refs.popupAddFavorites.close()
      this.$refs.popupRemoveFavorites.close()
      this.$refs.popupAddCompare.close()
      this.$refs.popupRemoveCompare.close()
    },
    goToInPopup (pathName) {
      const sectionName = this.typeOfTransportName.code[this.typeOfTransport]
      this.$router.push(`/${pathName}?section=${sectionName}`)
      this.onClosePopup()
    },
    ...mapActions(useCompareStore, {
      addCompare: 'addCompare',
      removeCompare: 'removeCompare',
    }),
    ...mapActions(useFavoritesStore, {
      addFavorite: 'addFavorite',
      removeFavorite: 'removeFavorite',
    }),
  },
}
</script>

<style lang="scss" scoped>
.card-header {
  position: relative;
  display: grid;
  grid-template-areas:
    'compare heart'
    'ext int';
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  @include mq($bp-small) {
    grid-template-areas: 'compare ext int heart';
  }

  &_indent {
    grid-gap: 20px;
  }

  &__icons {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 17px;
    place-items: center;
  }

  &__rotate {
    margin: auto;

    &_int {
      grid-area: int;
    }

    &_ext {
      grid-area: ext;
    }
  }

  &__heart {
    grid-area: heart;
    justify-self: flex-end;
    width: 30px;
    height: 30px;
    transition: visibility, opacity 0.3s;

    @include mq($bp-medium) {
      opacity: 0;
    }

    &_active {
      opacity: 1;
    }

    &_active :deep(.icon) {
      fill: var(--black);
    }

    &_active :deep(.icon__path) {
      stroke: var(--black);
    }
  }

  &__compare {
    grid-area: compare;
    width: 30px;
    height: 30px;
    transition: visibility, opacity 0.3s;

    @include mq($bp-medium) {
      opacity: 0;
    }

    &_active {
      opacity: 1;
    }

    &_active :deep(.icon) {
      fill: var(--black);
    }

    &_active :deep(.icon__path) {
      stroke: var(--black);
    }
  }

  &__popup {
    @include text_medium_regular;

    position: absolute;
    right: -145px;
    width: max-content;
    padding: 8px 10px 8px 8px;
    color: white;
    visibility: hidden;
    background: var(--black);
    border-radius: 5px;
    opacity: 0;
    transition: opacity, visibility 0.3s;

    &_show {
      visibility: visible;
      opacity: 1;
    }

    &-text_line-through {
      text-decoration: line-through;
    }

    &-icon {
      position: absolute;
      top: 22px;
      left: -4px;
    }
  }
}

.popup {
  &__text {
    @include label_small;

    margin-bottom: 15px;
  }

  &__button {
    @include text_medium_small;

    padding: 12px 30px;
  }
}
</style>
