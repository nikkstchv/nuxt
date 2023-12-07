<template>
  <client-only>
    <UIBaseCheckbox
      v-model="modelValue"
      class="policy-checkbox"
      :class="{ 'policy-checkbox_error': error }"
    >
      <template v-if="isAsc">
        Я согласен на
        <UIBaseButton
          href="/consent-to-processing/"
          target="_blank"
          class="policy-checkbox__button"
          underline
          text="условия обработки персональных данных"
        />
      </template>
      <template v-else>
        <span class="policy-checkbox__text">Я принимаю
          <UIBaseButton
            href="/terms-of-use/"
            target="_blank"
            class="policy-checkbox__button"
            underline
            text="пользовательское соглашение"
          />
          и даю</span>
        <span class="policy-checkbox__text">
          согласие на
          <UIBaseButton
            href="/consent-to-processing/"
            target="_blank"
            class="policy-checkbox__button"
            underline
            text="условия обработки персональных данных"
          />
        </span>
      </template>
    </UIBaseCheckbox>
  </client-only>
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'

const { isAsc } = useHoldingStore()
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
  },
  error: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])
const modelValue = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  },
})
</script>

<style scoped lang="scss">
.policy-checkbox {
  max-width: 350px;

  &__text {
    color: var(--blackLight);

    @include mq($bp-small-medium) {
      display: flex;
      flex-wrap: wrap;
      width: max-content;
    }
  }

  & :deep(.checkbox__label) {
    @include text_small_regular;

    @include mq($bp-small-medium) {
      display: flex;
      flex-wrap: wrap;
    }
  }

  &_error {
    &:hover .policy-checkbox__button {
      @media (hover: hover) and (pointer: fine) {
        color: var(--blackLight);
        transition: color 0.2s;
      }
    }

    &:hover .policy-checkbox__text {
      @media (hover: hover) and (pointer: fine) {
        color: var(--blackLight);
        transition: color 0.2s;
      }
    }

    & .policy-checkbox__text {
      color: var(--error);
    }

    & :deep(.checkbox__label) {
      color: var(--error);
    }

    & :deep(.checkbox__checkmark) {
      border: 1.5px solid var(--error);
    }

    & :deep(.button) {
      color: var(--error);
    }
  }

  &__button {
    margin-right: 3px;
    margin-left: 3px;
    text-decoration-line: underline;
    border-bottom: none;
  }
}
</style>
