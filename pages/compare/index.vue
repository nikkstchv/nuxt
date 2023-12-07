<template>
  <UIBody>
    <UISimplePageHeader class="compare__header" title="Сравнение" />
    <main class="compare__main">
      <UIBaseSelectButtons
        ref="selectButtons"
        :class="[
          'compare__select-buttons',
          { 'compare__select-buttons_hide': !hasSomeCards },
        ]"
        :buttons="sections"
        @onChangeButtons="onChangeSections"
      />
      <UIBaseCheckboxSlide
        v-if="hasCardsMoreThenOne"
        v-model="isHideDifferences"
        :value="true"
        class="compare__checkbox-slide compare__checkbox-slide_header"
        label="Показывать только отличия"
      />
      <UIBaseCheckboxSlide
        v-if="!isSticky && hasCardsMoreThenOne"
        v-model="isHideDifferences"
        :value="true"
        class="compare__checkbox-slide compare__checkbox-slide_mobile"
        label="Показывать только отличия"
      />

      <div v-if="cards && !isEmpty(cards)" class="compare__sticky">
        <div
          class="compare__section compare__section_list"
          :class="{ compare__section_sticky: isSticky }"
        >
          <button
            v-show="showRightArrow"
            class="compare__button-slide compare__button-slide_right"
            @click="onRightSlide"
          >
            <IconArrow class="compare__icon-arrow" right white />
          </button>
          <div class="compare__title-wrapper">
            <h2 class="compare__title">
              {{ typeOfTransportName.ru[activeSection] }}
            </h2>
            <button
              v-show="showLeftArrow"
              class="compare__button-slide compare__button-slide_left"
              @click="onLeftSlide"
            >
              <IconArrow class="compare__icon-arrow" left white />
            </button>
          </div>
          <template
            v-if="
              windowWidth === 'isDesktopSmall' || windowWidth === 'isDesktopBig'
            "
          >
            <transition-group
              :name="isBack ? 'slideback' : 'slide'"
              tag="div"
              class="compare__slider"
            >
              <CompareCard
                v-for="card in showedCards"
                :id="card.id"
                :key="card.id"
                :images="card.images"
                :status="card.isActive"
                :mark="card.mark"
                :window-width="windowWidth"
                :model="card.model"
                :modification="card.modification"
                :equipment="card.technicalInfo.equipment"
                :price="card.disprice"
                :is-sticky="isSticky"
                class="compare__card"
                @onRemoveCompareCar="onRemoveCompareCar(card.id)"
              />
            </transition-group>
          </template>
          <template v-else>
            <CompareCard
              v-for="card in [cards[activeCard.first]]"
              :id="card.id"
              :key="card.id"
              :active-card="activeCard.first"
              active-card-name="first"
              :cards-length="cards.length"
              :images="card.images"
              :status="card.isActive"
              :mark="card.mark"
              :window-width="windowWidth"
              :model="card.model"
              :modification="card.modification"
              :equipment="card.technicalInfo.equipment"
              :price="card.disprice"
              :is-sticky="isSticky"
              class="compare__card"
              @onRemoveCompareCar="onRemoveCompareCar(card.id)"
              @changeActiveCard="changeActiveCard"
            />
            <template v-if="cards.length > 1">
              <CompareCard
                v-for="card in [cards[activeCard.second]]"
                :id="card.id"
                :key="card.id"
                :active-card="activeCard.second"
                active-card-name="second"
                :cards-length="cards.length"
                :images="card.images"
                :status="card.isActive"
                :mark="card.mark"
                :window-width="windowWidth"
                :model="card.model"
                :modification="card.modification"
                :equipment="card.technicalInfo.equipment"
                :price="card.disprice"
                :is-sticky="isSticky"
                class="compare__card"
                @onRemoveCompareCar="onRemoveCompareCar(card.id)"
                @changeActiveCard="changeActiveCard"
              />
            </template>
          </template>
          <template v-if="cards.length > 2 && windowWidth === 'isTablet'">
            <CompareCard
              v-for="card in [cards[activeCard.third]]"
              :id="card.id"
              :key="card.id"
              :active-card="activeCard.third"
              active-card-name="third"
              :cards-length="cards.length"
              :images="card.images"
              :status="card.isActive"
              :mark="card.mark"
              :window-width="windowWidth"
              :model="card.model"
              :modification="card.modification"
              :equipment="card.technicalInfo.equipment"
              :price="card.disprice"
              :is-sticky="isSticky"
              class="compare__card"
              @onRemoveCompareCar="onRemoveCompareCar(card.id)"
              @changeActiveCard="changeActiveCard"
            />
          </template>
        </div>
      </div>
      <UIBaseAccordion
        v-for="(
          groupedCharacteristic, groupedCharacteristicName
        ) in groupedCharacteristics"
        :key="groupedCharacteristicName"
        :init-expand="!cards[0].schema[groupedCharacteristicName]"
        class="compare__accordion"
        :class="{
          compare__accordion_hide: isEmptyObject(groupedCharacteristic),
        }"
        :label="getLabel(cards[0].schema[groupedCharacteristicName])"
      >
        <template
          v-if="windowWidth === 'isDesktopSmall' || windowWidth === 'isDesktopBig' "
        >
          <ul class="compare__list">
            <!--              <transition-group-->
            <!--                :name="isBack ? 'slideback' : 'slide'"-->
            <!--                tag="ul"-->
            <!--                class="compare__list"-->
            <!--              >-->
            <li
              v-for="(
                groupedCharacteristicItem, groupedCharacteristicItemName
              ) in removeEmptyCharacteristics(groupedCharacteristic)"
              :key="groupedCharacteristicItemName"
              class="compare__item"
            >
              <h3 class="compare__subtitle">
                {{
                  characteristicsWithSchema[groupedCharacteristicName].schema[
                    groupedCharacteristicItemName
                  ]
                }}
              </h3>
              <transition-group
                name="slide"
                tag="div"
                class="compare__value-container"
              >
                <p
                  v-for="card in showedCards"
                  :key="card.id"
                  class="compare__value"
                >
                  {{
                    createCharacteristicItem(
                      card[groupedCharacteristicName][
                        groupedCharacteristicItemName
                      ],
                      groupedCharacteristicItemName
                    )
                  }}
                </p>
              </transition-group>
            </li>
            <!--              </transition-group>-->
          </ul>
        </template>
        <template v-else>
          <ul class="compare__list">
            <li
              v-for="(
                groupedCharacteristicItem, groupedCharacteristicItemName
              ) in removeEmptyCharacteristics(groupedCharacteristic)"
              :key="groupedCharacteristicItemName"
              class="compare__item"
            >
              <h3 class="compare__subtitle">
                {{
                  characteristicsWithSchema[groupedCharacteristicName].schema[
                    groupedCharacteristicItemName
                  ]
                }}
              </h3>
              <p
                v-for="card in [cards[activeCard.first]]"
                :key="card.id"
                class="compare__value"
              >
                {{
                  createCharacteristicItem(
                    card[groupedCharacteristicName][
                      groupedCharacteristicItemName
                    ],
                    groupedCharacteristicItemName
                  )
                }}
              </p>
              <template v-if="cards.length > 1">
                <p
                  v-for="card in [cards[activeCard.second]]"
                  :key="card.id"
                  class="compare__value"
                >
                  {{
                    createCharacteristicItem(
                      card[groupedCharacteristicName][
                        groupedCharacteristicItemName
                      ],
                      groupedCharacteristicItemName
                    )
                  }}
                </p>
              </template>
              <template v-if="windowWidth === 'isTablet' && cards.length > 2">
                <p
                  v-for="card in [cards[activeCard.third]]"
                  :key="card.id"
                  class="compare__value"
                >
                  {{
                    createCharacteristicItem(
                      card[groupedCharacteristicName][
                        groupedCharacteristicItemName
                      ],
                      groupedCharacteristicItemName
                    )
                  }}
                </p>
              </template>
            </li>
          </ul>
        </template>
      </UIBaseAccordion>
      <CompareEmptyBlock
        v-if="!loading && isEmpty(this[activeSection])"
        :title="`Нет ${typeOfTransportName.noItem[activeSection]} для сравнения`"
        :link-href="`/${activeSection}/`"
      />
      <UILoader v-if="loading" class="compare__loader" />
    </main>
  </UIBody>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useHoldingStore } from '../../store/holding'
