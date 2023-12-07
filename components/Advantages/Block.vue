<template>
  <section class="advantages">
    <component
      :is="isSeoTitle ? 'h2' : 'p'"
      class="advantages__title"
    >
      {{ positionFour?.title || title }}
    </component>
    <div
      v-if="positionFour?.content"
      class="advantages__html"
      v-html="positionFour.content"
    />
    <div v-else class="advantages__list">
      <AdvantagesCard
        v-for="(card, index) in cards"
        :key="index"
        :icon="card.icon"
        :title="card.title"
        :description="card.description"
      >
        <template #icon>
          <component :is="card.iconComponent" />
        </template>
      </AdvantagesCard>
    </div>
  </section>
</template>

<script>
import IconProtection from '@/components/Icon/Protection.vue'
import IconCarBoard from '@/components/Icon/CarBoard.vue'
import IconLegalScale from '@/components/Icon/LegalScale.vue'
import IconAwardAdvantages from '@/components/Icon/AwardAdvantages.vue'
import IconCarGarage from '@/components/Icon/CarGarage.vue'
import IconBriefcase from '@/components/Icon/Briefcase.vue'
import IconHeartAdvantages from '@/components/Icon/HeartAdvantages.vue'
import IconSpeedDashboard from '@/components/Icon/SpeedDashboard.vue'
import IconWallet from '@/components/Icon/Wallet.vue'

export default {
  name: 'AdvantagesBlock',
  components: {
    IconProtection,
    IconLegalScale,
    IconAwardAdvantages,
    IconBriefcase,
    IconCarGarage,
    IconHeartAdvantages,
    IconSpeedDashboard,
    IconWallet,
    IconCarBoard,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    cards: {
      type: Array,
      required: true,
      default: () => [],
    },
    isSeoTitle: {
      type: Boolean,
      required: false,
      default: true,
    },
    positionFour: {
      type: Object,
      required: false,
      default: null,
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/indents/main';

.advantages {
  @include mq($bp-small-medium) {
    grid-gap: 30px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 40px;
  }

  &__title {
    @include h5;

    margin-bottom: 30px;
    text-align: center;

    @include mq($bp-small-medium) {
      @include h4;

      margin-bottom: 40px;
    }

    @include mq($bp-small) {
      @include h3;
    }

    @include mq($bp-medium) {
      margin-bottom: 50px;
    }

    @include mq($bp-medium-big) {
      @include h2;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-gap: 30px 20px;

    @include mq($bp-small) {
      grid-gap: 30px 25px;
    }

    @include mq($bp-big) {
      grid-gap: 30px;
    }
  }

  &__html {
    @import 'assets/styles/components/Detail/html-style';
  }
}
</style>
