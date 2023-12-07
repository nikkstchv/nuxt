<template>
  <section class="lk-nav">
    <!-- <img
      class="lk-nav__photo"
      src="@/assets/images/lk-main.svg"
      alt="Фотография пользователя"
    />
    <h2 class="lk-nav__title">Аполлинария</h2>
    <h2 class="lk-nav__title">Христорождественская</h2> -->
    <nav class="lk-nav__links">
      <nuxt-link
        v-for="link in links"
        :key="link.name"
        :to="link.href"
        class="lk-nav__link"
      >
        {{ link.name }}
      </nuxt-link>
      <button class="lk-nav__link lk-nav__link_logout" @click="logout">
        Выйти из аккаунта
      </button>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'LkNavBar',
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  methods: {
    logout () {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.lk-nav {
  padding-top: 50px;

  &__photo {
    margin-bottom: 10px;
  }

  &__title {
    @include h4;

    @include mq($bp-medium-big) {
      @include h3;
    }
  }

  &__links {
    display: grid;
    grid-gap: 25px;
    padding: 50px 0 88px;
  }

  &__link {
    @include text_medium_small;

    &_logout {
      @include text_medium_regular;

      width: fit-content;
      margin-top: 25px;
    }
  }
}
</style>
