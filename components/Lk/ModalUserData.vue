<template>
  <UIModal ref="modal" class="modal-user-data">
    <template v-if="!isCodeView" #header>
      <h2 v-if="!isChangeView" class="modal-user-data__title">
        {{ `${dataName === 'Phone' ? 'Контактная информация' : 'Email'}` }}
      </h2>
      <h2 v-else class="modal-user-data__title">
        {{ `Изменить основной ${dataName === 'Phone' ? 'номер' : 'Email'}` }}
      </h2>
    </template>
    <template v-if="!isCodeView" #body>
      <template v-if="!isChangeView">
        <ul class="modal-user-data__list">
          <li
            v-for="item in items"
            :key="item.value"
            class="modal-user-data__item"
            :class="{
              'modal-user-data__item_bold': item.main,
              'modal-user-data__item_disabled': !item.confirmed,
            }"
          >
            {{ item.value }}
            <IconSuccess v-if="item.confirmed" active />
            <img
              v-if="!item.confirmed"
              class="modal-user-data__icon"
              src="@/assets/icons/question.svg"
              alt="Иконка вопроса"
            >
            <button class="modal-user-data__icon" @click="onDelete(item.value)">
              <IconTrash />
            </button>
          </li>
        </ul>
        <button
          v-show="!isShowAddField"
          class="modal-user-data__button"
          @click="onShowAddFiled"
        >
          {{ `Добавить ${dataName === 'Phone' ? 'телефон' : 'Email'}` }}
          <IconPlus />
        </button>
        <LkInput
          v-if="isShowAddField && dataName === 'Phone'"
          v-model="inputAddValue"
          :mask="`${dataName === 'Phone' && '+# ###-###-##-##'}`"
          focus
          @input="handleInputPhone"
        />
        <LkInput
          v-if="isShowAddField && dataName === 'Email'"
          v-model="inputAddValue"
          focus
          @input="handleInputEmail"
        />
      </template>
      <template v-else>
        <ul class="modal-user-data__list">
          <UIBaseRadio
            v-for="item in items"
            :key="item.value"
            v-model="modelItem"
            :value="item.value"
            :disable="!item.confirmed"
            class="modal-user-data__radio"
          >
            {{ item.value }}
            <span
              v-if="!item.confirmed"
              class="modal-user-data__radio-value"
              @click="dataName === 'Phone' && onCodeView()"
            ><img
              v-if="!item.confirmed"
              class="modal-user-data__icon"
              src="@/assets/icons/question.svg"
              alt="Иконка вопроса"
            >
              Не подтвержден</span>
          </UIBaseRadio>
        </ul>
      </template>
    </template>
    <template v-if="!isCodeView" #footer>
      <UIBaseButton
        v-if="!isChangeView"
        :text="`Изменить основной ${dataName === 'Phone' ? 'номер' : 'Email'}`"
        secondary
        @click="isChangeView = true"
      />
      <UIBaseButton
        v-else
        text="Сохранить"
        primary
        @click="onChangeMain"
      />
    </template>
  </UIModal>
</template>

<script>

export default {
  name: 'LkModalUserData',
  props: {
    items: {
      type: Array,
      required: true,
    },
    dataName: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    isChangeView: false,
    isCodeView: false,
    modelItem: '+ 7 999-956-23-29',
    code: null,
    isShowAddField: false,
    inputAddValue: '',
  }),
  watch: {
    code () {
      this.isCodeView = false
    },
  },
  methods: {
    onOpenModal () {
      this.$refs.modal.open()
    },
    onCloseModal () {
      this.$refs.modal.close()
    },
    handleInputEmail (value) {
      this.isShowAddField = false
      this.inputAddValue = ''

      this.onAdd(value)
    },
    handleInputPhone (value) {
      this.isShowAddField = false
      this.inputAddValue = '+ 7 '

      this.onAdd(value)
    },
    onShowAddFiled () {
      this.isShowAddField = true
      if (this.dataName === 'Phone') {
        this.inputAddValue = '+ 7 '
      }
    },
    onChangeMain () {
      this.$emit(`onChangeMain${this.dataName}`, this.modelItem)
      this.isChangeView = false
    },
    onCodeView () {
      this.code = null
      this.isCodeView = true
    },
    onDelete (value) {
      this.$emit('onDeleteValue', value)
    },
    onAdd (value) {
      this.$emit('onAddValue', value)
    },
    setCode (code) {
      this.code = code
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-user-data {
  &__title {
    @include h4;
  }

  &__list {
    display: grid;
    grid-gap: 15px;
    margin-bottom: 15px;
  }

  &__item {
    @include text_medium_regular;

    display: grid;
    grid-template-columns: minmax(140px, 1fr);
    grid-auto-flow: column;
    grid-gap: 10px;
    align-items: center;
    width: fit-content;
    color: var(--blackLight);
    word-break: break-all;

    &_bold {
      font-weight: 700;
      color: var(--black);
    }

    &_disabled {
      color: var(--grayDark);
    }
  }

  &__radio {
    & :deep(.radio__label) {
      align-items: flex-start;
      word-break: break-all;
    }
  }

  &__radio-value {
    @include text_small_medium;

    display: grid;
    grid-auto-flow: column;
    align-items: center;
    width: fit-content;
    color: var(--error);
  }

  &__button {
    @include text_medium_regular;

    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
    align-items: center;
    color: var(--blackLight);
  }

  &__icon {
    align-self: flex-start;
    padding: 3px;
  }
}
</style>
