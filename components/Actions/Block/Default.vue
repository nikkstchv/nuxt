<template>
  <section v-if="actions?.length" class="actions">
    <header v-if="!hideHeader" class="actions__header">
      <MainTitle tag="h2" class="actions__title">
        {{ title }}
      </MainTitle>
      <UIArrowLink
        class="actions__button"
        href="/actions/"
      >
        Смотреть все акции
      </UIArrowLink>
    </header>
    <client-only>
      <MainSlider name="actions">
        <div v-for="action in actions" :key="action.id" class="swiper-slide">
          <ActionsBlockCard
            :id="action.code"
            class="swiper__card"
            :title="action.title"
            :department="action.department"
            :image="action.previewImage"
            :brand="action.mark || action.brand"
            :brands="action.marks"
            :end="action.endAt"
          />
        </div>
      </MainSlider>
    </client-only>
  </section>
</template>

<script setup>
import { getActions } from '@/api/routes/action'

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: 'Акции',
  },
  markCode: {
    type: String,
    required: false,
    default: '',
  },
  departmentCode: {
    type: String,
    required: false,
    default: '',
  },
  loopSlider: {
    type: Boolean,
    required: false,
    default: true,
  },
  hideHeader: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const fetchActions = async () => {
  const { $fetchClient } = useNuxtApp()
  const routeQuery = useRoute().query
  const brand =
      routeQuery.brand ?? routeQuery.mark ?? props.markCode
  const department = routeQuery.department ?? props.departmentCode
  const query = {
    archive: false,
    ...(brand && { brandCode: brand }),
    ...(department && {
      departmentCode: department,
    }),
  }

  const res = await $fetchClient(getActions(8, 1), { query })
  return res?.data ?? null
}

const actions = await fetchActions()

</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.actions {
  grid-gap: 40px;
  max-width: 100vw;
  padding: 25px 15px 20px;
  overflow: hidden;
  background-color: var(--grayLight);

  @include mq($bp-small-medium) {
    grid-gap: 30px;
    padding: 30px 0 30px 15px;
  }

  @include mq($bp-small) {
    padding: 30px 0 30px 32px;
  }

  @include mq($bp-medium) {
    padding: 40px 0 40px 50px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 40px;
    padding: 40px 0 70px 81px;
  }

  @include mq($bp-big) {
    padding: 50px 0 70px 146px;
  }

  .actions &__header {
    @include indentsMainHorizontal;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 0 !important;
    margin-bottom: 30px;

    @include mq($bp-small) {
      margin-bottom: 40px;
    }

    @include mq($bp-medium) {
      margin-bottom: 50px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 60px;
    }
  }

  &__list-container {
    position: relative;
    height: 100%;
    min-height: calc(380px + 30px);
    overflow: auto;

    @include mq($bp-small-medium, $bp-medium-big) {
      min-height: calc(380px + 40px);
    }

    @include mq($bp-medium-big) {
      min-height: calc(380px + 50px);
    }
  }

  .actions &__title {
    margin-bottom: 0;
  }

  &__list {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    grid-gap: 15px;
    height: 100%;
    padding-right: 15px;
    padding-bottom: 30px;

    @include mq($bp-small-medium) {
      padding-right: 30px;
      padding-bottom: 40px;
    }

    @include mq($bp-medium) {
      grid-gap: 30px;
      padding-right: 50px;
    }

    @include mq($bp-medium-big) {
      padding-bottom: 50px;
    }

    @include mq($bp-big) {
      grid-gap: 40px;
      padding-right: 146px;
    }
  }

  .actions &__card {
    min-width: 290px;
  }

  .swiper-slide-next {
    @include mq($bp-big) {
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        background: rgb(255 255 255 / 50%);
      }
    }
  }
}
</style>
