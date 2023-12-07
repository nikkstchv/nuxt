<template>
  <transition name="search-panel-fade">
    <div v-if="isOpen" class="search-panel">
      <header class="search-panel__header">
        <IconLogoASC
          v-if="isAsc"
          class="search-panel__logo search-panel__logo_asc"
        />
        <IconLogoABTODOM v-else class="search-panel__logo" />
        <IconClose class="search-panel__close" @click="close" />
      </header>
      <input
        ref="searchInput"
        placeholder="Поиск"
        type="search"
        class="search-panel__input"
        @input="debounceSearch"
      >
      <template v-if="searchValue">
        <!--        <div class="search-panel__category">-->
        <!--          <UIBaseSelectButtons-->
        <!--            :buttons="sections"-->
        <!--            @onSetSelectButtons="onSetSections"-->
        <!--          />-->
        <!--        </div>-->
        <div class="search-panel__main">
          <aside class="search-panel__aside">
            <UIBaseCheckbox
              v-for="checkbox in marks"
              :key="checkbox.name"
              v-model="modelItem"
              :label="checkbox.name"
              :value="checkbox.name"
              :disable="checkbox.disabled"
              class="search-panel__checkbox"
            >
              <span class="search-panel__checkbox-label">{{
                checkbox.count
              }}</span>
            </UIBaseCheckbox>
          </aside>
          <UIBaseAccordion class="search-panel__accordion" label="Категории">
            <UIBaseCheckbox
              v-for="checkbox in marks"
              :key="checkbox.name"
              v-model="modelItem"
              :label="checkbox.name"
              :value="checkbox.name"
              :disable="checkbox.disabled"
              class="search-panel__checkbox"
            >
              <span class="search-panel__checkbox-label">{{
                checkbox.count
              }}</span>
            </UIBaseCheckbox>
          </UIBaseAccordion>
          <div v-if="hasData && !loading" class="search-panel__groups">
            <div
              v-for="item in searchData.results"
              :key="item._group_key"
              class="search-panel__group"
              :class="{ 'search-panel__groups_single': isOneGroup }"
            >
              <h3 class="search-panel__subtitle">
                {{ item._group_key }}
              </h3>
              <div
                class="search-panel__list"
                :class="{ 'search-panel__list_single': isOneGroup }"
              >
                <SearchCard
                  v-if="showPriorityItem(item)"
                  :key="item.id.raw"
                  :image="getImage(item)"
                  :title="`${item.mark.raw} ${item.model.raw}`"
                  :text="item.modification.raw"
                  :price="$toLocalPrice(item.disprice.raw)"
                  :link="`/${setRoutCard}/${item._meta.id}/`"
                  class="search-panel__card"
                  @click="onGoToDetail"
                />
                <SearchCard
                  v-for="card in item._group.length ? item._group : [item]"
                  :key="card.id.raw"
                  :image="getImage(card)"
                  :title="`${card.mark.raw} ${card.model.raw}`"
                  :text="card.modification.raw"
                  :price="$toLocalPrice(card.disprice.raw)"
                  :link="`/${setRoutCard}/${card._meta.id}/`"
                  class="search-panel__card"
                  @click="onGoToDetail"
                />
              </div>

              <UIBaseButton
                :to="getLinkSeeAll(item)"
                class="search-panel__show-more"
                txt
                @click="onGoToCatalog"
              >
                Смотреть все
              </UIBaseButton>
            </div>
          </div>
          <h2 v-if="!hasData && !loading" class="search-panel__title">
            Ничего не найдено
          </h2>
          <UILoader v-if="loading" class="search-panel__loader" />
          <div v-if="searchData && !loading" class="search-panel__pagination">
            <UIBaseButton
              v-if="currentPage > 1"
              class="search-panel__pagination-button search-panel__pagination-button_prev"
              secondary
              @click="pageChangeHandle"
            >
              Назад
            </UIBaseButton>
            <UIBaseButton
              v-if="totalPages > currentPage"
              class="search-panel__pagination-button search-panel__pagination-button_next"
              secondary
              @click="pageChangeHandle('next')"
            >
              Далее
            </UIBaseButton>
          </div>
        </div>
      </template>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useFilterStore } from '../../store/filter'
import { useHoldingStore } from '../../store/holding'
import { search } from '@/api/routes/search'

