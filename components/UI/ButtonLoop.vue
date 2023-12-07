<template>
  <button class="button-loop" type="button">
    <IconLoop />
  </button>
</template>

<style lang="scss" scoped>
.button-loop {
  width: 35px;
  height: 35px;

  &:hover {
    background: var(--grayLight);
    border-radius: 100px;

    :deep(.icon__path) {
      stroke: var(--black);
    }
  }
}
</style>
