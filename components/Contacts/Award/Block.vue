<template>
  <div class="awards">
    <ContactsSubtitle>Награды</ContactsSubtitle>
    <ul class="awards__list">
      <ContactsAwardItem
        v-for="(award, index) in awards"
        :key="index"
        class="awards__item"
        :title="award.title"
        :year="award.year"
      />
    </ul>
  </div>
</template>

<script setup>
defineProps({
  awards: {
    type: Array,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.awards {
  &__list {
    display: flex;
    flex-direction: row;
    grid-gap: 30px;
  }

  &__item {
    @include text_medium_small;

    width: fit-content;
    margin-bottom: 0;
    color: var(--grayDolphin);
    text-decoration-line: none;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
