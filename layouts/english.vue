<template>
  <div class="body">
    <HeaderEnglish />
    <main class="body__main">
      <h1 class="body__title">
        {{ activeSection.label }}
      </h1>
      <div class="body__buttons-slider">
        <UIBaseSelectButtons
          ref="selectButtons"
          class="catalog__select-buttons"
          :buttons="sectionButtons"
          @onChangeButtons="onChangeSections"
        />
      </div>
      <NavBarEnglish />
      <slot />
    </main>

    <FooterEnglish class="footer" />
  </div>
</template>

<script setup>
const router = useRouter()
const { path } = useRoute()
const aboutSection = {
  label: 'About company',
  isActive: path.match(/\/en\/about\/$/),
  path: '/en/about/',
}
const sectionButtons = ref([
  aboutSection,
  {
    label: 'History of the company',
    isActive: path.includes('history'),
    path: '/en/history/',
  },
  {
    label: 'Compliance',
    isActive: path.includes('/en/about/compliance/'),
    path: '/en/about/compliance/',
  },
  {
    label: 'News',
    isActive: path.includes('news'),
    path: '/en/news/',
  },
])
const activeSection = ref(sectionButtons.value.find(section => section.isActive) || aboutSection)
const selectButtons = ref(null)

const onChangeSections = () => {
  activeSection.value = selectButtons.value.getActiveButton()
  router.push(`${activeSection.value.path}`)
}

// seo
useHeadDefault()
</script>

<style scoped lang="scss">
@import 'assets/styles/indents/main';
@import 'assets/styles/components/Scroll/default';

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
    overflow: hidden;

    @include mq($bp-small-medium) {
      margin-bottom: 50px;
    }
  }

  &__title {
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

  &__buttons-slider {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
    padding-bottom: 5px;
    margin-bottom: 20px;
    overflow: auto;

    @include mq($bp-small-medium) {
      margin-bottom: 50px;
    }

    @include mq($bp-small) {
      grid-gap: 15px;
    }
  }
}
</style>
