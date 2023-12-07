<template>
  <nuxt-link
    :to="`/${mainLinkParam}/${code}/`"
    class="card"
    :class="{ card_archive: isArchive }"
  >
    <CardImage :image="image" sizes="s:100vw mb:50vw b:30vw sb:25vw" class="card__image" />
    <section class="card__section">
      <p v-if="isShowDate" class="card__date">
        {{ $toLocalDate(date, isEng && 'en') }}
      </p>
      <p
        v-if="department && schema.department[department]"
        class="card__department"
      >
        {{ schema.department[department] }}
      </p>
      <p class="card__title" v-html="title" />
      <!--      <p v-if="text" class="card__text">{{ text }}</p>-->
      <section
        ref="footer"
        class="card__footer"
        :class="{
          card__footer_single: isEmptyLogos,
        }"
      >
        <div v-if="!isEmptyLogos" class="card__logos">
          <nuxt-img
            v-for="(item, index) in logos"
            :key="index"
            class="card__logo"
            :src="item.logo"
            alt="Логотип"
            loading="lazy"
          />
        </div>
        <div v-if="!isArchive" class="card__button-wrapper">
          <CatalogButton
            class="card__button"
            :is-eng="isEng"
          >
            {{ isEng ? 'Read' : 'Читать' }}
          </CatalogButton>
        </div>
      </section>
    </section>
  </nuxt-link>
</template>

<script>
export default {
  name: 'UIMediaCard',
  props: {
    type: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    mark: {
      type: Object,
      required: false,
      default: null,
    },
    marks: {
      type: Array,
      required: false,
      default: () => [],
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      default: '',
    },
    date: {
      type: String,
      required: false,
      default: '',
    },
    department: {
      type: String,
      required: false,
      default: '',
    },
    isArchive: {
      type: Boolean,
      required: false,
      default: false,
    },
    isEng: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    observer: null,
    schema: {
      department: {
        service: 'Сервис',
        sale: 'Отдел продаж',
      },
    },
  }),
  computed: {
    isEmptyLogos () {
      return !(this.marks?.length || this.mark)
    },
    logos () {
      return this.marks?.length ? this.marks : [this.mark]
    },
    isAction () {
      return this.type === 'actions'
    },
    isShowDate () {
      return this.date && !this.isArchive && !this.isAction
    },
    mainLinkParam () {
      const isEngNews = this.type === 'news' && this.isEng
      if (isEngNews) {
        return 'en/news'
      }
      return this.type
    },
  },
  mounted () {
    this.observeFooter()
  },
  beforeUnmount () {
    this.observer?.disconnect()
  },
  methods: {
    observeFooter () {
      const element = this.$refs.footer
      this.observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const newHeight = entry.contentRect.height
          if (newHeight > 60) {
            element.classList.add('card__footer_wrap')
          } else if (newHeight === 40) {
            element.classList.remove('card__footer_wrap')
          }
        }
      })
      this.observer?.observe(element)
    },
  },
}
</script>
<style lang="scss" scoped>
.card {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  min-width: 260px;
  cursor: pointer;
  background: var(--grayLight);
  border-radius: 8px;

  &:hover {
    .card__button {
      width: 100%;
      background: var(--black);
    }

    & :deep(.button-arrow__icon-arrow) {
      background: var(--black);
      transform: translateX(0) rotate(-180deg);
    }

    & :deep(.button-arrow__text) {
      opacity: 1;
    }
  }

  &_archive {
    filter: opacity(0.5);
  }

  &__image {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &__section {
    display: grid;
    grid-template-rows: max-content;
    padding: 15px 15px 30px;
  }

  &__logos {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 20px;
    align-items: center;
  }

  &__logo {
    position: relative;
    justify-self: flex-end;
    object-fit: contain;
    max-width: 80px;
    max-height: 40px;
  }

  &__date {
    @include text_small_regular;

    margin-bottom: 5px;
    color: var(--grayDolphin);
  }

  &__department {
    @include text_small_super;

    width: fit-content;
    padding: 4px 8px;
    margin-bottom: 14px;
    font-weight: 500;
    color: var(--blackLight);
    border: 1px solid var(--blackLight);
    border-radius: 2px;
  }

  &__title {
    @include h5;

    display: -webkit-box;
    max-height: 85px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;

    @include mq($bp-big) {
      @include h4;
    }
  }

  &__button-wrapper {
    display: block;
    width: 120px;
  }

  &__text {
    @include text_medium_light;

    color: var(--blackLight);
  }

  &__footer {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    grid-gap: 30px;
    align-self: flex-end;
    justify-content: space-between;
    margin-top: 30px;

    &_wrap {
      flex-direction: row;
      margin-top: 15px;
    }

    &_single {
      flex-direction: row;
    }
  }
}
</style>
