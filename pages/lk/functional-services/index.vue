<template>
  <main class="qr">
    <div class="qr__header-buttons">
      <UIBaseSelectButton
        text="Все фильтры"
        class="qr__button qr__button_all-filters"
        @click="onOpenSettingsPanel"
      >
        <IconSettings />
      </UIBaseSelectButton>
    </div>

    <section class="qr__search">
      <UIBaseInput
        v-model.trim="form.vin.value"
        mask="*****************"
        class="qr__input"
        placeholder="VIN-код"
        :errors="form.vin.errors"
        :error="form.vin.errors.length !== 0"
        event-name="input"
        @click="onClearVinErrors"
      />
      <UIBaseButton
        class="qr__button qr__button_search"
        text="Искать по VIN-коду"
        secondary
        large
        :disable="!isValidVin"
        @click="onSearch"
      />
    </section>

    <form class="qr__form" @submit.prevent>
      <template v-for="input in baseFormField">
        <UIBaseInputStraight
          v-if="
            input[0] !== 'phone' &&
              (input[0] !== 'exteriorColorGroup' ||
                (input[0] === 'exteriorColorGroup' &&
                  settingsData.template === 'asc'))
          "
          :key="input[0]"
          v-model.trim="form[input[0]].value"
          class="qr__input"
          :label="input[1].placeholder"
          is-show-eye
          :on-change-disable="onChangeDisable(input[0])"
        />

        <div
          v-else-if="input[0] === 'phone'"
          :key="input[0]"
          class="qr__form-line"
        >
          <UIBaseInputStraight
            v-if="isShowPhone"
            v-model.trim="form[input[0]].value"
            mask="+# ###-###-##-##"
            class="qr__input"
            :label="input[1].placeholder"
            type="tel"
            autocomplete="tel"
            is-show-eye
            :on-change-disable="onChangeDisable(input[0])"
          />
        </div>
      </template>
    </form>
    <UIBaseButton
      class="qr__button qr__button_submit"
      primary
      text="Сгенерировать"
      large
      @click="generateQR"
    />
    <UIBaseOverlay
      :is-open-prop="isOpenSettings"
      @click="onCloseSettingsPanel"
    />
    <LkQrPanel
      :is-open-filter="isOpenSettings"
      @setSettingsData="setSettingsData"
      @onCloseSettingsPanel="onCloseSettingsPanel"
    />
  </main>
</template>

<script>
import { getCard } from '@/api/routes/catalog'

definePageMeta({
  layout: 'lk',
  middleware: 'authenticated',
})

