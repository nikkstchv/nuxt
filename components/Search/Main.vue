<template>
  <div class="search" :class="{ search__open: isOpenPanel }">
    <UIButtonLoop class="search__button" @click="onOpenPanel" />
    <SearchPanel ref="panel" />
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useNavBarStore } from '../../store/navBar'

export default {
  name: 'SearchMain',
  data: () => ({
    isOpenPanel: false,
  }),
  methods: {
    onOpenPanel () {
      this.onCloseNavBar()
      this.$refs.panel.open()
      this.isOpenPanel = true
    },
    ...mapActions(useNavBarStore, {
      onCloseNavBar: 'onClose',
    }),
  },
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  justify-content: center;

  &__open {
    cursor: default;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
