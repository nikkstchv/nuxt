<template>
  <main class="lk-profile">
    <LkModalUserData
      ref="modalPhone"
      data-name="Phone"
      :items="phones"
      on-delete-value="onDeletePhoneValue"
      @onAddValue="onAddPhoneValue"
      @onChangeMainPhone="onChangeMainPhone"
    />
    <LkModalUserData
      ref="modalEmail"
      data-name="Email"
      :items="emails"
      @onDeleteValue="onDeleteEmailValue"
      @onAddValue="onAddEmailValue"
      @onChangeMainEmail="onChangeMainEmail"
    />
    <h2 class="lk-profile__title">
      Персональные данные
    </h2>
    <div class="lk-profile__main">
      <div class="lk-profile__wrapper lk-profile__wrapper_reverse">
        <div class="lk-profile__container lk-profile__container_left">
          <section class="lk-profile__section">
            <h3 class="lk-profile__subtitle">
              Контактная информация
            </h3>
            <ul class="lk-profile__list">
              <li
                v-for="item in phones"
                :key="item.value"
                class="lk-profile__list-item"
                :class="{
                  'lk-profile__list-item_bold': item.main,
                  'lk-profile__list-item_disabled': !item.confirmed,
                }"
              >
                {{ item.value }}
                <img
                  v-if="!item.confirmed"
                  class="lk-profile__icon lk-profile__icon_question"
                  src="@/assets/icons/question.svg"
                  alt="Иконка вопроса"
                >
                <IconSuccess v-else active />
              </li>
            </ul>
            <UIBaseButton
              underline
              text="Редактировать"
              @click="onOpenModal('modalPhone')"
            />
          </section>
          <section class="lk-profile__section">
            <h3 class="lk-profile__subtitle">
              E-mail
            </h3>
            <ul class="lk-profile__list">
              <li
                v-for="item in emails"
                :key="item.value"
                class="lk-profile__list-item"
                :class="{
                  'lk-profile__list-item_bold': item.main,
                  'lk-profile__list-item_disabled': !item.confirmed,
                }"
              >
                {{ item.value }}
                <img
                  v-if="!item.confirmed"
                  src="@/assets/icons/question.svg"
                  alt="Иконка вопроса"
                  class="lk-profile__list-item-icon"
                >
                <IconSuccess v-else active />
              </li>
            </ul>
            <UIBaseButton
              underline
              text="Редактировать"
              @click="onOpenModal('modalEmail')"
            />
          </section>
        </div>
        <div class="lk-profile__container lk-profile__container_right">
          <section class="lk-profile__section lk-profile__section_indent_small">
            <h3 class="lk-profile__subtitle">
              ФИО
            </h3>
            <p class="lk-profile__text">
              Христорождественская Аполлинария Ярославовна
            </p>
          </section>
          <section class="lk-profile__section lk-profile__section_indent_small">
            <h3 class="lk-profile__subtitle">
              Дата рождения
            </h3>
            <p class="lk-profile__text">
              03.08.1999
            </p>
          </section>
          <section class="lk-profile__section lk-profile__section_indent_small">
            <h3 class="lk-profile__subtitle">
              Пол
            </h3>
            <LkEmptyInput
              v-if="!gender.isShowInput"
              :text="gender.text"
              :error="driverLicense.text === 'Не указано'"
              @click="onShowInput('gender')"
            />
            <div v-else class="lk-profile__gender">
              <UIBaseRadio
                v-model="gender.model"
                label="Мужской"
                value="Мужской"
              />
              <UIBaseRadio
                v-model="gender.model"
                label="Женский"
                value="Женский"
              />
            </div>
          </section>
          <section class="lk-profile__section lk-profile__section_indent_small">
            <h3 class="lk-profile__subtitle">
              Водительское удостоверение
            </h3>
            <LkEmptyInput
              v-if="!driverLicense.isShowInput"
              :text="driverLicense.text"
              :error="driverLicense.text === 'Не указано'"
              @click="
                onShowInput('driverLicense');
                onFocusInput('driverLicense');
              "
            />
            <UIBaseInputStraight
              v-show="driverLicense.isShowInput"
              ref="driverLicense"
              v-model="driverLicense.model"
              class="lk-profile__input-straight"
              name="driverLicense"
              type="numeric"
              :on-blur="() => onChangeInput('driverLicense')"
            />
          </section>
        </div>
      </div>
      <div class="lk-profile__wrapper lk-profile__wrapper_indent">
        <section class="lk-profile__container">
          <h2 class="lk-profile__title">
            Уведомления
          </h2>
          <UIBaseCheckboxSlide
            class="lk-profile__checkbox-slide"
            label="Рекламные рассылки"
            :value="false"
          />
          <UIBaseCheckboxSlide
            class="lk-profile__checkbox-slide"
            label="Отзывные кампании"
            :value="false"
          />
          <UIBaseCheckboxSlide
            class="lk-profile__checkbox-slide"
            label="Статусы изменения заказа"
            :value="false"
          />
        </section>
        <section class="lk-profile__container">
          <h2 class="lk-profile__title">
            Безопасность
          </h2>
          <UIBaseButton underline text="Сменить пароль" />
        </section>
      </div>
    </div>
  </main>
