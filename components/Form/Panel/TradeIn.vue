<template>
  <UIBaseOverlay :is-open="isOpenPanel" @click="handleClose">
    <UISidePanel id="sidePanel" class="form__side-panel" :is-open="isOpenPanel">
      <form v-if="isOpenPanel" ref="formWrapper" class="form" :class="{ form_finally: formStep === 'finally' }" @submit.prevent>
        <header class="form__header form__section">
          <section class="form__header-top">
            <h2 class="form__title">
              Информация об авто
            </h2>
            <IconClose class="form__close" @click="handleClose" />
          </section>
          <template v-if="formStep !== 'finally'">
            <Transition name="fade">
              <UIBackButton
                v-if="formStep !== 'mark'"
                class="form__back-button"
                no-route
                @click="onBackStep"
              />
            </Transition>
            <Transition name="fade">
              <div v-if="stateNumberLabel" class="form__state-number state-number">
                <span class="state-number__main">{{ stateNumberLabel.main }}</span>
                <span class="state-number__state">{{ stateNumberLabel.state }}</span>
              </div>
            </Transition>
            <div v-if="stepButtonsShow.length" class="form__steps">
              <TransitionGroup name="fade">
                <UIBaseSelectButton
                  v-for="[code, label] in stepButtonsShow"
                  :key="code"
                  :text="label"
                  :disable="hasDisableStepButton(code)"
                  class="form__step-button"
                  :class="{'form__step-button_active': code === formStep}"
                  @click="setFormStep(code)"
                />
              </TransitionGroup>
            </div>
          </template>
        </header>

        <hr v-if="formStep !== 'finally'" class="form__line">

        <div class="form__main">
          <Transition
            name="fade"
            mode="out-in"
            @enter="resetScroll"
            @after-enter="resetScroll"
            @leave="resetScroll"
            @after-leave="resetScroll"
          >
            <div v-if="formStep === 'mark' && marks" class="form__content">
              <p class="form__text form__text_indent">
                Нам не удалось найти информацию по заданному автомобилю. Пожалуйста, заполните данные самостоятельно
              </p>
              <template v-if="isDirectMarkInputShow">
                <UIBaseInput
                  v-model.trim="form.mark.value"
                  v-maska:[maskOptionsMark]
                  label="Марка"
                  :error="form.mark.errors.length !== 0"
                  :errors="form.mark.errors"
                  :required="form.mark.isRequire"
                  event-name="input"
                  @keydown.enter="handleNextStep"
                />
                <UIBaseButton
                  class="form__button form__button_change"
                  txt
                  @click="onChangeDirectMarkInputShow(false)"
                >
                  Выбрать из списка
                </UIBaseButton>
              </template>
              <UIBaseSelectRadioInput
                v-else
                v-model="form.mark.value"
                class="form__radio-image"
                title="Выберите марку"
                placeholder="Поиск по марке"
                :options="optionsMark"
                has-search
              />
            </div>
            <div v-else-if="formStep === 'model'" class="form__content">
              <Transition name="fade">
                <UIBaseSelectRadioInput
                  v-if="models?.length"
                  v-model="form.model.value"
                  class="form__radio-image"
                  title="Выберите модель"
                  placeholder="Поиск по модели"
                  :options="optionsModel"
                  has-search
                />
                <UIBaseInput
                  v-else-if="!isLoading"
                  v-model.trim="form.model.value"
                  label="Модель"
                  :error="form.model.errors.length !== 0"
                  :errors="form.model.errors"
                  :required="form.model.isRequire"
                  event-name="input"
                  @keydown.enter="handleNextStep"
                />
              </Transition>
            </div>
            <div v-else-if="formStep === 'year'" class="form__content">
              <UIBaseSelectRadioInput
                v-model="form.year.value"
                class="form__radio-image"
                title="Выберите год выпуска"
                :options="optionsYear"
              />
            </div>
            <div v-else-if="formStep === 'run'" class="form__content">
              <FormInputRun
                v-model.number="form.run.value"
                :errors="form.run.errors"
                :required="form.run.isRequire"
                event-name="input"
                @keydown.enter="handleNextStep"
              />
            </div>
            <div v-else-if="formStep === 'color'" class="form__content">
              <FormInputColor
                v-model="form.color.value"
                :errors="form.color.errors"
                :required="form.color.isRequire"
                event-name="input"
                @keydown.enter="handleNextStep"
              />
            </div>
            <div v-else-if="formStep === 'ownersCount'" class="form__content">
              <FormInputOwnersCount
                v-model.number="form.ownersCount.value"
                :errors="form.ownersCount.errors"
                :required="form.ownersCount.isRequire"
                event-name="input"
                @keydown.enter="handleNextStep"
              />
            </div>
            <div v-else-if="formStep === 'userInfo'" class="form__content">
              <p class="form__text">
                Оставьте свой номер телефона для того, чтобы мы смогли предложить вам наиболее выгодную оценку
              </p>
              <section class="form__inputs">
                <FormInputName
                  v-model="form.firstname.value"
                  class="form__input"
                  name="firstname"
                  :errors="form.firstname.errors"
                  :required="form.firstname.isRequire"
                />
                <FormInputPhone
                  v-model="form.phone.value"
                  class="form__input"
                  :errors="form.phone.errors"
                  :required="form.phone.isRequire"
                />
                <FormInputRobot
                  v-model="form.robot.value"
                  class="form__input form__input_robot"
                />
                <FormCheckboxPolicy
                  v-model="form.policy.value"
                  :error="form.policy.error"
                />
                <UIBaseButton
                  class="form__button form__button_submit"
                  big
                  large
                  text="Рассчитать стоимость"
                  :is-loading="isLoading"
                  :disable="!hasAllRequiredFormData || isLoading"
                  @click="onHandleSubmit"
                />
              </section>
            </div>
            <FormFinallyBlock
              v-else-if="formStep === 'finally'"
              class="form__block-finally"
              title="Данные для расчета стоимости авто отправлены"
              @handleClose="handleClose"
            />
            <UILoader v-else class="form__loader" />
          </Transition>
        </div>
      </form>
      <section v-if="formStep !== 'finally' && formStep !== 'userInfo'" class="form__footer">
        <UIProgressBar
          :steps="progressSteps"
          :active="currentStepIndex"
        />
        <UIBaseButton
          v-if="isShowNextButton"
          class="form__button form__button_next"
          big
          large
          :text="!form[formStep]?.value && includesFormStepPass ? 'Пропустить' : 'Продолжить'"
          :disable="!form[formStep]?.value && includesFormStepButtonDisable"
          :is-loading="isLoading"
          @click="handleNextStep"
        />
      </section>
    </UISidePanel>
  </UIBaseOverlay>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useTradeInStore } from '@/store/tradeIn'
