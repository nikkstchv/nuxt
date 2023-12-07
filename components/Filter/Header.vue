<template>
  <SkeletonCatalogHeader v-if="loading" />
  <div
    v-else
    class="filter-header"
  >
    <UIBreadcrumbs
      class="filter-header__breadcrumbs"
      :class="{ 'filter-header__breadcrumbs_hide': !contentRangeString }"
      :content-range="contentRangeString"
      :direct-crumbs="directCrumbs"
    />
    <h1 class="filter-header__title" itemprop="name">
      {{ title }}
    </h1>
    <div v-if="text" class="filter-header__text" v-html="text" />
    <section class="filter-header__buttons-container">
      <section class="filter-header__buttons">
        <CatalogSortSelect
          label="Сортировка"
          :options="sort"
          :disable="!isInitFilter"
          @onSetSort="onSetSort"
        />
        <UIBaseSelectButton
          text="Все фильтры"
          class="filter-header__button filter-header__button_all-filters"
          :disable="!isInitFilter"
          @click="isInitFilter && onOpenFilterPanel()"
        >
          <IconFilter class="filter-header__icon" />
        </UIBaseSelectButton>
        <UIBaseSelectButton
          v-show="fastFilter"
          :text="fastFilterSchema[fastFilter]"
          class="filter-header__button filter-header__button_fast"
          :disable="!isInitFilter"
          @click="isInitFilter && onOpenQuickFilter(fastFilter)"
        />
      </section>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useFilterStore } from '../../store/filter'

export default {
  name: 'FilterHeader',
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    isExclusive: {
      type: Boolean,
      required: false,
      default: false,
    },
    isSellout: {
      type: Boolean,
      required: false,
      default: false,
    },
    sort: {
      type: Array,
      required: false,
      default: null,
    },
    onSetSort: {
      type: Function,
      required: true,
    },
    directCrumbs: {
      type: Array,
      required: false,
      default: () => [],
    },
    contentRange: {
      type: Number,
      required: false,
      default: 0,
    },
    fastFilter: {
      type: String,
      required: false,
      default: 'mark',
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    staticPageInfoSale: {
      type: String,
      required: false,
      default: '',
    },
  },
  data: () => ({
    fastFilterSchema: {
      mark: 'Марка',
      model: 'Модель',
      generation: 'Поколение',
      modification: 'Модификация',
      equipment: 'Комплектация',
    },
  }),
  computed: {
    text () {
      if (this.isExclusive) {
        return '«Эксклюзивно» — раздел, в котором представлен ряд автомобилей, доступных ограниченное время только для посетителей нашего сайта предзаказу и покупке. Мы не размещаем эти предложения на других сайта и маркетплейсах. Спешите первыми забронировать уникальные предложения'
      } else if (this.isSellout) {
        return this.staticPageInfoSale
      }
      return ''
    },
    contentRangeString () {
      const firstLevelParam = this.$route.path.split('/')[1]
      const schema = {
        cars: ['автомобиль', 'автомобиля', 'автомобилей'],
        moto: ['мотоцикл', 'мотоцикла', 'мотоциклов'],
        atv: ['квадроцикл', 'квадроцикла', 'квадроциклов'],
        'jet-ski': ['гидроцикл', 'гидроцикла', 'гидроциклов'],
      }
      const units = schema[firstLevelParam] ?? schema.cars

      if (this.contentRange > 0) {
        const unit = this.$declOfNum(this.contentRange, units)
        return `${this.contentRange} ${unit}`
      }
      return ''
    },
    ...mapState(useFilterStore, ['isInitFilter']),
  },
  methods: {
    onOpenFilterPanel () {
      const filterItems = document.querySelectorAll('.filter-item')
      filterItems.forEach(item => (item.style.order = 0))
      this.onOpenFilter()
    },
    onOpenQuickFilter (name = 'mark') {
      this.onOpenFilter()
      setTimeout(() => {
        const filterItem = document.querySelector(`.filter-item[name=${name}]`)
        const accordionLabel = filterItem.querySelector('.accordion__label')
        const accordionList = filterItem.querySelector('.accordion__list')
        if (!accordionList.classList.contains('accordion__list_open')) {
          accordionLabel.click()
        }
        filterItem.style.order = -1
      }, 200)
    },
    ...mapActions(useFilterStore, {
      onOpenFilter: 'onOpen',
    }),
  },
}
</script>

<style lang="scss" scoped>
.filter-header {
  display: grid;
  height: fit-content;
  transition: opacity, 0.2s;

  &__buttons-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include mq($bp-small) {
      flex-direction: row;
      grid-gap: 40px;
      justify-content: space-between;
    }
  }

  .filter-header &__button {
    position: relative;
    padding: 9.5px 15px;

    @include mq(340px) {
      padding: 9.5px 20px;
    }
  }

  &__button_fast {
    display: none;

    @include mq($bp-small-medium) {
      display: block;
    }
  }

  &__buttons {
    display: flex;
    flex-wrap: wrap;
    grid-auto-flow: column;
    grid-gap: 10px;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 20px;
    white-space: nowrap;

    @include mq($bp-small) {
      grid-gap: 15px;
      margin-bottom: 0;
    }
  }

  &__links {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 30px;
    align-items: center;
    align-self: flex-end;

    & :deep(.button) {
      @include text_medium_small;

      color: var(--blackLight);
    }

    @include mq($bp-small) {
      align-self: center;
      justify-self: flex-end;
    }
  }

  &__link {
    width: max-content;
    white-space: nowrap;

    &_no-select {
      cursor: default;
      user-select: none;
    }
  }

  &__title {
    @include h4;

    margin-bottom: 15px;

    @include mq($bp-small-medium) {
      @include h2;
    }

    @include mq($bp-medium) {
      @include h1;
    }
  }

  &__text {
    @import 'assets/styles/components/Static/html-style';

    @include text_medium_regular;

    margin-bottom: 15px;
    color: var(--blackLight);

    @include mq($bp-small-medium) {
      margin-bottom: 20px;
    }

    @include mq($bp-medium) {
      @include text_big_regular;
    }

    @include mq($bp-big) {
      margin-bottom: 30px;
    }
  }

  &__breadcrumbs {
    margin-bottom: 15px;
    transition: opacity, 0.2s;

    &_hide {
      pointer-events: none;
      visibility: hidden;
      opacity: 0;
    }
  }

  &__icon {
    margin-left: 10px;
  }
}
</style>
