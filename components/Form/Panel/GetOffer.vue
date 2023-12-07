<template>
  <UIBaseOverlay :is-open="isOpenPanel" @click="onClosePanel()">
    <UISidePanel class="form__side-panel" :is-open="isOpenPanel">
      <form v-if="isOpenPanel" class="form" :class="{ form_finally: isFinish }">
        <header class="form__header form__section">
          <h2 class="form__title">
            Получить предложение
          </h2>
          <IconClose class="form__close" @click="onClosePanel" />
        </header>
        <section v-if="!isFinish" class="form__inputs">
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
import { useFormStore } from '@/store/form'
import { useCarStore } from '@/store/car'
import { usePayStore } from '@/store/pay'
import {
  errors,
  handlers,
  firstname,
  phone,
  robot,
  policy,
} from '@/components/Form/mixins'

export default {
  name: 'FormPanelGetOffer',
  mixins: [firstname, phone, errors, handlers, robot, policy],
  data: () => ({
    isFinish: false,
    isLoading: false,
    form: {
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
      policy: {
        value: false,
        error: false,
      },
      robot: {
        value: '',
      },
    },
  }),
  computed: {
    additionalData () {
      return {
        formId: 'form_personalOffer',
        mark: this.car.mark,
        model: this.car.model,
        modification: this.car.modification,
        serie: this.car.serie,
        generation: this.car.generation,
        equipment: this.car.technicalInfo.equipment,
        priceForClient: this.removePenny(this.paySum),
        discounts: JSON.stringify(this.discounts),
        price: this.removePenny(this.car.price),
        disprice: this.removePenny(this.car.disprice),
        isNew: this.car.technicalInfo.isNew,
        color: this.car.technicalInfo.exteriorColorGroup,
        dealer: this.car.technicalInfo.dealerId,
        dealerName: this.car.technicalInfo.dealer,
      }
    },
    ...mapState(useFormStore, {
      isOpenPanel: 'isOpen',
    }),
    ...mapState(useCarStore, {
      car: 'allData',
    }),
    ...mapState(usePayStore, [
      'paySum',
      'discounts',
    ]),
  },
  methods: {
    removePenny (price) {
      return price.toString().slice(0, -2)
    },
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
</style>
