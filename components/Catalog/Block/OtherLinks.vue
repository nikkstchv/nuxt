<template>
  <section class="other-links">
    <p v-if="title" class="other-links__title">
      {{ title }}
    </p>
    <div v-for="item in list" :key="item.title" class="other-links__list">
      <p class="other-links__list-title">
        {{ item.title }}
      </p>
      <UIBaseButton
        v-for="link in item.links"
        :key="link.label"
        class="other-links__button"
        underline
        @click="link.action && link.action()"
      >
        <component
          :is="link.href ? 'router-link' : 'span'"
          :to="link.href"
          class="other-links__link"
        >
          {{ link.label }}
        </component>
      </UIBaseButton>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CatalogBlockOtherLinks',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    list: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.other-links {
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

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 15px;

    @include mq($bp-small-medium) {
      flex-direction: row;
      flex-wrap: wrap;
    }

    &-title {
      @include label_small;

      @include mq($bp-small) {
        @include h5;
      }

      @include mq($bp-medium) {
        @include h4;
      }
    }
  }

  &__link {
    @include text_medium_small;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__button {
    align-self: flex-start;
    height: fit-content;

    @include mq($bp-small-medium) {
      align-self: center;
    }
  }
}
</style>
