<template>
  <Head>
    <Title>{{ seoTitle }}</Title>
    <Meta
      name="description"
      :content="seoDescription"
    />
    <Meta name="og:description" :content="seoDescription" />
    <Meta name="og:title" :content="seoTitle" />
  </Head>
  <main class="page-trade-in">
    <UIBreadcrumbs
      :direct-crumbs="directCrumbs"
      class="page-trade-in__section page-trade-in__section_indent_padding page-trade-in__breadcrumbs"
    />
    <div class="page-trade-in__content">
      <div v-if="!isMainPage" class="page-trade-in__section page-trade-in__section_indent_padding">
        <h1 v-if="modelTitle || markTitle" class="page-trade-in__title">
          {{ modelTitle || markTitle }}
        </h1>
        <div
          v-if="positionOne?.content"
          class="page-trade-in__html"
          v-html="positionOne.content"
        />
      </div>
      <div v-if="(state === 'mark' && models?.length) || isMainPage" class="page-trade-in__section page-trade-in__section_indent_padding">
        <template v-if="isMainPage">
          <h1 class="page-trade-in__title">
            {{ seoH1 }}
          </h1>
          <template v-if="isAvtodom">
            <p class="page-trade-in__text">
              Автосалоны АВТОДОМ выполняют выкуп авто в Москве, Московской области и
              Санкт-Петербурге / ЦФО любых марок/моделей отечественного и
              зарубежного производства независимо от пробега и года выпуска.
              Осуществляется покупка машин, находящихся в лизинге, кредите.
            </p>
            <br>
            <p class="page-trade-in__text">
              Срочный выкуп авто выполняется по максимально приближенной рыночной
              стоимости. Между сторонами заключается договор купли-продажи, что
              гарантирует безопасность сделки. Вам не потребуется тратить время на
              поиски покупателя, размещать объявление, встречаться с потенциальными
              покупателями, а также в дальнейшем заниматься бумажной волокитой. Все
              организационные вопросы, в том числе и юридическое сопровождение
              сделки, специалисты нашей компании возьмут на себя.
            </p>
          </template>
          <p v-if="isAsc" class="page-trade-in__text">
            Компания «АвтоСпецЦентр» рассматривает предложения по выкупу подержанных
            автомобилей любых марок. Место регистрации транспортного средства не
            имеет принципиального значения — Москва, Московская область, регионы
            России. Если автомобиль зарегистрирован с соблюдением процедуры, мы
            предложим вам срочный выкуп по справедливой цене. Для продавцов авто нет
            жёстких ограничений по пробегу, дате выпуска и техническому состоянию
            автомобилей. Наши клиенты могут рассчитывать на выплату до 95% от
            стоимости авто с пробегом. Тем не менее, важно понимать, что любые
            технические неисправности и внешние повреждения учитываются при
            экспресс-диагностике и принимаются во внимание при расчёте суммы выкупа.
          </p>
        </template>
        <TradeInBlockSelectModel
          v-else-if="state === 'mark' && models?.length"
          :title="seoStaticPage.h2.markDefault"
          :models="models"
        />
      </div>
      <TradeInBlockSelectMark
        v-if="state === 'default' && marks?.length"
        :brands="marks"
        class="page-trade-in__section page-trade-in__section_indent_padding"
      />
      <p
        v-if="isMainPage && isAsc"
        class="page-trade-in__section page-trade-in__section_indent_padding page-trade-in__text"
      >
        Чтобы получить лучшую цену при продаже, обслуживайте автомобиль в
        официальном сервисном центре по регламенту марки с внесением записей в
        сервисную книжку. При выполнении ремонта после ДТП желательно
        использовать оригинальные, а не совместимые запчасти. Оригинальное
        лакокрасочное покрытие с небольшими повреждениями будет оценено выше,
        чем свежеперекрашенный кузов. В целом, если вы регулярно проходили ТО
        по регламенту марки и не попадали в ДТП, то можете рассчитывать на
        выкуп автомобиля дорого.
      </p>
      <div v-if="isAvtodom" class="page-trade-in__section page-trade-in__section_indent_padding">
        <h2 class="page-trade-in__title">
          Особенности покупки авто
        </h2>
        <p class="page-trade-in__text">
          После детального осмотра авто в любом состоянии проводится честная
          оценка и автовладельцу будет предложена сумма, приближенная к
          рыночной. Благодаря услугам срочного выкупа продать машину по высокой
          цене можно в течение нескольких часов и сразу получить деньги. При
          необходимости эксперт выезжает по указанному адресу для проведения
          оценки транспортного средства на месте. Чтобы воспользоваться услугой,
          наберите указанный на сайте номер телефона или заполните электронную
          форму. Также оценка может выполняться по предоставленным фотографиям
          или видео.
        </p>
      </div>
      <ServicesFormTradeIn class="page-trade-in__section page-trade-in__section_indent_margin" />
      <TradeInBlockDocuments class="page-trade-in__section page-trade-in__section_indent_padding" />
      <p
        v-if="isMainPage && isAvtodom"
        class="page-trade-in__section page-trade-in__section_indent_padding page-trade-in__text"
      >
        Если хотите быстро продать автомобиль без риска мошеннических схем и
        потребности решать организационные вопросы, тогда обращайтесь к нам.
        Наша компания занимается выкупом автомобилей в Москве и МО на выгодных
        условиях. Работаем с физическими и юридическими лицами. После
        оформления заявки, выполняется предварительная оценка авто в
        телефонном режиме. Затем эксперт на месте называет точную стоимость,
        оформляется пакет документов и производится оплата.
      </p>
      <TradeInBlockWhichWeBuy
        :mark="markNameEn"
        :mark-ru="markNameRu"
        :model="modelNameEn"
        :state="state"
        :position-two="positionTwo"
        class="page-trade-in__section page-trade-in__section_indent_padding"
      />
      <div v-if="positionThree?.title || positionThree?.content" class="page-trade-in__section page-trade-in__section_indent_padding">
        <h2 class="page-trade-in__title" v-html="positionThree.title" />
        <div class="page-trade-in__html" v-html="positionThree.content" />
      </div>
      <AdvantagesBlock
        :cards="advantages.cards"
        :title="advantages.title"
        :position-four="positionFour"
        class="page-trade-in__section page-trade-in__section_advantages page-trade-in__section_indent_padding"
      />
      <TradeInBlockMap
        v-if="dealers?.length"
        class="page-trade-in__section page-trade-in__section_indent_padding"
        :dealers="dealers"
      />
      <FeedbackBlock
        class="page-trade-in__section page-trade-in__section_indent_padding"
        form-id="form_trade-in_question"
      />
      <TradeInBlockCommission
        :mark-name-en="markNameEn"
        :mark-name-ru="markNameRu"
        :model-name-en="modelNameEn"
        :model-name-ru="modelNameRu"
        class="page-trade-in__section page-trade-in__section_indent_padding"
      />
    </div>
  </main>
  <LazyFormPanelTradeIn form-id="form_tradeIn" />
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useFormStore } from '@/store/form'
import { useHoldingStore } from '@/store/holding'
import { getDealers } from '@/api/routes/dealer'

