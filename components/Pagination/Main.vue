<template>
  <div v-if="isShowPagination" class="pagination">
    <button
      v-show="!isPreviousButtonDisabled"
      class="
        pagination__button
        pagination__button-arrow
        pagination__button-arrow_left
      "
      @click="onPreviousPage"
    >
      <IconArrow left class="pagination__arrow" />
    </button>
    <UIBaseButton
      v-show="isShowMinMiddleRest"
      underline
      class="
        pagination__button pagination__button-rest pagination__button-rest_left
      "
      text="..."
      @click="onMinMiddlePage"
    />
    <PaginationTrigger
      v-for="paginationTrigger in paginationTriggers"
      :key="paginationTrigger"
      :class="{
        pagination_current: paginationTrigger === currentPage,
        pagination__button_first: paginationTrigger === 1,
        pagination__button_last: paginationTrigger === maxPaginationTrigger,
      }"
      :page-number="paginationTrigger"
      class="pagination__button"
      @loadPage="onSelectPage"
    />
    <UIBaseButton
      v-show="isShowMaxMiddleRest"
      underline
      class="
        pagination__button pagination__button-rest pagination__button-rest_right
      "
      text="..."
      @click="onMaxMiddlePage"
    />
    <button
      v-show="!isNextButtonDisabled"
      class="
        pagination__button
        pagination__button-arrow
        pagination__button-arrow_right
      "
      @click="onNextPage"
    >
      <IconArrow right class="pagination__arrow" />
    </button>
  </div>
</template>

<script>
import IconArrow from '@/components/Icon/Arrow.vue'

import UIBaseButton from '@/components/UI/Base/Button.vue'

import PaginationTrigger from '@/components/Pagination/Trigger.vue'

export default {
  name: 'PaginationMain',
  components: {
    IconArrow,
    UIBaseButton,
    PaginationTrigger,
  },
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    visiblePagesCount: {
      type: Number,
      default: 6,
    },
  },

  computed: {
    isShowPagination () {
      return this.pageCount > 1
    },
    maxPaginationTrigger () {
      if (Array.isArray(this.paginationTriggers)) {
        return Math.max.apply(null, this.paginationTriggers)
      }
      return this.paginationTriggers ?? null
    },
    isPreviousButtonDisabled () {
      return this.currentPage === 1
    },
    isShowMinMiddleRest () {
      return this.maxPaginationTrigger >= 9 && this.currentPage > 3
    },
    isShowMaxMiddleRest () {
      if (this.maxPaginationTrigger < 8) {
        return false
      }
      return !(this.currentPage > this.maxPaginationTrigger - 3)
    },
    isNextButtonDisabled () {
      if (this.pageCount === 0) {
        return true
      }
      return this.currentPage === this.pageCount
    },
    isEvenPage () {
      return this.currentPage % 2 === 0
    },
    paginationTriggers () {
      const currentPage = this.currentPage
      const pageCount = this.pageCount
      const visiblePagesCount = this.visiblePagesCount
      const visiblePagesThreshold = visiblePagesCount / 2 - 1
      let offset = 1
      if (currentPage < 6 && pageCount < 6) {
        offset = 2
      }
      const pagintationTriggersArray = Array(
        (this.visiblePagesCount ?? 1) - offset,
      ).fill(0)

      if (pageCount <= 4) {
        return pageCount
      }

      if (currentPage <= visiblePagesThreshold + 1) {
        pagintationTriggersArray[0] = 1
        const pagintationTriggers = pagintationTriggersArray.map(
          (_paginationTriggers, index) => {
            return pagintationTriggersArray[0] + index
          },
        )

        pagintationTriggers.push(pageCount)

        return pagintationTriggers
      }

      if (currentPage >= pageCount - visiblePagesThreshold + 1) {
        const pagintationTriggers = pagintationTriggersArray.map(
          (_paginationTrigger, index) => {
            return pageCount - index
          },
        )
        pagintationTriggers.reverse().unshift(1)
        return pagintationTriggers
      }

      pagintationTriggersArray[0] = currentPage - visiblePagesThreshold + 1
      const pagintationTriggers = pagintationTriggersArray.map(
        (_paginationTrigger, index) => {
          return pagintationTriggersArray[0] + index
        },
      )

      pagintationTriggers.unshift(1)
      pagintationTriggers[pagintationTriggers.length - 1] = pageCount
      return pagintationTriggers
    },
  },
  watch: {
    currentPage () {
      this.goUpThePage()
    },
  },
  methods: {
    goUpThePage () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    onMinMiddlePage () {
      let middlePage
      if (this.isEvenPage) {
        middlePage = Math.floor((this.currentPage + 1) / 2)
      } else {
        middlePage = Math.floor(this.currentPage / 2)
      }
      this.$emit('middlePage', middlePage)
    },
    onMaxMiddlePage () {
      let middlePage
      if (this.isEvenPage) {
        middlePage = Math.floor(
          (this.currentPage + this.maxPaginationTrigger) / 2,
        )
      } else {
        middlePage = Math.ceil(
          (this.currentPage + this.maxPaginationTrigger) / 2,
        )
      }
      if (this.currentPage === 1) {
        middlePage = Math.floor((this.maxPaginationTrigger + 4) / 2)
      }
      this.$emit('middlePage', middlePage)
    },
    onNextPage () {
      this.$emit('nextPage')
    },

    onSelectPage (value) {
      if (this.currentPage !== value) {
        this.$emit('loadPage', value)
      }
    },

    onPreviousPage () {
      this.$emit('previousPage')
    },
  },
}
</script>

<style lang="scss" scoped>
.pagination {
  display: grid;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
  grid-gap: 8px;
  place-items: start;
  align-items: center;

  @media (max-width: $bp-super-small) {
    grid-gap: 2.5px;
  }

  .pagination &_current {
    color: white;
    cursor: default;
    user-select: none;
    background-color: var(--blackLight);
  }

  &__arrow {
    width: 20px;
    height: 20px;
    stroke: var(--blackLight);
  }

  &__button {
    @include text_big_regular;

    display: grid;
    place-items: center;
    width: 35px;
    height: 35px;
    color: var(--blackLight);
    border-radius: 4px;

    @media (max-width: $bp-small-medium) {
      @include text_medium_regular;

      width: 30px;
      height: 30px;
    }

    .pagination &:hover:not(.pagination_current) {
      color: var(--blackLight);
      background: var(--grayMediumLight);
    }

    &_first {
      order: -3;
    }

    &_last {
      order: 3;
    }

    .pagination &-rest {
      width: 35px;
      height: 35px;
      font-size: 28px;
      border-bottom: 0;
      border-radius: 4px;

      @media (max-width: $bp-small-medium) {
        width: 30px;
        height: 30px;
        font-size: 24px;
      }

      &_left {
        order: -2;
      }

      &_right {
        order: 2;
      }
    }

    &-arrow {
      width: 35px;
      height: 35px;
      border-radius: 4px;

      @media (max-width: $bp-small-medium) {
        width: 30px;
        height: 30px;
      }

      &_left {
        order: -3;
      }

      &_right {
        order: 3;
      }
    }
  }
}

:deep(.button) {
  padding: 0;
}
</style>
