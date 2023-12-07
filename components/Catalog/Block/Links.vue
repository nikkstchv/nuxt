<template>
  <div class="catalog-block-links">
    <p v-if="title" class="catalog-block-links__title">
      {{ title }}
    </p>
    <div
      class="catalog-block-links__list"
      :class="{ 'catalog-block-links__list_open': isOpen }"
    >
      <UIBaseButton v-for="link in links" :key="link.label" underline>
        <nuxt-link
          :to="link.href"
          class="catalog-block-links__link"
        >
          {{ link.label }}
        </nuxt-link>
      </UIBaseButton>
    </div>
    <UIBaseButton
      v-show="isShowButton"
      txt
      :text="isOpen ? 'Свернуть' : 'Посмотреть все'"
      class="catalog-block-links__button"
      @click="onToggle"
    />
  </div>
</template>

<script>
export default {
  name: 'CatalogBlockLinks',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    links: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      isOpen: false,
    }
  },
  computed: {
    isShowButton () {
      return this.links.length > 12
    },
  },
  methods: {
    onToggle () {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style lang="scss" scoped>
.catalog-block-links {
  display: flex;
  flex-direction: column;
  grid-gap: 30px;

  &__title {
    @include h5;

    @include mq($bp-small) {
      @include h4;
    }

    @include mq($bp-medium) {
      @include h3;
    }
  }

  &__link {
    @include text_medium_small;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 15px 30px;
    max-height: 125px;
    overflow: hidden;

    @include mq($bp-small-medium) {
      grid-gap: 15px 40px;
    }

    &_open {
      max-height: initial;
      overflow-y: auto;
    }
  }
}
</style>
