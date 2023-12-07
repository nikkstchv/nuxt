<template>
  <li class="list-item">
    <p class="list-item__label">
      {{ label }}
    </p>
    <button
      class="list-item__button"
      :class="{ 'list-item__button_active': active }"
    >
      <IconSuccess
        :active="active || hoverSuccess"
        @click="onHandleSuccess"
        @mouseover="onHoverSuccess"
        @mouseleave="onUnHoverSuccess"
      />
    </button>
    <IconClear
      class="list-item__button"
      :error="hoverClear"
      @click="onClear"
      @mouseover="onHoverClear"
      @mouseleave="onUnHoverClear"
    />
  </li>
</template>

<script>
export default {
  name: 'ServiceRecommendationsItem',
  props: {
    id: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    hoverClear: false,
    hoverSuccess: false,
  }),
  methods: {
    onHandleSuccess () {
      this.$emit('handleActiveRecommendation', this.id)
    },
    onHoverSuccess () {
      this.hoverSuccess = true
    },
    onUnHoverSuccess () {
      this.hoverSuccess = false
    },
    onClear () {
      this.$emit('deleteRecommendation', this.id)
    },
    onHoverClear () {
      this.hoverClear = true
    },
    onUnHoverClear () {
      this.hoverClear = false
    },
  },
}
</script>

<style lang="scss" scoped>
.list-item {
  @include text_medium_regular;

  display: grid;
  grid-template-columns: 1fr max-content max-content;
  grid-auto-flow: column;
  grid-gap: 20px;
  align-items: center;

  @include mq($bp-medium-big) {
    padding: 13px 20px;
  }

  &:hover {
    @include mq($bp-medium-big) {
      background-color: var(--grayLight);
      border-radius: 10px;
      transition: background-color 0.2s;
    }

    & .list-item__button {
      opacity: 1;
    }
  }

  &__button {
    opacity: 1;
    transition: opacity 0.2s;

    @include mq($bp-medium-big) {
      opacity: 0;
    }

    &_active {
      opacity: 1;
    }
  }
}
</style>
