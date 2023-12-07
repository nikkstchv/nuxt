<template>
  <section>
    <div class="tabs">
      <button
        v-for="tab in tabTitles"
        :key="tab"
        :class="{
          tabs__button_active: selectedTitle === tab,
          tabs__button_hide: !tab,
        }"
        class="tabs__button"
        @click="onClickTab(tab)"
      >
        {{ tab }}
      </button>
      <slot name="buttons" />
    </div>
    <slot />
  </section>
</template>

<script>
export default {
  name: 'UIBaseTabs',
  setup (_props, { slots }) {
    const tabTitles = ref(slots.default().map(tab => tab.props.name))
    const selectedTitle = ref(tabTitles.value[0])

    const onClickTab = (tab) => {
      selectedTitle.value = tab
    }

    provide('selectedTitle', selectedTitle)

    return { tabTitles, selectedTitle, onClickTab }
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  justify-content: flex-start;
  width: 100%;
  padding-bottom: 10px;

  @include mq($bp-small-medium) {
    grid-gap: 15px;
  }

  @include mq($bp-small) {
    padding-bottom: 30px;
  }

  @include mq($bp-medium-big) {
    padding-bottom: 40px;
  }

  &__button {
    @include text_small_medium;

    width: max-content;
    height: fit-content;
    padding: 9.5px 20px;
    margin-bottom: 0;
    color: var(--black);
    background: var(--grayMediumLight);
    border-radius: 20px;

    @include mq(350px) {
      @include text_medium_small;
    }

    &_active {
      color: white;
      background: var(--blackLight);
    }

    &_hide {
      display: none;
    }
  }
}
</style>
