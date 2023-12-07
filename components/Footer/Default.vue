<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <section class="footer__section">
        <UIBaseAccordion
          v-for="nav in navigation"
          :key="nav.name"
          class="footer__accordion"
          :label="nav.name"
        >
          <div class="footer__accordion-content">
            <nuxt-link
              v-for="item in nav.childList"
              :key="item.name"
              class="footer__link"
              :to="item.link"
            >
              {{ item.name }}
            </nuxt-link>
            <a
              v-if="nav.name === 'Каталог' && isAvtodom"
              class="footer__link"
              rel="nofollow"
              href="https://parts.avtodom.ru/"
              target="_blank"
            >
              Запчасти
            </a>
          </div>
        </UIBaseAccordion>
        <div class="footer__subscription footer__subscription_mobile">
          <p class="footer__title">
            Обратная связь
          </p>
          <p class="footer__subscription-text">
            Вы можете задать интересующий вас вопрос нашим специалистам и
            получить исчерпывающую информацию по телефону
          </p>
          <div
            v-if="isAsc"
            class="footer__contacts"
          >
            <a
              class="footer__contacts-phone"
              :href="`tel:${holdingPhone}`"
            >
              {{ holdingPhone }}
            </a>
            <p class="footer__contacts-time">
              с 10:00 до 19:00 пн-пт
            </p>
          </div>
          <FooterSectionSocial
            :vk-link="vkLink"
            :youtube-link="youtubeLink"
            :telegram-link="telegramLink"
            @onOpenFeedbackPanel="onOpenFeedbackPanel"
          />
        </div>
        <div class="footer__nav-container">
          <div
            v-for="nav in navigation"
            :key="nav.name"
            class="footer__nav"
          >
            <p class="footer__title footer__title_indent">
              {{ nav.name }}
            </p>
            <nuxt-link
              v-for="item in nav.childList"
              :key="item.name"
              class="footer__link"
              :class="{ footer__link_indent: isAsc && nav.name === 'Каталог' }"
              :to="item.link"
            >
              {{ item.name }}
            </nuxt-link>
            <a
              v-if="nav.name === 'Каталог' && isAvtodom"
              class="footer__link"
              rel="nofollow"
              href="https://parts.avtodom.ru/"
              target="_blank"
            >
              Запчасти
            </a>
          </div>
          <div class="footer__subscription">
            <p class="footer__title">
              Обратная связь
            </p>
            <p class="footer__subscription-text">
              Вы можете задать интересующий вас вопрос нашим специалистам и
              получить исчерпывающую информацию по телефону
            </p>
            <div
              v-if="isAsc"
              class="footer__contacts"
            >
              <a
                class="footer__contacts-phone"
                :href="`tel:${holdingPhone}`"
              >
                {{ holdingPhone }}
              </a>
              <p class="footer__contacts-time">
                с 10:00 до 19:00 пн-пт
              </p>
            </div>
            <FooterSectionSocial
              :vk-link="vkLink"
              :youtube-link="youtubeLink"
              :telegram-link="telegramLink"
              @onOpenFeedbackPanel="onOpenFeedbackPanel"
            />
          </div>
        </div>
        <div class="footer__container">
          <div class="footer__mobile-buttons">
            <nuxt-link
              v-if="isAsc"
              to="/"
              class="footer__logo-container"
            >
              <IconLogoASC class="footer__logo" />
              <IconLogoASCBest class="footer__logo" />
            </nuxt-link>
            <template v-else>
              <a
                class="footer__mobile-button"
                href="https://apps.apple.com/ru/app/%D0%B0%D0%B2%D1%82%D0%BE%D0%B4%D0%BE%D0%BC/id1510714713"
                target="_blank"
                rel="nofollow"
              >
                <img
                  src="@/assets/icons/apple.svg"
                  alt="кнопка загрузки мобильного приложения apple"
                >
              </a>
              <a
                class="footer__mobile-button"
                target="_blank"
                rel="nofollow"
                href="https://play.google.com/store/apps/details?id=ru.avtodom.app&hl=ru&gl=US"
              >
                <img
                  src="@/assets/icons/google-play.svg"
                  alt="кнопка загрузки мобильного приложения google-play"
                >
              </a>
            </template>
          </div>
          <FooterSectionBankCards />
        </div>
      </section>
      <hr class="footer__line">
      <section class="footer__section footer__section_bottom">
        <template v-if="isAsc">
          <nuxt-link
            class="footer__link footer__link_bottom"
            to="/services/pay/"
          >
            Правила оплаты в интернет-магазине АСЦ
          </nuxt-link>
        </template>
        <template v-else>
          <nuxt-link
            class="footer__lang"
            to="/en/about/"
          >
            <IconWorld class="footer__lang-icon" />
            EN
          </nuxt-link>
          <nuxt-link
            class="footer__link footer__link_bottom"
            to="/reservation/"
          >
            Правила резервирования
          </nuxt-link>
          <nuxt-link
            class="footer__link footer__link_bottom"
            to="/terms-of-use/"
          >
            Пользовательское соглашение
          </nuxt-link>
        </template>
        <nuxt-link
          class="footer__link footer__link_bottom"
          to="/cookie/"
        >
          Политика использования файлов cookie
        </nuxt-link>
        <nuxt-link
          class="footer__link footer__link_bottom"
          to="/consent-to-processing/"
        >
          Политика обработки персональных данных
        </nuxt-link>
      </section>
      <p class="footer__section footer__text">
        Данный официальный сайт несет информационный характер и ни при каких
        условиях материалы и цены, размещенные на сайте, не являются публичной
        офертой.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { useFormStore } from '../../store/form'
