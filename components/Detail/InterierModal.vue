<template>
  <UIModal ref="modal" is-full-screen @close="closeModal(true)">
    <template #body>
      <div class="interier-modal">
        <IconClose class="interier-modal__close" @click="closeModal()" />

        <div id="viewer" class="interier-modal__viewer" />
      </div>
    </template>
  </UIModal>
</template>

<script>
import { Viewer } from 'photo-sphere-viewer'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'

export default {
  name: 'DetailInterierModal',
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      viewer: null,
    }
  },
  mounted () {
    this.openModal()
  },
  methods: {
    initViewer () {
      if (this.images.length) {
        this.viewer = new Viewer({
          container: 'viewer',
          panorama: this.images[0]?.source?.url,
          defaultZoomLvl: 0,
          defaultLong: '165deg',
          defaultLat: -0.4,
          autorotateDelay: 1000,
          navbar: [],
          loadingTxt: 'Загрузка...',
        })
      }
    },

    openModal () {
      this.$refs.modal.open()
      this.$controlFixBody(true)

      this.$nextTick(() => {
        this.initViewer()
      })
    },

    closeModal (fromModal) {
      if (!fromModal) {
        this.$refs.modal.close()
      }

      this.viewer?.destroy()
      this.viewer = null
      this.$controlFixBody(false)

      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.interier-modal {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: auto;

  @include mq($bp-medium) {
    max-width: 900px;
  }

  @include mq($bp-medium-big) {
    max-width: 1066px;
  }

  @include mq($bp-big) {
    max-width: 1200px;
  }

  &__close {
    position: absolute;
    top: -65px;
    right: 20px;
    width: 35px;
    height: 35px;

    @include mq($bp-medium) {
      top: 0;
      right: -60px;
    }

    @include mq($bp-medium-big) {
      right: -70px;
    }

    @include mq($bp-big) {
      right: -100px;
      width: 50px;
      height: 50px;
    }

    & :deep(.icon__path) {
      stroke: var(--blackLight);
      stroke-width: 2;
    }
  }

  &__viewer {
    width: 100%;
    height: calc(100vh - 200px);

    @include mq($bp-medium) {
      height: calc(100vh - 100px);
    }

    & :deep(.psv-navbar) {
      display: none;
    }
  }
}
</style>