export default defineNuxtComponent({
  name: 'TradeInPage',
  props: {
    marks: {
      type: Array,
      required: true,
    },
    models: {
      type: Array,
      required: false,
      default: () => [],
    },
    dataMark: {
      type: Object,
      required: false,
      default: null,
    },
    dataModel: {
      type: Object,
      required: false,
      default: null,
    },
    staticData: {
      type: Object,
      required: false,
      default: null,
    },
    tradeinStaticPageId: {
      type: Array,
      required: false,
      default: () => [],
    },
    seo: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data () {
    return {
      dealers: [],
      staticPageId: '',
      positionStaticData: null,
      positionOne: null,
      positionTwo: null,
      positionThree: null,
      positionFour: null,
      seoH1: '',
      seoTitle: '',
      seoDescription: '',
      seoMarkBreadcrump: '',
      seoModelBreadcrump: '',
      markTitle: '',
      modelTitle: '',
    }
  },
  computed: {
    isMainPage () {
      return this.state !== 'mark' && this.state !== 'model'
    },
    seoStaticPage () {
      return {
        h1: {
          avtodom: {
            default: 'Срочный выкуп авто',
            mark: this.seoH1,
            model: this.seoH1,
          },
          asc: {
            default: 'Выкуп автомобилей с пробегом в Москве',
            mark: this.seoH1,
            model: this.seoH1,
          },
        },
        h2: {
          markDefault: `Выкуп автомобилей ${this.markNameEn} по моделям`,
          avtodom: {
            default: 'Выкуп автомобилей',
            mark: `Выкуп автомобилей ${this.markNameEn} по моделям`,
            model: '',
          },
          asc: {
            default: 'Выкуп автомобилей с пробегом в Москве',
            mark: `Выкупим автомобиль ${this.markNameEn} в день обращения`,
            model: '',
          },
        },
      }
    },
    currentMark () {
      const markCode = this.$route.params.mark
      if (this.dataMark !== null) {
        const code = this.dataMark.data.code ?? ''
        if (markCode === code) {
          return this.dataMark.data ?? ''
        }
      }
      return ''
    },
    currentModel () {
      const model = this.$route.params.model
      if (model && this.dataModel !== null) {
        return this.dataModel.data ?? ''
      }
      return ''
    },
    markNameEn () {
      return this.currentMark?.nameEn ?? ''
    },
    markNameRu () {
      return this.currentMark?.nameRu ?? ''
    },
    modelNameEn () {
      return this.currentModel?.nameEn ?? ''
    },
    modelNameRu () {
      return this.currentModel?.nameRu ?? ''
    },
    directCrumbs () {
      const seoBreadcrumb = this.seo.seoBreadcrumb && this.state === 'mark' ? this.seo.seoBreadcrumb : ''
      const markName = this.seoMarkBreadcrump || seoBreadcrumb || this.markNameEn || ''
      const modelName = this.seoModelBreadcrump || this.seo.seoBreadcrumb || this.modelNameEn || ''

      return ['', '', markName, modelName]
    },
    state () {
      const {
        mark,
        model,
      } = this.$route.params
      if (model) {
        return 'model'
      } else if (mark) {
        return 'mark'
      } else {
        return 'default'
      }
    },

    advantages () {
      return {
        title: `Преимущеcтва выкупа авто в ${this.holdingName}`,
        cards: [
          {
            iconComponent: 'IconProtection',
            title: 'Безопасность',
            description: 'Юридическую чистоту сделки берем на себя',
          },
          {
            iconComponent: 'IconLegalScale',
            title: 'Справедливая цена',
            description: 'Предлложим конкурентную цену по рынку',
          },
          {
            iconComponent: 'IconWallet',
            title: 'Дополнительная выгода',
            description: 'Дополнительная выгода при покупке нового автомобиля',
          },
          {
            iconComponent: 'IconSpeedDashboard',
            title: 'Скорость',
            description: 'Деньги в день сделки наличными или на карту',
          },
        ],
      }
    },
    ...mapState(useHoldingStore, ['domain', 'holdingName', 'isAvtodom', 'isAsc']),
  },
  created () {
    this.setSeo()
    this.setPositionStaticData()
    this.markTitle = this.getMarkTitle()
    this.modelTitle = this.getModelTitle()
  },
  async mounted () {
    this.dealers = await this.getDealers()
  },
  methods: {
    getMarkTitle () {
      if (this.dataMark?.data?.seoH1 === '') {
        if (this.state === 'mark' && this.isAvtodom) { return this.seoH1 }
        if (this.state === 'mark' && this.isAsc && !this.seoH1) { return this.seoStaticPage.h1.asc.mark }
        if (this.state === 'mark' && this.isAsc && this.seoH1) { return this.seoH1 }
        if (this.state === 'model') { return this.seoH1 }
        return this.seoH1
      }
      return this.dataMark?.data?.seoH1 ?? null
    },
    getModelTitle () {
      if (this.dataModel?.data?.seoH1 === '') {
        if (this.state === 'model') { return this.seoH1 }
        return this.seoH1
      }
      return this.dataModel?.data?.seoH1 ?? null
    },
    setSeo () {
      if (this.state === 'model') {
        return this.setSeoModel()
      } else if (this.state === 'mark') {
        return this.setSeoMark()
      } else if (this.state === 'default') {
        return this.setSeoDefault()
      }
    },
    setSeoMark () {
      const { seoH1, seoTitle, seoDescription, seoBreadcrump: seoBreadcrumb, staticPagesId } = this.dataMark.data
      const seoDefault = {
        avtodom: {
          seoH1: `Срочный выкуп ${this.markNameEn}`,
          seoTitle: `Срочный выкуп ${this.markNameEn} в Москве и Санкт-Петербурге дорого - ${this.holdingName}`,
          seoDescription: `Покупаем Ваш автомобиль ${this.markNameEn} дорого и быстро! Выкуп ${this.markNameEn} на выгодных для вас условиях! Оплата 100%!`,
        },
        asc: {
          seoH1: `Продать ${this.markNameEn} с пробегом`,
          seoTitle: `Выкуп автомобилей ${this.markNameEn} в Москве - ${this.holdingName}`,
          seoDescription: `Скупка автомобилей ${this.markNameEn} в дилерских центрах ${this.holdingName} в Москве. Продайте старый ${this.markNameRu} по цене не ниже рыночной. Срочно выкупим ваше авто с пробегом в любом состоянии. Гарантия чистоты сделки.`,
        },
      }
      this.staticPageId = staticPagesId ?? ''
      this.seoH1 = seoH1 || this.seo?.seoH1 || seoDefault[this.domain].seoH1
      this.seoTitle = seoTitle || this.seo?.seoTitle || seoDefault[this.domain].seoTitle
      this.seoDescription = seoDescription || this.seo?.seoDescription || seoDefault[this.domain].seoDescription
      this.seoMarkBreadcrump = seoBreadcrumb || ''
    },
    setSeoModel () {
      const { seoH1, seoTitle, seoDescription, seoBreadcrump: seoBreadcrumb, staticPagesId } = this.dataModel.data
      const seoDefault = {
        avtodom: {
          seoH1: `Срочный выкуп ${this.markNameEn} ${this.modelNameEn}`,
          seoTitle: `Срочный выкуп ${this.markNameEn} ${this.modelNameEn} в Москве и Санкт-Петербурге дорого - ${this.holdingName}`,
          seoDescription: `Покупаем Ваш ${this.markNameEn} ${this.modelNameEn} дорого и быстро! Выкуп ${this.markNameEn} ${this.modelNameEn} на выгодных для вас условиях! Оплата 100%!`,
        },
        asc: {
          seoH1: `Продать ${this.markNameEn} ${this.modelNameEn} с пробегом`,
          seoTitle: `Выкуп автомобилей ${this.markNameEn} ${this.modelNameEn} в Москве - ${this.holdingName}`,
          seoDescription: `Скупка автомобилей ${this.markNameEn} ${this.modelNameEn} в дилерских центрах ${this.holdingName} в Москве. Продайте старый ${this.markNameRu} ${this.modelNameRu} по цене не ниже рыночной. Срочно выкупим ваше авто с пробегом в любом состоянии. Гарантия чистоты сделки.`,
        },
      }
      this.staticPageId = staticPagesId ?? ''
      this.seoH1 = seoH1 || this.seo?.seoH1 || seoDefault[this.domain].seoH1
      this.seoTitle = seoTitle || this.seo?.seoTitle || seoDefault[this.domain].seoTitle
      this.seoDescription = seoDescription || this.seo?.seoDescription || seoDefault[this.domain].seoDescription
      this.seoModelBreadcrump = seoBreadcrumb || ''
    },
    setSeoDefault () {
      const seoDefault = {
        avtodom: {
          seoH1: 'Выкуп автомобилей',
          seoTitle: `Срочный выкуп авто в Москве и Санкт-Петербурге дорого онлайн оценка автомобиля в компании ${this.holdingName}`,
          seoDescription: `Выкуп авто в Москве и Санкт-Петербурге на выгодных условиях за 30 минут! Профессиональная оценка вашего автомобиля от специалистов дилера ${this.holdingName}! Оплата 100%!`,
        },
        asc: {
          seoH1: 'Выкуп автомобилей с пробегом в Москве',
          seoTitle: `Срочный выкуп авто в Москве быстро - ${this.holdingName}`,
          seoDescription: `Скупка авто с пробегом в Москве в дилерских центрах ${this.holdingName}. Выкупим старый автомобиль по выгодной цене, близкой к рыночной. Выкуп автомобилей всех марок в любом состоянии`,
        },
      }

      this.seoH1 = this.seo?.seoH1 || seoDefault[this.domain].seoH1
      this.seoTitle = this.seo?.seoTitle || seoDefault[this.domain].seoTitle
      this.seoDescription = this.seo?.seoDescription || seoDefault[this.domain].seoDescription
    },

    // Set data into positions
    setPositionStaticData () {
      if (this.staticData) {
        const position = this.staticData.blocks

        position.forEach((item) => {
          if (item.position === '1') {
            this.positionOne = item
          }
          if (item.position === '2') {
            this.positionTwo = item
          }
          if (item.position === '3') {
            this.positionThree = item
          }
          if (item.position === '4') {
            this.positionFour = item
          }
        })
      }
    },

    async getDealers () {
      const { $fetchClient, $hasErrorResponse, $errorResponseCatch } = useNuxtApp()
      const res = await $fetchClient(getDealers())

      if ($hasErrorResponse(res)) {
        $errorResponseCatch(res)
      } else {
        return res?.data ?? null
      }
      return null
    },

    onOpenTradeInPanel () {
      this.onOpenPanel('isOpenTradeIn')
    },
    ...mapActions(useFormStore, {
      onOpenPanel: 'onOpen',
    }),
  },
})
</script>

<style scoped lang="scss">
@import 'assets/styles/indents/main';

.page-trade-in {
  @include indentsMainVertical;

  &__title {
    @include h5;

    margin-bottom: 20px;
    text-align: center;

    @include mq($bp-super-small) {
      @include h4;
    }

    @include mq($bp-small-medium) {
      @include h3;
    }

    @include mq($bp-medium) {
      @include h2;

      margin-bottom: 30px;
    }

    @include mq($bp-medium-big) {
      @include h1;
    }

    &:only-child {
      margin-bottom: 0;
    }
  }

  &__text {
    @include text_medium_regular;

    color: var(--blackLight);
    text-align: left;

    @include mq($bp-small-medium) {
      @include text_big_regular;
    }
  }

  &__html {
    @import 'assets/styles/components/Detail/html-style';
  }

  &__breadcrumbs {
    margin-bottom: 30px;

    @include mq($bp-medium) {
      margin-bottom: 40px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 60px;
    justify-content: flex-start;

    @include mq($bp-small) {
      grid-gap: 70px;
    }

    @include mq($bp-medium) {
      grid-gap: 80px;
    }

    @include mq($bp-medium-big) {
      grid-gap: 100px;
    }
  }

  &__section {
    &_indent_margin {
      @include indentsMainHorizontalMargin;
    }

    &_indent_padding {
      @include indentsMainHorizontal;
    }

    &_advantages {
      & :deep(.advantages__title) {
        @include h4;

        @include mq($bp-small-medium) {
          @include h3;
        }

        @include mq($bp-medium) {
          @include h2;
        }

        @include mq($bp-medium-big) {
          @include h1;
        }
      }
    }
  }

  &__button {
    margin: auto;
  }
}
</style>
