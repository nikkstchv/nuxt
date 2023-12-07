<template>
  <section class="services-block" :class="[getClassCountServiceBlock()]">
    <ServicesCard
      v-for="(card, index) in cards"
      :key="index"
      class="services-block__item"
      :title="card.title"
      :text="card.text"
      :button-text="card.buttonText"
      :button-action="card.buttonAction"
      :button-link="card.buttonLink"
    />
    <nuxt-link
      v-if="isShowServiceCard"
      :to="`/service/online/?mark=${$route.params.brand}`"
      class="services-block__service-card"
    >
      <div class="services-block__service-card-content">
        <h2 class="services-block__service-card-title">
          Онлайн-запись <br>
          на сервис
        </h2>
        <UIBaseButton
          class="services-block__service-card-button"
          secondary-light
          large
          text="Записаться"
        />
      </div>
      <img
        class="services-block__service-card-image"
        src="@/assets/images/service/phone.png"
        alt="телефон в руке"
      >
    </nuxt-link>
  </section>
</template>

<script>
export default {
  name: 'ServicesBlock',
  props: {
    cards: {
      type: Array,
      required: true,
      default: () => [],
    },
    isShowServiceCard: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  methods: {
    getClassCountServiceBlock () {
      return `services-block_count_${this.cards.length + 1}`
    },
  },
}
</script>

<style lang="scss" scoped>
.services-block {
  display: grid;
  grid-gap: 30px;

  @include mq($bp-small-medium) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-rows: minmax(200px, max-content);
  }

  @include mq($bp-medium-big) {
    grid-gap: 40px;
  }

  &_count {
    &_2 {
      grid-template-columns: 1fr;

      @include mq($bp-medium) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    &_3 {
      @include mq($bp-small) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include mq($bp-big) {
        grid-template-columns: repeat(4, 1fr);
      }

      .services-block__service-card {
        @include mq($bp-small) {
          grid-row-start: 2;
          grid-column: 1 / 3;
        }

        @include mq($bp-big) {
          grid-row-start: 1;
          grid-column: 3 / 5;
        }
      }
    }

    &_4 {
      grid-template-columns: 1fr;

      @include mq($bp-small-medium) {
        grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
      }

      @include mq($bp-medium) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include mq($bp-super-big) {
        grid-template-columns: repeat(4, 1fr);
      }

      .services-block__service-card {
        @include mq($bp-small-medium) {
          max-height: 220px;
        }

        @include mq($bp-small) {
          max-height: initial;
        }

        @include mq($bp-super-big) {
          justify-content: initial;
        }

        &-content {
          @include mq($bp-super-big) {
            justify-content: space-between;
            height: 100%;
            padding: 30px 0 30px 30px;
          }
        }

        &-title {
          @include mq($bp-super-big) {
            width: 120%;
          }
        }

        &-image {
          @include mq($bp-super-big) {
            max-height: 220px;
          }
        }
      }
    }

    &_5 {
      grid-template-columns: 1fr;

      @include mq($bp-small) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include mq($bp-big) {
        grid-template-columns: repeat(4, 1fr);
      }

      .services-block__service-card {
        @include mq($bp-small) {
          grid-column: 1 / 3;
        }

        @include mq($bp-big) {
          grid-column: 1 / span 4;
        }

        @include mq($bp-super-big) {
          grid-row: 1/3;
          grid-column: 3/6;
          align-items: initial;
          justify-self: initial;
        }

        &-content {
          @include mq($bp-super-big) {
            grid-gap: 40px;
            padding: 65px 0 65px 60px;
          }
        }

        &-title {
          @include mq($bp-super-big) {
            @include h2;
          }
        }

        &-image {
          @include mq($bp-super-big) {
            max-height: initial;
            margin: 0 auto;
          }
        }
      }
    }
  }

  &__service-card {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    justify-content: space-between;
    height: 100%;
    overflow: hidden;
    color: white;
    cursor: pointer;
    background-color: var(--grayDolphin);
    border-radius: 8px;

    @include mq($bp-small-medium) {
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    &-content {
      display: flex;
      flex-direction: column;
      grid-gap: 20px;
      padding: 25px 0 25px 25px;
    }

    &-title {
      @include h4;

      text-align: start;

      @include mq($bp-medium) {
        @include h3;
      }

      @include mq($bp-big) {
        align-self: start;
      }
    }

    &-image {
      object-fit: contain;
      align-self: flex-end;
      justify-self: flex-end;
      height: 90%;
      max-height: 300px;
    }

    &-button {
      @include text_medium_small;

      position: absolute;
      bottom: 40px;
      left: 30px;
      width: fit-content;
      color: var(--blackLight);

      @include mq($bp-small-medium) {
        position: initial;
        bottom: initial;
        left: initial;
      }
    }
  }
}
</style>
