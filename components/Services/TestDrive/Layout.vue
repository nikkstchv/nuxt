<template>
  <div
    :class="['testdrive-layout', { 'testdrive-layout_panel': !isPage }]"
    @click.self="$emit('close-panel')"
  >
    <div v-if="showPage" class="testdrive-layout__left">
      <ul
        v-if="showMarks"
        class="testdrive-layout__list-mark testdrive-layout__list-mark_desktop"
      >
        <UIRadioImage
          v-for="mark in filteredMarks"
          :key="mark.markId"
          v-model="modelMark"
          :value="mark.markId"
          :image-src="mark.logo"
          :disable="hasDisableMark(mark.markId)"
          :class="[
            'testdrive-layout__radio',
            'testdrive-layout__radio_mark',
            {
              'testdrive-layout__radio_mark-checked': +modelMark === +mark.markId,
            },
          ]"
        >
          {{ mark.markId === '4242' ? '' : mark.nameEn }}
        </UIRadioImage>
      </ul>

      <div
        class="testdrive-layout__side testdrive-layout__side_left"
        :class="[
          { 'testdrive-layout__side_left_without_header': !isPage && isOpen },
        ]"
      >
        <header
          v-if="!isPage"
          class="testdrive-layout__header testdrive-layout__header_left"
        >
          <h2 class="testdrive-layout__title">
            Запись на сервис
          </h2>
          <IconClose
            class="testdrive-layout__close testdrive-layout__close_left"
            @click="$emit('close-panel')"
          />
        </header>

        <template v-if="timeslots && isPage || (!isPage && formStep === 1)">
          <ServicesTestDriveBlockValues
            :current-mark="defaultMark"
            :marks="filteredMarks"
            :mark-id="modelMark"
            :models="models"
            :model-id="modelModel"
            :date="modelDate"
            :time="modelTime"
            :dealer-id="modelDealer"
            :dealers="displayedDealer"
            :values-errors="valuesErrors"
            class="testdrive-layout__blocks-values"
            @resetValue="resetValue"
          />
        </template>
        <template v-if="timeslots">
          <div
            :class="[
              'testdrive-layout__form testdrive-layout__form_step-1',
              { 'testdrive-layout__form_step-1-hide': !isPage && formStep !== 1 },
            ]"
          >
            <section
              v-if="!defaultMark || showMarks"
              class="testdrive-layout__section testdrive-layout__section_marks"
            >
              <h3
                class="testdrive-layout__subtitle testdrive-layout__subtitle_indent testdrive-layout__subtitle_mark"
              >
                Выберите марку
              </h3>
              <ul
                v-if="marks"
                class="testdrive-layout__list-mark testdrive-layout__list-mark_mobile"
              >
                <UIRadioImage
                  v-for="mark in filteredMarks"
                  :key="mark.id"
                  v-model="modelMark"
                  :value="mark.markId"
                  :image-src="mark.logo"
                  :class="[
                    'testdrive-layout__radio',
                    'testdrive-layout__radio_mark',
                    {
                      'testdrive-layout__radio_mark-checked':
                        +modelMark === +mark.markId,
                    },
                  ]"
                >
                  {{ mark.markId === '4242' ? '' : mark.nameEn }}
                </UIRadioImage>
              </ul>
            </section>
            <section v-if="models" class="testdrive-layout__section testdrive-layout__section_models">
              <h3
                class="testdrive-layout__subtitle testdrive-layout__subtitle_model"
              >
                Модель
              </h3>
              <ul class="testdrive-layout__list-model">
                <UIRadioImage
                  v-for="model in models"
                  :key="model.vehicleId"
                  :value="model.vehicleId"
                  :image-src="model.previewMedia"
                  :class="[
                    'testdrive-layout__radio',
                    'testdrive-layout__radio_model',
                    {
                      'testdrive-layout__radio_model-checked': +modelModel === +model.vehicleId,
                    },
                  ]"
                  @click.prevent="updateModel(model.vehicleId)"
                >
                  <span class="testdrive-layout__radio_model_title">
                    {{ model.nameEn }} {{ model?.generation?.nameEn }}
                  </span>
                  <span class="testdrive-layout__radio_model_info">
                    {{ model?.equipment?.nameEn }} {{ model?.modification?.nameEn }}
                  </span>
                </UIRadioImage>
              </ul>
            </section>
            <section
              v-if="dealers"
              class="testdrive-layout__section testdrive-layout__section_dealers"
            >
              <ServiceFormSelectButtons
                :buttons="sections"
                @onSetSelectButtons="onSetSections"
              />
              <ul v-if="displayedDealer" class="testdrive-layout__list-radio">
                <UIBaseRadio
                  v-for="dealer in displayedDealer"
                  :key="dealer.id"
                  :label="dealer.name"
                  :model-value="modelDealer"
                  :value="dealer.code"
                  class="testdrive-layout__radio testdrive-layout__radio_dealer"
                  @click.prevent="updateDealer(dealer.code)"
                >
                  <span class="testdrive-layout__radio-additional-value">
                    {{ dealer.address }}
                  </span>
                </UIBaseRadio>
              </ul>
              <p v-else class="testdrive-layout__select-title">
                Дилерские центры на эту дату заняты
              </p>
            </section>
            <section
              class="testdrive-layout__section testdrive-layout__section_date"
            >
              <div class="testdrive-layout__time-container">
                <UIDatePicker v-model="modelDate" :dates="timeslots?.dates" />
              </div>
            </section>
            <section
              v-if="time"
              class="testdrive-layout__section testdrive-layout__section_time"
            >
              <h3 class="testdrive-layout__subtitle">
                Время
              </h3>
              <div class="testdrive-layout__list-time">
                <UIRadioTime
                  v-for="(item,index) in currentTimeslots"
                  :key="`${index} ${item.appointmentTime}`"
                  :ref="`${index} ${item.appointmentTime}`"
                  :model-value="modelTime"
                  :value="item.appointmentTime.substring(11, 16)"
                  :disable="false"
                  class="testdrive-layout__radio-time"
                  @click.prevent="
                    updateTime(item.appointmentTime.substring(11, 16))
                  "
                >
                  {{ item.appointmentTime.substring(11, 16) }}
                </UIRadioTime>
              </div>
            </section>
            <section
              class="testdrive-layout__section testdrive-layout__section_form-main"
            >
              <h3 class="testdrive-layout__subtitle">
                Заполните данные
              </h3>

              <ServicesTestDriveFormsMain
                :mark-id="modelMark"
                :date="modelDate"
                :time="modelTime"
                :dealer-id="modelDealer"
                :model-id="modelModel"
                @submit="bookOrderNew"
                @setValuesErrors="valuesErrors = $event"
              />
            </section>
          </div>

          <ServicesTestDriveBlockCode
            v-if="!isPage && formStep === 2"
            class="testdrive-layout__form_step-2 testdrive-layout__form_step-2-hide"
            :user-phone="userPhone"
            :user-email="userEmail"
            :user-name="userName"
            :user-mark="userMarkName"
            :user-model="userModelName"
            :user-generation="userGeneration"
            :user-serie="userSerie"
            :user-equipment="userEquipment"
            :user-modification="userModification"
            :user-date-time="userDateTime"
            :dealer="selectedDealer"
            :client-guid="clientForm && clientForm.guid"
            :route-key="routeKey"
            @cancel="setFormStep(1)"
            @success="setFormStep(3)"
          />
          <LazyFormFinallyBlock
            v-if="!isPage && formStep === 3"
            @handleClose="$emit('close-panel')"
          />
        </template>
        <UILoader v-else class="testdrive-layout__loader" />
      </div>
    </div>

    <div
      class="testdrive-layout__right"
      :class="[
        { 'testdrive-layout__right_page': isPage },
      ]"
    >
      <div
        :class="[
          'testdrive-layout__side testdrive-layout__side_right',
          { 'testdrive-layout__side_form-code': formStep === 2 && !isPage },
        ]"
      >
        <header
          v-if="!isPage"
          class="testdrive-layout__header testdrive-layout__header_right"
        >
          <h2 class="testdrive-layout__title">
            Запись на тест-драйв
          </h2>
          <IconClose
            class="testdrive-layout__close"
            @click="$emit('close-panel')"
          />
        </header>
        <template v-if="timeslots && (isPage || (!isPage && formStep === 1))">
          <ServicesTestDriveBlockValues
            :current-mark="defaultMark"
            :marks="filteredMarks"
            :mark-id="modelMark"
            :models="models"
            :model-id="modelModel"
            :date="modelDate"
            :time="modelTime"
            :dealer-id="modelDealer"
            :dealers="displayedDealer"
            :values-errors="valuesErrors"
            @resetValue="resetValue"
          />

          <ServicesTestDriveFormsMain
            :mark-id="modelMark"
            :date="modelDate"
            :time="modelTime"
            :dealer-id="modelDealer"
            :model-id="modelModel"
            @submit="bookOrderNew"
            @setValuesErrors="valuesErrors = $event"
          />
        </template>
        <template v-else-if="!isPage && formStep !== 1">
          <ServicesTestDriveBlockCode
            v-if="!isPage && formStep === 2"
            class="testdrive-layout__form_step-2"
            :user-phone="userPhone"
            :user-email="userEmail"
            :user-name="userName"
            :user-mark="userMarkName"
            :user-model="userModelName"
            :user-generation="userGeneration"
            :user-serie="userSerie"
            :user-equipment="userEquipment"
            :user-modification="userModification"
            :user-date-time="userDateTime"
            :dealer="selectedDealer"
            :client-guid="clientForm && clientForm.guid"
            :route-key="routeKey"
            @cancel="setFormStep(1)"
            @success="setFormStep(3)"
          />

          <LazyFormFinallyBlock
            v-else-if="!isPage && formStep === 3"
            @handleClose="$emit('close-panel')"
          />
        </template>
        <UILoader v-else class="testdrive-layout__loader" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'

