<template>
  <div class="body">
    <NavBarDefault />
    <UIBaseOverlay />
    <!--    <CityPanel />-->
    <FormPanelFeedback />
    <HeaderDefault />
    <div class="main">
      <UIBreadcrumbs class="body__breadcrumbs" />
      <h1 v-if="lastPathTitle" class="title">
        {{ lastPathTitle }}
      </h1>
      <div class="wrapper">
        <LkNavBar class="navBar" :links="links" />
        <slot />
        <div class="navBar-footer">
          <nuxt-link
            v-for="link in links"
            :key="link.name"
            :to="link.href"
            class="navBar-footer__link"
          >
            {{ link.name }} <IconArrow
              right
              class="navBar-footer__link-icon"
            />
          </nuxt-link>
        </div>
      </div>
    </div>
    <FooterDefault class="footer" />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data: () => ({
    links: [
      // {
      //   name: 'Профиль',
      //   href: '/lk/profile/',
      // },
      // {
      //   name: 'Уведомления',
      //   href: '/lk/notifications/',
      // },
      // {
      //   name: 'Мои заказы',
      //   href: '/lk/orders/',
      // },
      {
        name: 'Функциональные сервисы',
        href: '/lk/functional-services/',
      },
      // {
      //   name: 'Мой гараж',
      //   href: '/lk/garage/',
      // },
      // {
      //   name: 'Запись на сервис',
      //   href: '/lk/service-registration/',
      // },
      // {
      //   name: 'Запчасти',
      //   href: '/lk/',
      // },
      // {
      //   name: 'Сервисные рекомендации',
      //   href: '/lk/service-recommendations/',
      // },
      // {
      //   name: 'Мои обращения',
      //   href: '/lk/',
      // },
      // {
      //   name: 'Избранное',
      //   href: '/favorites/',
      // },
      // {
      //   name: 'Программа лояльности',
      //   href: '/service/loyalty-program/',
      // },
    ],
    titles: {
      lk: 'Личный кабинет',
      profile: 'Профиль',
      notifications: 'Уведомления',
      garage: 'Мой гараж',
      orders: 'Мои заказы',
      'functional-services': '',
      'service-registration': 'Запись на сервис',
      'service-recommendations': 'Сервисные рекомендации',
      'qr-generator': 'QR генератор',
    },
  }),
  computed: {
    lastPathTitle () {
      return this.translatedTitle[this.translatedTitle.length - 1]
    },
    translatedTitle () {
      return this.arrayRoutePath.map((path) => {
        if (this.titles[path]) {
          return this.titles[path]
        } else if (!isNaN(parseInt(path))) {
          return `Заказ №${path}`
        }

        return ''
      })
    },
    arrayRoutePath () {
      return this.$route.path.split('/').filter(Boolean)
    },
  },
}
</script>
<style scoped lang="scss">
.body {
  position: relative;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  min-height: calc(100vh + var(--footer-height));
  margin: auto;

  &__breadcrumbs {
    padding-top: 15px;
  }
}

.wrapper {
  display: grid;

  @include mq($bp-medium-big) {
    grid-auto-flow: column;
    grid-gap: 50px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 70px;
  }

  @include mq($bp-big) {
    grid-gap: 100px;
  }
}

.navBar {
  display: none;

  @include mq($bp-medium-big) {
    display: block;
  }
}

.title {
  padding-top: 15px;
  margin-bottom: 15px;

  @include h4;

  @include mq($bp-small-medium) {
    @include h2;

    margin-bottom: 30px;
  }

  @include mq($bp-medium-big) {
    @include h1;

    margin-bottom: 40px;
  }
}

.main {
  padding: 0 15px;
  overflow: hidden;

  @include mq($bp-small-medium) {
    padding: 0 15px;
  }

  @include mq($bp-small) {
    padding: 0 32px;
  }

  @include mq($bp-medium) {
    padding: 0 50px;
  }

  @include mq($bp-medium-big) {
    padding: 0 81px;
  }

  @include mq($bp-big) {
    padding: 0 146px;
  }
}

.navBar-footer {
  padding: 50px 0;

  @include mq($bp-medium-big) {
    display: none;
  }

  &__link {
    @include label;

    display: flex;
    grid-gap: 15px;
    align-items: center;
    justify-content: space-between;
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--grayMediumLight);

    &-icon {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