export default {
  name: 'LkFunctionalServices',
  data: () => ({
    isOpenSettings: false,
    settingsData: {
      orientation: 'portrait',
      template: 'avtodom',
      holding: 'avtodom',
      carType: '',
      dealerCode: '',
    },
    form: {
      vin: {
        value: '',
        errors: [],
      },
      mark: {
        placeholder: 'Марка',
        value: '',
        disable: false,
      },
      model: {
        placeholder: 'Модель',
        value: '',
        disable: false,
      },
      serie: {
        placeholder: 'Серия',
        value: '',
        disable: false,
      },
      manufactureYear: {
        placeholder: 'Год выпуска',
        value: '',
        disable: false,
      },
      totalTrip: {
        placeholder: 'Пробег',
        value: '',
        disable: false,
      },
      bodyworkType: {
        placeholder: 'Кузов',
        value: '',
        disable: false,
      },
      engineCapacity: {
        placeholder: 'Объем',
        value: '',
        disable: false,
      },
      engineType: {
        placeholder: 'Вид топлива',
        value: '',
        disable: false,
      },
      enginePower: {
        placeholder: 'Мощность',
        value: '',
        disable: false,
      },
      carWheelDriveType: {
        placeholder: 'Привод',
        value: '',
        disable: false,
      },
      carGearboxType: {
        placeholder: 'Коробка передач',
        value: '',
        disable: false,
      },
      exteriorColorGroup: {
        placeholder: 'Цвет кузова',
        value: '',
        disable: false,
      },
      phone: {
        placeholder: 'Телефон',
        value: '',
        disable: false,
      },
    },
    dcPhones: [
      { dealerId: '1', phone: '74951549377' },
      { dealerId: '2', phone: '74951548355' },
      { dealerId: '3', phone: '74951549923' },
      { dealerId: '12', phone: '78122206031' },
      { dealerId: '13', phone: '78122206046' },
      { dealerId: '14', phone: '78122206058' },
      { dealerId: '15', phone: '74951860224' },
      { dealerId: '18', phone: '74951546766' },
      { dealerId: '19', phone: '78122206063' },
      { dealerId: '22', phone: '78122206085' },
      { dealerId: '23', phone: '74951861452' },
      { dealerId: '25', phone: '74951861473' },
      { dealerId: '27', phone: '74951597243' },
      { dealerId: '32', phone: '74951613865' },
      { dealerId: '36', phone: '74951726936' },
      { dealerId: '38', phone: '74951548590' },
      { dealerId: '40', phone: '74952814254' },
      { dealerId: '43', phone: '74952814264' },
      { dealerId: '44', phone: '74952814280' },
      { dealerId: '46', phone: '74952814260' },
      { dealerId: '49', phone: '74952814273' },
      { dealerId: '50', phone: '74952814270' },
      { dealerId: '102', phone: '74952814250' },
      { dealerId: '157', phone: '74952814284' },
      { dealerId: '376', phone: '74952814248' },
    ],
    isShowPhone: true,
  }),
  computed: {
    isValidVin () {
      return this.form.vin.value?.length === 17
    },
    baseFormField () {
      return Object.entries(this.form).filter(input => input[1].placeholder)
    },
  },
  methods: {
    onChangeDisable (formName) {
      return (value) => {
        this.form[formName].disable = value
      }
    },
    async fetchVINData () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      try {
        const vin = this.form.vin.value.toUpperCase()
        const options = {
          method: 'POST',
          body: {
            vin,
          },
        }
        const res = await $fetchClient(getCard(), options, false)
        if (!$hasErrorResponse(res)) {
          return res.data
        }
        this.form.vin.errors.push('Автомобиль не найден')
        return null
      } catch (e) {
        if (e?.response?.status === 410) {
          return e?.response?.data?.data ?? null
        }

        this.form.vin.errors.push('Автомобиль не найден')
        return null
      }
    },
    setSettingsData (settingsData) {
      for (const key in settingsData) {
        this.settingsData[key] = settingsData[key]
      }
    },
    async onSearch () {
      this.onClearVinErrors()
      const vinData = await this.fetchVINData()
      if (vinData) {
        this.setVINDataInForm(vinData)
      }
    },
    setVINDataInForm (data) {
      const deep = ['technicalInfo', 'engine', 'transmissionAndControl']
      for (const key in this.form) {
        if (data[key]) {
          this.form[key].value = data[key]
        } else {
          deep.forEach((item) => {
            if (data[item] && data[item][key]) {
              this.form[key].value = data[item][key]
            }
          })
        }
      }

      this.settingsData.carType = data?.codes?.carType
      this.settingsData.dealerCode = data?.codes?.dealerCode

      const dealerId = data?.technicalInfo?.dealerId
      const dcPhone = this.dcPhones.find(item => item.dealerId === dealerId)
      if (dcPhone) {
        this.isShowPhone = false
        this.form.phone.value = dcPhone.phone

        this.$nextTick(() => {
          this.isShowPhone = true
        })
      }
    },
    onOpenSettingsPanel () {
      this.isOpenSettings = true
    },
    onCloseSettingsPanel () {
      this.isOpenSettings = false
    },
    getUrlSearchParamsString () {
      const searchParams = new URLSearchParams()

      for (const key in this.form) {
        const value = this.form[key].value
        const isDisable = this.form[key].disable
        if (value && !isDisable) {
          searchParams.append(key, value)
        }
      }

      for (const key in this.settingsData) {
        const value = this.settingsData[key]
        if (value) {
          searchParams.append(key, value)
        }
      }

      return searchParams.toString()
    },
    onClearVinErrors () {
      this.form.vin.errors = []
    },
    generateQR () {
      this.onClearVinErrors()
      if (!this.isValidVin) {
        this.form.vin.errors.push('Укажите VIN')
        return false
      }

      const searchParams = this.getUrlSearchParamsString()

      const routeData = this.$router.resolve(
          `/qr/generator/generate/?${searchParams}`,
      )
      window.open(routeData.href, '_blank')
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.qr {
  @include indentsMainVertical;

  display: grid;
  grid-template-areas:
    'header-buttons'
    'search'
    'form'
    'submit';

  @include mq($bp-small) {
    grid-template-areas:
      'header-buttons header-buttons'
      'search .'
      'form .'
      'submit .';
    column-gap: 60px;
  }

  @include mq($bp-medium) {
    grid-template-areas:
      'header-buttons'
      'search'
      'form'
      'submit';
  }

  @include mq($bp-big) {
    grid-template-areas:
      'header-buttons header-buttons'
      '. search'
      'form search'
      'form submit'
      'form .';
  }

  &__search {
    display: flex;
    flex-direction: column;
    grid-area: search;
    grid-gap: 30px;
    height: fit-content;
    padding: 40px 25px;
    margin-bottom: 40px;
    background: var(--grayLight);

    @include mq($bp-super-small) {
      padding: 40px 35px;
    }

    @include mq($bp-small-medium) {
      max-width: 340px;
      padding: 40px 35px;
    }
  }

  &__text-container {
    grid-area: text-container;
  }

  &__title {
    @include h4;

    grid-area: title;
    margin-bottom: 10px;
  }

  &__dynamic-input {
    width: 100%;
    min-height: 54px;
  }

  &__text {
    @include text_big_bold;

    grid-area: text;
    margin-bottom: 40px;
    color: var(--blackLight);
  }

  &__form {
    display: flex;
    flex-wrap: wrap;
    grid-area: form;
    margin-bottom: 40px;

    @include mq($bp-small-medium) {
      margin-bottom: 50px;
    }

    .qr {
      &__input {
        width: 100%;
        max-width: 400px;
        margin-bottom: 50px;

        @include mq($bp-small) {
          width: calc(50% - 30px);
          margin-right: 30px;
        }
      }
    }
  }

  &__form-line {
    display: inline-flex;
    width: 100%;
  }

  &__header-buttons {
    grid-area: header-buttons;
    margin-bottom: 30px;
  }

  &__button {
    &_back-button {
      grid-area: back-button;
      margin-bottom: 25px;
    }

    &_all-filters {
      display: flex;
      grid-gap: 10px;
      align-items: center;
    }

    &_submit {
      grid-area: submit;
      height: fit-content;

      @include mq($bp-small-medium) {
        max-width: 340px;
      }
    }
  }
}
</style>
