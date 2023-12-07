<template>
  <UIBaseOverlay :is-open="isOpenPopup" @click="handleClose()">
    <UISidePanel class="form__side-panel" :is-open="isOpenPopup">
      <div v-if="isOpenPopup" class="service-form-popup">
        <header class="service-form-popup__header">
          <h2 class="service-form-popup__title">
            Запись на сервис
          </h2>
          <IconClose class="service-form-popup__close" @click="handleClose()" />
        </header>

        <LazyServiceFormCode
          v-if="step === 1"
          class="service-form-popup__code"
          :user-phone="userPhone"
          :user-email="userEmail"
          :user-name="userName"
          :user-comment="userComment"
          :user-mark="userMark"
          :user-model="userModel"
          :user-date-time="userDateTime"
          :dealer="dealer"
          :client-guid="clientGuid"
          :route-key="routeKey"
          :additional-info="additionalInfo"
          :is-iframe="isIframe"
          @cancel="handleClose()"
          @success="step = 2"
        />

        <LazyFormFinallyBlock
          v-else-if="step === 2"
          @handleClose="handleClose"
        />
      </div>
    </UISidePanel>
  </UIBaseOverlay>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useServiceStore } from '../../../store/service'

export default {
  name: 'ServiceFormPopup',
  props: {
    userPhone: {
      type: String,
      default: '',
    },
    userEmail: {
      type: String,
      default: '',
    },
    userName: {
      type: String,
      default: '',
    },
    userComment: {
      type: String,
      default: '',
    },
    userMark: {
      type: String,
      default: '',
    },
    userModel: {
      type: String,
      default: '',
    },
    userDateTime: {
      type: String,
      default: '',
    },
    dealer: {
      type: Object,
      default: () => {},
    },
    clientGuid: {
      type: String,
      default: '',
    },
    routeKey: {
      type: String,
      default: '',
    },
    additionalInfo: {
      type: Object,
      default: () => {},
    },
    isIframe: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      step: 1,
    }
  },
  computed: {
    ...mapState(useServiceStore, ['isOpenPopup']),
  },
  methods: {
    handleClose () {
      if (this.step === 2) {
        this.$emit('end')
        this.step = 1
      }

      this.onCloseServicePopup()
    },
    ...mapActions(useServiceStore, {
      onCloseServicePopup: 'onClose',
    }),
  },
}
</script>

<style lang="scss" scoped>
.service-form-popup {
  display: flex;
  flex-direction: column;
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

  &__header {
    z-index: 1;
    display: grid;
    grid-area: header;
    grid-template-areas: 'title close';
    align-items: center;
    justify-content: space-between;
    height: fit-content;
    margin-bottom: 20px;
    background: white;
  }

  &__close {
    grid-area: close;
    justify-self: flex-end;
    width: 24px;
    height: 24px;

    @media (min-width: ($bp-medium + 1)) {
      width: 35px;
      height: 35px;
      padding: 5.5px;
    }

    &_left {
      @include mq($bp-medium) {
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

  &__code {
    padding: 100px 0;
    margin: auto;
  }
}
</style>
