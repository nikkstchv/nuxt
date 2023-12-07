<template>
  <UIBaseOverlay :is-open="isOpenPanel" @click="onClosePanel()">
    <UISidePanel class="form__side-panel" :is-open="isOpenPanel">
      <form v-if="isOpenPanel" class="form" :class="{ form_finally: isFinish }">
        <header class="form__header form__section">
          <h2 class="form__title">
            Заявка в отдел кадров
          </h2>
          <IconClose class="form__close" @click="onClosePanel()" />
        </header>
        <section v-if="!isFinish" class="form__inputs">
          <FormInputName
            v-model="form.lastname.value"
            class="form__input"
            name="lastname"
            :errors="form.lastname.errors"
            :required="form.lastname.isRequire"
          />
          <FormInputName
            v-model="form.firstname.value"
            class="form__input"
            name="firstname"
            :errors="form.firstname.errors"
            :required="form.firstname.isRequire"
          />
          <FormInputPhone
            v-model="form.phone.value"
            class="form__input"
            :errors="form.phone.errors"
            :required="form.phone.isRequire"
          />
          <FormInputEmail
            v-model="form.email.value"
            class="form__input"
            :errors="form.email.errors"
            :required="form.phone.isRequire"
          />
          <UIBaseInput
            v-model.trim="form.address.value"
            :errors="form.address.errors"
            :required="form.address.isRequire"
            class="form__input"
            label="Город проживания"
          />
          <UIBaseInput
            v-model.trim="form.position.value"
            class="form__input"
            label="Желаемая должность"
          />
          <UIBaseInput
            v-model.trim="form.resume.value"
            class="form__input"
            label="Ссылка на резюме"
          />
          <UIBaseTextarea
            v-model.trim="form.comment.value"
            class="form__input"
            label="Комментарий"
          />
          <FormInputRobot
            v-model="form.robot.value"
            class="form__input form__input_robot"
          />
          <FormCheckboxPolicy
            v-model="form.policy.value"
            :error="form.policy.error"
          />
          <UIBaseButton
            class="form__button form__button_submit"
            primary
            large
            text="Отправить"
            :is-loading="isLoading"
            :disable="!hasAllRequiredFormData || isLoading"
            @click="handleSubmit"
          />
        </section>
        <FormFinallyBlock
          v-else
          class="form__block-finally"
          @handleClose="handleClose"
        />
      </form>
    </UISidePanel>
  </UIBaseOverlay>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useFormStore } from '../../../store/form'
import {
  errors,
  lastname,
  firstname,
  phone,
  email,
  handlers,
  policy,
  robot,
} from '@/components/Form/mixins'

import UISidePanel from '@/components/UI/SidePanel.vue'
import UIBaseInput from '@/components/UI/Base/Input.vue'
import UIBaseTextarea from '@/components/UI/Base/Textarea.vue'
import UIBaseButton from '@/components/UI/Base/Button.vue'

import IconClose from '@/components/Icon/Close.vue'

import FormInputName from '@/components/Form/Input/Name.vue'
import FormInputPhone from '@/components/Form/Input/Phone.vue'
import FormInputEmail from '@/components/Form/Input/Email.vue'
import FormInputRobot from '@/components/Form/Input/Robot.vue'
import FormCheckboxPolicy from '@/components/Form/CheckboxPolicy.vue'
import FormFinallyBlock from '@/components/Form/FinallyBlock.vue'

export default {
  name: 'FormPanelVacancyOrder',
  components: {
    UISidePanel,
    UIBaseInput,
    UIBaseTextarea,
    UIBaseButton,
    IconClose,
    FormInputName,
    FormInputPhone,
    FormInputEmail,
    FormInputRobot,
    FormCheckboxPolicy,
    FormFinallyBlock,
  },
  mixins: [lastname, firstname, phone, email, errors, handlers, policy, robot],
  data () {
    return {
      isFinish: false,
      isLoading: false,
      form: {
        lastname: {
          value: '',
          errors: [],
          isRequire: true,
        },
        firstname: {
          value: '',
          errors: [],
          isRequire: true,
        },
        phone: {
          value: '',
          errors: [],
          isRequire: true,
        },
        email: {
          value: '',
          errors: [],
          isRequire: true,
        },
        address: {
          value: '',
          errors: [],
          isRequire: true,
        },
        position: {
          value: '',
        },
        resume: {
          value: '',
        },
        comment: {
          value: '',
        },
        policy: {
          value: false,
          error: false,
        },
        robot: {
          value: '',
        },
      },
    }
  },
  computed: {
    additionalData () {
      return {
        formId: 'form_vacancy_resume',
      }
    },
    ...mapState(useFormStore, {
      isOpenPanel: 'isOpen',
    }),
  },
  methods: {
    handleClose () {
      this.onClosePanel()
      this.isFinish = false
    },
    ...mapActions(useFormStore, {
      onClosePanel: 'onClose',
    }),
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/components/FormPanel/style';

.form {
  &__input {
    &_time {
      & :deep(.select) {
        max-height: 231px;
      }
    }
  }
}
</style>