import { useHoldingStore } from '~/store/holding'

const { domain, isAsc, isAvtodom, holdingPhone } = useHoldingStore()
const { onOpen } = useFormStore()

const links = {
  avtodom: {
    vkLink: 'https://vk.com/avtodom_company',
    youtubeLink: 'https://youtube.com/@avtodom_media',
    telegramLink: 'https://t.me/avtodom_gk',
    navigation: [
      {
        name: 'Каталог',
        childList: [
          { name: 'Автомобили', link: '/cars/' },
          { name: 'Мотоциклы', link: '/moto/' },
          { name: 'Коммерческий транспорт', link: '/commercial/' },
          {
            name: 'Легкий коммерческий транспорт',
            link: '/commercial/fleet/',
          },
          {
            name: 'Грузовой коммерческий транспорт',
            link: '/commercial/trucks/',
          },
        ],
      },
      {
        name: 'Услуги',
        childList: [
          { name: 'Сервис', link: '/services/' },
          { name: 'Кредитование', link: '/services/credit/' },
          { name: 'Выкуп автомобилей', link: '/services/trade-in/' },
          { name: 'Страхование', link: '/services/insurance/' },
          { name: 'Подписка', link: '/services/subscription/' },
        ],
      },
      {
        name: 'О компании',
        childList: [
          { name: 'Дилерские центры', link: '/contacts/' },
          { name: 'Новости', link: '/news/' },
          { name: 'Блог', link: '/blog/' },
          { name: 'Инвесторам', link: '/investors/' },
          { name: 'СМИ о нас', link: '/media/' },
          { name: 'Карта сайта', link: '/sitemap/' },
          { name: 'Вопрос-ответ', link: '/faq/' },
        ],
      },
    ],
  },
  asc: {
    vkLink: 'https://vk.com/autospeccenter',
    youtubeLink: 'https://www.youtube.com/channel/UC96dxd7WGmJ5__1HtiYm_0w',
    navigation: [
      {
        name: 'Каталог',
        childList: [
          { name: 'Все автомобили', link: '/cars/' },
          { name: 'Новые автомобили', link: '/cars/new/' },
          { name: 'Автомобили с пробегом', link: '/cars/used/' },
          { name: 'Коммерческий транспорт', link: '/commercial/' },
          {
            name: 'Легкий коммерческий транспорт',
            link: '/commercial/fleet/',
          },
          {
            name: 'Грузовой коммерческий транспорт',
            link: '/commercial/trucks/',
          },
          { name: 'Квадроциклы', link: '/atv/' },
          { name: 'Спецпредложения', link: '/actions/' },
        ],
      },
      {
        name: 'Услуги',
        childList: [
          {
            name: 'Выкуп автомобилей с пробегом',
            link: '/services/ransom/',
          },
          {
            name: 'Выкуп коммерческого транспорта',
            link: '/services/commercial/',
          },
          {
            name: 'Страхование и Кредит',
            link: '/services/insurance_and_credit/',
          },
          {
            name: 'Продление полисов ОСАГО и КАСКО',
            link: '/services/prolongatsiya/',
          },
        ],
      },
      {
        name: 'О компании',
        childList: [
          { name: 'О группе компаний', link: '/about/' },
          { name: 'СМИ о нас', link: '/media/' },
          { name: 'Статьи', link: '/blog/' },
          { name: 'Правила оплаты и возврата', link: '/services/pay/' },
          { name: 'Вакансии', link: '/about/career/' },
          { name: 'Контакты', link: '/contacts/' },
          { name: 'Карта сайта', link: '/sitemap/' },
          { name: 'Вопрос-ответ', link: '/faq/' },
        ],
      },
    ],
  },
}
const { vkLink, youtubeLink, telegramLink, navigation } = links[domain]

