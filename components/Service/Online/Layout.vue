<template>
  <div
    :class="['service-layout', { 'service-layout_panel': !isPage }]"
    @click.self="$emit('close-panel')"
  >
    <div v-if="showPage" class="service-layout__left">
      <ul
        v-if="showMarks"
        class="service-layout__list-mark service-layout__list-mark_desktop"
      >
        <UIRadioImage
          v-for="mark in filteredMarks"
          :key="mark.id"
          v-model="modelMark"
          :value="mark.id"
          :image-src="mark.logo"
          :disable="hasDisableMark(mark.id)"
          :class="[
            'service-layout__radio',
            'service-layout__radio_mark',
            {
              'service-layout__radio_mark-checked': +modelMark === +mark.id,
            },
          ]"
        >
          {{ mark.id === '4242' ? '' : mark.name }}
        </UIRadioImage>
      </ul>

      <div
        class="service-layout__side service-layout__side_left"
        :class="[
          { 'service-layout__side_left_without_header': !isPage && isOpen },
        ]"
      >
        <header
          v-if="!isPage"
          class="service-layout__header service-layout__header_left"
        >
          <h2 class="service-layout__title">
            Запись на сервис
          </h2>
          <IconClose
            class="service-layout__close service-layout__close_left"
            @click="$emit('close-panel')"
          />
        </header>

        <template v-if="timeslots && isPage || (!isPage && formStep === 1)">
          <ServiceOnlineBlockTypeService
            v-if="!isShowServiceTypeSection"
            v-model="modelServiceType"
            class="service-layout__service-type service-layout__service-type_mobile"
          />

          <ServiceOnlineBlockValues
            :current-mark="defaultMark"
            :marks="filteredMarks"
            :mark-id="modelMark"
            :date="modelDate"
            :time="modelTime"
            :dealer-id="modelDealer"
            :dealers="displayedDealer"
            :consultant-id="modelConsultant"
            :consultants="consultants"
            :values-errors="valuesErrors"
            class="service-layout__blocks-values"
            @resetValue="resetValue"
          />
        </template>
        <template v-if="timeslots">
          <div
            :class="[
              'service-layout__form service-layout__form_step-1',
              { 'service-layout__form_step-1-hide': !isPage && formStep !== 1 },
            ]"
          >
            <section
              v-if="!defaultMark || showMarks"
              class="service-layout__section service-layout__section_marks"
            >
              <h3
                class="service-layout__subtitle service-layout__subtitle_indent service-layout__subtitle_mark"
              >
                Выберите марку
              </h3>
              <ul
                v-if="marks"
                class="service-layout__list-mark service-layout__list-mark_mobile"
              >
                <UIRadioImage
                  v-for="mark in filteredMarks"
                  :key="mark.id"
                  v-model="modelMark"
                  :value="mark.id"
                  :image-src="mark.logo"
                  :class="[
                    'service-layout__radio',
                    'service-layout__radio_mark',
                    {
                      'service-layout__radio_mark-checked':
                        +modelMark === +mark.id,
                    },
                  ]"
                >
                  {{ mark.id === '4242' ? '' : mark.name }}
                </UIRadioImage>
              </ul>
            </section>
            <section
              class="service-layout__section service-layout__section_date"
            >
              <div class="service-layout__time-container">
                <UIDatePicker v-model="modelDate" :dates="timeslots?.dates" />
              </div>
            </section>

            <section
              v-if="dealers"
              class="service-layout__section service-layout__section_dealers"
            >
              <ServiceFormSelectButtons
                :buttons="sections"
                @onSetSelectButtons="onSetSections"
              />
              <ul v-if="displayedDealer" class="service-layout__list-radio">
                <UIBaseRadio
                  v-for="dealer in displayedDealer"
                  :key="dealer.id"
                  :label="dealer.name"
                  :model-value="modelDealer"
                  :value="dealer.id"
                  :disable="isOneQueryDealer"
                  class="service-layout__radio service-layout__radio_dealer"
                  @click.prevent="!isOneQueryDealer && updateDealer(dealer.id)"
                >
                  <span class="service-layout__radio-additional-value">
                    {{ dealer.address }}
                  </span>
                </UIBaseRadio>
              </ul>
              <p v-else class="service-layout__select-title">
                Дилерские центры на эту дату заняты
              </p>
            </section>
            <section
              v-if="partsOfDay || hasTimeslots"
              class="service-layout__section service-layout__section_time"
            >
              <h3 class="service-layout__subtitle">
                Время
              </h3>
              <div class="service-layout__part-of-day">
                <UIBaseRadio
                  v-for="partOfDay in partsOfDay"
                  :key="partOfDay.id"
                  v-model="modelPartOfDay"
                  :label="partOfDay.nameRu"
                  :value="partOfDay.id"
                  :disable="hasDisablePartOfDay(partOfDay.id)"
                  class="service-layout__radio service-layout__radio_part-of-day"
                >
                  <span class="service-layout__radio-additional-value">
                    с {{ partOfDay.timeStart.slice(0, -3) }}
                    <br>
                    до {{ partOfDay.timeEnd.slice(0, -3) }}
                  </span>
                </UIBaseRadio>
              </div>
              <div class="service-layout__list-time">
                <UIRadioTime
                  v-for="item in groupedTimePartOfDay[modelPartOfDay]"
                  :key="`${item.scheduleItemId} ${item.appointmentTime}`"
                  :ref="`${item.scheduleItemId} ${item.appointmentTime}`"
                  :model-value="modelTime"
                  :value="item.appointmentTime.substring(11, 16)"
                  :disable="false"
                  class="service-layout__radio-time"
                  @click.prevent="
                    updateTime(item.appointmentTime.substring(11, 16))
                  "
                >
                  {{ item.appointmentTime.substring(11, 16) }}
                </UIRadioTime>
              </div>
            </section>

            <ServiceSectionConsultants
              v-if="modelMark && consultants && consultants.length && !loading"
              class="service-layout__section service-layout__section_consultants"
            >
              <UIRadioImage
                v-for="consultant in consultants"
                :key="consultant.adviserId"
                :value="consultant.adviserId"
                :disable="hasDisableConsultant(consultant.adviserId)"
                :image-src="consultant.photo"
                resize-image-size="200"
                lazy-load
                class="service-layout__radio service-layout__radio-image service-layout__radio-image_consultant"
                :class="{
                  'service-layout__radio-image_checked':
                    modelConsultant === consultant.adviserId,
                  'service-layout__radio-image_not_checked':
                    modelConsultant !== consultant.adviserId && modelConsultant,
                }"
                @click.prevent="updateConsultant(consultant.adviserId)"
              >
                {{ consultant.adviserFullName }}
              </UIRadioImage>
            </ServiceSectionConsultants>

            <section
              class="service-layout__section service-layout__section_form-main"
            >
              <h3 class="service-layout__subtitle">
                Заполните данные
              </h3>

              <ServiceOnlineFormsMain
                :mark-id="modelMark"
                :date="modelDate"
                :time="modelTime"
                :dealer-id="modelDealer"
                :service-type-id="modelServiceType"
                @submit="bookOrderNew"
                @setValuesErrors="valuesErrors = $event"
              />
            </section>
          </div>

          <ServiceFormCode
            v-if="!isPage && formStep === 2"
            class="service-layout__form_step-2 service-layout__form_step-2-hide"
            :user-phone="userPhone"
            :user-email="userEmail"
            :user-name="userName"
            :user-comment="userComment"
            :user-mark="userMarkName"
            :user-model="userModelName"
            :user-date-time="userDateTime"
            :dealer="selectedDealer"
            :client-guid="clientForm && clientForm.guid"
            :additional-info="additionalInfo"
            :route-key="routeKey"
            @cancel="setFormStep(1)"
            @success="setFormStep(3)"
          />
          <LazyFormFinallyBlock
            v-if="!isPage && formStep === 3"
            @handleClose="$emit('close-panel')"
          />
        </template>
        <UILoader v-else class="service-layout__loader" />
      </div>
    </div>

    <div
      class="service-layout__right"
      :class="[
        { 'service-layout__right_page': isPage },
      ]"
    >
      <div
        :class="[
          'service-layout__side service-layout__side_right',
          { 'service-layout__side_form-code': formStep === 2 && !isPage },
        ]"
      >
        <header
          v-if="!isPage"
          class="service-layout__header service-layout__header_right"
        >
          <h2 class="service-layout__title">
            Запись на сервис
          </h2>
          <IconClose
            class="service-layout__close"
            @click="$emit('close-panel')"
          />
        </header>
        <template v-if="timeslots && (isPage || (!isPage && formStep === 1))">
          <p class="service-layout__text">
            Наши профессиональные специалисты обеспечат надежность, безопасность
            и комфорт вашей поездки
          </p>

          <ServiceOnlineBlockTypeService
            v-if="!isShowServiceTypeSection"
            v-model="modelServiceType"
            class="service-layout__service-type"
          />

          <ServiceOnlineBlockValues
            :current-mark="defaultMark"
            :marks="filteredMarks"
            :mark-id="modelMark"
            :date="modelDate"
            :time="modelTime"
            :dealer-id="modelDealer"
            :all-dealers="allDealers"
            :consultant-id="modelConsultant"
            :consultants="consultants"
            :values-errors="valuesErrors"
            :part-of-day="modelPartOfDay"
            @resetValue="resetValue"
          />

          <ServiceOnlineFormsMain
            :mark-id="modelMark"
            :date="modelDate"
            :time="modelTime"
            :dealer-id="modelDealer"
            :service-type-id="modelServiceType"
            @submit="bookOrderNew"
            @setValuesErrors="valuesErrors = $event"
          />
        </template>
        <template v-else-if="!isPage && formStep !== 1">
          <ServiceFormCode
            v-if="!isPage && formStep === 2"
            class="service-layout__form_step-2"
            :user-phone="userPhone"
            :user-email="userEmail"
            :user-name="userName"
            :user-comment="userComment"
            :user-mark="userMarkName"
            :user-model="userModelName"
            :user-date-time="userDateTime"
            :dealer="selectedDealer"
            :client-guid="clientForm && clientForm.guid"
            :additional-info="additionalInfo"
            :route-key="routeKey"
            @cancel="setFormStep(1)"
            @success="setFormStep(3)"
          />

          <LazyFormFinallyBlock
            v-else-if="!isPage && formStep === 3"
            @handleClose="$emit('close-panel')"
          />
        </template>
        <UILoader v-else class="service-layout__loader" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'

