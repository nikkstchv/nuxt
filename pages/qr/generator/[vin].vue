<template>
  <div class="qr-generator">
    <QRTemplatesBmwPremiumSelection
      v-if="template === 'bmw-premium-selection'"
      :orientation="orientation"
      :mark="mark"
      :model="model"
      :serie="serie"
      :transport-info="transportInfo"
      :url="url"
    />
    <QRTemplatesAscTrue
      v-else-if="template === 'asc' || template === 'avtodom'"
      :orientation="orientation"
      :mark="mark"
      :model="model"
      :serie="serie"
      :transport-info="transportInfo"
      :url="url"
      :template="template"
      :phone="phone"
      :car-type="carType"
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'clear',
})

const getTransportInfo = ({ template }) => {
  return Object.entries(query).reduce((acc, [key, value]) => {
    if (value && includes.includes(key)) {
      if (
        (key === 'exteriorColorGroup' && template === 'asc') ||
          key !== 'exteriorColorGroup'
      ) {
        const isVin = key === 'vin'
        const valueFormatted = isVin ? value.toUpperCase() : value
        const label = schema[key]

        acc[key] = { value: valueFormatted, label }
      }
    }
    return acc
  }, {})
}
const getUrl = ({ holding, vin, dealerCode }) => {
  const href =
      holding === 'asc'
        ? 'https://www.ascgroup.ru'
        : 'https://avtodom.ru'
  return `${href}/qr/${vin}/?dealerCode=${dealerCode}`
}
const getVin = () => {
  const vin = query.vin

  if (vin) {
    return vin.toUpperCase()
  }
  return ''
}

const includes = [
  'vin',
  'manufactureYear',
  'bodyworkType',
  'engineType',
  'engineCapacity',
  'enginePower',
  'totalTrip',
  'carWheelDriveType',
  'carGearboxType',
  'exteriorColorGroup',
]
const schema = {
  vin: 'VIN',
  manufactureYear: 'Год выпуска',
  bodyworkType: 'Кузов',
  engineType: 'Вид топлива',
  engineCapacity: 'Объем двигателя (см3)',
  enginePower: 'Мощность (л.с.)',
  totalTrip: 'Пробег (км)',
  carWheelDriveType: 'Привод',
  carGearboxType: 'Коробка передач',
  exteriorColorGroup: 'Цвет кузова',
}
const route = useRoute()
const query = route.query
const { mark, model, serie } = query
const template = query.template || 'bmw-premium-selection'
const transportInfo = getTransportInfo({ template })
const orientation = query.orientation || 'landscape'
const carType = query.carType || 'cars'
const holding = query.holding
const dealerCode = query.dealerCode
const phone = query.phone
const vin = getVin()
const url = getUrl({ holding, vin, dealerCode })
</script>

<style lang="scss" scoped>
.qr-generator {
  max-width: 1000px;
  min-height: 100vh;
  margin: auto;
}
</style>

<style lang="scss">
body {
  .b24-widget-button-visible {
    display: none;
  }
}
</style>
