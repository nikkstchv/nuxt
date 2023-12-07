<template>
  <LayoutWrapperDefault>
    <div class="body">
      <HeaderDefault ref="header" />
      <main class="body__main">
        <UISimplePageHeader has-filter-buttons class="body__header" :title="h1" />
        <UIBaseSelectButtons
          ref="selectButtons"
          class="body__section-buttons"
          :buttons="sectionButtonsShowed"
          @onChangeButtons="onChangeSections"
        />
        <slot />
      </main>

      <FooterDefault ref="footer" />
    </div>
  </LayoutWrapperDefault>
</template>

<script setup>
import { useHoldingStore } from '../store/holding'

const { domain } = useHoldingStore()
const router = useRouter()
const { path } = useRoute()
const sectionButtons = {
  avtodom: [
    {
      label: 'О компании',
      isActive: /\/about\/$/.test(path),
      path: '/about/',
    },
    {
      h1: 'История компании АВТОДОМ - крупнейшего официального дилера в России',
      label: 'История',
      isActive: path.includes('history/'),
      path: '/about/history/',
    },
    {
      label: 'Комплаенс',
      isActive: path.includes('compliance/'),
      path: '/about/compliance/',
    },
    {
      label: 'Инвесторам',
      isActive: false,
      path: '/investors/',
    },
    {
      label: 'СМИ о нас',
      isActive: false,
      path: '/media/',
    },
    {
      h1: 'Актуальные вакансии компании АВТОDОМ',
      label: 'Карьера',
      isActive: path.includes('career/'),
      path: '/about/career/',
    },
    {
      label: 'Блог',
      isActive: false,
      path: '/blog/',
    },
  ],
  asc: [
    {
      label: 'О компании',
      isActive: /\/about\/$/.test(path),
      path: '/about/',
    },
    {
      h1: 'История АвтоСпецЦентр',
      label: 'История',
      isActive: path.includes('history/'),
      path: '/about/history/',
    },
    {
      label: 'СМИ о нас',
      isActive: false,
      path: '/media/',
    },
    {
      label: 'Благотворительность',
      isActive: false,
      path: '/tekhnologii-detskogo-schastya/',
    },
    {
      h1: 'Актуальные вакансии компании АвтоСпецЦентр',
      label: 'Карьера',
      isActive: path.includes('career/'),
      path: '/about/career/',
    },
    {
      label: 'Статьи',
      isActive: false,
      path: '/blog/',
    },
  ],
}
const activeSection = ref(null)
const selectButtons = ref(null)
const h1 = computed(() => {
  if (activeSection) {
    return activeSection.value?.h1 ?? activeSection.value?.label
  }
  return ''
})

const getSectionButtonsShowed = () => {
  const currentSectionButtons = sectionButtons[domain]
  const someActive = currentSectionButtons.some(item => item.isActive)
  const defaultSectionButtons = currentSectionButtons.map((item, index) => index === 0 ? { ...item, isActive: true } : item)
  return someActive ? currentSectionButtons : defaultSectionButtons
}

const setActiveSection = () => {
  const found = sectionButtonsShowed.find(
    ({ isActive }) => isActive,
  )

  activeSection.value = found || sectionButtonsShowed[0]
}

const onChangeSections = () => {
  activeSection.value = selectButtons.value.getActiveButton()
  router.push(activeSection.value.path)
}

const sectionButtonsShowed = getSectionButtonsShowed()

setActiveSection()

useHeadDefault()
</script>

<style scoped lang="scss">
@import 'assets/styles/indents/main';

.body {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: calc(100vh + 250px);
  margin: auto;

  &__main {
    @include indentsMainHorizontal;

    padding-top: 15px;
    margin-bottom: 15px;

    @include mq($bp-small-medium) {
      margin-bottom: 50px;
    }
  }

  &__h1 {
    @include h4;

    margin-bottom: 25px;

    @include mq($bp-small-medium) {
      @include h3;

      margin-bottom: 30px;
    }

    @include mq($bp-medium) {
      @include h2;
    }

    @include mq($bp-medium-big) {
      @include h1;
    }
  }

  &__section-buttons {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 10px;
    padding-bottom: 5px;
    margin-bottom: 30px;
    overflow: auto;

    @include mq($bp-small) {
      grid-gap: 15px;
      margin-bottom: 40px;
    }
  }
}
</style>