import { useCompareStore } from '../../store/compare'
import { getCard } from '@/api/routes/catalog'

const CARS = 'Автомобили'
const MOTO = 'Мотоциклы'
const ATV = 'Квадроциклы'
const JETSKI = 'Гидроциклы'

export default {
  name: 'PageCompare',
  data () {
    return {
      CARS,
      MOTO,
      ATV,
      JETSKI,
      cards: [],
      cars: [],
      moto: [],
      atv: [],
      'jet-ski': [],
      compareCars: '',
      compareAtv: '',
      compareMoto: '',
      compareJetSki: '',
      windowWidth: null,
      isSticky: false,
      activeSlide: 1,
      isHideDifferences: true,
      loading: true,
      activeSection: this.$route.query.section || 'cars',
      typeOfTransportName: {
        noItem: {
          cars: 'автомобилей',
          moto: 'мотоциклов',
          atv: 'квадроциклов',
          'jet-ski': 'гидроциклов',
        },
        en: {
          cars: 'Cars',
          moto: 'Moto',
          atv: 'Atv',
          'jet-ski': 'JetSki',
        },
        ru: {
          cars: CARS,
          moto: MOTO,
          atv: ATV,
          'jet-ski': JETSKI,
        },
      },
      sections: [
        {
          label: CARS,
          slug: 'cars',
          isActive:
            this.$route.query.section === 'cars' || !this.$route.query.section,
        },
        {
          label: ATV,
          slug: 'atv',
          isActive: this.$route.query.section === 'atv',
        },
        ...(this.$config.public.domain === 'avtodom'
          ? [
              {
                label: MOTO,
                slug: 'moto',
                isActive: this.$route.query.section === 'moto',
              },
              {
                label: JETSKI,
                slug: 'jet-ski',
                isActive: this.$route.query.section === 'jet-ski',
              },
            ]
          : []),
      ],
      activeCard: {
        first: 0,
        second: 1,
        third: 2,
      },
      isBack: false,
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: this.title,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: this.description,
        },
      ],
    }
  },
  fetchOnServer: false,
  computed: {
    title () {
      return `Сравнение моделей в наличии | ${this.holdingName}`
    },
    description () {
      return 'Воспользуйтесь сравнением транспортных средств | Если у вас остались вопросы, закажите обратный звонок и наши менеджеры свяжутся с вами в течении 5 минут'
    },
    hasSomeCards () {
      return [...this.cars, ...this.atv, ...this.moto, ...this['jet-ski']].length > 0
    },
    groupedCharacteristics () {
      if (this.cards && this.cards[0]) {
        if (this.isHideDifferences) {
          return { ...this.characteristicsDifference }
        } else {
          return this.characteristicsWithSchema
        }
      }
      return null
    },
    hasCardsMoreThenOne () {
      return this.cards?.length > 1
    },
    maxSlide () {
      return this.calcLength + 1 - this.countShowedCards
    },
    calcLength () {
      return this.cards.length + 1
    },
    showLeftArrow () {
      return this.activeSlide > 1
    },
    showRightArrow () {
      return this.activeSlide < this.maxSlide - 1
    },
    countShowedCards () {
      const countDesktopBig = 4
      const countDesktopSmall = 3

      if (this.windowWidth) {
        return this.windowWidth === 'isDesktopBig'
          ? countDesktopBig
          : countDesktopSmall
      }
      return countDesktopBig
    },
    isDesktop () {
      if (this.windowWidth) {
        return (
          this.windowWidth === 'isDesktopBig' ||
          this.windowWidth === 'isDesktopSmall'
        )
      }
      return null
    },
    characteristicsWithSchema () {
      const {
        technicalInfo,
        body,
        engine,
        performanceIndicators,
        suspensionAndBrakes,
        transmissionAndControl,
      } = this.cards[0]

      return {
        technicalInfo,
        engine,
        body,
        suspensionAndBrakes,
        transmissionAndControl,
        performanceIndicators,
      }
    },
    characteristicsDifference () {
      if (this.isHideDifferences && this.cards) {
        const characteristics = this.cards.map((item) => {
          const {
            technicalInfo,
            body,
            engine,
            performanceIndicators,
            suspensionAndBrakes,
            transmissionAndControl,
          } = item
          return {
            technicalInfo,
            body,
            engine,
            suspensionAndBrakes,
            transmissionAndControl,
            performanceIndicators,
          }
        })
        return this.hideDifferenceCards(characteristics)
      }
      return null
    },
    showedCards () {
      const localCards = [...this.cards]
      const startSplice = this.activeSlide - 1

      if (this.isDesktop) {
        return localCards.splice(startSplice, this.countShowedCards)
      }
      return localCards
    },
    compareName () {
      return `compare${this.typeOfTransportName.en[this.activeSection]}`
    },
    ...mapState(useHoldingStore, ['isAvtodom', 'isAsc', 'holdingName', 'domain']),
  },
  watch: {
    activeSection (label) {
      this.cards = [...this[label]]
      this.activeCard = {
        first: 0,
        second: 1,
        third: 2,
      }
      this.goToSlide(1)
    },
    cards: {
      handler () {
        this.sections[0].label = this.labelSection('cars')
        this.sections[1].label = this.labelSection('atv')
        if (this.isAvtodom) {
          this.sections[2].label = this.labelSection('moto')
          this.sections[3].label = this.labelSection('jet-ski')
        }
      },
      deep: true,
      immediate: true,
    },
  },
  async mounted () {
    this.loading = true

    await this.fetchCards()
    this.setInitIsActiveSections()
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    this.windowWidth = this.matchMedia()

    this.loading = false
  },
  methods: {
    async fetchCards () {
      for (const name in this.typeOfTransportName.en) {
        const typeOfTransportNameEn = this.typeOfTransportName.en[name]
        try {
          this[`compare${typeOfTransportNameEn}`] =
            JSON.parse(
              localStorage.getItem(`compare${typeOfTransportNameEn}`),
            ) ?? []
        } catch (e) {
          this[`compare${typeOfTransportNameEn}`] = []
        }
        const raw = await this.getRawWithPromiseStatusTC(
          this[`compare${typeOfTransportNameEn}`],
        )
        this[name] = this.getCards(raw)
      }

      this.cards = [...this[this.activeSection]]
    },
    setInitIsActiveSections () {
      for (const name in this.typeOfTransportName.en) {
        const typeOfTransportNameEn = this.typeOfTransportName.en[name]
        if (this[`compare${typeOfTransportNameEn}`].length > 0) {
          const sections = this.sections.map((section) => {
            if (section.slug === name) {
              return {
                ...section,
                isActive: true,
              }
            }
            return {
              ...section,
              isActive: false,
            }
          })
          this.onChangeSections(sections)
          break
        }
      }
    },
    onChangeSections (data) {
      const item = data.find(item => item.isActive)
      if (item) {
        this.sections.forEach((btn) => {
          btn.isActive = btn.slug === item.slug
        })

        this.activeSection = item.slug
        this.changeQuery(item.slug)
      }
    },
    labelSection (code) {
      const title = this.typeOfTransportName.ru[code]
      const count = !this.isEmpty(this[code]) ? this[code].length : ''
      return `${title} ${count}`
    },
    isEmpty (name) {
      return name && name.length === 0
    },
    isEmptyObject (obj) {
      return Object.values(obj).length === 0
    },
    getLabel (label) {
      return label || 'Основные характеристики'
    },
    differenceBetweenTwoObjects (origObj, newObj) {
      const changes = (newObj, origObj) => {
        let arrayIndexCounter = 0
        return useTransform(newObj, (result, value, key) => {
          let valueOnSet
          if (origObj[key] && !useIsEqual(value, origObj[key])) {
            valueOnSet = 'diff'
          } else {
            valueOnSet = value
          }
          const resultKey = useIsArray(origObj) ? arrayIndexCounter++ : key
          result[resultKey] =
            useIsObject(value) && useIsObject(origObj[key])
              ? changes(value, origObj[key])
              : valueOnSet
        })
      }
      return changes(newObj, origObj)
    },
    hideDifferenceCards (cards) {
      const firstCard = cards[0]
      const restCards = cards.slice(1)
      const difference = restCards.reduce((sum, cur) => {
        // Простановка разницы первой карточки со всеми остальными
        return this.differenceBetweenTwoObjects(sum, cur)
      }, firstCard)

      // Удаление одинаковых значений
      for (const group in difference) {
        for (const item in difference[group]) {
          // удаление лишнего
          switch (item) {
            case 'exteriorImporterCode':
            case 'interiorImporterCode':
            case 'dealerId':
              delete difference[group][item]
          }
          if (difference[group][item] !== 'diff') {
            delete difference[group][item]
          }
        }
      }

      return difference
    },
    createCharacteristicItem (value, key) {
      if (value) {
        switch (key) {
          case 'exteriorImporterCode':
          case 'interiorImporterCode':
          case 'dealerId':
            return
          default:
            return value
        }
      } else if (!value) {
        switch (key) {
          case 'exteriorImporterCode':
          case 'interiorImporterCode':
          case 'dealerId':
            return
        }
      }
      return '—'
    },
    removeEmptyCharacteristics (path) {
      const withoutSchema = this.removeSchema({ ...path })

      for (const item in withoutSchema) {
        if (!withoutSchema[item]) {
          delete withoutSchema[item]
        }
      }

      return withoutSchema
    },
    removeSchema (obj) {
      const newObj = { ...obj }

      delete newObj.schema

      return newObj
    },
    onRightSlide () {
      this.isBack = false
      this.goToSlide(this.activeSlide + 1)
    },
    onLeftSlide () {
      this.isBack = true
      this.goToSlide(this.activeSlide - 1)
    },
    goToSlide (number) {
      const min = 0
      if (number <= min) {
        this.activeSlide = 1
      } else if (this.maxSlide > number) {
        this.activeSlide = number
      }
    },
    changeActiveCard ({ position, name }) {
      if (position >= 0 && position < this.cards.length) {
        this.activeCard[name] = position
      }
    },
    handleScroll () {
      const stickyY = 380
      const scrollY = window.scrollY + 300

      this.isSticky = scrollY > stickyY
    },
    matchMedia () {
      const isTablet = window.matchMedia(
        '(min-width: 600px) and (max-width: 1100px)',
      ).matches
      const isDesktopSmall = window.matchMedia(
        '(min-width: 1101px) and (max-width: 1366px)',
      ).matches
      const isDesktopBig = window.matchMedia('(min-width: 1367px)').matches

      switch (true) {
        case isTablet:
          return 'isTablet'
        case isDesktopSmall:
          return 'isDesktopSmall'
        case isDesktopBig:
          return 'isDesktopBig'
        default:
          return 'isMobile'
      }
    },
    onRemoveCompareCar (id) {
      this.removeCompare({ id, name: this.compareName })
      const filteredCards = this.cards.filter(card => card.id !== id)
      if (this.activeSlide < this.maxSlide) {
        this.goToSlide(this.activeSlide - 1)
      }
      this.cards = filteredCards
      if (this.compareName === 'compareMoto') {
        this.moto = filteredCards
        this.sections[2].label = this.labelSection('moto')
      } else if (this.compareName === 'compareJetSki') {
        this['jet-ski'] = filteredCards
        this.sections[3].label = this.labelSection('jet-ski')
      } else if (this.compareName === 'compareAtv') {
        this.atv = filteredCards
        this.sections[1].label = this.labelSection('atv')
      } else {
        this.cars = filteredCards
        this.sections[0].label = this.labelSection('cars')
      }
    },
    getCards (card) {
      return card.filter(item => item.value).map(item => item.value)
    },
    changeQuery (section) {
      this.$router.push({
        query: {
          section,
        },
      })
    },
    async getRawWithPromiseStatusTC (ids) {
      const { $fetchClient } = useNuxtApp()
      return await Promise.allSettled(
        ids.map(async (item) => {
          const transport = await $fetchClient(getCard(item))
          return transport.data
        }),
      ).catch(() => {
        return []
      })
    },
    ...mapActions(useCompareStore, {
      removeCompare: 'removeCompare',
    }),
    beforeUnmount () {
      window.removeEventListener('scroll', this.handleScroll)
    },
  },
}
</script>

