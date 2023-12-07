<template>
  <UIModal ref="modal" is-full-screen @close="closeModal(true)">
    <template #body>
      <div class="exterior-modal">
        <IconClose class="exterior-modal__close" @click="closeModal()" />
        <div class="exterior-modal__viewer">
          <div
            class="cloudimage-360"
            :data-folder="`https://cdn.ascgroup.ru/ext-video/${images[0].videoUrl}/`"
            :data-filename-x="`frame-{index}.jpg`"
            :data-amount-x="urls.length - 1"
          />
        </div>
      </div>
    </template>
  </UIModal>
</template>

<script>
import { getExteriorPanorama } from '@/api/routes/catalog'

export default {
  name: 'DetailExteriorModal',

  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      urls: null,
    }
  },
  computed: {
    cdnUrl () {
      const runtimeConfig = useRuntimeConfig()
      return runtimeConfig.public.cdnUrl
    },
  },
  async mounted () {
    this.urls = await this.getUrls()
    this.initScript()
    this.openModal()
  },
  beforeUnmount () {
    this.removeScript()
  },
  methods: {
    async getUrls () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const id = this.images[0].videoUrl
      const options = {
        query: {
          imageId: id,
        },
      }
      const res = await $fetchClient(getExteriorPanorama(), options)
      if (!$hasErrorResponse(res)) {
        return res.urls
      }

      return null
    },
    initScript () {
      const script = document.createElement('script')
      script.src = 'https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js'
      document.head.appendChild(script)
    },
    removeScript () {
      const head = document.head
      const scripts = head.getElementsByTagName('script')
      const styles = head.getElementsByTagName('style')
      const lastScript = scripts[scripts.length - 1]
      const lastStyle = styles[styles.length - 1]
      const lastLastStyle = styles[styles.length - 2]
      head.removeChild(lastScript)
      head.removeChild(lastStyle)
      head.removeChild(lastLastStyle)
    },
    openModal () {
      this.$refs.modal.open()
      this.$controlFixBody(true)
    },

    closeModal (fromModal) {
      if (!fromModal) {
        this.$refs.modal.close()
      }

      this.$controlFixBody(false)

      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.exterior-modal {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  max-width: 100%;
  height: 100%;
  margin: auto;

  &__close {
    position: absolute;
    top: -65px;
    right: 20px;
    width: 35px;
    height: 35px;

    @include mq($bp-medium) {
      top: 0;
      right: 0;
    }

    @include mq($bp-big) {
      width: 50px;
      height: 50px;
    }

    & :deep(.icon__path) {
      stroke: var(--blackLight);
      stroke-width: 2;
    }
  }

  &__viewer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    max-width: 1200px;
  }
}
</style>
