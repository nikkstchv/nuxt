<template>
  <div class="site site--theme-dark">
    <header class="site__head">
      <div class="header">
        <div class="container">
          <div class="h-content">
            <a
              href=""
              class="logo aos-init aos-animate"
              data-aos="fade-in"
              data-aos-duration="2000"
            >
              <svg
                id="logo"
                class="logo__image"
                viewBox="0 0 520.26 37.05"
                height="63"
              >
                <path
                  class="logo-color1"
                  d="M113.98 5.33h13.71l19.24 52.75h-11.4l-3.5-9.58h-22.6L106 58.08H94.81l19.17-52.75zm-1.33 33.31h16.02l-8.05-22.74-7.97 22.74zm64.43-33.31c5.74 0 9.3.63 12.17 2.66 3.29 2.31 5.25 6.3 5.25 10.35 0 3.29-.84 5.53-2.31 8.05-.98 1.68-2.03 3.29-2.87 4.55 1.54 1.19 2.87 2.31 4.13 3.99 1.33 1.75 2.24 4.55 2.24 7.56 0 4.97-1.68 9.09-5.18 11.82-3.29 2.59-7.77 3.78-15.25 3.78H152.1V5.33h24.98zm3.71 21.34c.49-.77 1.19-1.89 1.68-2.73.77-1.33 1.47-2.59 1.47-4.34s-.56-3.15-1.89-3.85c-1.19-.63-3.08-.77-6.16-.77H162.6v11.68h18.19v.01zM162.6 48.43h12.87c4.41 0 6.44-.35 7.91-1.61 1.26-1.12 1.68-2.45 1.68-4.34 0-2.31-.77-3.99-2.73-5.11-1.54-.84-3.57-1.05-7.14-1.05H162.6v12.11zm36.04-33.09v-10h45.89v10h-17.7v42.75h-10.49V15.34h-17.7zm47.43 16.51c0-7.42.91-13.99 3.85-18.75 3.5-5.67 8.19-8.96 19.45-8.96 9.72 0 14.62 2.66 18.47 7.98 3.64 4.97 4.83 12.03 4.83 19.73 0 8.88-1.75 15.32-4.9 19.59-3.85 5.25-8.54 7.84-18.4 7.84-11.12 0-15.53-2.94-19.03-8.12-2.87-4.27-4.27-10.57-4.27-19.31zm10.64 0c0 5.46.49 10.35 2.38 13.36 2.17 3.43 5.81 4.13 10.28 4.13 3.99 0 7.14-.7 9.44-3.57 2.66-3.29 3.22-8.33 3.22-13.92 0-5.39-.56-9.93-2.52-13.15-2.17-3.57-5.67-4.62-10.14-4.62-4.34 0-8.05.63-10.28 4.27-1.89 3.07-2.38 8.04-2.38 13.5zm63.31-26.52c7.98 0 13.57 1.33 17.63 5.95 3.85 4.34 5.74 9.72 5.74 20.22 0 10.77-2.45 17.14-7.35 21.55-4.2 3.78-9.23 5.04-16.58 5.04h-18.47V5.33h19.03zm-8.53 9.87v33.02h8.26c5.11 0 8.19-1.12 10.49-4.55 2.03-3.01 2.52-7.14 2.52-12.17 0-5.46-.35-10-3.01-13.15-2.31-2.73-5.46-3.15-9.65-3.15h-8.61zm38.48 16.65c0-7.42.91-13.99 3.85-18.75 3.5-5.67 8.19-8.96 19.45-8.96 9.72 0 14.62 2.66 18.47 7.98 3.64 4.97 4.83 12.03 4.83 19.73 0 8.88-1.75 15.32-4.9 19.59-3.85 5.25-8.54 7.84-18.4 7.84-11.12 0-15.53-2.94-19.03-8.12-2.87-4.27-4.27-10.57-4.27-19.31zm10.63 0c0 5.46.49 10.35 2.38 13.36 2.17 3.43 5.81 4.13 10.28 4.13 3.99 0 7.14-.7 9.44-3.57 2.66-3.29 3.22-8.33 3.22-13.92 0-5.39-.56-9.93-2.52-13.15-2.17-3.57-5.67-4.62-10.14-4.62-4.34 0-8.05.63-10.28 4.27-1.89 3.07-2.38 8.04-2.38 13.5zm44.29-26.52h13.5l12.94 29.59 12.94-29.59h13.29v52.75h-10.21V21.21l-11.53 26.38h-9.17l-11.54-26.38v36.87H404.9V5.33h-.01z"
                />
              </svg>
            </a>
            <button
              id="select-lang-btn"
              class="select-language-btn"
              @click="toggle"
            >
              RU
            </button>
            <div
              id="select-lang"
              class="select-language"
              :class="{ 'select-language_open': isOpenLinks }"
            >
              <ul class="select-language__list">
                <li class="select-language__item">
                  <nuxt-link
                    class="select-language__link select-language__item_disabled"
                    to="/i/andrey_olkhovsky/"
                  >
                    RU
                  </nuxt-link>
                </li>
                <li class="select-language__item">
                  <nuxt-link
                    class="select-language__link"
                    to="/i/en/andrey_olkhovsky/"
                  >
                    EN
                  </nuxt-link>
                </li>
                <li class="select-language__item">
                  <nuxt-link
                    class="select-language__link"
                    to="/i/cn/andrey_olkhovsky/"
                  >
                    CH
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main class="site__body">
      <div class="inner-page">
        <div class="container">
          <div class="card">
            <div class="card__col card__col--photo">
              <div
                class="card__photo aos-init aos-animate"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <picture>
                  <nuxt-img :src="`${cdnUrl}/i/img/Andrey_Olkhovsky.jpg`" alt="Ольховский Андрей Сергеевич" /></picture>
              </div>
            </div>
            <div class="card__col card__col--info">
              <div class="card__slot card__slot--name">
                <div
                  class="slot slot--name aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="300"
                >
                  <span class="slot__title slot__title--name">Имя</span>
                  <span class="slot__value slot__value--name">Ольховский Андрей Сергеевич</span>
                </div>
              </div>
              <div class="card__slot">
                <div
                  class="slot aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="300"
                  data-aos-delay="150"
                >
                  <span class="slot__title">Компания</span>
                  <span class="slot__value">АО АВТОДОМ</span>
                </div>
              </div>
              <div class="card__slot">
                <div
                  class="slot aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="300"
                  data-aos-delay="50"
                >
                  <span class="slot__title">Должность</span>
                  <span class="slot__value">Генеральный директор</span>
                </div>
              </div>
              <div class="card__slot">
                <div
                  class="slot aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="300"
                  data-aos-delay="100"
                >
                  <span class="slot__title">Рабочий</span>
                  <span class="slot__value">
                    <a
                      class="link-no-underline"
                      href="tel:+74955005000"
                    >+74955005000</a>
                  </span>
                </div>
              </div>
              <div class="card__slot">
                <div
                  class="slot aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="300"
                  data-aos-delay="200"
                >
                  <span class="slot__title">Мобильный</span>
                  <span class="slot__value">
                    <a
                      class="link-no-underline"
                      href="tel:+79136281717"
                    >+79136281717</a>
                  </span>
                </div>
              </div>
              <div class="card__slot">
                <div
                  class="slot aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="300"
                  data-aos-delay="250"
                >
                  <span class="slot__title">Email</span>
                  <span class="slot__value">
                    <a
                      class="link-no-underline"
                      href="mailto:Andrey.Olkhovsky@avtodom.ru"
                    >Andrey.Olkhovsky@avtodom.ru</a>
                  </span>
                </div>
              </div>
              <div class="card__slot card__slot--btn">
                <div
                  class="slot aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="300"
                  data-aos-delay="300"
                >
                  <a
                    :href="`${cdnUrl}/i/vcf/andrey_olkhovskiy.vcf`"
                    class="btn btn--white btn--size-m"
                  >Сохранить карточку контакта</a>
                </div>
              </div>
              <div
                class="card__slot card__slot--100 aos-init aos-animate"
                data-aos="fade-up"
                data-aos-duration="300"
                data-aos-delay="150"
              >
                <div class="map-nav">
                  <p class="map-nav__title">
                    Построить маршрут:
                  </p>
                  <ul class="map-nav-list">
                    <li class="map-nav-list__item">
                      <a
                        href="//yandex.ru/maps/213/moscow/?ll=37.507683%2C55.785206&amp;mode=poi&amp;poi%5Bpoint%5D=37.508988%2C55.786350&amp;poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1037910515&amp;utm_source=main_stripe_big&amp;z=17"
                        class="m-nav"
                        target="_blank"
                        rel="nofollow"
                      >
                        <div class="m-nav__icon">
                          <svg
                            width="19"
                            height="30"
                            viewBox="0 0 19 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style="margin-top: 3px"
                          >
                            <path
                              class="path-2"
                              d="M9 30C9 30 9.56605 29.0816 14.283 22.102C19 15.1224 19 12 19 12L10.8868 18.2449L9 30Z"
                              fill="#585656"
                            />
                            <path
                              class="path-3"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M9.76002 18.9163C14.7202 18.9163 18.7412 14.8953 18.7412 9.93507C18.7412 4.97488 14.7202 0.953857 9.76002 0.953857C4.79983 0.953857 0.778809 4.97488 0.778809 9.93507C0.778809 14.8953 4.79983 18.9163 9.76002 18.9163ZM9.94318 13.7842C11.9677 13.7842 13.609 12.143 13.609 10.1184C13.609 8.09383 11.9677 6.45259 9.94318 6.45259C7.91862 6.45259 6.27738 8.09383 6.27738 10.1184C6.27738 12.143 7.91862 13.7842 9.94318 13.7842Z"
                              fill="#000"
                            />
                          </svg>
                        </div>
                        <div class="m-nav__title">Яндекс карты</div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="qrcode">
                  <img
                    src="@/assets/images/business-card/qr-code-ru.png"
                    class="qrcode__img"
                    alt="qrcode"
                  >
                  <p class="qrcode__text">
                    Сохраните контакт на телефон
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="site__footer">
      <div class="container">
        <div class="f-content">
          <div class="f-content__item f-contact">
            <a
              class="f-content__item-link f-a"
              href="https://avtodom.ru/"
              target="_blank"
              rel="nofollow"
            >avtodom.ru</a>:
            <a
              class="f-a"
              rel="nofollow"
              href="tel:84955005000"
            >8 495 500 500 0</a>
            Москва и
            <a
              class="f-a"
              rel="nofollow"
              href="tel:88125005000"
            >8 812 500 500 0</a>
            Санкт-Петербург
          </div>
          <div class="f-content__item f-copy">
            ©{{ $getCurrentYear() }} ABTODOM
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'clear',
})