</template>

<script>
definePageMeta({
  layout: 'lk',
  middleware: 'authenticated',
})

export default {
  name: 'LkProfile',
  data: () => ({
    driverLicense: {
      isShowInput: false,
      model: '',
      text: 'Не указано',
    },
    gender: {
      isShowInput: false,
      model: '',
      text: 'Не указано',
    },
    phones: [
      { value: '+7 999-956-23-29', confirmed: true, main: true },
      { value: '+7 963-223-80-88', confirmed: true, main: false },
      { value: '+7 963-223-80-12', confirmed: false, main: false },
    ],
    emails: [
      { value: 'Polina@avtodom.ru', confirmed: true, main: true },
      { value: 'AppoLLinaria@avtodom.ru', confirmed: true, main: false },
      {
        value: 'аpollinariya.Hristorozhdestvenskaya1@avtodom.ru',
        confirmed: false,
        main: false,
      },
    ],
  }),
  methods: {
    onShowInput (name) {
      this[name].isShowInput = true
    },
    onChangeInput (name) {
      this[name].text = this[name].model ? this[name].model : 'Не указано'
      this[name].isShowInput = false
    },
    onFocusInput (name) {
      this.$nextTick(() => {
        this.$refs[name].$el.querySelector('.input__area').focus()
      })
    },
    onOpenModal (refName) {
      this.$refs[refName].onOpenModal()
    },
    onAddPhoneValue (value) {
      this.phones.push({ value, confirmed: false, main: false })
    },
    onAddEmailValue (value) {
      this.emails.push({ value, confirmed: false, main: false })
    },
    onDeletePhoneValue (value) {
      this.phones = this.phones.filter(item => item.value !== value)
    },
    onDeleteEmailValue (value) {
      this.emails = this.emails.filter(item => item.value !== value)
    },
    onChangeMainPhone (value) {
      this.phones = this.phones.map((item) => {
        if (value === item.value) {
          return { ...item, main: true }
        }
        return { ...item, main: false }
      })
    },
    onChangeMainEmail (value) {
      this.emails = this.emails.map((item) => {
        if (value === item.value) {
          return { ...item, main: true }
        }
        return { ...item, main: false }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
$bp-small-big: 699px;

.lk-profile {
  padding: 40px 0;

  @include mq($bp-small-medium) {
    padding: 50px 0;
  }

  &__main {
    display: grid;
    grid-gap: 60px;
    max-width: 782px;
  }

  &__wrapper {
    display: grid;
    grid-gap: 40px;

    @include mq($bp-small-big) {
      grid-template-columns: 370px auto;
      grid-auto-flow: column;
      grid-gap: 110px;
    }

    &_indent {
      grid-gap: 60px;
    }

    &_reverse {
      display: flex;
      flex-direction: column-reverse;
      grid-gap: 0;

      @include mq($bp-small-big) {
        display: grid;
        grid-gap: 60px;
      }
    }
  }

  &__container {
    display: grid;
    height: fit-content;

    &_left {
      grid-gap: 40px;
    }

    &_right {
      grid-gap: 20px;
      margin-bottom: 40px;
    }
  }

  &__title {
    @include h5;

    margin-bottom: 30px;

    @include mq($bp-small-medium) {
      @include h4;
    }
  }

  &__subtitle {
    @include label_small;

    color: var(--blackLight);
  }

  &__text {
    @include text_medium_regular;

    color: var(--blackLight);

    &_error {
      color: var(--error);
    }
  }

  &__section {
    display: grid;
    grid-gap: 20px;
    height: fit-content;

    &_indent_small {
      grid-gap: 5px;
    }
  }

  &__list {
    display: grid;
    grid-gap: 8px;
  }

  &__list-item {
    @include text_medium_small;

    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
    align-items: center;
    width: fit-content;
    color: var(--blackLight);
    word-break: break-all;

    &-icon {
      align-self: flex-start;
    }

    &_bold {
      font-weight: 700;
      color: var(--black);
    }

    &_disabled {
      color: var(--grayDark);
    }
  }

  &__checkbox-slide {
    margin-bottom: 20px;

    & :deep(.checkbox-slide__text) {
      color: var(--blackLight);
    }
  }

  &__icon {
    &_question {
      padding-left: 4px;
    }
  }

  &__input-straight :deep(.input__area) {
    padding: 0;
  }

  &__gender {
    display: flex;
    grid-gap: 20px;
  }
}
</style>
