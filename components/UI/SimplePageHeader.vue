<template>
  <div class="header">
    <UIBreadcrumbs
      class="header__breadcrumbs"
      :content-range="contentRange"
      :direct-crumbs="directCrumbs"
      :only-main-crumb="onlyMainCrumb"
    />
    <section
      class="header__section"
      :class="{
        header__section_small_indent: hasFilterButtons || hasBackButton,
      }"
    >
      <slot v-if="$slots['before-title']" name="before-title" />
      <h1 v-if="title" itemprop="name" class="header__title">
        {{ title }}
      </h1>
    </section>
    <UIBackButton
      v-if="hasBackButton"
      class="header__back-button"
      :class="{ 'header__back-button_indent': !title }"
    />
  </div>
</template>

<script>
export default defineNuxtComponent({
  name: 'UISimplePageHeader',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    hasBackButton: {
      type: Boolean,
      default: false,
    },
    hasFilterButtons: {
      type: Boolean,
      default: false,
    },
    contentRange: {
      type: Number,
      required: false,
      default: null,
    },
    directCrumbs: {
      type: Array,
      required: false,
      default: () => [],
    },
    onlyMainCrumb: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.header {
  display: grid;

  .header &__breadcrumbs {
    margin-bottom: 15px;
  }

  &__section {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 10px;
    align-items: center;
    margin-bottom: 20px;

    @include mq($bp-small-medium) {
      grid-gap: 15px;
    }

    @include mq($bp-small) {
      margin-bottom: 30px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 40px;
    }

    @include mq($bp-big) {
      margin-bottom: 50px;
    }

    &_small_indent {
      margin-bottom: 15px;

      @include mq($bp-super-small) {
        margin-bottom: 20px;
      }

      @include mq($bp-small) {
        margin-bottom: 20px;
      }

      @include mq($bp-medium-big) {
        margin-bottom: 20px;
      }

      @include mq($bp-big) {
        margin-bottom: 30px;
      }
    }
  }

  &__title {
    @include h4;

    @include mq($bp-small-medium) {
      @include h3;
    }

    @include mq($bp-small) {
      @include h2;
    }

    @include mq($bp-medium-big) {
      @include h1;
    }
  }

  &__back-button {
    margin-bottom: 20px;

    @include mq($bp-small) {
      margin-bottom: 30px;
    }

    &_indent {
      padding-top: 10px;

      @include mq($bp-medium) {
        padding-top: 15px;
      }
    }
  }
}
</style>
