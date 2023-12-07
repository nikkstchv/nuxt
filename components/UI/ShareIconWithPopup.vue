<template>
  <div class="share" @mouseover="onOpenPopup" @mouseleave="onClosePopup">
    <IconShare />
    <div :class="{ share__popup_show: isOpenPopup }" class="share__popup">
      <img
        class="share__popup-icon"
        src="@/assets/icons/arrow-popup.svg"
        alt="инонка стрелки"
      >
      <div v-show="!isShowQr" class="share__popup-list">
        <button class="share__popup-item" @click="onShowQr">
          <IconShareQR class="share__popup-item-icon" />
          <span class="share__popup-item-title">Сгенерировать QR-код</span>
        </button>
        <button class="share__popup-item" @click="copyToClipBoard(url)">
          <IconShareCopy class="share__popup-item-icon" />
          <span class="share__popup-item-title">{{
            isCopy ? 'Ссылка скопирована' : 'Скопировать ссылку'
          }}</span>
        </button>
        <a
          class="share__popup-item"
          rel="nofollow"
          target="_blank"
          :href="`https://t.me/share/url?url=${url}&text=${text}`"
        >
          <IconShareTelegram class="share__popup-item-icon" />
          <span class="share__popup-item-title"> Отправить в Телеграм </span>
        </a>
        <a
          class="share__popup-item"
          rel="nofollow"
          target="_blank"
          :href="`https://api.whatsapp.com/send?text=${text + url}`"
        >
          <IconShareWhatsApp class="share__popup-item-icon" />
          <span class="share__popup-item-title"> Отправить в WhatsApp </span>
        </a>
        <a
          class="share__popup-item"
          rel="nofollow"
          target="_blank"
          :href="`https://vk.com/share.php?url=${url}&title=${text}`"
        >
          <IconShareVK class="share__popup-item-icon" />
          <span class="share__popup-item-title"> Отправить в VK </span>
        </a>
      </div>
      <QrCode
        v-if="isShowQr"
        class="share__qr"
        :value="url"
        color="#ffffff"
        :size="windowWidth < 415 ? 178 : 198"
        bg-color="#474450"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useResizeStore } from '../../store/resize'

export default {
  name: 'UIShareIconWithPopup',
  props: {
    url: {
      type: String,
      required: true,
      default: '',
    },
    text: {
      type: String,
      required: true,
      default: '',
    },
  },
  data: () => ({
    isOpenPopup: false,
    isShowQr: false,
    isCopy: false,
  }),
  computed: {
    ...mapState(useResizeStore, ['windowWidth']),
  },
  methods: {
    onShowQr () {
      this.isShowQr = true
    },
    copyToClipBoard (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
      this.isCopy = true
    },
    onOpenPopup () {
      this.isOpenPopup = true
    },
    onClosePopup () {
      this.isOpenPopup = false
      this.onInitStatePopup()
    },
    onInitStatePopup () {
      setTimeout(() => {
        this.isShowQr = false
        this.isCopy = false
      }, 300)
    },
  },
}
</script>

<style lang="scss">
.share {
  position: relative;

  &__qr {
    padding: 10px;
    margin: auto;
    border-radius: 8px;
  }

  &__popup {
    @include text_medium_regular;

    position: absolute;
    top: 48px;
    left: -190px;
    z-index: 1;
    display: none;
    width: 230px;
    padding: 12px 16px;
    color: white;
    background: var(--blackLight);
    border-radius: 8px;

    @include mq($bp-small-medium) {
      left: -210px;
      width: 250px;
    }

    &_show {
      display: block;
    }

    &-icon {
      position: absolute;
      top: -12px;
      left: 198px;

      @include mq($bp-small-medium) {
        left: 217px;
      }
    }

    &-list {
      display: flex;
      flex-direction: column;
      grid-gap: 15px;
    }

    &-item {
      display: flex;
      grid-gap: 10px;
      align-items: center;
      width: fit-content;
      padding: 3px 0;

      &-title {
        color: var(--grayMediumLight);
      }

      &:hover .share__popup-item-title {
        color: white;
      }
    }
  }
}
</style>