export default {
  name: 'SearchPanel',
  props: {
    isDetailQr: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      searchValue: '',
      debounce: null,
      currentPage: 1,
      loading: false,
      isOpen: false,
      searchData: null,
      groupedData: null,
      modelItem: [],
      marks: null,
      sections: [
        {
          label: 'Каталог',
          isActive: true,
        },
        {
          label: 'Аксессуары',
          isActive: false,
        },
      ],
    }
  },
  computed: {
    setRoutCard () {
      return this.isDetailQr ? 'price-tags' : 'catalog'
    },
    isOneGroup () {
      const results = this.searchData.results
      if (results) {
        return results.length === 1
      }
      return false
    },
    totalPages () {
      return this.searchData?.meta?.page?.total_pages ?? 1
    },
    hasData () {
      return this.searchData?.results?.length ?? null
    },
    ...mapState(useHoldingStore, {
      isAsc: 'isAsc',
    }),
  },
  watch: {
    isOpen (isOpen) {
      if (isOpen) {
        this.$nextTick(() => {
          this.$refs.searchInput.focus()
        })
      }
    },
    modelItem () {
      this.fetch()
    },
    searchValue (value) {
      if (value) {
        if (this.modelItem.length) {
          this.modelItem = []
        }
        this.fetch()
      }
    },
  },
  mounted () {
    document.addEventListener('keyup', this.handlerClose)
  },
  beforeUnmount () {
    document.removeEventListener('keyup', this.handlerClose)
  },
  methods: {
    showPriorityItem (item) {
      const isIdsDifferent = item._group.length === 1 && item._group[0].id.raw !== item.id.raw
      return isIdsDifferent || item._group.length > 1
    },
    debounceSearch (event) {
      this.searchValue = null
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.searchValue = event.target.value
      }, 300)
    },
    getLinkSeeAll (item) {
      const carTypeCode = this.getCode(item, 'car_type_code')
      const markCode = this.getCode(item, 'mark_code')
      const modelCode = this.getCode(item, 'model_code')
      return `/${carTypeCode}/?mark=${markCode}&model=${modelCode}`
    },
    getCheckboxesMarks (marks) {
      return marks
        .map(({ value, count }) => {
          return {
            name: value,
            count,
            checked: false,
            disabled: false,
            nameEn: value,
          }
        })
        .sort((a, b) => {
          if (a.name && b.name) {
            const fa = a.name
            const fb = b.name
            if (fa < fb) {
              return -1
            }
            if (fa > fb) {
              return 1
            }
          }
          return 0
        })
    },
    onGoToCatalog () {
      this.setInitFilter(true)
      this.close()
    },
    onGoToDetail () {
      this.close()

      if (this.isDetailQr) {
        setTimeout(() => {
          const pathBackQr = useCookie('detailQrPath', { watch: 'shallow' })
          pathBackQr.value = this.$route.path
        }, 500)
      }
    },
    onSetSections (sections) {
      this.sections = sections
    },
    getCode (card, codeName) {
      try {
        return JSON.parse(card.filters.raw)[codeName] ?? ''
      } catch (e) {
        return ''
      }
    },
    getImage (card) {
      try {
        return JSON.parse(card.preview.raw)?.source?.url ?? ''
      } catch (e) {
        return ''
      }
    },
    pageChangeHandle (value) {
      if (value === 'next') {
        this.currentPage += 1
      } else if (this.currentPage > 1) {
        this.currentPage -= 1
      }
      this.fetch(true)
    },
    async fetch (isHandlePage) {
      this.loading = true
      if (!isHandlePage) {
        this.currentPage = 1
      }
      this.searchData = await this.search(this.searchValue)
      if (this.modelItem.length === 0) {
        this.marks = this.getCheckboxesMarks(
          this.searchData?.facets?.model[0].data ?? [],
        )
      }
      this.groupedData = this.searchData.results.sort((a, b) => {
        if (a.name && b.name) {
          const fa = a._group_key
          const fb = b._group_key
          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
        }
        return 0
      })
      this.loading = false
    },
    async search (query) {
      let filters = null

      if (this.modelItem.length) {
        filters = {
          all: [{ model: this.modelItem }],
        }
      }

      try {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        const raw = JSON.stringify({
          query,
          page: {
            size: 5,
            current: this.currentPage,
          },
          facets: {
            model: [
              {
                type: 'value',
                name: 'model',
                size: 15,
              },
            ],
          },
          ...(filters && { filters }),
          group: {
            field: 'model',
            size: this.modelItem.length ? 10 : 5,
            collapse: true,
          },
        })
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        }

        const { $fetchClient, $hasErrorResponse } = useNuxtApp()

        const res = await $fetchClient(search(), requestOptions, false)

        if (!$hasErrorResponse(res)) {
          return res
        }

        return null
      } catch (e) {}
    },
    close () {
      this.isOpen = false
      this.$controlFixBody(false)
    },
    open () {
      this.isOpen = true
      this.$controlFixBody(true)
    },
    handlerClose (e) {
      if (e.key === 'Escape') {
        this.close()
      }
    },
    ...mapActions(useFilterStore, {
      setInitFilter: 'setInitFilter',
    }),
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.search-panel {
  @include indentsMainHorizontal;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  grid-template-columns: 30%;
  align-self: flex-end;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 30px;

  &__category {
    grid-area: category;
    margin-bottom: 40px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0 100px;

    @include mq($bp-medium) {
      padding: 50px 0 100px;
    }
  }

  .search-panel &__logo {
    width: 110px;
    height: 30px;
    margin: 0;

    @include mq($bp-medium) {
      width: 140px;
      height: 40px;
    }

    &_asc {
      width: 110px;
      height: 40px;

      @include mq($bp-medium) {
        width: 140px;
        height: 50px;
      }
    }
  }

  &__close {
    width: 35px;
    height: 35px;
    padding: 6px;

    & :deep(.icon__path) {
      stroke: var(--grayDolphin);
    }
  }

  &__input {
    @include h3;

    width: 100%;
    padding-bottom: 5px;
    margin-bottom: 40px;
    text-overflow: ellipsis;
    border-bottom: 1px solid var(--grayMediumLight);

    @include mq($bp-super-small) {
      @include h2;

      padding-bottom: 10px;
    }

    @include mq($bp-medium-big) {
      @include h1;

      padding-bottom: 15px;
    }

    &::placeholder {
      @include h3;

      color: var(--grayMediumLight);

      @include mq($bp-super-small) {
        @include h2;
      }

      @include mq($bp-medium-big) {
        @include h1;

        padding-bottom: 15px;
      }
    }

    &:focus,
    &:active {
      border-bottom: 1px solid var(--blackLight);
      outline: none;
    }

    &::-webkit-search-cancel-button {
      display: none;
    }

    &:valid ~ span::after {
      content: '';
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    height: 100%;
    overflow-x: auto;

    @include mq($bp-small) {
      grid-gap: 30px;
    }

    @include mq($bp-medium) {
      display: grid;
      grid-template-areas:
        'aside list list'
        'aside list list'
        'pagination pagination pagination';
      grid-template-columns: minmax(220px, max-content) 1fr 1fr;
      grid-gap: 40px;
    }

    @include mq($bp-big) {
      grid-gap: 50px;
    }
  }

  &__aside {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    grid-area: aside;
    grid-gap: 15px;
    width: max-content;

    @media (max-width: $bp-medium) {
      display: none;
    }
  }

  &__accordion {
    grid-area: accordion;
    width: 100%;
    margin-bottom: 20px;

    @include mq($bp-medium) {
      display: none;
    }

    & :deep(.accordion__wrapper-content) {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      grid-gap: 15px;
      width: max-content;
    }
  }

  &__loader {
    grid-area: list;
  }

  &__groups {
    display: grid;
    grid-area: list;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 50px;
    width: 100%;
    height: fit-content;

    @include mq($bp-small) {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 70px 60px;
    }

    @include mq($bp-medium) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mq($bp-medium-big) {
      grid-template-columns: repeat(3, 1fr);
    }

    @include mq(1500px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @include mq(1919px) {
      grid-template-columns: repeat(5, 1fr);
    }

    &_single {
      grid-template-columns: repeat(1, 1fr) !important;
    }
  }

  &__group {
    display: flex;
    flex-direction: column;
  }

  &__list {
    display: grid;
    grid-gap: 25px;

    &_single {
      grid-template-columns: 1fr;
      grid-auto-rows: 1fr;

      @include mq($bp-small) {
        grid-template-columns: repeat(2, 1fr);
        width: max-content;
      }
    }
  }

  &__pagination {
    position: sticky;
    bottom: 0;
    display: grid;
    grid-area: pagination;
    grid-auto-flow: column;
    align-items: center;
    align-self: flex-end;
    width: 100%;
    height: fit-content;
    padding: 30px 5px 20px;
    background: white;

    @include mq($bp-medium) {
      padding-right: 20px;
      margin-bottom: 50px;
    }

    &-button {
      &_next {
        justify-self: flex-end;
      }
    }
  }

  &__title {
    @include h2;
  }

  &__subtitle {
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
  }

  &__checkbox :deep(.checkbox__label) {
    display: flex;
    grid-gap: 2px;
  }

  &__checkbox-label {
    display: block;
    order: 1;
    font-size: 9px;
    font-weight: 300;
    line-height: 8px;
    color: var(--blackLight);
  }

  &__show-more {
    margin-top: 30px;
  }
}

.search-panel-fade-enter,
.search-panel-fade-leave-to {
  opacity: 0;
}

.search-panel-fade-enter-active,
.search-panel-fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>
