<template>
  <div class="contacts-block-list">
    <ContactsSubtitle>{{ title }}</ContactsSubtitle>
    <div class="contacts-block-list__list">
      <component
        :is="item.nameEn ? 'router-link' : 'span'"
        v-for="item in items"
        :key="item.id"
        class="contacts-block-list__item"
        :to="getAboutLink(item.nameEn, blockName)"
      >
        {{ item.nameRu }}
      </component>
    </div>
  </div>
</template>

<script setup>
defineProps({
  blockName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})

const getAboutLink = (name, mainLevel) => `/${mainLevel}/${name}/`
</script>

<style lang="scss" scoped>
.contacts-block-list {
  &__list {
    display: flex;
    flex-direction: column;

    &_rewards {
      flex-direction: row;
      grid-gap: 30px;
    }
  }

  &__item {
    @include text_medium_small;

    width: fit-content;
    margin-bottom: 15px;
    color: var(--grayDolphin);
    text-decoration-line: underline;

    &:last-child {
      margin-bottom: 0;
    }

    &_rewards {
      margin-bottom: 0;
      text-decoration-line: none;
    }
  }
}
</style>
