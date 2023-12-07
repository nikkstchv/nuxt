<template>
  <nuxt-link
    :to="isInDealers ? `advisers/${adviser.userCode}/` : `${adviser.userCode}/`"
    :class="['adviser-card', { 'adviser-card_full-width': !isInDealers }]"
  >
    <div class="adviser-card__photo">
      <nuxt-img
        v-if="adviser?.userPhoto"
        :src="adviser.userPhoto"
        :width="isInDealers ? 275 : 290"
        alt="консультант"
        :class="[
          'adviser-card__img',
          { 'adviser-card__img_no-photo': isNoUserPhoto },
        ]"
        loading="lazy"
      />
    </div>

    <div class="adviser-card__content">
      <div class="adviser-card__header">
        <h3 class="adviser-card__title">
          {{ adviser.name }}
        </h3>
        <UIInfoIconWithPopup v-if="adviser.desc" class="adviser-card__info">
          <p class="adviser-card__info-value">
            {{ adviser.desc }}
          </p>
        </UIInfoIconWithPopup>
      </div>

      <div class="adviser-card__container">
        <p class="adviser-card__dealer">
          {{ adviser.department }}
        </p>
        <p class="adviser-card__dealer">
          {{ adviser.position }}
        </p>
      </div>

      <div class="adviser-card__container">
        <p class="adviser-card__phone">
          {{ adviserWorkPhone }}
        </p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>

export default {
  name: 'ContactsAdvisersCard',
  props: {
    adviser: {
      type: Object,
      required: true,
    },
    isInDealers: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    adviserWorkPhone () {
      const phone = this.adviser?.phoneWork?.[0] ?? ''
      if (phone) {
        const [main, add] = phone.split('#')
        const additional = add ? ` (доб. ${add})` : ''
        return `${main}${additional}`
      }

      return phone
    },

    isNoUserPhoto () {
      if (this.adviser?.userPhoto) {
        return this.adviser.userPhoto.includes('no_photo')
      }

      return true
    },
  },
}
</script>

<style lang="scss" scoped>
.adviser-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 250px;

  @include mq($bp-super-small) {
    max-width: 182px;
  }

  @include mq($bp-small-medium) {
    max-width: 250px;
  }

  @include mq($bp-medium) {
    max-width: 275px;
  }

  @include mq($bp-medium-big) {
    max-width: 250px;
  }

  &_full-width {
    max-width: 100%;
  }

  &__photo {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    height: 333px;
    margin-bottom: 10px;
    background: #e4e4e4;

    @include mq($bp-super-small) {
      height: 245px;
    }

    @include mq($bp-small-medium) {
      height: 333px;
    }

    @include mq($bp-medium) {
      height: 380px;
    }

    @include mq($bp-medium-big) {
      height: 375px;
    }
  }

  &__content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;

    &_no-photo {
      height: auto;
    }
  }

  &__header {
    display: flex;
    grid-gap: 5px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;

    @include mq($bp-small-medium) {
      grid-gap: 15px;
    }
  }

  &__container {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    margin-bottom: 15px;

    &:last-child {
      flex: 0 0 auto;
      margin-bottom: 0;
    }
  }

  &__title {
    @include label_small;

    @include mq($bp-small-medium) {
      @include label;
    }
  }

  &__dealer {
    @include text_medium;

    margin-bottom: 5px;
    color: var(--grayDolphin);

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__phone {
    @include text_medium_small;

    margin-bottom: 5px;
    word-break: keep-all;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__info {
    margin-top: 5px;
    margin-right: 8px;

    &-value {
      font-weight: bold;
    }
  }
}
</style>