import { getIdentifier as getIdentifierPath, getTradeIn } from '@/api/routes/trade-in'
import { useFormStore } from '@/store/form'
import { getCoreMarks, getCoreModel } from '@/api/routes/core'
import { errors, firstname, handlers, phone, policy, robot, stateNumber } from '@/components/Form/mixins'
import noCarLogo from '@/assets/icons/trade-in/form/no-car.svg'
import otherCarLogo from '@/assets/icons/trade-in/form/other-car.svg'

export default defineNuxtComponent({
  name: 'FormPanelTradeIn',
  mixins: [firstname, phone, errors, handlers, robot, policy, stateNumber],
  props: {
    dealerId: {
      type: String,
      required: false,
      default: '',
    },
    formId: {
      type: String,
      required: false,
      default: 'form_buyout_price',
    },
  },
  data: () => ({
    isDefined: false,
    formStep: 'mark',
    isLoading: false,
    identifier: null,
    isDirectMarkInputShow: false,
    marks: null,
    models: null,
    years: null,
    maskOptionsMark: {
      mask: 'L',
      tokens: {
        L: { pattern: /[А-Яа-яA-Za-z\-()]/, multiple: true },
      },
    },
    form: {
      stateNumber: {
        value: '',
      },
      run: {
        value: '',
        errors: [],
        isRequire: true,
      },
      mark: {
        value: '',
        errors: [],
        isRequire: true,
      },
      model: {
        value: '',
        errors: [],
        isRequire: true,
      },
      color: {
        value: '',
        errors: [],
        isRequire: false,
      },
      year: {
        value: '',
        errors: [],
        isRequire: true,
      },
      ownersCount: {
        value: '',
        errors: [],
        isRequire: false,
      },
      firstname: {
        value: '',
        errors: [],
        isRequire: true,
      },
      phone: {
        value: '',
        errors: [],
        isRequire: true,
      },
      policy: {
        value: false,
        error: false,
      },
      robot: {
        value: '',
      },
    },
    stepButtons: {
      mark: '',
      model: '',
      year: '',
      run: '',
      color: '',
      ownersCount: '',
      userInfo: '',
    },
  }),
  computed: {
    isShowNextButton () {
      return this.form[this.formStep]?.value || this.includesFormStepPass || this.includesFormStepButtonDisable
    },
    includesFormStepButtonDisable () {
      const mark = this.isDirectMarkInputShow ? ['mark'] : []
      const model = !this.form.mark.value ? ['model'] : []
      const includes = ['run', ...mark, ...model]
      return includes.includes(this.formStep)
    },
    includesFormStepPass () {
      const includes = ['color', 'ownersCount']
      return includes.includes(this.formStep)
    },
    stateNumberLabel () {
      const pattern = /(.*?)\s+(\d{2,3})$/
      const matches = this.form.stateNumber.value?.match(pattern)

      if (matches) {
        const main = matches[1] || ''
        const state = matches[2] || ''

        return { main, state }
      }

      return null
    },
    arrayOfSteps () {
      return Object.keys(this.stepButtons)
    },
    progressSteps () {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { stateNumber, userInfo, ...rest } = this.stepButtons
      return Object.entries(rest)
    },
    currentStepIndex () {
      return this.arrayOfSteps.findIndex(step => step === this.formStep)
    },
    optionsMark () {
      const marks = this.marks?.map(this.callbackOptions).filter(mark => mark.value !== 'prochie-avto')
      const otherCar = { label: 'Прочие авто', logo: otherCarLogo, value: 'prochie-avto' }

      return [...marks, otherCar]
    },
    optionsModel () {
      return this.models?.map(this.callbackOptions)
    },
    optionsYear () {
      return this.years?.map(year => ({ label: year, value: year }))
    },
    stepButtonsShow () {
      return Object.entries(this.stepButtons).filter(([_key, value]) => value)
    },
    additionalData () {
      return {
        formId: this.formId,
      }
    },
    ...mapState(useFormStore, {
      isOpenPanel: 'isOpenTradeIn',
    }),
    ...mapState(useTradeInStore, ['stateNumber']),
  },
  watch: {
    'form.mark.value' (value) {
      if (!this.isDefined && value) {
        this.clearMainData()

        if (value === 'prochie-avto') {
          this.form.mark.value = ''
          this.isDirectMarkInputShow = true
        } else if (!this.isDirectMarkInputShow) {
          const foundMark = this.marks.find(mark => mark.code === value)
          this.models = null
          this.stepButtons.mark = foundMark.nameEn
          this.onNextStep()
        }
      }
    },
    'form.model.value' (value) {
      if (value && !this.isDefined && this.models?.length) {
        const foundModel = this.models.find(model => model.code === value)
        this.stepButtons.model = foundModel.nameEn
        this.onNextStep()
      }
    },
    'form.year.value' (value) {
      if (!this.isDefined && value) {
        this.stepButtons.year = value
        this.onNextStep()
      }
    },
    formStep: {
      async handler (step, oldStep) {
        if (step === 'mark' && !this.marks) {
          this.isLoading = true
          this.marks = await this.getMarks()
          this.isLoading = false
        } else if (step === 'model') {
          this.isLoading = true
          this.models = await this.getModels()
          this.isLoading = false
        } else if (step === 'year') {
          this.years = await this.getYears()
        }

        this.setData(oldStep)
      },
      immediate: true,
    },
    async isOpenPanel (isOpen) {
      if (isOpen) {
        this.setInitData()
        const identifier = await this.getIdentifier()

        if (identifier?.statusCode === '200') {
          this.setIdentifier(identifier)
          this.foundAndSetFirstEmptyStep()
        } else if (identifier?.statusCode === '202') {
          const identifier = await this.getIdentifier()

          if (identifier?.statusCode === '200') {
            this.setIdentifier(identifier)
            this.foundAndSetFirstEmptyStep()
          }
        }
      }
    },
  },
  methods: {
    resetScroll () {
      document.querySelector('#sidePanel').scrollTop = 0
    },
    clearMainData () {
      this.form.model.value = ''
      this.form.year.value = ''
      this.form.run.value = ''
      this.stepButtons.model = ''
      this.stepButtons.year = ''
      this.stepButtons.run = ''
    },
    clearStepButtons () {
      for (const step in this.stepButtons) {
        this.stepButtons[step] = ''
      }
    },
    hasDisableStepButton (code) {
      const mainStep = ['mark', 'model', 'year', 'run']

      return mainStep.some(step => !this.form[step].value && !mainStep.includes(code))
    },
    onChangeDirectMarkInputShow (value) {
      this.isDirectMarkInputShow = value
    },
    async onHandleSubmit () {
      const res = await this.handleSubmit()

      if (res) {
        this.setFormStep('finally')
      }
    },
    foundAndSetFirstEmptyStep () {
      for (const step in this.stepButtons) {
        if (!this.stepButtons[step]) {
          this.setFormStep(step)
          break
        }
      }
    },
    setInitData () {
      this.form.stateNumber.value = this.stateNumber
    },
    callbackOptions ({ nameEn, logo, code }) {
      const defaultLogo = noCarLogo
      return { label: nameEn, logo: logo || defaultLogo, value: code }
    },
    getFormStep (move) {
      const direction = {
        next: this.currentStepIndex + 1,
        back: this.currentStepIndex - 1,
      }

      return this.arrayOfSteps[direction[move]]
    },
    setData (oldStep) {
      const step = oldStep || this.formStep
      const currentStepFormValue = this.form[step]?.value
      const setStepButtonValue = (value, defaultValue) => {
        if (currentStepFormValue) {
          this.stepButtons[step] = value
        } else {
          this.stepButtons[step] = defaultValue
        }
      }
      const stepActions = {
        mark: () => this.isDirectMarkInputShow && setStepButtonValue(currentStepFormValue, ''),
        model: () => !this.models?.length && setStepButtonValue(currentStepFormValue, ''),
        run: () => setStepButtonValue(`${currentStepFormValue} км.`, ''),
        color: () => setStepButtonValue(currentStepFormValue, 'Цвет: не указан'),
        ownersCount: () => setStepButtonValue(`Владельцев: ${currentStepFormValue}`, 'Владельцев: не указано'),
      }
      stepActions[step] && stepActions[step]()
    },
    handleNextStep () {
      this.setData()
      this.onNextStep()
    },
    onNextStep () {
      this.formStep = this.getFormStep('next')
    },
    onBackStep () {
      this.formStep = this.getFormStep('back')
    },
    setIdentifier (identifier) {
      const { markNameEn, modelNameEn, ownersCount, color, year, markCode, modelCode } = identifier
      this.isDefined = true
      this.form.mark.value = markCode
      this.form.model.value = modelCode
      this.form.color.value = color
      this.stepButtons.mark = markNameEn
      this.stepButtons.model = modelNameEn
      this.stepButtons.color = color

      if (ownersCount && ownersCount !== 0) {
        this.form.ownersCount.value = ownersCount
        this.stepButtons.ownersCount = `Владельцев: ${ownersCount}`
      }
      if (year && year !== 0) {
        this.form.year.value = year
        this.stepButtons.year = year
      }

      this.$nextTick(() => {
        this.isDefined = false
      })
    },
    async getIdentifier () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      // A480XX799
      const options = {
        query: {
          car_identifier: this.stateNumber,
          region_id: '1',
          seller_type: '0',
          ShowPrice: 'false',
          km_age: this.run,
        },
      }
      const res = await $fetchClient(getIdentifierPath(), options)

      if (!$hasErrorResponse(res) || res.statusCode === '200') {
        return res
      }

      return null
    },
    async getMarks () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const options = {
        query: {
          carType: 'cars',
        },
      }
      const res = await $fetchClient(getCoreMarks(), options)

      if (!$hasErrorResponse(res)) {
        return res.marks
      }

      return null
    },
    async getModels () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const res = await $fetchClient(getCoreModel(this.form.mark.value))

      if (!$hasErrorResponse(res)) {
        return res.model.filter(model => model.carType === '1')
      }

      return null
    },
    async getYears () {
      const { $fetchClient, $hasErrorResponse, $getCurrentYear } = useNuxtApp()
      const defaultYears = {
        min: 1990,
        max: parseInt($getCurrentYear()),
      }
      const mark = this.form.mark.value
      const model = this.form.model.value
      const options = {
        method: 'POST',
        body: {
          query: {
            mark,
            model,
          },
        },
      }
      const res = await $fetchClient(getTradeIn(), options)
      if (!$hasErrorResponse(res)) {
        const [min, max] = this.getMinMaxYear(res.generation)
        return this.fillArrayWithRange(min, max)
      }

      return this.fillArrayWithRange(defaultYears.min, defaultYears.max)
    },
    fillArrayWithRange (min, max) {
      return Array.from({ length: max - min + 1 }, (_, index) => min + index)
    },
    getMinMaxYear (generations) {
      return generations.reduce((sum, cur, index) => {
        const min = sum[0]
        const max = sum[1]
        const yearBegin = parseInt(cur.yearBegin)
        const yearEnd = parseInt(cur.yearEnd)

        if (index === 0) {
          sum[0] = yearBegin
          sum[1] = yearEnd
        }

        if (yearBegin < min) {
          sum[0] = yearBegin
        }

        if (yearEnd > max) {
          sum[1] = yearEnd
        }

        return sum
      }, [])
    },
    hasStepButton (step) {
      return this.stepButtons.find(button => button.step === step)
    },
    setFormStep (value) {
      this.formStep = value
    },
    handleClose () {
      if (this.formStep === 'finally') {
        this.clearAllFormData()
        this.clearStepButtons()
        this.setStateNumber('')
        this.setFormStep('mark')
      }
      this.onClosePanel()
    },
    ...mapActions(useFormStore, {
      onClosePanel: 'onClose',
    }),
    ...mapActions(useTradeInStore, ['setStateNumber']),
  },
})
</script>

