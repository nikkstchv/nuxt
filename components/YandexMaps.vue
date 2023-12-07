<template>
  <YandexMap
    ref="map"
    :show-all-markers="isShowAllMarkers"
    :coordinates="centerCoords"
    :controls="['geolocationControl', 'zoomControl']"
    :zoom="10"
    :settings="{
      suppressMapOpenBlock: true,
      autoFitToViewport: 'always',
    }"
  >
    <yandex-marker
      v-for="(placemark, index) in placemarksCoords"
      :key="index"
      :marker-id="index"
      :coordinates="placemark.coords"
      :options="markerOptions"
    >
      <template #component>
        <div class="balloon">
          <h1 class="balloon__title">
            {{ placemark.balloon.name ?? '' }}
          </h1>
          <p class="balloon__text">
            {{ placemark.balloon.address ?? '' }}
          </p>
          <p class="balloon__text">
            {{ placemark.balloon.time ?? '' }}
          </p>
          <a :href="`tel:${placemark.balloon.phone}`" class="balloon__text">
            {{ placemark.balloon.phone ?? '' }}
          </a>
        </div>
      </template>
    </yandex-marker>
  </YandexMap>
</template>

<script>
import mapPoint from '@/assets/icons/map-point.svg'

export default {
  name: 'YandexMaps',
  props: {
    isOnePlacemark: {
      type: Boolean,
      required: false,
      default: false,
    },
    placemarks: {
      type: Array,
      required: false,
      default: () => [],
    },
    coords: {
      type: Array,
      required: false,
      default: () => [55.7522, 37.6156],
    },
  },
  data: () => ({
    markerOptions: {
      iconLayout: 'default#imageWithContent',
      iconImageHref: mapPoint,
      iconImageSize: [43, 43],
      iconImageOffset: [-20, -30],
      iconContentOffset: [0, 15],
    },
  }),
  computed: {
    centerCoords () {
      if (this.isOnePlacemark) {
        return this.placemarksCoords[0].coords
      }
      return this.coords
    },
    isShowAllMarkers () {
      return this.placemarks.length > 1
    },
    placemarksCoords () {
      return this.placemarks.map((placemark) => {
        const notHaveCoords = placemark?.coords?.includes(null)
        const hasCoordsMytishchi = this.hasMytishchiCoords(placemark)
        const defaultPlacemark = { ...placemark, coords: [55.7522, 37.6156] }
        if (notHaveCoords || hasCoordsMytishchi) {
          return defaultPlacemark
        }
        return placemark
      })
    },
  },
  methods: {
    hasMytishchiCoords (placemark) {
      const mytishchiCoords = [55.916294, 37.746975]
      return placemark.coords.every(i => mytishchiCoords.includes(i))
    },
  },
}
</script>

<style lang="scss" scoped>
:deep(.balloon)  {
  font-family: Inter, sans-serif;
}

:deep(.balloon__title)  {
  @include text_medium_small;

  padding-right: 20px;
  margin-bottom: 20px;
}

:deep(.balloon__text)  {
  @include text_small_regular;

  margin-bottom: 5px;
  color: var(--blackLight);
}

:deep(.balloon__button)  {
  width: 100%;
  padding: 12px;
  margin-top: 25px;
  color: var(--royalBlue);
  border: 1px solid var(--royalBlue);
  border-radius: 4px;
}

:deep(.ymaps-2-1-79-balloon__content) {
  min-height: 110px !important;
  padding: 10px 10px 15px !important;
  margin-right: 0 !important;
}

:deep(.ymaps-2-1-79-balloon__content > ymaps) {
  min-width: 230px;
  height: 100% !important;
  min-height: 100px !important;
}

:deep(.ymaps-2-1-79-map-copyrights-promo) {
  display: none;
}
</style>
