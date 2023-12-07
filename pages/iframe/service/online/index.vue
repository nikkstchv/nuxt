<template>
  <UIBody>
    <DetailMain class="detail">
      <template #body>
        <ServiceOnlineLayout
          ref="serviceOnline"
          is-open
          is-page
          is-iframe
          @submit="setData"
        />
      </template>
    </DetailMain>

    <LazyServiceFormPopup
      :user-phone="form?.userPhone"
      :user-email="form?.userEmail"
      :user-name="form?.userName"
      :user-comment="form?.userComment"
      :user-mark="form?.userMark"
      :user-model="form?.userModel"
      :user-date-time="form?.userDateTime"
      :dealer="form?.dealer"
      :client-guid="form?.guid"
      :additional-info="form?.additionalInfo"
      :route-key="form?.routeKey"
      is-iframe
      @end="clearData()"
    />
    <LazyFormPanelFeedbackService />
  </UIBody>
</template>

<script>
import { mapState } from 'pinia'
import { useHoldingStore } from '@/store/holding'

export default defineNuxtComponent({
  name: 'PageServiceTechnicalService',
  data () {
    return {
      form: null,
    }
  },
  setup () {
    definePageMeta({
      layout: 'clear',
    })
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
  computed: {
    title () {
      return `Онлайн запись на сервис ${this.holdingName}`
    },
    description () {
      return `Онлайн запись на сервис ${this.holdingName}`
    },
    ...mapState(useHoldingStore, ['holding']),
  },
  methods: {
    setData (data) {
      this.form = data
    },
    clearData () {
      this.form = null
      this.$refs.serviceOnline.clearData()
    },
  },
})
</script>

<style lang="scss" scoped>
.detail {
  padding: 35px 0;

  & :deep(.main__body) {
    width: 100%;
    max-width: 100% !important;

    @include mq($bp-small) {
      width: initial;
    }
  }
}
</style>
<style lang="scss">
body {
  .b24-widget-button-visible {
    display: none;
  }
}
</style>
