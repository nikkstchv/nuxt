<template>
  <div class="social">
    <UIBaseButton
      class="social__button"
      secondary
      text="Обратный звонок"
      @click="$emit('onOpenFeedbackPanel')"
    />
    <div class="social__media">
      <a
        v-if="vkLink"
        :href="vkLink"
        rel="nofollow noindex noreferrer"
        target="_blank"
      >
        <IconVk />
      </a>
      <a
        v-if="youtubeLink"
        :href="youtubeLink"
        rel="nofollow noindex noreferrer"
        target="_blank"
      >
        <IconYoutube />
      </a>
      <a
        v-if="telegramLink"
        :href="telegramLink"
        rel="nofollow noindex noreferrer"
        target="_blank"
      >
        <IconTelegram />
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  vkLink: {
    type: String,
    required: true,
    default: '',
  },
  youtubeLink: {
    type: String,
    required: true,
    default: '',
  },
  telegramLink: {
    type: String,
    required: false,
    default: '',
  },
})
defineEmits(['onOpenFeedbackPanel'])
</script>

<style lang="scss" scoped>
.social {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 20px;
  align-items: center;

  @include mq($bp-small-medium) {
    grid-gap: 30px;
  }

  &__media {
    display: flex;
    grid-gap: 10px;
  }

  &__button {
    white-space: nowrap;
  }
}
</style>
