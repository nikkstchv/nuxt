<template>
  <div class="qr-header">
    <CardButtonRotate
      v-if="showExteriorBtn"
      text="Экстерьер"
      class="qr-header__rotate qr-header__rotate_ext"
      @click="handleExterior"
    />
    <CardButtonRotate
      v-if="showInterierBtn"
      class="qr-header__rotate qr-header__rotate_int"
      text="Интерьер"
      @click="handleInterier"
    />
  </div>
</template>

<script>
export default {
  name: 'DetailQrHeader',
  props: {
    showInterierBtn: {
      type: Boolean,
      default: false,
    },
    showExteriorBtn: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleExterior () {
      this.$emit('openExterior')
    },
    handleInterier () {
      this.$emit('openInterier')
    },
  },
}
</script>

<style lang="scss" scoped>
.qr-header {
  position: relative;
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  &__rotate {
    margin: auto;
  }
}
</style>