import { useResizeStore } from '@/store/resize'
import { useFormStore } from '@/store/form'
import { useHoldingStore } from '@/store/holding'
import { useServiceStore } from '@/store/service'
import { useCityStore } from '@/store/city'
import { calltouch } from '@/components/Form/mixins'

import routes from '@/api/routes/service'
import { getDealersShort } from '@/api/routes/dealer'

export default {
  name: 'ServiceOnlineLayout',
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
      timeslots: null,
      partsOfDay: null,
      time: null,
      dealers: null,
      consultants: null,
      formStep: 1,
      clientForm: null,
      modelMark: '',
      modelDate: this.getDateTomorrow(),
      currentDate: process.client && new Date(),
      modelConsultant: '',
      modelDealer: '',
      modelTime: '',
      modelServiceType: this.$route.query?.serviceTypeId || '',
      modelPartOfDay: '2',
      form: {},
      availableMarks: [],
      allDealers: [],
      defaultMark: null,
      additionalInfo: {},
      valuesErrors: false,
      iframeMark: false,
    }
  },
  computed: {
    queryDealers () {
      return this.$route.query.dc?.split(',') || []
    },
    isOneQueryDealer () {
      return this.queryDealers?.length === 1
    },
    isShowServiceTypeSection () {
      return typeof this.$route.query?.serviceTypeId === 'string' || !this.currentMark?.bodyWork || this.isIframe
    },
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
      const id = this.modelDealer ?? ''
      return this.getDealerCalltouchWidgetId(
        id,
        this.timeslots.dealers,
        'Service',
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
      return this.form?.model?.name ?? ''
    },
    availableTimeslots () {
      return this.timeslots.timeslots.filter((timeslot) => {
        const hasModelTime = timeslot.appointmentTime.includes(this.modelTime)
        return hasModelTime && timeslot.enable && timeslot.allowedOnline
      })
    },
    availableConsultants () {
      return this.consultants.filter((consultant) => {
        return this.availableTimeslots.some(
          time => time.adviserId === consultant.adviserId,
        )
      })
    },
    hasTimeslots () {
      return this.groupedTimePartOfDay[this.modelPartOfDay]?.length
    },
    activeSectionLabel () {
      return this.sections?.find(section => section.isActive)?.label ?? ''
    },
    displayedDealer () {
      if (!useIsEmpty(this.dealers)) {
        const dealersWithoutLiXiang = this.dealers[this.activeSectionLabel]?.filter(item => item.name !== 'LiXiang Восток')
        const { dc } = this.$route.query

        if (this.modelDealer && dc) {
          if (!Array.isArray(dc)) {
            const foundQueryDealersIds = this.allDealers.filter(dealer => this.queryDealers.includes(dealer.code))?.map(dealer => dealer.id)

            return dealersWithoutLiXiang.filter(dealer => foundQueryDealersIds.includes(dealer.id))
          }

          return dealersWithoutLiXiang.filter(dealer => dealer.id === this.modelDealer)
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
    groupedTimePartOfDay () {
      if (this.time) {
        const allTime = this.time.reduce((sum, timeslot) => {
          const { enable, allowedOnline, appointmentTime } = timeslot
          const hasDate = appointmentTime.includes(this.modelDate)
          const isActiveTimeslot = enable && allowedOnline && hasDate

          if (!sum[timeslot.schemaId]) {
            sum[timeslot.schemaId] = []
          }
          if (isActiveTimeslot) {
            sum[timeslot.schemaId].push(timeslot)
          }

          return sum
        }, {})

        for (const group in allTime) {
          const unic = useUniqBy(allTime[group], 'appointmentTime')
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          allTime[group] = useSortBy(unic, 'appointmentTime')
        }

        return allTime
      }
      return []
    },
    selectedDealer () {
      if (this.modelDealer && this.timeslots) {
        return this.timeslots.dealers.find(
          dealer => dealer.id === this.modelDealer,
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
    userComment () {
      return this.form?.comment?.value ?? ''
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
    dealerId () {
      if (this.initData?.dealerId) {
        return this.initData.dealerId
      }

      return null
    },
    currentMark () {
      return this.marks?.find(mark => mark.id === this.modelMark)
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
      await this.setDefaultDealer()
      this.setDefaultDate()
    },
    modelPartOfDay () {
      this.clearTime()
    },
    modelDate () {
      if (this.timeslots) {
        this.updateDate()
      }
    },
    modelDealer () {
      this.setDefaultPartOfDay()
    },
    async modelServiceType (value, oldValue) {
      if (value !== oldValue) {
        await this.fetchTimeslots()
      }
    },
    isOpen: {
      async handler (isOpen) {
        // if (process.client) {
        if (isOpen) {
          await this.getMarks()
          this.setDefaultData()
          await this.fetchTimeslots()
          this.setDefaultDataEnd()
        } else {
          this.clearInitData()
          this.clearData()
        }
        // }
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
          // if (this.isIframe) {
          //   this.iframeMark = true
          // }
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
      let { dc, adviser } = this.$route.query

      if (dc) {
        await this.getDealers()

        if (!Array.isArray(dc)) {
          dc = dc.split(',')
        }

        const currentDealer = this.allDealers.find((dealer) => {
          return dealer.code === dc[0]
        })
        await this.setDefaultDealer(currentDealer?.id ?? null)
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

      if (adviser) {
        if (!Array.isArray(adviser)) {
          adviser = adviser.split(',')

          const currentAdviser = adviser.find(item =>
            this.availableConsultants.find(
              consultant => item === consultant.adviserId,
            ),
          )

          if (currentAdviser) {
            this.modelConsultant = currentAdviser
          }
        }
      }

      this.setDefaultPartOfDay()
    },

    setDefaultPartOfDay () {
      if (!this.timeslots?.timeslots?.length) {
        this.modelPartOfDay = '2'
        return
      }
      if (!this.modelTime && this.timeslots) {
        const getSchemaIdPartOfDay = (countsSchemaId, id) => countsSchemaId[id] && countsSchemaId.indexOf(countsSchemaId[id]) + 1
        const countsSchemaId = this.timeslots.timeslots.reduce((sum, timeslot) => {
          sum[timeslot.schemaId - 1] += 1
          return sum
        }, [0, 0, 0])
        const morning = getSchemaIdPartOfDay(countsSchemaId, 0)
        const day = getSchemaIdPartOfDay(countsSchemaId, 1)
        const evening = getSchemaIdPartOfDay(countsSchemaId, 2)
        this.modelPartOfDay = `${day || morning || evening}`
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
        this.modelMark = mark?.id ?? ''
      }
    },
    getDefaultMark () {
      const { city } = this.$route.query
      if (this.isAvtodom) {
        if (city === 'spb' || this.siteCityCode === 'spb') {
          return 'mercedes-benz'
        }
        return 'bmw'
      }
      if (this.availableMarks.length) {
        return this.availableMarks[0]
      }
      return 'chery'
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
      const dealerId = this.dealerId || value
      const isOneCityDealer = this.displayedDealer?.length === 1

      if (this.timeslots?.dealers?.length && (dealerId || isOneCityDealer)) {
        const foundDealer = this.displayedDealer?.find((dealer) => {
          const isEqualsId = dealer.id === dealerId

          return isEqualsId || isOneCityDealer
        })
        const hasFoundDealerCity = foundDealer?.city === this.activeSectionLabel

        if (dealerId) {
          this.modelDealer = this.getIncludesDealer(dealerId)
          await this.fetchTimeslots()
        } else if (foundDealer && hasFoundDealerCity) {
          this.modelDealer = foundDealer?.id ?? ''
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
      this.modelDealer = ''
      this.modelTime = ''
      this.modelConsultant = ''
      if (!data) {
        this.modelDate = null
      }
    },

    updateDate () {
      if (this.modelTime) {
        const hasTime = this.availableTimeslots.some((time) => {
          return time.appointmentTime.includes(this.modelTime)
        })
        if (!hasTime) {
          this.modelTime = ''
        }
      }

      this.fetchTimeslots()
      this.setDefaultDealer()
    },

    updateTime (data) {
      if (this.modelTime === data || this.modelTime === parseInt(data)) {
        this.modelTime = ''
      } else {
        this.modelTime = data
      }

      this.fetchTimeslots()
    },

    updateDealer (data) {
      if (this.modelDealer === data || this.modelDealer === parseInt(data)) {
        this.modelDealer = ''
      } else {
        this.modelDealer = data
      }

      this.modelConsultant = ''

      this.setMarkOnDealer(data)
      this.fetchTimeslots()
    },

    updateConsultant (data) {
      if (
        this.modelConsultant === data ||
        this.modelConsultant === parseInt(data)
      ) {
        this.modelConsultant = ''
      } else {
        this.modelConsultant = data
      }

      if (this.consultants) {
        const foundConsultant = this.consultants.find(
          consultant => consultant?.adviserId === data,
        )
        const dealerId = parseInt(foundConsultant?.dealerId)

        if (!this.modelDealer) {
          this.modelDealer = dealerId.toString()
        }

        this.setMarkOnDealer(dealerId)
        this.fetchTimeslots()
      }
    },

    getConsultantTimeslots (adviserId) {
      return this.timeslots.timeslots.filter((time) => {
        return time.adviserId === adviserId
      })
    },
    hasDisableConsultant (_adviserId) {
      return false
    },
    hasHideConsultant (adviserId) {
      const consultantTimeslots = this.getConsultantTimeslots(adviserId)
      const hasSomeActiveTimeOnConsultant = consultantTimeslots.some(
        item =>
          item.enable &&
          item.allowedOnline &&
          item.schemaId === this.modelPartOfDay,
      )
      return !hasSomeActiveTimeOnConsultant
    },
    hasFormValue (value) {
      return typeof value !== 'object' && value !== ''
    },
    onSetSections (sections) {
      this.sections = sections
    },
    setMarkOnDealer (dealerId) {
      if (dealerId && !this.modelMark) {
        const foundDealer = this.timeslots.dealers.find(
          dealer => parseInt(dealer.id) === parseInt(dealerId),
        )
        this.modelMark = parseInt(foundDealer?.markId)
      }
    },
    hasDisablePartOfDay (partOfDayId) {
      if (!this.timeslots?.timeslots?.length) { return false }
      return (
        !this.groupedTimePartOfDay[partOfDayId] ||
        !this.groupedTimePartOfDay[partOfDayId]?.length
      )
    },
    getFormRun () {
      let run
      if (typeof this.form.run.value === 'string') {
        run = this.form.run.value.split(' ').join('')
      } else {
        run = this.form.run.value
      }
      return run ? parseInt(run) : null
    },
    foundTimeslot () {
      return this.availableTimeslots.find((timeslot) => {
        const hasTime = timeslot.appointmentTime.includes(this.modelTime)

        if (this.modelConsultant) {
          const isTimeConsultant = timeslot.adviserId === this.modelConsultant
          return hasTime && isTimeConsultant
        }

        return hasTime
      })
    },

    async bookOrderNew (obj) {
      this.form = Object.assign({}, this.form, obj)
      this.clientForm = null

      if (!this.modelConsultant && this.consultants?.length) {
        this.modelConsultant = this.consultants[0]?.adviserId ?? ''
      }

      const modelId = this.form.model.value
      const modelConsultant = this.modelConsultant
      const timeslot = this.foundTimeslot()
      const adviser = this.consultants.find(
        consultant => consultant?.adviserId === modelConsultant,
      )
      const serviceType = this.modelServiceType ? 'Кузовной ремонт' : 'Механический ремонт'

      const body = {
        full_name: this.userName,
        contact_phone: this.userPhone,
        contact_email: this.userEmail,
        dealer_id: parseInt(this.modelDealer),
        adviser_id: modelConsultant ? parseInt(modelConsultant) : null,
        appointment_date: timeslot?.appointmentTime ?? `${this.modelDate}T00:00:00`,
        schedule_item_id: timeslot?.scheduleItemId
          ? parseInt(timeslot.scheduleItemId)
          : null,
        mark_id: this.modelMark ? parseInt(this.modelMark) : null,
        model_id: modelId ? parseInt(modelId) : null,
        vin: this.form.VIN.value,
        total_trip: this.getFormRun(),
        state_number: this.form.stateNumber.value,
        comment: this.userComment,
        type_of_work: this.form.typeOfWork.value,
        device_uniq_id: '',
        refer: window.location.href,
        service_type: serviceType,
        formUrl: window.location.href,
        ...(this.isAvtodom && { city: this.siteCityCode }),
      }
      if (!this.timeslots?.timeslots?.length) {
        body.time_of_day = this.modelPartOfDay
      }
      this.additionalInfo = {
        vin: this.form.VIN.value,
        total_trip: this.getFormRun(),
        state_number: this.form.stateNumber.value,
        type_of_work: this.form.typeOfWork.value,
        adviser: adviser?.adviserFullName ?? '',
        service_type: serviceType,
        appointment_date: timeslot?.appointmentTime ?? new Date(),
      }
      const query = {
        refer: window.location.hostname,
      }
      const options = {
        method: 'POST',
        query,
        body,
      }
      const res = await this.fetchClient(routes.timeslotsRegister(), options)

      if (res?.code !== '1') {
        localStorage.setItem(
          'serviceForm',
          JSON.stringify({
            name: this.userName,
            phone: this.userPhone,
            email: this.userEmail,
            comment: this.userComment,
          }),
        )

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
          userComment: this.userComment,
          userMark: this.userMarkName,
          userModel: this.userModelName,
          userDateTime: this.userDateTime,
          dealer: this.selectedDealer,
          guid: this.clientForm.guid,
          additionalInfo: this.additionalInfo,
          routeKey: this.routeKey,
        })
        this.onOpenService('isOpenPopup')
      } else {
        this.setFormStep(2)
      }
    },

    async fetchTimeslots () {
      this.loading = true
      this.partsOfDay = null
      const query = {
        ...(this.modelMark && { markId: this.modelMark }),
        ...(this.modelDate && { date: this.modelDate }),
        ...(this.formattedTimeModel && { time: this.formattedTimeModel }),
        ...(this.modelDealer && { dealerId: this.modelDealer }),
        ...(this.modelConsultant && { adviserId: this.modelConsultant }),
        ...(this.modelServiceType && { serviceTypeId: this.modelServiceType }),
        uuid: new Date().toString(),
      }
      const options = {
        method: 'GET',
        query,
      }
      const timeslots = await this.fetchClient(routes.getTimeslots(), options)
      if (timeslots?.dealers) {
        this.timeslots = timeslots
        const dealersFilters = this.timeslots.dealers.filter(
          item => item.markId === this.modelMark,
        )

        // важен порядок функций setDefaultPartOfDay должен быть раньше чем запись в this.consultants
        // т.к hasHideConsultant зависит от modelPartOfDay которая устанавливается в setDefaultPartOfDay
        this.dealers = this.getGroupedOnCityDealers(dealersFilters)
        this.sections = this.getDealersSections(this.dealers)
        this.partsOfDay = this.getPartsOfDay(this.timeslots.schema)
        this.setDefaultPartOfDay()
        this.consultants = this.timeslots.advisers.filter(item => !this.hasHideConsultant(item.adviserId))
        this.time = this.timeslots.timeslots
        const hasDatesInModelDate = this.hasDatesInModelDate(this.timeslots.dates)

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
      this.consultants = null
      this.time = null
      this.partsOfDay = null
    },
    getPartsOfDay (partsOfDay) {
      return partsOfDay.filter(partOfDay => partOfDay.active === 'Y')
    },
    getDateTomorrow () {
      const dateNow = new Date()
      dateNow.setDate(dateNow.getDate() + 1)
      return dateNow.toISOString().substring(0, 10)
    },
    getDealersSections (dealers) {
      const moscow = 'Москва'
      const foundDealerCityCode = this.timeslots.dealers.find(dealer => this.siteCityCode === dealer.cityCode)
      let foundDealer = this.timeslots.dealers.find((dealer) => {
        const isEqualsId = parseInt(dealer.id) === parseInt(this.modelDealer)
        const isEqualsCityCode = this.activeSectionLabel === dealer.city
        return isEqualsId || isEqualsCityCode
      })
      if (this.isOneQueryDealer && this.allDealers?.length) {
        const foundDealerCityCodeInQuery = this.allDealers.find(dealer => this.queryDealers?.includes(dealer.code))
        foundDealer = this.timeslots.dealers.find(dealer => foundDealerCityCodeInQuery.id === dealer.id)

        return [{
          label: foundDealer.city,
          isActive: true,
          length: 1,
        }]
      }
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
        const dealerMoscow = formattedDealers.find(dealer => dealer.label === moscow)
        const dealerWithoutMoscow = formattedDealers.filter(item => item.label !== moscow)

        return [dealerMoscow, ...dealerWithoutMoscow]
      }

      return formattedDealers
    },
    getGroupedOnCityDealers (dealers) {
      const dealersIds = this.allDealers?.filter(dealer => this.queryDealers?.includes(dealer.code))?.map(dealer => dealer.id)
      const filteredDealers = this.queryDealers?.length > 1 ? dealers.filter(dealer => dealersIds.includes(dealer.id)) : dealers

      return filteredDealers.reduce((sum, cur) => {
        const city = cur.city
        if (!sum[city]) {
          sum[city] = []
        }

        sum[city].push(cur)

        return sum
      }, {})
    },

    async fetchClient (route, options) {
      try {
        const { $fetchClient, $hasErrorResponse } = useNuxtApp()
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
      if (res?.data) {
        this.marks = useSortBy(res.data, 'name')
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
      } else if (name === 'modelDealer') {
        this.updateDealer('')
      } else if (name === 'modelTime') {
        this.updateTime('')
      } else if (name === 'modelConsultant') {
        this.updateConsultant('')
      }
    },

    async clearMainData () {
      this.modelDate = this.getDateTomorrow()
      this.currentDate = process.client && new Date()
      this.modelConsultant = ''
      this.modelDealer = ''
      this.modelTime = ''
      this.modelServiceType = ''
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
    ...mapActions(useServiceStore, {
      onOpenService: 'onOpen',
    }),
  },
}
</script>

<style lang="scss" scoped>
.service-layout {
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
    .service-layout {
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
            @include mq($bp-medium-big) {
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
        'date'
        'dealers'
        'time'
        'consultants'
        'form-main';
      grid-gap: 40px;

      @include mq($bp-small) {
        grid-template-areas:
          'date'
          'dealers'
          'time'
          'consultants'
          'form-main';
      }

      @include mq($bp-medium-big) {
        grid-gap: 50px;
      }

      @include mq(1700px) {
        grid-template-areas:
          'date dealers'
          'time consultants';
        grid-auto-columns: 307px 1fr;
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
      grid-area: dealers;

      @include mq(1700px) {
        grid-gap: 10px;
      }
    }

    &_consultants {
      grid-area: consultants;
    }

    &_marks {
      grid-area: marks;

      @include mq($bp-small) {
        display: none;
      }
    }

    &_time {
      grid-area: time;
      grid-gap: 40px;
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

    &_part-of-day,
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

    .service-layout &_hide {
      display: none;
    }

    .service-layout &_consultant {
      align-items: start;
      padding: 10px;
    }

    @media (hover: hover) and (pointer: fine) {
      &:not(:disabled):hover :deep(.radio-image__image) {
        opacity: 1 !important;
      }
    }
  }

  &__part-of-day {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: column;
    grid-gap: 10px;
    width: fit-content;

    @include mq($bp-small) {
      grid-gap: 20px;
    }

    @include mq($bp-medium-big) {
      grid-gap: 10px;
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
