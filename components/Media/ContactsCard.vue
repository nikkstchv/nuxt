<template>
  <div :class="['card', { card_detail: isDetail }]">
    <p class="card__title">
      {{ getData.title }}
    </p>
    <a :href="`malto:${getData.email}`" class="card__email">{{
      getData.email
    }}</a>
    <ul class="card__list">
      <li v-for="(item, i) in getData.list" :key="i" class="card__item">
        <p class="card__label">
          {{ item.label }}
        </p>
        <p class="card__name">
          {{ item.name }}
        </p>
        <a
          :href="`tel:${item.phone}`"
          class="card__phone"
        >{{ item.phone }} {{ item.phoneAdd }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useHoldingStore } from '../../store/holding'

export default {
  name: 'MediaContactsCard',
  props: {
    isDetail: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      data: {
        en: {
          title: 'Press service of AVTODOM:',
          email: 'Pr@avtodom.ru',
          list: [
            {
              label: 'Communications director',
              name: 'Anna Utkina',
              phone: '+7 (495) 788-08-03',
              phoneAdd: 'ext. 13444',
            },
          ],
        },
        avtodom: {
          title: 'Пресс-служба ГК Автодом:',
          email: 'Pr@avtodom.ru',
          list: [
            {
              label: 'Директор по коммуникациям',
              name: 'Анна Уткина',
              phone: '+7 (495) 788-08-03',
              phoneAdd: 'доб. 13444',
            },
          ],
        },
        asc: {
          title: 'Пресс-служба ГК АвтоСпецЦентр:',
          email: 'Pr@ascgroup.ru ',
          list: [
            {
              label: 'Директор по коммуникациям',
              name: 'Анна Уткина',
              phone: '+7 (495) 788-08-03',
              phoneAdd: 'доб. 13444',
            },
          ],
        },
      },
    }
  },
  computed: {
    getData () {
      const isEn = this.$route.path.includes('/en/about/')
      return isEn ? this.data.en : this.data[this.domain]
    },
    ...mapState(useHoldingStore, ['domain']),
  },
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px 30px;
  background: var(--grayLight);

  @include mq($bp-super-small) {
    padding: 80px 50px;
  }

  @include mq($bp-small-medium) {
    padding: 30px;
  }

  @include mq($bp-small) {
    padding: 20px 30px;
  }

  @include mq($bp-medium) {
    padding: 60px 30px;
  }

  @include mq($bp-medium-big) {
    padding: 30px 20px;
  }

  &_detail {
    padding: 40px 30px;
    margin: 0 -15px;

    @include mq($bp-super-small) {
      padding: 40px;
    }

    @include mq($bp-small-medium) {
      margin: 0;
    }

    @include mq($bp-small) {
      padding: 40px 20px;
    }

    @include mq($bp-medium) {
      padding: 50px 30px;
    }

    @include mq($bp-medium-big) {
      padding: 40px 20px;
    }

    @include mq($bp-big) {
      padding: 60px 50px;
    }

    .card__title {
      margin-bottom: 40px;
    }
  }

  &__title {
    @include h4;

    margin-bottom: 25px;

    @include mq($bp-big) {
      @include h3;
    }
  }

  &__email {
    @include label;

    display: inline-block;
    margin-bottom: 30px;
    color: var(--neonBlue);
  }

  &__list {
    display: flex;
    flex-direction: column;
  }

  &__item {
    @include label;

    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    p {
      margin-bottom: 5px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__label {
    margin-bottom: 10px;
  }

  &__name {
    font-weight: normal;
  }

  &__phone {
    color: var(--blackLight);
  }
}
</style>