const runtimeConfig = useRuntimeConfig()
const cdnUrl = runtimeConfig.public.cdnUrl

const isOpenLinks = ref(false)

const toggle = () => {
  isOpenLinks.value = !isOpenLinks.value
}

const findAndRemove = (script) => {
  const exclude = ['calltouch', 'amplitude']
  exclude.forEach((item) => {
    const hasExclude = script.src.includes(item)
    if (hasExclude) {
      script.onload = () => {
        script.parentNode.removeChild(script)
      }
      script.parentNode.removeChild(script)
    }
  })
}

onMounted(() => {
  const timer = setInterval(() => {
    const scripts = document.querySelectorAll('script')
    scripts.forEach(findAndRemove)
  }, 300)

  setTimeout(() => {
    clearInterval(timer)
  }, 3000)
})

const title = 'Ольховский Андрей Сергеевич - ABTODOM'
const head = {
  title,
  meta: [
    {
      hid: 'og:image',
      property: 'og:image',
      content: `${cdnUrl}/i/img/a1aztmgylu07dd0eycdv83s8c128dnh5.jpg`,
    },
    {
      hid: 'og:title',
      name: 'og:title',
      property: 'og:title',
      content: title,
    },
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Play:wght@400;700&display=swap',
    },
  ],
}

useHead(head)
</script>

<style scoped lang="scss">
@import 'assets/styles/components/BusinessCard/styles';
</style>
