<template>
  <UIBaseOverlay :is-open="isOpenServicePanel" @click="onCloseServicePanel">
    <UISidePanel
      full-width
      no-bg
      :is-open="isOpenServicePanel"
    >
      <ServiceOnlineLayout
        :is-open="isOpenServicePanel"
        @close-panel="onCloseServicePanel"
      />
    </UISidePanel>
  </UIBaseOverlay>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useServiceStore } from '../../store/service'

export default {
  name: 'ServicePanel',
  computed: {
    ...mapState(useServiceStore, {
      isOpenServicePanel: 'isOpenPanel',
    }),
  },
  methods: {
    ...mapActions(useServiceStore, {
      onCloseServicePanel: 'onClose',
    }),
  },
}
</script>
