import stylelintPlugin from 'vite-plugin-stylelint'
import * as configs from './nuxt-configs'

// https://nuxt.com/docs/api/configuration/nuxt-config
const domain = process.env.DOMAIN
const host = process.env.HOST
const mode = process.env.MODE
const baseURL = process.env.HOST_API
const cdnUrl = process.env.CDN_URL
const endpoint = process.env.ENDPOINT
const hostName = domain === 'asc' ? 'ascgroup' : 'avtodom'
const hostDomain = mode === 'dev'
  ? 'https://dev.webdms.avtodom.ru'
  : `https://${hostName === 'ascgroup' ? `www.${hostName}` : hostName}.ru`

export default defineNuxtConfig({
  css: [
    '@/assets/styles/_reset.css',
    '@/assets/styles/_global.scss',
    '@/assets/styles/_size.css',
    '@/assets/styles/_fonts.scss',
    `@/assets/styles/_colors.${domain}.css`,
  ],
  vite: {
    plugins: [
      stylelintPlugin(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/index.scss" as *;',
        },
      },
    },
  },
  build: {
    transpile: ['swiper', '@vuepic/vue-datepicker'],
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/image-edge',
    // https://www.npmjs.com/package/nuxt-lodash
    'nuxt-lodash',
    // https://nuxt.com/modules/nuxt-gtm
    '@zadigetvoltaire/nuxt-gtm',
  ],
  lodash: {
    prefixSkip: false,
  },
  googleFonts: {
    families: {
      Inter: true,
    },
    display: 'swap',
    preconnect: true,
    preload: true,
    download: true,
    base64: true,
  },
  runtimeConfig: {
    public: {
      domain,
      baseURL,
      cdnUrl,
      mode,
      host: hostDomain,
      holdingId: domain === 'asc' ? '2' : '1',
      apiPath: mode === 'dev' ? '/dev/v1' : '/v1',
      endpoint: endpoint || 'http://api',
      isDev: mode !== 'prod',
    },
  },
  routeRules: {
    '/v1/**': {
      proxy: { to: endpoint ? endpoint + '/v1/**' : 'http://api/v1/**' },
    },
    '/dev/v1/**': {
      proxy: { to: endpoint ? endpoint + '/dev/v1/**' : 'http://api/v1/**' },
    },
  },
  devServer: {
    host: baseURL.includes('localhost') ? 'localhost' : '0.0.0.0',
  },
  app: {
    htmlAttrs: {
      lang: 'ru',
    },
    title:
      domain === 'asc'
        ? 'Продажа новых и подержанных автомобилей в Москве в автосалоне | ГК АвтоСпецЦентр'
        : 'ABTODOM - официальный дилер автомобилей и мотоциклов премиальных брендов',
    meta: [
      {
        name: 'description',
        content:
          domain === 'asc'
            ? 'Купить автомобили с пробегом и новые в Москве в салонах официального дилера ГК АвтоСпецЦентр ✔ 24 дилерских центра ✔ Сервисные услуги ✔ Подбор автомобиля ✔ Послепродажное обслуживание ✔ Авто в кредит'
            : 'АВТОДОМ - автомобильный холдинг, специализирующийся на продаже и техническом обслуживании автомобилей сегментов Люкс и Премиум. На сегодняшний день официальный дилер АВТОDOM реализует автомобили: BMW, Audi, Jaguar, MINI, Lamborghini, Land Rover, Mercedes-Benz, Volvo и Porsche; и мотоциклы: BMW Motorrad, Ducati, KTM.  Дилерские центры расположены в Москве и Санкт-Петербурге',
      },
      {
        name: 'robots',
        content: 'noyaca',
      },
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0',
      },
      {
        name: 'og:locale',
        property: 'og:locale',
        content: 'ru_RU',
      },
      {
        name: 'og:site_name',
        property: 'og:site_name',
        content: domain === 'asc' ? 'АвтоСпецЦентр' : 'Автодом',
      },
      {
        name: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'og:title',
        property: 'og:title',
        content:
          domain === 'asc'
            ? 'Продажа новых и подержанных автомобилей в Москве в автосалоне | ГК АвтоСпецЦентр'
            : 'ABTODOM - официальный дилер автомобилей и мотоциклов премиальных брендов',
      },
      {
        name: 'og:description',
        property: 'og:description',
        content:
          domain === 'asc'
            ? 'Купить автомобили с пробегом и новые в Москве в салонах официального дилера ГК АвтоСпецЦентр ✔ 24 дилерских центра ✔ Сервисные услуги ✔ Подбор автомобиля ✔ Послепродажное обслуживание ✔ Авто в кредит'
            : 'АВТОДОМ - автомобильный холдинг, специализирующийся на продаже и техническом обслуживании автомобилей сегментов Люкс и Премиум. На сегодняшний день официальный дилер АВТОDOM реализует автомобили: BMW, Audi, Jaguar, MINI, Lamborghini, Land Rover, Mercedes-Benz, Volvo и Porsche; и мотоциклы: BMW Motorrad, Ducati, KTM.  Дилерские центры расположены в Москве и Санкт-Петербурге',
      },
      {
        name: 'og:image',
        property: 'og:image',
        content:
          domain === 'asc'
            ? `${cdnUrl}/og_image_asc.png`
            : `${cdnUrl}/og_image_avt.png`,
      },
      {
        name: 'og:image:width',
        property: 'og:image:width',
        content: domain === 'asc' ? '1200' : '600',
      },
      {
        name: 'og:image:height',
        property: 'og:image:height',
        content: domain === 'asc' ? '630' : '600',
      },
    ],
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `/favicon-${domain}.ico`,
        },
      ],
      script: [
        ...(host !== 'localhost'
          ? [
              {
                src: `/scripts/chat-${domain}.js`,
                async: true,
              },
              {
                src: `/scripts/exponea-${domain}.js`,
                async: true,
              },
              {
                src: `/scripts/calltouch-${domain}.js`,
                async: true,
              },
            ]
          : []),
        ...(domain === 'avtodom' && host !== 'localhost'
          ? [
              {
                src: '/scripts/amplitude.js',
                async: true,
              },
            ]
          : []),
      ],
    },
  },
  experimental: {
    writeEarlyHints: false,
    renderJsonPayloads: false,
  },
  gtm: {
    id: domain === 'asc' ? 'GTM-PPRRK46' : 'GTM-T7XP762',
    debug: false,
  },
  ...configs,
})
