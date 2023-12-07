<template>
  <section>
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        :class="{
          tabs__button_active: tab.isActive,
          tabs__button_hide: !tab.name,
        }"
        class="tabs__button"
        @click.prevent="selectTab(tab)"
        @click="tab.onClick && tab.onClick()"
      >
        <h2>{{ tab.name }}</h2>
      </button>
      <slot name="buttons" />
    </div>
    <slot />
  </section>
</template>

<script>
export default {
  name: 'UIBaseTabs',
  data: () => ({
    tabs: [],
  }),
  created () {
    this.tabs = this.$children
  },
  methods: {
    selectTab (selectedTab) {
      this.tabs.forEach((tab) => {
        tab.isActive = tab.name === selectedTab.name
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: max-content;

  &__button {
    @include text_medium_bold;

    color: var(--grayDark);
    transition: 0.1s linear all;

    @media (min-width: $bp-super-small + 1) and (max-width: $bp-medium) {
      @include h5;
    }

    @media (min-width: $bp-medium + 1) {
      @include h3;
    }

    &_active {
      color: var(--black);
    }

    &_hide {
      display: none;
    }
  }
}
</style>
