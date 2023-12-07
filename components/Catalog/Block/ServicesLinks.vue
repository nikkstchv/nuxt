<template>
  <div class="services-links">
    <p class="services-links__title">
      {{ title }}
    </p>
    <div class="services-links__list">
      <UIBaseButton
        v-for="link in links"
        :key="link.label"
        class="services-links__link"
        tag="nuxt-link"
        :to="link.href"
        :text="link.label"
      >
        <div class="services-links__icon">
          <component :is="link.iconComponent" />
        </div>
      </UIBaseButton>
    </div>
  </div>
</template>

<script>
import IconCarTradeIn from '@/components/Icon/CarTradeIn.vue'
import IconCarCredit from '@/components/Icon/CarCredit.vue'
import IconCarInsurance from '@/components/Icon/CarInsurance.vue'

export default {
  name: 'CatalogBlockServicesLinks',
  components: {
    IconCarTradeIn,
    IconCarCredit,
    IconCarInsurance,
  },
  props: {
    links: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

  },
}
</script>

<style lang="scss" scoped>
.services-links {
  display: grid;
  gap: 20px;

  &__title {
    @include h5;

    @include mq($bp-small-medium) {
      @include h4;

      gap: 24px;
    }

    @include mq($bp-medium) {
      @include h3;
    }
  }

  &__list {
    position: relative;
    display: block;
    row-gap: 8px;
    border-top: 1px solid var(--grayMediumLight);
    border-bottom: 1px solid var(--grayMediumLight);

    @include mq($bp-small) {
      display: grid;
      grid-auto-columns: minmax(20%, 1fr) minmax(20%, 1fr) minmax(20%, 1fr);
      grid-auto-flow: column;
    }

  }

  &__link {
    @include text_big_medium;

    position: relative;
    padding: 12px 20px;

    @include mq($bp-small) {
      width: 100%;
      padding: 14px 20px;
    }
  }

  &__icon {
    position: relative;
    max-width: 50px;
    max-height: 50px;

    @include mq($bp-medium) {
      max-width: 60px;
      max-height: 60px;
    }

    &:deep(svg) {
      width: 100%;
      min-width: 50px;
      height: 100%;
      min-height: 50px;
    }
  }

}
</style>