<style lang="scss" scoped>
@import 'assets/styles/components/FormPanel/style';

.form {
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-gap: 20px;
  height: 100%;
  padding: 15px 15px 0;
  margin-bottom: 0;
  overflow: auto;

  @include mq($bp-small-medium) {
    padding: 20px 20px 0;
  }

  @include mq($bp-small) {
    padding: 60px 60px 0;
  }

  &_finally {
    grid-template-rows: min-content 1fr;
  }

  &__header {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    align-items: flex-start;
    margin-bottom: 0;
  }

  &__header-top {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__close {
    justify-self: flex-end;
  }

 &__steps {
   display: flex;
   flex-wrap: wrap;
    grid-gap: 8px;
  }

  &__line {
    width: 100%;
    height: 1px;
    color: var(--grayMediumLight);
    background: var(--grayMediumLight);
  }

  &__text {
    @include text_medium_regular;

    margin-bottom: 0;
    color: var(--black);

    @include mq($bp-small-medium) {
      @include text_big_regular;
    }
  }

  &__button {
    padding: 12px 24px;

    &_change {
      @include text_medium_regular;

      padding: 0;
      font-weight: 500;
    }
  }

  &__step-button {
    &_active {
      color: white;
      background: var(--blackLight);

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: white;
          cursor: default;
          background: var(--blackLight);
        }
      }
    }

    & :deep(.select-button__title) {
      max-width: 170px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &__main {
    position: relative;
    display: flex;
    height: 100%;
  }

  &__content {
    position: absolute;
    display: grid;
    grid-gap: 20px;
    width: 100%;
    max-width: 400px;
  }

  &__loader {
    position: absolute;
    top: 50px;
    left: calc(50% - 25px);
  }

  &__radio-image {
    & :deep(.radio-image__image) {
      max-height: 40px;
    }
  }

  &__footer {
    position: sticky;
    right: 0;
    bottom: 0;
    left: 0;
    display: grid;
    grid-gap: 15px;
    align-self: flex-end;
    padding: 20px 15px;
    background: white;

    @include mq($bp-small-medium) {
      padding: 20px;
    }

    @include mq($bp-small) {
      padding: 30px 60px;
    }
  }
}

.state-number {
  @include label;

  display: flex;

  &__main {
    display: flex;
    grid-gap: 6px;
    align-items: center;
    padding: 4px 10px 4px 12px;
    border: 1px solid var(--grayDark);
    border-radius: 4px 0 0 4px;
  }

  &__state {
    padding: 4px 12px 4px 10px;
    border-top: 1px solid var(--grayDark);
    border-right: 1px solid var(--grayDark);
    border-bottom: 1px solid var(--grayDark);
    border-radius: 0 4px 4px 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
