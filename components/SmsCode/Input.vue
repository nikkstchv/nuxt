<template>
  <div
    :class="{
      'code-input-container': true,
    }"
  >
    <div class="code-input">
      <template v-for="(v, index) in values" :key="index">
        <input
          :ref="
            (el) => {
              if (el) inputs[index + 1] = el;
            }
          "
          :class="{error: hasError}"
          type="number"
          pattern="[0-9]"
          :style="{
            width: `${props.fieldWidth}px`,
            height: `${props.fieldHeight}px`,
          }"
          :autoFocus="autoFocus && index === autoFocusIndex"
          :data-id="index"
          :value="v"
          :required="props.required"
          :disabled="props.disabled"
          maxlength="1"
          @input="onValueChange"
          @focus="onFocus"
          @keydown="onKeyDown"
        >
      </template>
    </div>
    <UILoader v-if="loading" class="loader" />
  </div>
</template>

<!-- TODO провести рефакторинг компонента-->

<script setup>
const props = defineProps({
  fields: {
    type: Number,
    default: 3,
  },
  fieldWidth: {
    type: Number,
    default: 56,
  },
  fieldHeight: {
    type: Number,
    default: 56,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  hasError: {
    type: Boolean,
    required: false,
    default: false,
  },
})
const emit = defineEmits(['change', 'complete'])
const KEY_CODE = {
  backspace: 8,
  delete: 46,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
}
const values = ref([])
const iRefs = ref([])
const inputs = ref([])
const fields = toRef(props, 'fields')
const autoFocusIndex = ref(0)
const autoFocus = true
const initVals = () => {
  let vals
  if (values.value && values.value.length) {
    vals = []
    for (let i = 0; i < fields.value; i++) {
      vals.push(values.value[i] || '')
    }
    autoFocusIndex.value =
        values.value.length >= fields.value ? 0 : values.value.length
  } else {
    vals = Array(fields.value).fill('')
  }
  iRefs.value = []
  for (let i = 0; i < fields.value; i++) {
    iRefs.value.push(i + 1)
  }
  values.value = vals
}
const onFocus = (e) => {
  e.target.select(e)
}
const onValueChange = (e) => {
  const index = parseInt(e.target.dataset.id)
  e.target.value = e.target.value.replace(/[^\d]/gi, '')
  // this.handleKeys[index] = false;
  if (e.target.value === '' || !e.target.validity.valid) {
    return
  }
  let next
  const value = e.target.value
  values.value = Object.assign([], values.value)
  if (value.length > 1) {
    let nextIndex = value.length + index - 1
    if (nextIndex >= fields.value) {
      nextIndex = fields.value - 1
    }
    next = iRefs.value[nextIndex]
    const split = value.split('')
    split.forEach((item, i) => {
      const cursor = index + i
      if (cursor < fields.value) {
        values.value[cursor] = item
      }
    })
  } else {
    next = iRefs.value[index + 1]
    values.value[index] = value
  }
  if (next) {
    const element = inputs.value[next]
    element.focus()
    element.select()
  }
  triggerChange(values.value)
}
const onKeyDown = (e) => {
  const index = parseInt(e.target.dataset.id)
  const prevIndex = index - 1
  const nextIndex = index + 1
  const prev = iRefs.value[prevIndex]
  const next = iRefs.value[nextIndex]
  switch (e.keyCode) {
    case KEY_CODE.backspace: {
      e.preventDefault()
      const vals = [...values.value]
      if (values.value[index]) {
        vals[index] = ''
        values.value = vals
        triggerChange(vals)
      } else if (prev) {
        vals[prevIndex] = ''
        inputs.value[prev].focus()
        values.value = vals
        triggerChange(vals)
      }
      break
    }
    case KEY_CODE.delete: {
      e.preventDefault()
      const vals = [...values.value]
      if (values.value[index]) {
        vals[index] = ''
        values.value = vals
        triggerChange(vals)
      } else if (next) {
        vals[nextIndex] = ''
        inputs.value[next].focus()
        values.value = vals
        triggerChange(vals)
      }
      break
    }
    case KEY_CODE.left:
      e.preventDefault()
      if (prev) {
        inputs.value[prev].focus()
      }
      break
    case KEY_CODE.right:
      e.preventDefault()
      if (next) {
        inputs.value[next].focus()
      }
      break
    case KEY_CODE.up:
    case KEY_CODE.down:
      e.preventDefault()
      break
    default:
      // this.handleKeys[index] = true;
      break
  }
}
// eslint-disable-next-line no-use-before-define
const triggerChange = (values = values.value) => {
  const val = values.join('')
  emit('change', val)
  if (val.length >= fields.value) {
    emit('complete', val)
  }
}
watch(() => props.hasError, (isError) => {
  if (isError) {
    values.value = ['', '', '', '']
    inputs.value[1].focus()
    inputs.value[1].select()
  }
})
initVals()
onBeforeUpdate(() => {
  inputs.value = []
})
defineExpose({
  values,
})
</script>

<style scoped lang="scss">
.code-input-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
}

.code-input {
  display: flex;
  flex-direction: row;
  gap: 28px;
  justify-content: center;
}

.code-input > input {
  width: 56px;
  height: 60px;
  padding: 14px 20px;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  color: var(--blackLight);
  text-align: center;
  letter-spacing: -.1px;
  border: 1px solid var(--grayMediumLight);
  border-radius: 4px!important;
  caret-color: #000!important;
}

.code-input > input:focus {
  border: 1px solid var(--neonBlue);
  outline: none;
}

.code-input > input:valid {
  border: 1px solid var(--neonBlue);
  outline: none;
}

.code-input > .error {
  border: 1px solid var(--error) !important;
}

.loader {
  position: absolute;
  left: 47%;
  width: 25px;
  height: 25px;
}
</style>