<style lang="scss" scoped>
@mixin listGrid {
  display: grid;
  grid-template-rows: min-content;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: column;
  row-gap: 10px;
  column-gap: 25px;

  @include mq($bp-small-medium) {
    column-gap: 27px;
  }

  @include mq($bp-small) {
    grid-template-columns: repeat(3, 1fr);
  }

  @include mq($bp-medium) {
    row-gap: 50px;
    column-gap: 35px;
  }

  @include mq($bp-medium-big) {
    grid-template-columns: 1fr 3fr;
    row-gap: 60px;
    column-gap: 40px;
  }

  @include mq($bp-big) {
    grid-template-columns: 1fr 5fr;
    row-gap: 70px;
  }
}

.compare {
  &__main {
    position: relative;
    display: flex;
    flex-direction: column;
    height: fit-content;
  }

  &__title {
    background-color: var(--grayLight);

    @include mq($bp-small) {
      background-color: inherit;
    }

    @include mq($bp-medium) {
      @include h4;
    }

    &-wrapper {
      position: relative;
      display: none;

      @include mq($bp-medium) {
        display: block;
      }
    }
  }

  &__subtitle {
    @include text_medium_small;

    grid-column: 1/3;
    height: 100%;
    padding-left: 15px;
    margin: 0 -15px;
    word-break: break-word;
    background-color: var(--grayLight);

    @include mq($bp-small-medium) {
      padding-left: 20px;
      margin: 0 -20px;
    }

    @include mq($bp-small) {
      grid-column: 1/4;
      padding-left: 31px;
      margin: 0 -31px;
    }

    @include mq($bp-medium) {
      grid-column: initial;
      padding: 20px;
      margin: 0;
    }
  }

  &__slider {
    position: relative;
    display: grid;
    grid-auto-flow: column;
    overflow: hidden;
    transition: all 1s;

    @include mq($bp-medium-big) {
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 30px;
    }

    @include mq($bp-big) {
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 40px;
    }
  }

  &__sticky {
    position: sticky;
    top: 70px;
    z-index: 1;
    padding-top: 30px;
    background-color: white;

    @include mq($bp-medium) {
      padding-top: 50px;
    }

    @include mq($bp-medium-big) {
      top: 60px;
      padding-top: 60px;
    }
  }

  &__button-slide {
    display: none;

    @include mq($bp-medium-big) {
      position: absolute;
      top: 50%;
      z-index: 1;
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      padding: 8px;
      background: var(--black);
      border-radius: 100px;

      &_left {
        right: -25px;
      }

      &_right {
        right: 0;
      }
    }
  }

  &__section {
    @include listGrid;

    @include mq($bp-medium, $bp-medium-big) {
      grid-template-columns: repeat(4, 1fr);
    }

    &_pagintaion {
      margin-bottom: 25px;
      border-top: 1px solid var(--grayMediumLight);

      @include mq($bp-small) {
        grid-template-columns: repeat(4, 1fr);
        margin-bottom: 30px;
      }

      @include mq($bp-medium-big) {
        margin-bottom: 40px;
      }
    }

    &_list {
      width: 100%;
      padding-bottom: 30px;
      border-bottom: 1px solid var(--grayMediumLight);

      @include mq($bp-medium) {
        padding-right: 55px;
        padding-bottom: 20px;
      }

      @include mq($bp-medium-big) {
        padding-bottom: 30px;
      }
    }

    &_sticky {
      padding-bottom: 10px;

      @include mq($bp-medium) {
        padding-bottom: 20px;
      }

      @include mq($bp-medium-big) {
        padding-bottom: 30px;
      }
    }
  }

  &__pagination {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    &-value {
      @include text_medium_regular;
    }
  }

  &__list {
    display: grid;
    grid-gap: 30px;
    height: fit-content;
    padding: 15px 0 0;

    @include mq($bp-medium) {
      grid-gap: 0;
      padding-top: 25px;
      padding-right: 55px;
    }
  }

  &__item {
    @include listGrid;

    grid-template-areas:
      'subtitle subtitle'
      'value value';
    align-items: flex-start;

    @include mq($bp-small) {
      grid-template-areas:
        'subtitle subtitle subtitle'
        'value value value';
    }

    @include mq($bp-medium) {
      grid-template-areas: none;
      grid-auto-flow: row;
    }

    @include mq($bp-medium, $bp-medium-big) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__value {
    @include text_medium_regular;

    color: var(--blackLight);

    @include mq($bp-medium) {
      padding: 20px 0;
    }

    &-container {
      position: relative;
      display: grid;
      grid-auto-flow: column;
      overflow: hidden;

      @include mq($bp-medium, $bp-medium-big) {
        padding-right: 55px;
      }

      @include mq($bp-medium-big) {
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 30px;
      }

      @include mq($bp-big) {
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 40px;
      }
    }
  }

  &__icon {
    &_arrow {
      width: 24px;
      height: 24px;
    }
  }

  &__tabs {
    width: 100%;
  }

  &__header :deep(.header__title) {
    @include mq($bp-medium-big) {
      margin-bottom: 30px;
    }

    @include mq($bp-big) {
      margin-bottom: 30px;
    }
  }

  &__select-buttons {
    &_hide {
      opacity: 0;
    }
  }

  &__checkbox-slide {
    &_header {
      position: absolute !important;
      z-index: 1;
      display: none;
      visibility: hidden;
      opacity: 0;

      @include mq($bp-medium) {
        position: inherit;
        top: 9px;
        right: 0;
        left: inherit;
        display: block;
        visibility: visible;
        opacity: 1;
      }
    }

    &_mobile {
      display: block;
      padding: 20px 0 0;

      @include mq($bp-small-medium) {
        padding: 40px 0 20px;
      }

      @include mq($bp-medium) {
        display: none !important;
      }
    }
  }

  &__loader {
    margin: 50px auto !important;
  }

  &__accordion {
    border-bottom: 1px solid var(--grayMediumLight);

    &_hide {
      display: none;
    }

    & :deep(.accordion__label) {
      grid-gap: 13px;
      padding: 20px 0;

      @include mq($bp-medium) {
        padding: 40px 55px 50px 0;
      }

      @include mq($bp-medium-big) {
        padding: 50px 55px 50px 0;
      }

      @include mq($bp-small) {
        justify-content: flex-start;
        width: 100%;
      }

      @include mq($bp-medium) {
        grid-gap: 30px;
        padding-left: 20px;
      }
    }
  }
}
</style>
