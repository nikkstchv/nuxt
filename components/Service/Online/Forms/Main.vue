<template>
  <form class="service-online-form">
    <div
      :class="[
        'service-online-form__body',
        { 'service-online-form__body_offset-bottom': isBtnFixed },
      ]"
    >
      <UIBaseInput
        v-model.trim="form.name.value"
        label="ФИО"
        autocomplete="name"
        first-symbol-up
        hide-clear
        :required="form.name.isRequire"
        :errors="form.name.errors"
        :error="hasError(form.name.errors)"
      />
      <FormInputPhone
        v-model="form.phone.value"
        class="form__input"
        :errors="form.phone.errors"
        :required="form.phone.isRequire"
      />
      <FormInputEmail
        v-model="form.email.value"
        class="form__input"
        :errors="form.email.errors"
        :required="form.email.isRequire"
      />
      <FormCheckboxPolicy
        v-model="form.policy.value"
        :error="form.policy.error"
        @setFormData="setFormData($event, 'policy'); validFormRequired()"
      />

      <hr class="service-online-form__hr">

      <div class="service-online-form__block">
        <div
          class="service-online-form__block-header"
          @click="toggleAccordion()"
        >
          <p class="service-online-form__block-title">
            Дополнительная информация
          </p>

          <IconArrow
            :class="[
              'service-online-form__block-arrow',
              { 'service-online-form__block-arrow_open': isOpenAccordion },
            ]"
          />
        </div>

        <div
          ref="accordion"
          :class="[
            'service-online-form__block-box',
            { 'service-online-form__block-box_open': isOpenAccordion },
          ]"
        >
          <UIBaseSelectInput
            v-if="serviceData.models.length"
            v-model="form.model.value"
            :options="serviceData.models"
            :errors="form.model.errors"
            fly-placeholder="Модель"
            :required="form.model.isRequire"
            :disable="!serviceData.models.length"
            @onSetSelect="setFormData($event, 'model')"
          />

          <div class="service-online-form__row">
            <FormInputStateNumber
              v-model="form.stateNumber.value"
              :errors="form.stateNumber.errors"
              :required="form.stateNumber.isRequire"
            />
            <div class="service-online-form__input">
              <UIBaseInput
                v-model.trim="form.run.value"
                type="number"
                label="Пробег"
                hide-clear
                :min="0"
                :max="999999"
                :max-length="10"
                :required="form.run.isRequire"
                :errors="form.run.errors"
                :error="hasError(form.run.errors)"
                event-name="input"
              />
              <span
                v-show="!!form.run.value"
                :style="`left: ${runSuffixPosition}px`"
                class="service-online-form__suffix"
              >
                км
              </span>
            </div>
          </div>

          <UIBaseInput
            v-model.trim="form.VIN.value"
            label="VIN"
            hide-clear
            :max-length="17"
            :required="form.VIN.isRequire"
            :errors="form.VIN.errors"
            :error="hasError(form.VIN.errors)"
            :on-blur="validFormRequired"
          />

          <UIBaseSelectInput
            v-model="form.typeOfWork.value"
            :options="optionsTypeOfWork"
            :errors="form.typeOfWork.errors"
            :required="form.typeOfWork.isRequire"
            fly-placeholder="Тип работ"
            @onSetSelect="setFormData($event, 'typeOfWork')"
          />

          <UIBaseTextarea
            v-model.trim="form.comment.value"
            class="form__input"
            label="Комментарий"
            :max-length="300"
            :rows="3"
          />
          <FormInputRobot
            v-model="form.robot.value"
            class="form__input form__input_robot"
            @setFormData="setFormData"
          />
        </div>
      </div>
    </div>

    <div
      :class="[
        'service-online-form__footer',
        { 'service-online-form__footer_fixed': isBtnFixed },
      ]"
    >
      <UIBaseButton
        class="service-online-form__button"
        primary
        large
        text="Записаться на сервис"
        :disable="isLoading"
        :is-loading="isLoading"
        @click="submit()"
      />
    </div>

    <div id="bottomBorderForm" />
  </form>
</template>

<script>
import { mapState } from 'pinia'
import { stateNumber, policy, robot, errors, email, phone, vin, name } from '../../../Form/mixins'
import { useResizeStore } from '@/store/resize'
import routes from '@/api/routes/service'