const onOpenFeedbackPanel = () => onOpen('isOpenFeedback')
</script>

<style lang="scss" scoped>
@import "assets/styles/indents/main";

.footer {
  background: var(--grayLight);

  &__wrapper {
    padding-top: 30px;
    padding-bottom: 30px;

    @include mq($bp-small-medium) {
      padding-top: 40px;
    }

    @include mq($bp-medium) {
      padding-top: 50px;
    }

    @include mq($bp-medium-big) {
      padding-bottom: 20px;
    }
  }

  &__section {
    @include indentsMainHorizontal;

    &_bottom {
      display: flex;
      flex-wrap: wrap;
      grid-gap: 15px 30px;
      align-items: center;
      height: fit-content;
      margin-bottom: 15px;

      @include mq($bp-medium) {
        grid-gap: 15px 40px;
        margin-bottom: 20px;
      }
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;

    @include mq($bp-small) {
      flex-direction: row-reverse;
      grid-gap: 35px;
      align-items: center;
      justify-content: space-between;
    }

    @include mq($bp-medium) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 30%;
      grid-gap: 40px;
    }

    @include mq($bp-medium-big) {
      grid-gap: 30px;
    }

    @include mq($bp-big) {
      grid-gap: 40px;
    }

    @include mq(1800px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__accordion {
    margin-bottom: 25px;
    border-bottom: 1px solid var(--grayMediumLight);

    @include mq($bp-medium) {
      display: none;
    }

    &-content {
      display: flex;
      flex-direction: column;
      grid-gap: 15px;
      padding-bottom: 25px;
    }

    & :deep(.accordion__label) {
      padding-bottom: 25px;
      color: var(--blackLight);

      @include mq($bp-small-medium) {
        @include text_big_bold;
      }
    }
  }

  &__nav-container {
    display: none;

    @include mq($bp-medium) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 30%;
      grid-gap: 40px;
      margin-bottom: 40px;
    }

    @include mq($bp-medium-big) {
      grid-gap: 30px;
    }

    @include mq($bp-big) {
      grid-gap: 40px;
    }

    @include mq(1800px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__nav {
    display: none;

    @include mq($bp-medium) {
      display: flex;
      flex-direction: column;
      grid-gap: 15px;
    }

    @include mq($bp-medium-big) {
      grid-gap: 10px;
    }
  }

  &__title {
    @include text_medium_bold;

    color: var(--blackLight);

    @include mq($bp-small-medium) {
      @include h5;
    }

    @include mq($bp-big) {
      @include h4;
    }

    &_indent {
      margin-bottom: 10px;

      @include mq($bp-medium-big) {
        margin-bottom: 15px;
      }
    }
  }

  &__subscription {
    display: flex;
    flex-direction: column;
    grid-gap: 15px;
    margin-bottom: 30px;

    @include mq($bp-medium) {
      margin-bottom: 0;
    }

    @include mq($bp-medium-big) {
      grid-gap: 25px;
    }

    &-text {
      @include text_medium_regular;

      max-width: 550px;
      color: var(--grayDolphin);

      @include mq($bp-medium-big) {
        @include text_big_regular;
      }
    }

    &_mobile {
      display: flex;
      flex-direction: column;
      grid-gap: 15px;

      @include mq($bp-medium) {
        display: none;
      }
    }
  }

  &__mobile-buttons {
    position: relative;
    display: flex;
    grid-column: 4;
    grid-gap: 20px;
  }

  &__line {
    margin-top: 30px;
    margin-bottom: 30px;
    color: var(--grayMediumLight);

    @include mq($bp-medium) {
      margin-top: 40px;
      margin-bottom: 20px;
    }
  }

  &__link {
    @include text_medium_regular;

    display: block;
    width: fit-content;
    color: var(--grayDolphin);

    &:hover {
      color: var(--black);
    }

    &_indent:nth-child(3),
    &_indent:nth-child(4),
    &_indent:nth-child(6),
    &_indent:nth-child(7) {
      padding-left: 5px;
    }

    &_bottom {
      @include text_small_regular;

      @include mq($bp-medium-big) {
        @include text_medium_regular;
      }
    }
  }

  &__text {
    @include text_small_regular;

    color: var(--grayDolphin);

    @include mq($bp-medium-big) {
      @include text_medium_regular;
    }
  }

  &__lang {
    @include text_medium_regular;

    display: flex;
    grid-gap: 5px;
    align-items: center;
    color: var(--grayDolphin);

    .footer &-icon {
      width: 18px;
      height: 18px;

      & :deep(.icon__path) {
        stroke: var(--grayDolphin);
      }
    }
  }

  &__logo {
    &-container {
      display: flex;
      grid-gap: 15px;
      align-items: center;
    }
  }
}
</style>
