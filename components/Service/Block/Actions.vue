<template>
  <section v-if="actions?.length" class="actions-block">
    <p class="actions-block__title">
      {{ title }}
    </p>

    <MainScroller name="actions-block" :options="sliderOptions">
      <UIMediaCard
        v-for="item in actions"
        :key="item.code"
        :code="item.code"
        type="actions"
        :title="item.title"
        :text="item.text"
        :date="item.startAt"
        :image="item.previewImage"
        :mark="item.mark"
        :marks="item.marks"
        department="service"
        class="swiper-slide actions-block__card"
      />
    </MainScroller>
  </section>
</template>

<script setup>
import { getActions as getActionsPath } from '@/api/routes/action'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  markId: {
    type: String,
    required: false,
    default: '',
  },
  markCode: {
    type: String,
    required: false,
    default: '',
  },
})

const sliderOptions = {
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    599: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    899: {
      slidesPerView: 3,
      spaceBetween: 35,
    },
    1100: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1366: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
}

const getActions = async () => {
  const { $fetchClient, $hasErrorResponse } = useNuxtApp()
  const count = 8
  const page = 1
  const query = {
    ...(props.markCode && { markId: props.markCode }),
    archive: false,
  }
  const options = {
    query,
  }
  const res = await $fetchClient(getActionsPath(count, page), options)
  if (!$hasErrorResponse(res)) {
    return res.data
  }
  return null
}

const actions = await getActions()
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.actions-block {
  max-width: 100vw;
  padding: 0 15px;

  @include mq($bp-small-medium) {
    padding: 0 20px;
  }

  @include mq($bp-small) {
    padding: 0 32px;
  }

  @include mq($bp-medium) {
    padding: 0 50px;
  }

  @include mq($bp-medium-big) {
    padding: 0 81px;
  }

  @include mq($bp-big) {
    padding: 0 146px;
  }

  &__title {
    @include h5;

    display: flex;
    margin-bottom: 20px;

    @include mq($bp-small) {
      margin-bottom: 40px;
    }

    @include mq($bp-small-medium) {
      @include h3;

      margin-bottom: 30px;
    }

    @include mq($bp-small) {
      margin-bottom: 40px;
    }

    @include mq($bp-medium-big) {
      @include h2;
    }
  }

  &__card {
    min-width: auto !important;
    max-width: 100% !important;
    height: initial;
  }
}
</style>
