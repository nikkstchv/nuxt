<template>
  <div class="site">
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
              <nuxt-img
                loading="lazy"
                decoding="async"
                alt="logo"
                src="/icons/asc-logo.svg"
                width="200"
                height="85"
              /></a>
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
                  <nuxt-img :src="`${cdnUrl}/i/img/terlyukevich-a3.jpg`" alt="Andrey Terlyukevich" />
                </picture>
              </div>
            </div>
            <div class="card__col card__col--info">
              <div class="card__slot card__slot--name">
                <div
                  class="slot slot--name aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="300"
                >
                  <span class="slot__title slot__title--name">Name</span>
                  <span class="slot__value slot__value--name">Andrey Terlyukevich</span>
                </div>
              </div>
              <div class="card__slot">
                <div
                  class="slot aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="300"
                  data-aos-delay="150"
                >
                  <span class="slot__title">Company</span>
                  <span class="slot__value">GC Avtospeccentr</span>
                </div>
              </div>
              <div class="card__slot">
                <div
                  class="slot aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="300"
                  data-aos-delay="50"
                >
                  <span class="slot__title">Post</span>
                  <span class="slot__value">CEO</span>
                </div>
              </div>
              <div class="card__slot">
                <div
                  class="slot aos-init"
                  data-aos="fade-up"
                  data-aos-duration="300"
                  data-aos-delay="100"
                >
                  <span class="slot__title">Phone number</span>
                  <span class="slot__value">
                    <a
                      class="link-no-underline comagic_phone2_link"
                      href="tel:+74957855505"
                    >+7 (495) 785-55-05</a>
                  </span>
                </div>
              </div>
              <div class="card__slot">
                <div
                  class="slot aos-init"
                  data-aos="fade-up"
                  data-aos-duration="300"
                  data-aos-delay="200"
                >
                  <span class="slot__title">Mobile</span>
                  <span class="slot__value">
                    <a
                      class="link-no-underline"
                      href="tel:89037550306"
                    >8 903 755 03 06</a>
                  </span>
                </div>
              </div>
              <div class="card__slot">
                <div
                  class="slot aos-init"
                  data-aos="fade-up"
                  data-aos-duration="300"
                  data-aos-delay="250"
                >
                  <span class="slot__title">Email</span>
                  <span class="slot__value">
                    <a
                      class="link-no-underline"
                      href="mailto:Andrey.Terlyukevich@ascgroup.ru"
                    >Andrey.Terlyukevich@ascgroup.ru</a>
                  </span>
                </div>
              </div>
              <div class="card__slot card__slot--btn">
                <div
                  class="slot aos-init"
                  data-aos="fade-up"
                  data-aos-duration="300"
                  data-aos-delay="300"
                >
                  <a
                    :href="`${cdnUrl}/i/vcf/terlyukevich_andrej_vladimirovich_en.vcf`"
                    class="btn btn--white btn--size-m"
                  >Save contacts</a>
                </div>
              </div>
              <div
                class="card__slot card__slot--100 aos-init"
                data-aos="fade-up"
                data-aos-duration="300"
                data-aos-delay="150"
              >
                <div class="map-nav">
                  <p class="map-nav__title">
                    The route:
                  </p>
                  <ul class="map-nav-list">
                    <li class="map-nav-list__item">
                      <a
                        href="https://yandex.ru/maps/org/137352583024"
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
                              fill="#5fc8db"
                            />
                            <path
                              class="path-3"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M9.76002 18.9163C14.7202 18.9163 18.7412 14.8953 18.7412 9.93507C18.7412 4.97488 14.7202 0.953857 9.76002 0.953857C4.79983 0.953857 0.778809 4.97488 0.778809 9.93507C0.778809 14.8953 4.79983 18.9163 9.76002 18.9163ZM9.94318 13.7842C11.9677 13.7842 13.609 12.143 13.609 10.1184C13.609 8.09383 11.9677 6.45259 9.94318 6.45259C7.91862 6.45259 6.27738 8.09383 6.27738 10.1184C6.27738 12.143 7.91862 13.7842 9.94318 13.7842Z"
                              fill="#3abdd5"
                            />
                          </svg>
                        </div>
                        <div class="m-nav__title">Yandex Maps</div>
                      </a>
                    </li>
                  </ul>
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
              href="https://ascgroup.ru/"
              target="_blank"
              rel="nofollow"
            >ascgroup.ru</a>:
            <a
              class="f-a comagic_phone2_link"
              rel="nofollow"
              href="tel:+74957855505"
            >+7 (495) 785-55-05</a>
            Moscow
          </div>
          <div class="f-content__item f-copy">
            ©{{ $getCurrentYear() }} Avtospeccentr
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

const title = 'Andrey Terlyukevich - Avtospeccentr'
const head = {
  htmlAttrs: { lang: 'en' },
  title,
  meta: [
    {
      hid: 'og:image',
      property: 'og:image',
      content:
          `${cdnUrl}/i/img/terlyukevich-a3.jpg`,
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
      href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap',
    },
  ],
}

useHead(head)
</script>

<style scoped lang="scss">
@import 'assets/styles/components/BusinessCard/styles-asc';
</style>
