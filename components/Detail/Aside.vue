<template>
  <UIAside class="aside">
    <header class="aside__header">
      <div class="aside__info" />
      <UIIndicator
        v-if="statusForWeb"
        :type="statusForWeb"
        class="aside__status"
      />
    </header>
    <div v-if="labels" class="aside__labels">
      <client-only>
        <UILabel
          v-for="label in labels"
          :key="label.name"
          :name="label.name"
          :type="label.type"
          :description="label.description"
          class="card__label"
        />
      </client-only>
    </div>
    <DetailBuyBlock />
  </UIAside>
</template>

<script>
export default {
  name: 'DetailAside',
  props: {
    labels: {
      type: Array,
      required: false,
      default: null,
    },
    statusForWeb: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.aside {
  display: none;

  @include mq($bp-medium) {
    top: 100px !important;
    display: block;
    max-width: 330px;
    height: fit-content;
    padding: 30px 0;
    margin-bottom: 35px;
  }

  @include mq($bp-medium-big) {
    margin-bottom: 65px;
  }

  @include mq($bp-big) {
    width: 400px;
    max-width: 400px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  &__labels {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 8px 5px;
    margin-bottom: 30px;
  }

  &__status {
    @include text_medium_small;

    line-height: 28px;
  }

  &__info {
    display: none;
  }
}
</style>
