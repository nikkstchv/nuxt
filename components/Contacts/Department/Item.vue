<template>
  <li class="department-item">
    <component :is="isSeoTitle ? 'h4' : 'p'" class="department-item__title">
      {{ title }}
    </component>
    <p class="department-item__time">
      <time
        itemprop="openingHours"
        :datetime="`Mo-Su, ${$toDateTime(time)}`"
      >{{ time }}
      </time>
    </p>
  </li>
</template>

<script>
export default {
  name: 'ContactsDepartmentItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: false,
      default: '',
    },
    isSeoTitle: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.department-item {
  &__title {
    @include text_medium_regular;

    margin-bottom: 6px;
    color: var(--blackLight);
  }

  &__time {
    @include text_medium_small;
  }
}
</style>
