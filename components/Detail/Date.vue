<template>
  <p class="detail-date">
    {{ $toLocalDate(date) }}
  </p>
</template>

<script>
export default {
  name: 'DetailDate',
  props: {
    date: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.detail-date {
  @include text_big_medium;

  margin-bottom: 20px;
  line-height: 18px;
  color: var(--grayDark);

  @include mq($bp-small-medium) {
    margin-bottom: 30px;
  }
}
</style>
