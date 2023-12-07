<template>
  <UIBaseOverlay :is-open="isOpenFilter" @click="onCloseSettingsPanel">
    <UISidePanel
      class="settings__side-panel"
      :is-open="isOpenFilter"
      @onClose="onCloseSettingsPanel"
    >
      <form v-if="isOpenFilter" ref="settings" class="settings">
        <header class="settings__header">
          <h2 class="settings__title">
            Настройки
          </h2>
          <IconClose
            class="settings__close"
            @click="onCloseSettingsPanel"
          />
        </header>
        <section class="settings__main">
          <UIBaseAccordion label="Шаблон" is-expand>
            <UIBaseRadio
              v-for="radio in allData.template"
              :id="radio.code"
              :key="radio.code"
              v-model="form.template"
              class="settings__radio"
              :label="radio.name"
              :value="radio.code"
            />
          </UIBaseAccordion>
          <UIBaseAccordion label="Ориентация печати" is-expand>
            <UIBaseRadio
              v-for="radio in allData.orientation"
              :id="radio.code"
              :key="radio.code"
              v-model="form.orientation"
              class="settings__radio"
              :label="radio.name"
              :value="radio.code"
            />
          </UIBaseAccordion>
          <UIBaseAccordion label="Холдинг" is-expand>
            <UIBaseRadio
              v-for="radio in allData.holding"
              :id="radio.code"
              :key="radio.code"
              v-model="form.holding"
              class="settings__radio"
              :label="radio.name"
              :value="radio.code"
            />
          </UIBaseAccordion>
        </section>
        <footer class="settings__footer">
          <UIBaseButton
            :disable="hasData"
            primary
            large
            text="Применить"
            type="submit"
            @click.prevent="onCloseSettingsPanel"
          />
          <UIBaseButton
            :disable="hasData"
            secondary
            large
            text="Сбросить"
            type="reset"
            @click.prevent="clearAllFormData"
          />
        </footer>
      </form>
    </UISidePanel>
  </UIBaseOverlay>
</template>

<script>
export default {
  name: 'LkQrPanel',
  props: {
    isOpenFilter: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data () {
    return {
      allData: {
        orientation: [
          {
            code: 'portrait',
            name: 'Книжная',
          },
          {
            code: 'landscape',
            name: 'Альбомная',
          },
        ],
        template: [
          {
            code: 'avtodom',
            name: 'Автодом. Автомобили с пробегом',
          },
          {
            code: 'asc',
            name: 'АСЦ ЧЕСТНО',
          },
          {
            code: 'bmw-premium-selection',
            name: 'BMW PREMIUM SELECTION',
          },
        ],
        holding: [
          {
            code: 'avtodom',
            name: 'AВТОДОМ',
          },
          {
            code: 'asc',
            name: 'АСЦ',
          },
        ],
      },
      form: {
        orientation: 'portrait',
        template: 'avtodom',
        holding: 'avtodom',
      },
    }
  },
  computed: {
    hasData () {
      return Object.values(this.form).every((item) => {
        return !item || item.length === 0
      })
    },
  },
  watch: {
    form: {
      handler () {
        this.setSettingsData()
      },
      deep: true,
    },
  },
  methods: {
    setSettingsData () {
      this.$emit('setSettingsData', this.form)
    },
    onCloseSettingsPanel () {
      this.$emit('onCloseSettingsPanel')
    },
    clearAllFormData () {
      this.form = {
        orientation: 'portrait',
        template: 'avtodom',
        holding: 'avtodom',
      }
    },
    checkEmptyFilter (filter) {
      if (!filter) {
        return false
      } else if (filter?.length === 1) {
        return filter?.every(item => item.code)
      } else if (filter?.length === 0) {
        return false
      }
      return true
    },
  },
}
</script>

<style lang="scss" scoped>
.settings {
  $width: 520px;

  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  padding-right: 60px;
  padding-left: 60px;

  @media (max-width: $width - 1) {
    padding-right: 24px;
    padding-left: 24px;
  }

  &__side-panel {
    z-index: 5;
  }

  &__main {
    display: grid;
    grid-gap: 15px;
    align-content: flex-start;
  }

  &__title {
    @include h5;

    @include mq($bp-super-small) {
      @include h4;
    }

    @include mq($bp-medium-big) {
      @include h3;
    }
  }

  &__radio {
    width: fit-content;
  }

  &__close {
    width: 24px;
    height: 24px;
  }

  & :deep(.accordion__wrapper-content) {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }

  & :deep(.radio__label) {
    color: var(--blackLight);
  }

  &__header {
    position: sticky;
    top: 0;
    right: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    order: -100;
    height: 40px;
    padding: 70px 0 20px;
    margin-bottom: 30px;
    background: white;

    @media (max-width: $width - 1) {
      padding: 40px 0 20px;
    }

    @include mq($bp-super-small) {
      margin-bottom: 40px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 45px;
    }

    @include mq($bp-big) {
      margin-bottom: 50px;
    }
  }

  &__footer {
    position: sticky;
    right: 0;
    bottom: 0;
    z-index: 10;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 15px;
    place-items: center;
    order: 10000000000;
    height: 100px;
    padding: 30px 0;
    margin-bottom: 30px;
    background: white;

    @include mq($bp-small-medium) {
      margin-bottom: 40px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 70px;
    }
  }
}
</style>
