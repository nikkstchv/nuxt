<template>
  <nuxt-link :to="link" class="card">
    <div
      :data-background="hasPhoto(dealer.photo) ? `${dealer.photo[0]}` : ''"
      class="card__image swiper-lazy"
    >
      <div class="swiper-lazy-preloader" />
    </div>
    <div class="card__content">
      <component
        :is="isSeoTitle ? 'h3' : 'p'"
        class="card__title swiper-no-swiping"
        itemprop="name"
      >
        {{ dealer.nameRu }}
      </component>
      <p
        v-if="dealer.phone"
        itemprop="telephone"
        class="card__phone swiper-no-swiping"
      >
        {{ dealer.phone }}
      </p>
      <ContactsDepartmentList class="card__department-list">
        <ContactsDepartmentItem
          v-for="timeTable in dealer.timeTable"
          :key="timeTable.department"
          :title="timeTable.department"
          :time="timeTable.time"
          :is-seo-title="isSeoTitle"
        />
      </ContactsDepartmentList>
      <div class="card__button-container">
        <UIBaseButton
          class="card__button card__button_secondary"
          text="Запись на сервис"
          secondary
          @click.prevent="handleClickServiceButton"
        />
        <UIBaseButton
          class="card__button card__button_primary"
          text="Подробнее о центре"
          primary
        />
      </div>
      <nuxt-img
        :src="hasLogo(dealer) ? dealer.mark.Logo : ''"
        alt="Логотип марки
      авто"
        class="card__logo"
        :style="{ opacity: !hasLogo(dealer) && '0' }"
      />
      <span class="card__micro-marking" itemprop="addressLocality">{{
        dealer.city
      }}</span>
      <span class="card__micro-marking" itemprop="streetAddress">{{
        dealer.address
      }}</span>
    </div>
  </nuxt-link>
</template>

<script>
import { mapActions } from 'pinia'
import { useFormStore } from '../../store/form'
import { useServiceStore } from '../../store/service'

export default {
  name: 'DealersCard',
  props: {
    dealer: {
      type: Object,
      required: true,
    },
    markCode: {
      type: String,
      required: false,
      default: '',
    },
    isSeoTitle: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    link () {
      return `/contacts/${this.dealer.mark.code}/${this.dealer.code}/`
    },
  },
  methods: {
    setServiceData () {
      const markCode = this.markCode || this.dealer.mark.code
      const dealerCode = this.dealer.code
      const dealerId = this.dealer.id
      const hasSomeInfo = markCode || dealerCode

      if (hasSomeInfo) {
        this.setInitData({
          ...(markCode && { markCode }),
          ...(dealerCode && { dealerCode }),
          ...(dealerId && { dealerId }),
        })
      }
    },
    hasPhoto (photos) {
      return photos && photos[0]
    },
    hasLogo (dealer) {
      return dealer?.mark?.Logo ?? false
    },
    handleClickServiceButton () {
      this.setServiceData()
      this.onOpenServicePanel()
    },
    ...mapActions(useFormStore, {
      setInitData: 'setInitData',
    }),
    ...mapActions(useServiceStore, {
      onOpenServicePanel: 'onOpen',
    }),
  },
}
</script>

<style scoped lang="scss">
.card {
  position: relative;
  display: grid;
  grid-template-rows: max-content;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;

  @include mq($bp-big) {
    display: grid;
    grid-template-rows: none;
    grid-template-columns: 780px 380px;
    width: max-content;
    max-width: 1163px;
    min-height: 450px;
  }

  &__content {
    display: grid;
    grid-template-rows: 70px max-content auto 1fr auto;

    @include mq($bp-big) {
      grid-template-rows: max-content max-content 1fr auto;
      padding: 30px 30px 60px 20px;
      background-color: var(--grayLight);
    }
  }

  &__image {
    position: relative;
    min-height: 256px;
    background-color: var(--grayLight);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 8px;

    @include mq($bp-big) {
      border-radius: 0;
    }
  }

  &__button-container {
    display: grid;
    grid-gap: 15px;
    width: 100%;
    height: fit-content;
    margin-bottom: 15px;

    @include mq($bp-big) {
      grid-gap: 10px;
      max-width: 200px;
      margin-bottom: 0;
    }
  }

  .card &__button {
    width: 100%;
    height: 100%;
    padding: 10px 15px;
    white-space: nowrap;

    @include mq(350px) {
      padding: 10px 20px;
    }
  }

  &__title {
    @include text_medium_bold;

    margin-bottom: 10px;
    font-weight: 700;

    @include mq($bp-small-medium, $bp-small) {
      @include h4;
    }
  }

  &__phone {
    @include text_medium_regular;

    display: block;
    height: fit-content;
    margin-bottom: 25px;
  }

  .card &__department-list {
    grid-template-columns: initial;
    grid-gap: 10px;
    margin-bottom: 25px;

    @include mq($bp-big) {
      align-self: flex-start;
    }
  }

  &__logo {
    position: relative;
    order: -1;
    width: auto;
    max-width: 100px;
    height: auto;
    max-height: 50px;
    margin: 10px 0;

    @include mq($bp-big) {
      position: absolute;
      right: 30px;
      bottom: 82px;
      margin: 0;
    }
  }

  &__micro-marking {
    display: none;
    visibility: hidden;
    opacity: 0;
  }
}
</style>