import { useTestDriveStore } from '@/store/testDrive'
import { useResizeStore } from '@/store/resize'
import { useFormStore } from '@/store/form'
import { useHoldingStore } from '@/store/holding'
import { useCityStore } from '@/store/city'
import { calltouch } from '@/components/Form/mixins'

import routes from '@/api/routes/testdrive'
import { getDealersShort } from '@/api/routes/dealer'

export default {
  name: 'ServicesTestDriveLayout',
  mixins: [calltouch],
  props: {
    isPage: {
      type: Boolean,
      default: false,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    isIframe: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      loading: false,
      sections: null,
      marks: null,
      models: null,
      timeslots: null,
      time: null,
      dealers: null,
      formStep: 1,
      clientForm: null,
      modelMark: '',
      modelModel: null,
      modelDate: this.getDateTomorrow(),
      currentDate: process.client && new Date(),
      modelDealer: '',
      modelTime: '',
      form: {},
      availableMarks: [],
      allDealers: [],
      defaultMark: null,
      valuesErrors: false,
      iframeMark: false,
    }
  },
  computed: {
    showPage () {
      return (
        this.isPage ||
        (!this.isPage && (this.windowWidth <= 899 ? true : this.formStep === 1))
      )
    },
    showMarks () {
      return (
        !this.defaultMark &&
        this.marks &&
        !this.iframeMark &&
        (this.isPage || (!this.isPage && this.formStep === 1))
      )
    },
    routeKey () {
      const code = this.modelDealer ?? ''
      return this.getDealerCalltouchWidgetId(
        code,
        this.timeslots.dealers,
        'TestDrive',
      )
    },
    userDateTime () {
      if (this.modelDate && this.modelTime) {
        return `${this.modelDate} ${this.modelTime}`
      }
      return ''
    },
    userMarkName () {
      const found = this.marks.find((mark) => {
        const code = this.modelMark ? this.modelMark : this.markCode
        return mark.id === code || mark.code === code
      })
      return found?.name ?? ''
    },
    userModelName () {
      return this.currentModel?.nameEn || ''
    },
    userGeneration () {
      return this.currentModel?.generation?.nameEn || ''
    },
    userSerie () {
      return this.currentModel?.serie?.nameEn || ''
    },
    userEquipment () {
      return this.currentModel?.equipment?.nameEn || ''
    },
    userModification () {
      return this.currentModel?.modification?.nameEn || ''
    },
    currentTimeslots () {
      const timeWithSlicedDate = useCloneDeep(this.time)
      timeWithSlicedDate.map((item) => {
        item.time = item.appointmentTime.substring(11, 16)
        return item
      })
      return useUniqBy(timeWithSlicedDate, 'time')
    },
    activeSectionLabel () {
      return this.sections?.find(section => section.isActive)?.label ?? ''
    },
    displayedDealer () {
      if (!useIsEmpty(this.dealers)) {
        const dealersWithoutLiXiang = this.dealers[this.activeSectionLabel].filter(item => item.name !== 'LiXiang Восток')
        const { dc } = this.$route.query
        if (this.modelDealer && dc) {
          return dealersWithoutLiXiang.filter(
            dealer => dealer.code === this.modelDealer,
          )
        } else if (this.activeSectionLabel) {
          return dealersWithoutLiXiang
        }
      }

      return []
    },
    formattedTimeModel () {
      if (this.modelTime) {
        return `${this.modelTime}:00`
      }
      return ''
    },
    hasDisableMark () {
      return (markId) => {
        return this.selectedDealer && markId !== this.selectedDealer.markId
      }
    },
    selectedDealer () {
      if (this.modelDealer && this.timeslots) {
        return this.timeslots.dealers.find(
          dealer => dealer.code === this.modelDealer,
        )
      }
      return null
    },
    isNotFinally () {
      if (this.isMobile) {
        return true
      }
      return this.windowWidth > 900
    },
    isMobile () {
      return this.windowWidth <= 899
    },
    userPhone () {
      return this.form?.phone?.value ?? ''
    },
    userEmail () {
      return this.form?.email?.value ?? ''
    },
    userName () {
      return this.form?.name?.value ?? ''
    },
    filteredMarks () {
      if (this.availableMarks.length && this.marks.length) {
        return this.marks.filter(item =>
          this.availableMarks.includes(item.code),
        )
      }

      return this.marks
    },
    markCode () {
      const { mark } = this.$route.query
      if (this.availableMarks?.length) {
        return this.availableMarks[0]
      }
      if (mark) {
        return mark
      } else if (this.initData?.markCode) {
        return this.initData?.markCode
      }

      return null
    },
    dealerCode () {
      if (this.initData?.dealerCode) {
        return this.initData.dealerCode
      }

      return null
    },
    currentMark () {
      return this.marks?.find(mark => mark.markId === this.modelMark)
    },
    currentModel () {
      return this.models?.find(model => model.vehicleId === this.modelModel)
    },
    ...mapState(useResizeStore, ['windowWidth', 'windowSizeChange']),
    ...mapState(useFormStore, ['initData']),
    ...mapState(useHoldingStore, ['isAvtodom']),
    ...mapState(useCityStore, ['siteCityCode', 'definiteCity']),
  },
  watch: {
    async modelMark (value, oldValue) {
      if (oldValue && value !== oldValue) {
        this.clearMainData()
      }
      await this.fetchTimeslots()
    },
    modelDate () {
      if (this.timeslots) {
        this.updateDate()
      }
    },
    isOpen: {
      async handler (isOpen) {
        if (isOpen) {
          await this.getMarks()
          this.setDefaultData()
          await this.fetchTimeslots()
          this.setDefaultDataEnd()
        } else {
          this.clearInitData()
          this.clearData()
        }
      },
      immediate: true,
    },
  },
  mounted () {
    if (this.isPage) {
      this.setDefaultData()
    }

    this.windowSizeChange()
  },
  methods: {
    setDefaultData () {
      let { mark, date, hidemark } = this.$route.query

      hidemark = hidemark === null || hidemark === 'true'

      if (date && date.length === 8) {
        date = `${date.substr(-4)}-${date.substr(2, 2)}-${date.substr(0, 2)}`

        this.modelDate = date
      }

      if (mark) {
        if (!Array.isArray(mark)) {
          mark = mark.split(',')
        }

        if (this.marks) {
          mark = mark.filter(el =>
            this.marks.find(item => item.code === el),
          )
        }

        if (mark.length > 0) {
          if (!this.isIframe && hidemark) {
            this.availableMarks = mark
          } else if (this.isIframe) {
            if (mark.length === 1) {
              this.defaultMark = mark[0]
            } else if (mark.length > 1) {
              this.availableMarks = mark
            }
          }

          this.setDefaultMark(mark[0])
        } else {
          this.setDefaultMark()
        }
      } else {
        this.setDefaultMark()
      }
    },

    setDefaultDate () {
      const availableDate = this.timeslots?.dates?.reduce((sum, cur) => {
        if (cur.available) {
          return [...sum, cur.date]
        }

        return sum
      }, [])
      const dateWithTime = this.findEarliestDate(availableDate)
      const date = dateWithTime?.substring(0, 10)
      if (date && this.modelDate !== date) {
        this.modelDate = date
      }
    },

    findEarliestDate (dateArray) {
      return dateArray?.reduce((earliestDate, currentDate) => {
        return currentDate < earliestDate ? currentDate : earliestDate
      }, dateArray[0])
    },

    async setDefaultDataEnd () {
      const { time } = this.$route.query
      let { dc } = this.$route.query

      if (dc) {
        await this.getDealers()

        if (!Array.isArray(dc)) {
          dc = dc.split(',')
        }

        const currentDealer = this.allDealers.find((dealer) => {
          return dealer.code === dc[0]
        })
        await this.setDefaultDealer(currentDealer?.code ?? null)
      } else {
        await this.setDefaultDealer()
      }

      if (time) {
        if (this.timeslots?.timeslots) {
          this.setDefaultTime(time)
        }
      } else {
        this.setDefaultDate()
      }
    },

    setDefaultTime (time) {
      const currentTime = `${this.modelDate}T${time.substr(0, 2)}:${time.substr(2, 2)}`

      this.timeslots.timeslots.find((timeslot) => {
        if (
          (timeslot.appointmentTime === currentTime ||
            new Date(timeslot.appointmentTime) >= new Date(currentTime)) &&
          timeslot.enable &&
          timeslot.allowedOnline
        ) {
          this.modelTime = timeslot.appointmentTime.substring(11, 16)
          return true
        }

        return false
      })
    },
    setDefaultMark (value) {
      const { mark } = this.$route.query
      const defaultMark = this.getDefaultMark()
      if (!value && !mark) {
        value = defaultMark
      } else if (value !== defaultMark || mark !== defaultMark) {
        value = mark
      }

      const currentMark = this.markCode ?? value
      if (this.marks?.length) {
        const mark = this.marks.find(item => item.code === currentMark)
        this.modelMark = mark?.markId ?? ''
      }
    },
    getDefaultMark () {
      if (this.isAvtodom) { return 'zeekr' }
      if (this.availableMarks.length) {
        return this.availableMarks[0]
      }
      return 'exeed'
    },
    getIncludesDealer (dealerId) {
      switch (dealerId) {
        case '97':
          return '3'
        case '98':
          return '2'
        case '373':
          return '2'
        case '374':
          return '1'
        case '96':
          return '1'
        case '100':
          return '12'
        case '375':
          return '12'
        default:
          return dealerId
      }
    },
    async setDefaultDealer (value = null) {
      const dealerCode = value
      const isOneCityDealer = this.displayedDealer?.length === 1

      if (this.timeslots?.dealers?.length && (dealerCode || isOneCityDealer)) {
        const foundDealer = this.displayedDealer?.find((dealer) => {
          const isEqualsCode = dealer.code === dealerCode

          return isEqualsCode || isOneCityDealer
        })
        const hasFoundDealerCity = foundDealer?.city === this.activeSectionLabel

        if (dealerCode) {
          // рефакторинг
          this.modelDealer = this.getIncludesDealer(dealerId)
          await this.fetchTimeslots()
        } else if (foundDealer && hasFoundDealerCity) {
          this.modelDealer = foundDealer?.code ?? ''
          await this.fetchTimeslots()
        }
      }
    },

    async getDealers () {
      const options = {
        method: 'GET',
      }
      const res = await this.fetchClient(getDealersShort(), options)
      this.allDealers = res?.dealer ?? []
    },

    updateMark (data) {
      this.modelMark = data
      this.modelModel = null
      this.modelDealer = ''
      this.modelTime = ''
      if (!data) {
        this.modelDate = null
      }
    },
    updateModel (data) {
      this.modelModel === data ? this.modelModel = '' : this.modelModel = data
      this.fetchTimeslots({ isChangeModel: false })
    },
    updateDate () {
      this.modelTime = ''
      this.fetchTimeslots()
      this.setDefaultDealer()
    },

    updateTime (data) {
      if (this.modelTime === data || this.modelTime === data) {
        this.modelTime = ''
      } else {
        this.modelTime = data
      }

      this.fetchTimeslots()
    },

    updateDealer (data) {
      this.modelDealer === data ? this.modelDealer = '' : this.modelDealer = data

      this.setMarkOnDealer(data)
      this.fetchTimeslots()
    },
    hasFormValue (value) {
      return typeof value !== 'object' && value !== ''
    },
    onSetSections (sections) {
      this.sections = sections
    },
    setMarkOnDealer (dealerCode) {
      if (dealerCode && !this.modelMark) {
        const foundDealer = this.timeslots.dealers.find(
          dealer => dealer.code === dealerCode,
        )
        this.modelMark = foundDealer?.markId
      }
    },
    async bookOrderNew (obj) {
      this.form = Object.assign({}, this.form, obj)
      this.clientForm = null

      const { dealers, models, timeslots } = this.timeslots
      const dealer = dealers.find(dealer => dealer.code === this.modelDealer)
      const { id: dealer_id, name: dealer_name, city } = dealer
      const { vehicleId, id: model_id, nameEn: model_name, generation, serie, equipment, modification } = models.find(dealer => dealer.vehicleId === this.modelModel)
      const { markId: mark_id, nameEn: mark_name } = this.marks.find(mark => mark.markId === this.modelMark)
      const timeslot = timeslots.find(timeslot => timeslot.vehicleId === vehicleId)

      const body = {
        full_name: this.userName,
        contact_phone: this.userPhone.replace(/[^0-9+]/g, ''),
        contact_email: this.userEmail,
        dealer_id,
        dealer_name,
        appointment_time: timeslot?.appointmentTime ?? `${this.modelDate}T00:00:00`,
        mark_id,
        mark_name,
        model_id,
        model_name,
        generation_id: generation?.id || '',
        generation_name: generation?.nameEn || '',
        serie_id: serie?.id || '',
        serie_name: serie?.nameEn || '',
        equipment_id: equipment?.id || '',
        equipment_name: equipment?.nameEn || '',
        modification_id: modification?.id || '',
        modification_name: modification?.nameEn || '',
        // device_unic_id: '',
        testdrive_vehicle_id: vehicleId,
        ...(this.isAvtodom && { city }),
        formUrl: window.location.href,
      }

      const query = {
        refer: window.location.hostname,
      }
      const options = {
        method: 'POST',
        query,
        body,
      }
      const res = await this.fetchClient(routes.register(), options)

      if (res?.code !== '1') {
        if (!this.isPage) {
          this.onCloseServicePanel()
        } else {
          this.clearData()
        }

        this.onOpenPanel('isOpenFeedbackService')
        return false
      }

      this.clientForm = {
        guid: res?.guid ?? '',
      }

      if (this.isPage) {
        this.$emit('submit', {
          userName: this.userName,
          userPhone: this.userPhone,
          userEmail: this.userEmail,
          userMark: mark_name,
          userModel: model_name,
          userGeneration: generation?.nameEn || '',
          userSerie: serie?.nameEn || '',
          userEquipment: equipment?.nameEn || '',
          userModification: modification?.nameEn || '',
          userDateTime: timeslot?.appointmentTime,
          dealer,
          guid: this.clientForm.guid,
          routeKey: this.routeKey,
        })
        this.onOpenTestDrive('isOpenPopup')
      } else {
        this.setFormStep(2)
      }
    },

    async fetchTimeslots ({ isChangeModel = true } = {}) {
      this.loading = true
      const query = {
        ...(this.currentMark?.code && { markCode: this.currentMark?.code }),
        ...(this.currentModel?.code && { modelCode: this.currentModel?.code }),
        ...(this.currentModel?.vehicleId && { vehicleId: this.currentModel?.vehicleId }),
        ...(this.currentModel?.modification?.code && { modificationCode: this.currentModel?.modification?.code }),
        ...(this.currentModel?.generation?.code && { generationCode: this.currentModel?.generation?.code }),
        ...(this.currentModel?.equipment?.code && { equipmentCode: this.currentModel?.equipment?.code }),
        ...(this.modelDealer && { dealerCode: this.modelDealer }),
        ...(this.modelDate && { date: this.modelDate }),
        ...(this.formattedTimeModel && { time: this.formattedTimeModel }),
        uuid: new Date().toString(),
      }
      const options = {
        method: 'GET',
        query,
      }
      const timeslots = await this.fetchClient(routes.getTimeslots(), options)
      if (this.modelTime) {
        const hasTime = timeslots.timeslots.some((time) => {
          return time.appointmentTime.includes(this.modelTime)
        })
        if (!hasTime) {
          this.modelTime = ''
        }
      }
      if (timeslots?.dealers) {
        this.timeslots = timeslots
        const dealersFilters = this.timeslots.dealers.filter(
          item => item.markId === this.modelMark,
        )

        this.dealers = this.getGroupedOnCityDealers(dealersFilters)
        this.sections = this.getDealersSections(this.dealers)
        this.time = this.timeslots.timeslots
        const hasDatesInModelDate = this.hasDatesInModelDate(this.timeslots.dates)

        if (isChangeModel) {
          this.models = this.timeslots.models
        }
        // есть ли текущая дата в списке доступных дат, если нет то постановка ранней из доступных
        if (this.modelDealer && !hasDatesInModelDate) {
          this.setDefaultDate()
        }
      } else {
        this.clearTimeslotsData()
      }

      this.loading = false
    },
    hasDatesInModelDate (dates) {
      return dates?.some(item => item?.date?.substring(0, 10) === this.modelDate)
    },
    clearTimeslotsData () {
      this.timeslots = null
      this.dealers = null
      this.sections = null
      this.time = null
    },
    getDateTomorrow () {
      const dateNow = new Date()
      dateNow.setDate(dateNow.getDate() + 1)
      return dateNow.toISOString().substring(0, 10)
    },
    getDealersSections (dealers) {
      const moscow = 'Москва'
      const foundDealerCityCode = this.timeslots.dealers.find(dealer => this.siteCityCode === dealer.cityCode)
      const foundDealer = this.timeslots.dealers.find((dealer) => {
        const isEqualsCode = dealer.code === this.modelDealer
        const isEqualsCityCode = this.activeSectionLabel === dealer.city
        return isEqualsCode || isEqualsCityCode
      })
      const dealer = foundDealer || foundDealerCityCode
      const cities = Object.keys(dealers)
      const moscowItem = cities.find(item => item.includes(moscow))
      const formattedDealers = cities.map((city, index) => {
        const isSelectedCity = dealer?.city === city
        const isMoscowFirst = moscowItem ? moscowItem === city : index === 0
        const isActive = dealer ? isSelectedCity : isMoscowFirst

        return {
          label: city,
          isActive,
          length: dealers && dealers[city] ? dealers[city].length : 0,
        }
      })

      if (moscowItem) {
        const dealerMoscow = formattedDealers.find(
          dealer => dealer.label === moscow,
        )
        const dealerWithoutMoscow = formattedDealers.filter(
          item => item.label !== moscow,
        )
        return [dealerMoscow, ...dealerWithoutMoscow]
      }

      return formattedDealers
    },
    getGroupedOnCityDealers (dealers) {
      return dealers.reduce((sum, cur) => {
        const city = cur.city
        if (!sum[city]) {
          sum[city] = []
        }
        sum[city].push(cur)

        return sum
      }, {})
    },

    async fetchClient (route, options) {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      try {
        const res = await $fetchClient(route, options)
        if (!$hasErrorResponse(res)) {
          return res
        }
        return null
      } catch (e) {
        return null
      }
    },

    async getMarks () {
      const options = {
        method: 'GET',
      }
      const res = await this.fetchClient(routes.getMarks(), options)
      if (res?.marks) {
        this.marks = useSortBy(res.marks, 'nameEn')
      }
    },

    setFormStep (stepService) {
      this.formStep = stepService
    },

    resetValue (name) {
      if (name === 'modelMark') {
        this.updateMark('')
      } else if (name === 'modelDate') {
        this.modelDate = null
        this.updateDate()
      } else if (name === 'modelModel') {
        this.modelModel = null
        this.updateModel()
      } else if (name === 'modelDealer') {
        this.updateDealer('')
      } else if (name === 'modelTime') {
        this.updateTime('')
      }
    },

    async clearMainData () {
      this.modelDate = this.getDateTomorrow()
      this.currentDate = process.client && new Date()
      this.modelDealer = ''
      this.modelTime = ''
      this.modelModel = ''
      this.allDealers = []
      this.clearTimeslotsData()

      this.form = {}

      this.defaultMark = null
      this.valuesErrors = false

      if (this.isPage) {
        await this.fetchTimeslots()
      }
    },

    async clearData () {
      this.loading = false
      await this.clearMainData()

      if (!this.isPage) {
        this.setInitStep()
        this.modelMark = ''
        this.marks = null
        this.availableMarks = []
        this.clientForm = null
      }
    },
    setInitStep () {
      setTimeout(() => (this.setFormStep(1)), 1000)
    },
    clearTime () {
      this.modelTime = ''
    },
    ...mapActions(useFormStore, {
      onOpenPanel: 'onOpen',
      clearInitData: 'clearInitData',
    }),
    ...mapActions(useTestDriveStore, {
      onOpenTestDrive: 'onOpen',
    }),
  },
}
</script>