export default {
  name: 'ServiceOnlineFormsMain',
  mixins: [robot, policy, errors, email, phone, vin, name, stateNumber],
  props: {
    markId: {
      type: [Number, String],
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      default: '',
    },
    dealerId: {
      type: [Number, String],
      default: '',
    },
    serviceTypeId: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      isLoading: false,
      form: {
        name: {
          value: '',
          errors: [],
          isRequire: true,
        },
        phone: {
          value: '',
          errors: [],
          isRequire: true,
        },
        email: {
          value: '',
          errors: [],
        },
        policy: {
          value: false,
          error: false,
        },
        model: {
          name: '',
          value: '',
          errors: [],
        },
        stateNumber: {
          value: '',
          errors: [],
        },
        run: {
          value: '',
          errors: [],
        },
        VIN: {
          value: '',
          errors: [],
        },
        typeOfWork: {
          value: '',
          errors: [],
        },
        comment: {
          value: '',
          errors: [],
        },
        robot: {
          value: '',
          errors: [],
        },
      },
      serviceData: {
        models: [],
      },
      phoneMask: '+7 ###-###-##-##',
      isOpenAccordion: false,
      values: [
        { value: 'markId', message: 'Выберите марку' },
        { value: 'dealerId', message: 'Выберите дилерский центр' },
        { value: 'date', message: 'Выберите дату' },
        { value: 'time', message: 'Выберите время' },
      ],
      observer: null,
      isBtnFixed: false,
    }
  },
  computed: {
    optionsTypeOfWork () {
      const defaultItem = {
        name: 'Не знаю',
        isActive: false,
      }
      return this.serviceTypeId
        ? {
            '': [
              defaultItem,
              {
                name: 'Направление на ремонт',
                isActive: false,
              },
              {
                name: 'Дефектовка',
                isActive: false,
              },
            ],
          }
        : {
            '': [
              defaultItem,
            ],
            Двигатель: [
              {
                name: 'Замена масла ДВС',
                isActive: false,
              },
              {
                name: 'Замена фильтров (воздушный/салонный/топливный)',
                isActive: false,
              },
              {
                name: 'Диагностика двигателя / Проверка двигателя',
                isActive: false,
              },
            ],
            Диагностика: [
              {
                name: 'Индикация ошибки на панели приборов',
                isActive: false,
              },
              {
                name: 'Автомобиль не заводится',
                isActive: false,
              },
              {
                name: 'Не работает кондиционер / Не работает система отопления',
                isActive: false,
              },
            ],
            Подвеска: [
              {
                name: 'Диагностика ходовой',
                isActive: false,
              },
            ],
            Прочее: [
              {
                name: 'Детальная диагностика автомобиля с пробегом / Диагностика перед покупкой',
                isActive: false,
              },
              {
                name: 'Уточнения неисправности по условиям гарантии',
                isActive: false,
              },
              {
                name: 'Выполнение работ по рекомендациям от консультанта сервиса',
                isActive: false,
              },
              {
                name: 'Повторное обращение',
                isActive: false,
              },
              {
                name: 'Прочее',
                isActive: false,
              },
            ],
            ТО: [
              {
                name: 'Малое ТО',
                isActive: false,
              },
              {
                name: 'Техническое обслуживание / ТО / Инспекционный сервис',
                isActive: false,
              },
            ],
            Трансмиссия: [
              {
                name: 'Замена масла КПП',
                isActive: false,
              },
            ],
            'Управление и тормоза': [
              {
                name: 'Сход-развал',
                isActive: false,
              },
              {
                name: 'Замена тормозных колодок / Замена тормозных колодок и тормозных дисков',
                isActive: false,
              },
            ],
            Шиномонтаж: [
              {
                name: 'Замена колёс / Шиномонтаж / Балансировка',
                isActive: false,
              },
              {
                name: 'Хранение колес',
                isActive: false,
              },
            ],
            Электрооборудование: [
              {
                name: 'Диагностика электрооборудования',
                isActive: false,
              },
            ],
          }
    },
    hasError () {
      return (errors) => {
        return Boolean(errors.length)
      }
    },
    runSuffixPosition () {
      const startPosition = 25
      const value = this.form.run.value
      const length = value.toString().length

      if (length) {
        return startPosition + length * 8
      }

      return startPosition
    },
    ...mapState(useResizeStore, ['windowWidth']),
  },
  watch: {
    'form.model.value' (id) {
      const found = this.serviceData?.models?.find(model => model.id === id)
      this.form.model.name = found?.name ?? ''
    },
    markId: {
      handler () {
        this.getModels()
      },
      immediate: true,
    },
    windowWidth () {
      this.toggleObserver()
    },
  },
  mounted () {
    this.toggleObserver()
  },
  beforeUnmount () {
    const target = document.querySelector('#bottomBorderForm')

    if (target && this.observer) {
      this.observer.unobserve(target)
      this.observer = null
    }
  },
  methods: {
    submit () {
      const isAllValid = this.validFormRequired()

      if (!isAllValid) {
        return false
      }

      this.isLoading = true
      this.$emit('submit', this.form)

      setTimeout(() => {
        this.isLoading = false
      }, 5000)
    },
    toggleAccordion () {
      const el = this.$refs.accordion

      if (!this.isOpenAccordion) {
        el.style = `height: ${el.scrollHeight}px`
      } else {
        el.style = 'height: 0px'
      }

      this.isOpenAccordion = !this.isOpenAccordion
    },
    toggleObserver () {
      const target = document.querySelector('#bottomBorderForm')

      if (!target) {
        return false
      }

      if (this.windowWidth < 600 && !this.observer) {
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              this.isBtnFixed = !entry.isIntersecting
            })
          },
          {
            threshold: 1.0,
          },
        )

        this.observer.observe(target)
      } else if (this.windowWidth >= 600 && this.observer) {
        this.isBtnFixed = false
        this.observer.unobserve(target)
        this.observer = null
      }
    },
    async getModels () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      this.form.model.value = ''

      if (!this.markId) {
        return false
      }

      const options = {
        query: { markId: this.markId },
      }
      const res = await $fetchClient(routes.getModels(), options)

      if (!$hasErrorResponse(res) && res?.models) {
        this.serviceData.models = res.models.map(({ modelId, name }) => {
          return {
            id: modelId,
            name,
            disabled: false,
          }
        })
      } else {
        this.serviceData.models = []
      }
    },
    setFormData (value, formName) {
      this.form[formName].value = value
    },
    hasRequiredFormDataCallback ([key, item]) {
      if (key === 'phone') {
        return item.value && item.value.length === 16
      }
      return item.value && item.value.length
    },
    hasAllRequiredFormData () {
      return Object.entries(this.form)
        .filter(([_key, item]) => item.isRequire)
        .every(this.hasRequiredFormDataCallback)
    },
    validFormRequired () {
      this.clearErrorsInForms()

      const isAllMainValid = this.checkForm()
      const isValidRequired = this.hasAllRequiredFormData()
      const isAllValid = isValidRequired && isAllMainValid

      this.$emit('setValuesErrors', !isAllValid)

      return isAllValid
    },
    clearErrorsInForms () {
      for (const key in this.form) {
        if (Array.isArray(this.form[key].errors)) {
          this.form[key].errors = []
        } else {
          this.form[key].error = false
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.service-online-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: fit-content;

  &__body {
    display: grid;
    grid-gap: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid var(--grayLight);

    &_offset-bottom {
      margin-bottom: 85px;
    }
  }

  &__row {
    display: grid;
    grid-gap: 30px;

    @include mq($bp-small) {
      grid-template-columns: 1fr 1fr;
      grid-gap: 15px;
    }
  }

  &__input {
    position: relative;
    display: grid;
  }

  &__suffix {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 25px;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  &__hr {
    border-color: var(--grayMediumLight);
  }

  &__block {
    display: flex;
    flex-direction: column;

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }

    &-title {
      @include label;
    }

    &-arrow {
      width: 24px;
      height: 24px;

      &_open {
        transform: rotate(180deg);
      }
    }

    &-box {
      display: grid;
      grid-gap: 30px;
      height: 0;
      overflow: hidden;
      transition: height 0.3s;

      &_open {
        overflow: visible;
      }

      & > div {
        &:first-child {
          margin-top: 30px;
        }
      }
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0 5px;
    background: #fff;

    &_fixed {
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 20px 0;
    }

    @include mq($bp-small) {
      padding: 20px 0;
    }

    @include mq($bp-medium) {
      position: sticky;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
}
</style>
