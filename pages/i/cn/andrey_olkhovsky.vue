<template>
  <div class="site site--theme-dark">
    <header class="site__head">
      <div class="header">
        <div class="container">
          <div class="h-content">
            <a
              href="https://avtodom.ru/"
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
                  d="M20.072 1.58201H33.782L53.022 54.332H41.622L38.122 44.752H15.522L12.092 54.332H0.902039L20.072 1.58201ZM18.742 34.892H34.762L26.712 12.152L18.742 34.892ZM104.732 11.592V1.59201H150.622V11.592H132.922V54.342H122.432V11.592H104.732ZM152.162 28.102C152.162 20.682 153.072 14.112 156.012 9.35201C159.512 3.68201 164.202 0.392006 175.462 0.392006C185.182 0.392006 190.082 3.05201 193.932 8.37201C197.572 13.342 198.762 20.402 198.762 28.102C198.762 36.982 197.012 43.422 193.862 47.692C190.012 52.942 185.322 55.532 175.462 55.532C164.342 55.532 159.932 52.592 156.432 47.412C153.562 43.142 152.162 36.842 152.162 28.102ZM162.802 28.102C162.802 33.562 163.292 38.452 165.182 41.462C167.352 44.892 170.992 45.592 175.462 45.592C179.452 45.592 182.602 44.892 184.902 42.022C187.562 38.732 188.122 33.692 188.122 28.102C188.122 22.712 187.562 18.172 185.602 14.952C183.432 11.382 179.932 10.332 175.462 10.332C171.122 10.332 167.412 10.962 165.182 14.602C163.292 17.672 162.802 22.642 162.802 28.102ZM226.112 1.58201C234.092 1.58201 239.682 2.91201 243.742 7.53201C247.592 11.872 249.482 17.252 249.482 27.752C249.482 38.522 247.032 44.892 242.132 49.302C237.932 53.082 232.902 54.342 225.552 54.342H207.082V1.58201H226.112ZM217.582 11.452V44.472H225.842C230.952 44.472 234.032 43.352 236.332 39.922C238.362 36.912 238.852 32.782 238.852 27.752C238.852 22.292 238.502 17.752 235.842 14.602C233.532 11.872 230.382 11.452 226.192 11.452H217.582ZM256.062 28.102C256.062 20.682 256.972 14.112 259.912 9.35201C263.412 3.68201 268.102 0.392006 279.362 0.392006C289.082 0.392006 293.982 3.05201 297.832 8.37201C301.472 13.342 302.662 20.402 302.662 28.102C302.662 36.982 300.912 43.422 297.762 47.692C293.912 52.942 289.222 55.532 279.362 55.532C268.242 55.532 263.832 52.592 260.332 47.412C257.462 43.142 256.062 36.842 256.062 28.102ZM266.692 28.102C266.692 33.562 267.182 38.452 269.072 41.462C271.242 44.892 274.882 45.592 279.352 45.592C283.342 45.592 286.492 44.892 288.792 42.022C291.452 38.732 292.012 33.692 292.012 28.102C292.012 22.712 291.452 18.172 289.492 14.952C287.322 11.382 283.822 10.332 279.352 10.332C275.012 10.332 271.302 10.962 269.072 14.602C267.182 17.672 266.692 22.642 266.692 28.102ZM310.982 1.58201H324.482L337.422 31.172L350.362 1.58201H363.652V54.332H353.442V17.462L341.912 43.842H332.742L321.202 17.462V54.332H310.992V1.58201H310.982Z"
                />
                <path
                  class="logo-color1"
                  d="M64.4777 54.337H78.1877L97.4277 1.587H86.0277L82.5277 11.167H59.9277L56.4977 1.587H45.3077L64.4777 54.337ZM59.9277 11.167H82.5277L71.1177 43.767L59.9277 11.167Z"
                />
              </svg>
            </a>
            <button
              id="select-lang-btn"
              class="select-language-btn"
              @click="toggle"
            >
              CH
            </button>
            <div
              id="select-lang"
              class="select-language"
              :class="{ 'select-language_open': isOpenLinks }"
            >
              <ul class="select-language__list">
                <li class="select-language__item">
                  <nuxt-link
                    class="select-language__link"
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
                <li
                  class="select-language__item select-language__item_disabled"
                >
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
                  <nuxt-img :src="`${cdnUrl}/i/img/Andrey_Olkhovsky.jpg`" alt="奥利霍夫斯基•安德烈•谢尔盖耶维奇" />
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
                  <span class="slot__title slot__title--name">姓名</span>
                  <span class="slot__value slot__value--name">奥利霍夫斯基•安德烈•谢尔盖耶维奇</span>
                </div>
              </div>
              <div class="card__slot">
                <div
                  class="slot aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="300"
                  data-aos-delay="150"
                >
                  <span class="slot__title">公司</span>
                  <span class="slot__value">汽车之家股份公司 (AVTODOM JSC)</span>
                </div>
              </div>
              <div class="card__slot">
                <div
                  class="slot aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="300"
                  data-aos-delay="50"
                >
                  <span class="slot__title">职位</span>
                  <span class="slot__value">总经理</span>
                </div>
              </div>
              <div class="card__slot">
                <div
                  class="slot aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="300"
                  data-aos-delay="100"
                >
                  <span class="slot__title">办公室电话</span>
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
                  <span class="slot__title">手机</span>
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
                  <span class="slot__title">邮箱地址</span>
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
                    :href="`${cdnUrl}/i/vcf/andrey_olkhovsky-2.vcf`"
                    class="btn btn--white btn--size-m"
                  >保存联系卡片</a>
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
                    设置路线：
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
                        <div class="m-nav__title">
                          扬得克斯地图 (Yandex Maps)
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="qrcode">
                  <img
                    src="@/assets/images/business-card/qr-code-cn.png"
                    class="qrcode__img"
                    alt="qrcode"
                  >
                  <p class="qrcode__text">
                    在手机上添加联系人
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
            >avtodom.ru</a>
            <span class="f-a__moscow f-a__nowrap"><a
              class="f-a"
              rel="nofollow"
              href="tel:+74955005000"
            >007 495 500 500 0</a>
              莫斯科 与</span>
            <span class="f-a__nowrap"><a
              class="f-a"
              rel="nofollow"
              href="tel:+78125005000"
            >007 812 561 130 6</a>圣彼得堡</span>
          </div>
          <div class="f-content__item f-copy">
            {{ $getCurrentYear() }} 汽车之家 (AVTODOM)
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

const title = '奥利霍夫斯基•安德烈•谢尔盖耶维奇 - 汽车之家股份公司 (AVTODOM)'
const head = {
  htmlAttrs: { lang: 'cn' },
  title,
  meta: [
    {
      hid: 'og:image',
      property: 'og:image',
      content:
          'https://webdms-avtodom-ru-media-bank.hb.bizmrg.com/i/img/a1aztmgylu07dd0eycdv83s8c128dnh5.jpg',
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