<style lang="scss" scoped>
.testdrive-layout {
  display: grid;
  grid-template-areas: 'left right';
  grid-template-columns: 100%;
  grid-auto-flow: column;
  justify-content: flex-end;
  width: 100%;

  @include mq($bp-small) {
    grid-template-columns: minmax(min-content, 634px);
  }

  @include mq($bp-medium-big) {
    grid-template-columns: minmax(min-content, 634px) auto !important;
    grid-gap: 20px;
  }

  @include mq($bp-big) {
    grid-template-columns: minmax(min-content, 767px) 480px !important;
  }

  @include mq(1700px) {
    grid-template-columns: minmax(min-content, 1140px) 480px !important;
  }

  &_panel {
    .testdrive-layout {
      &__side {
        height: 100vh;
        padding: 30px 15px;
        overflow-y: auto;

        @include mq($bp-small) {
          padding: 72px 55px 0;
        }

        @include mq(899px) {
          padding: 72px 25px 0;
        }

        @include mq(999px) {
          padding: 72px 45px 0;
        }

        @include mq($bp-big) {
          padding: 72px 55px 0;
        }

        &_left {
          grid-template-areas:
            'header'
            'service-type'
            'blocks-values'
            'main';

          @include mq($bp-big) {
            padding: 72px 30px 0 55px;
          }

          &_without_header {
            @include mq($bp-medium) {
              grid-template-areas:
                'blocks-values'
                'main';
            }
          }
        }
      }

      &__list-mark {
        @include mq(599px, 650px) {
          padding: 80px 10px 25px;
        }

        @include mq($bp-small) {
          height: 100vh;
          padding: 80px 0 25px;
        }
      }
    }
  }

  &__left {
    grid-area: left;
    background: white;

    @include mq($bp-small) {
      display: flex;
      justify-self: flex-end;
      width: 100%;
      min-width: 480px;
    }
  }

  &__right {
    position: relative;
    display: none;
    grid-area: right;
    justify-self: flex-end;
    min-width: 400px;
    max-width: 480px;
    background: white;

    @include mq($bp-medium-big) {
      display: block;
      min-width: 480px;
    }

    &_page {
      min-width: initial;
      max-width: 380px;
    }
  }

  &__side {
    display: grid;
    flex-direction: column;
    padding: 0;

    &_left {
      grid-template-areas:
      'service-type'
        'blocks-values'
        'main';
      grid-template-rows: min-content 1fr;
      width: 100%;

      @include mq($bp-small) {
        position: relative;
        padding: 0  0 0 35px;
      }

      @include mq($bp-medium) {
        position: relative;
        padding: 0  0 0 55px;
      }

      @include mq($bp-medium-big) {
        grid-template-areas: 'main';
        padding: 0  0 0 55px;
      }
    }

    &_right {
      display: flex;
      flex-direction: column;
      grid-auto-rows: min-content;
    }

    &_form-code {
      height: 100vh;
    }
  }

  &__form {
    display: grid;
    grid-area: main;
    grid-gap: 50px;
    height: fit-content;

    &_step-1 {
      grid-template-areas:
        'marks'
        'models'
        'dealers'
        'date'
        'time'
        'form-main';
      grid-gap: 40px;

      @include mq($bp-small) {
        grid-template-areas:
          'models'
          'dealers'
          'date'
          'time'
          'form-main';
      }

      @include mq($bp-medium-big) {
        grid-gap: 50px;
      }

      @include mq(1700px) {
        grid-template-areas:
          'models dealers'
          'date time';
        grid-auto-columns: 400px 1fr;
        grid-gap: 30px;
      }

      &-hide {
        display: none;

        @include mq($bp-medium-big) {
          display: inherit;
        }
      }
    }

    &_step-2 {
      padding: 100px 0;
      margin: auto;

      &-hide {
        @include mq($bp-medium-big) {
          display: none;
        }
      }
    }
  }

  &__section {
    display: grid;
    grid-gap: 30px;
    width: 100%;
    height: fit-content;

    @include mq($bp-small) {
      grid-gap: 40px;
    }

    @include mq($bp-medium-big) {
      grid-gap: 30px;
    }

    &_date {
      grid-area: date;
    }

    &_dealers {
      & :deep(.select-buttons__container) {
        height: auto;
      }

      grid-area: dealers;

      @include mq(1700px) {
        grid-gap: 20px;
      }
    }

    &_marks {
      grid-area: marks;

      @include mq($bp-small) {
        display: none;
      }
    }

    &_models {
      grid-area: models;
      grid-gap: 20px;
      max-height: 400px;
      overflow-y: auto;
    }

    &_time {
      grid-area: time;
      grid-gap: 24px;
    }

    &_form-main {
      grid-area: form-main;

      @include mq($bp-medium-big) {
        display: none;
      }
    }
  }

  &__close {
    grid-area: close;
    justify-self: flex-end;
    width: 24px;
    height: 24px;

    @media (min-width: ($bp-medium-big + 1)) {
      width: 35px;
      height: 35px;
      padding: 5.5px;
    }

    &_left {
      @include mq($bp-medium-big) {
        display: none;
      }
    }
  }

  &__title {
    @include h4;

    grid-area: title;
    max-width: 300px;

    @include mq($bp-small-medium) {
      @include h3;
    }

    @include mq($bp-big) {
      max-width: 100%;
    }
  }

  &__subtitle {
    @include label;

    &_indent {
      margin-bottom: 15px;
    }

  }

  &__header {
    z-index: 1;
    display: grid;
    grid-area: header;
    grid-template-areas: 'title close';
    align-items: center;
    justify-content: space-between;
    height: fit-content;
    background: white;

    &_left {
      margin-bottom: 30px;

      @include mq($bp-medium-big) {
        display: none;
      }
    }

    &_right {
      grid-template-areas: 'title close';
      margin-bottom: 20px;
    }
  }

  &__text {
    @include text_medium_regular;

    margin-bottom: 30px;
  }

  &__blocks-values {
    grid-area: blocks-values;

    @include mq($bp-medium-big) {
      display: none;
    }
  }

  &__list-time {
    display: grid;
    grid-template-columns: repeat(auto-fill, 60px);
    row-gap: 13px;
    column-gap: 22px;
  }

  &__list-mark {
    position: relative;
    display: grid;
    grid-template-rows: min-content;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: max-content;
    grid-gap: 25px;
    width: 100%;

    @include mq($bp-small-medium) {
      grid-template-columns: repeat(5, minmax(40px, 105px));
    }

    @include mq($bp-small) {
      position: sticky;
      top: 0;
      left: 0;
      grid-template-columns: 1fr;
      grid-auto-flow: row;
      height: 80vh;
      overflow-y: auto;
      background: white;
    }

    @include mq($bp-small) {
      width: 151px;
    }

    @include mq($bp-medium-big) {
      width: 163px;
    }

    &_mobile {
      @include mq($bp-small) {
        display: none;
      }
    }

    &_desktop {
      @media (max-width: $bp-small) {
        display: none;
      }
    }
  }

  &__list-model {
    display: grid;
    grid-gap: 8px;
  }

  &__list-radio {
    display: grid;
    grid-gap: 20px;
    align-content: start;

    @include mq(1700px) {
      height: 300px;
      overflow-y: auto;
    }
  }

  &__radio {
    & :deep(.radio-image__image) {
      margin-bottom: 7px;
    }

    & :deep(.radio__label) {
      opacity: 0.8;
    }

    & :deep(.radio__checkmark) {
      opacity: 0.8;
    }

    & :deep(.radio__input:checked ~ .radio__label) {
      font-weight: 500;
      opacity: 1;
    }

    & :deep(.radio__input:checked ~ .radio__checkmark) {
      opacity: 1;
    }

    @media (hover: hover) and (pointer: fine) {
      &:not(:disabled):hover {
        opacity: 1;
      }

      &:not(:disabled):hover :deep(.radio__checkmark) {
        border: 1px solid var(--black);
      }
    }

    &_hide {
      display: none !important;
    }

    &_dealer {
      & :deep(.radio__label) {
        grid-auto-flow: row;
        grid-gap: 0;
        color: var(--black);

        @include mq($bp-small-medium) {
          @include text_big_regular;
        }

        @include mq($bp-medium-big) {
          max-width: 100%;
        }
      }
    }

    &_mark {
      position: relative;
      display: grid;
      grid-auto-rows: min-content;
      grid-gap: 10px;
      align-content: space-between;
      justify-items: center;
      max-width: 200px;
      height: 100%;
      background-color: white;

      @include mq($bp-small) {
        padding: 10px 15px;
      }

      @include mq(900px, 950px) {
        padding: 10px 8px;
      }

      &:hover,
      &-checked {
        background-color: var(--grayLight);
      }

      & :deep(.radio-image__image) {
        position: relative;
        justify-self: center;
        height: 30px;
        margin-bottom: 0;
        object-fit: contain;
      }

      & :deep(.radio-image__label) {
        font-weight: 600;
        color: var(--blackLight);
        text-align: center;
      }

      & :deep(.radio-image__input:checked ~ .radio-image__label) {
        color: var(--black);
      }
    }

   &_model {
      flex-direction: row !important;
      border-radius: 6px;

      &:hover {
        background-color: var(--grayLight);
      }

      &-checked {
        background-color: var(--blackLight);

        &:hover {
          background-color: var(--blackLight);
        }
      }

      &-checked &_title {
        color: white !important;
      }

      &-checked &_info {
        color: var(--grayMediumLight);
      }

      & :deep(.radio-image__image) {
        width: 105px;
        margin: 13px 8px;

        @include mq($bp-small-medium) {
          width: 130px;
          margin: 19px 10px;
        }
      }

      & :deep(.radio-image__label) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 32px 16px;
      }

      &_title {
        @include label_small;

        @include mq($bp-small-medium) {
          @include label;
        }
      }

      &_info {
        color: var(--blackLight);

        @include text_medium;

        @include mq($bp-small-medium) {
          @include text_big;
        }
      }
    }
  }

  &__radio-image {
    display: grid;
    grid-template-rows: auto 1fr;
    align-items: flex-start;
    width: 100%;

    & :deep(.radio-image__image) {
      width: 100px;
      height: 100px;
      opacity: 1;
      object-fit: cover;
      object-position: top;
    }

    & :deep(.radio-image__input:checked ~ .radio-image__image) {
      opacity: 1;
    }

    & :deep(.radio-image__input:disabled ~ .radio-image__label) {
      color: var(--grayDark);
    }

    & :deep(.radio-image__input:disabled ~ .radio-image__image) {
      opacity: 0.2;
    }

    &_checked {
      background: var(--blackLight);
      border-radius: 4px;
      opacity: 1;

      & :deep(.radio-image__label) {
        color: #fff;
      }
    }

    &_not_checked {
      opacity: 0.4;
    }

    .testdrive-layout &_hide {
      display: none;
    }

    @media (hover: hover) and (pointer: fine) {
      &:not(:disabled):hover :deep(.radio-image__image) {
        opacity: 1 !important;
      }
    }
  }

  &__calendar {
    width: 100%;
    max-width: 307px;
    border: 0;

    & :deep(.vd-picker) {
      width: 100%;
    }
  }

  &__radio-time :deep(.radio__label) {
    @include text_small_regular;

    padding: 11px 14px;
    border-radius: 4px;
  }

  & :deep(.radio__label) {
    color: var(--blackLight);
  }

  &__radio-time {
    @media (hover: hover) and (pointer: fine) {
      &:not(:disabled):hover {
        border: 1px solid var(--blackLight);
      }
    }

    & :deep(.radio__input:checked ~ .radio__label) {
      padding: 10px 15px;
      font-weight: 700;
    }
  }

  &__radio-additional-value {
    @include text_small_regular;

    overflow: hidden;
    color: var(--blackLight);
    text-overflow: ellipsis;
  }

  &__select-title {
    @include text_medium_regular;

    color: var(--blackLight);
  }

  &__service-type {
    grid-area: service-type;
    margin-bottom: 30px;

    &_mobile {
      @include mq($bp-medium-big) {
        display: none;
      }
    }
  }

  &__loader {
    margin: 100px auto !important;
  }
}
</style>
