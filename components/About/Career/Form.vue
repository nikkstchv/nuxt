<template>
  <transition name="fade">
    <form v-if="!isFinish" class="career-form" @submit.prevent>
      <div class="career-form__head">
        <p class="career-form__title">
          Не нашли подходящую вакансию?
        </p>
        <p class="career-form__text">
          Отправьте нам свое резюме
        </p>
      </div>

      <div>
        <div class="career-form__inputs">
          <UIBaseInput
            v-model.trim="form.fio.value"
            :errors="form.fio.errors"
            :required="form.fio.isRequire"
            label="ФИО"
            autocomplete="name"
          />

          <div class="career-form__inputs career-form__inputs_row">
            <FormInputPhone
              v-model="form.phone.value"
              :errors="form.phone.errors"
              :required="form.phone.isRequire"
            />
            <FormInputEmail
              v-model="form.email.value"
              :errors="form.email.errors"
              :required="form.email.isRequire"
            />
          </div>

          <UIBaseInput
            v-model.trim="form.city.value"
            :errors="form.city.errors"
            :required="form.city.isRequire"
            label="Город проживания"
            autocomplete="address-level2"
          />
          <UIBaseInput
            v-model.trim="form.position.value"
            label="Желаемая должность"
          />
          <UIBaseInput
            v-model.trim="form.resumeLink.value"
            :errors="form.resumeLink.errors"
            :error="!!form.resumeLink.errors.length"
            label="Ссылка на резюме"
          />
          <UIBaseTextarea
            v-model.trim="form.comment.value"
            label="Комментарий"
            :max-length="300"
          />

          <div class="career-form__upload">
            <div class="career-form__upload-label">
              Прикрепите файл формата:
              <br class="career-form__upload-br">
              jpeg, png, doc, docs, pdf
            </div>
            <div
              :class="[
                'career-form__upload-files',
                {
                  'career-form__upload-files_error':
                    isOverLimit || form.files.errors.length,
                },
              ]"
            >
              <div
                v-for="(item, i) in form.files.value"
                :key="i"
                class="career-form__upload-file"
                @click="removeFile(i)"
              >
                <IconUploadFileDefault />
                <span class="career-form__upload-name">{{ item.name }}</span>

                <span class="career-form__upload-trash">
                  <IconTrash />
                </span>
              </div>

              <label
                for="upload-file"
                class="career-form__upload-file career-form__upload-file_add"
              >
                <input
                  id="upload-file"
                  ref="uploadFile"
                  type="file"
                  accept=".png,.jpg,.jpeg,.doc,.docx,.pdf"
                  multiple
                  :disabled="isOverLimit"
                  @change="uploadFile"
                >
                <IconPlus />
              </label>
            </div>
            <div
              :class="[
                'career-form__upload-limit',
                {
                  'career-form__upload-limit_error':
                    isOverLimit || form.files.errors.length,
                },
              ]"
            >
              <span v-if="isOverLimit">Остутствует свободное место</span>
              <span v-else-if="form.files.errors.length">
                {{ form.files.errors[0] }}
              </span>
              <span>{{ uploadSize }} / 300 Mb</span>
            </div>
          </div>
        </div>

        <UIBaseButton
          class="career-form__submit"
          primary
          large
          text="Отправить"
          type="submit"
          :is-loading="isLoading"
          :disable="!hasAllRequiredFormData || isLoading"
          @click="handleSubmit"
        />
      </div>
    </form>

    <FormFinallyBlock v-else @handleClose="isFinish = false" />
  </transition>
</template>

<script>
import { leadFile } from '@/api/routes/lead'

import { validationUrl } from '@/assets/scripts/validation'
import { email, errors, handlers, phone } from '@/components/Form/mixins'

export default {
  name: 'AboutCareerForm',
  mixins: [phone, email, handlers, errors],
  data () {
    return {
      form: {
        fio: {
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
        city: {
          value: '',
          errors: [],
          isRequire: true,
        },
        position: {
          value: '',
          errors: [],
          isRequire: false,
        },
        resumeLink: {
          value: '',
          errors: [],
          isRequire: false,
        },
        comment: {
          value: '',
          errors: [],
          isRequire: false,
        },
        files: {
          value: [],
          errors: [],
          isRequire: false,
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

    uploadSize () {
      const size = this.form.files.value.reduce((acc, item) => {
        acc += item.size
        return acc
      }, 0)

      return parseInt((size / 1024 / 1024) * 100) / 100
    },

    isOverLimit () {
      return this.uploadSize > 300
    },
  },
  methods: {
    uploadFile (e) {
      this.clearErrors('files')

      const files = e.target.files

      for (const file of files) {
        this.form.files.value.push({
          file,
          name: file.name,
          size: file.size,
        })
      }

      this.$refs.uploadFile.value = ''
    },

    removeFile (i) {
      this.form.files.value.splice(i, 1)
    },

    async sendData (formUrl) {
      const { $fetchClient } = useNuxtApp()
      const method = 'POST'
      const headers = {
        'Content-Type': 'multipart/form-data',
      }
      const options = { headers }
      const formData = new FormData()
      const data = this.getAllFormData(this.additionalData)
      this.form.files.value.forEach((item) => {
        formData.append('resume', item.file)
      })
      formData.append('data', JSON.stringify(data))
      formData.append('formUrl', formUrl)
      const body = {
        method,
        body: formData,
      }

      return await $fetchClient(leadFile(), body, options)
    },

    checkErrors () {
      let errorsCount = 0
      this.clearErrors()

      if (this.form.files.value.length === 0) {
        this.addError('files', 'Прикрепите резюме')
        errorsCount++
      }

      if (
        this.form.resumeLink.value &&
        !validationUrl(this.form.resumeLink.value)
      ) {
        this.addError('resumeLink', 'Введите валидную ссылку')
        errorsCount++
      }

      return errorsCount
    },

    async handleSubmit () {
      const errorsCount = this.checkErrors()
      const isAllValid = this.checkForm()

      if (isAllValid && !this.isOverLimit && errorsCount === 0) {
        this.isLoading = true

        const allFormData = this.getAllFormData(this.additionalData)
        const res = await this.sendData(allFormData?.formUrl)

        this.isLoading = false

        if (!this.$hasErrorResponse(res)) {
          this.isFinish = true
          this.clearAllFormData()
          this.amplitudeEvent(allFormData)
          this.exponeaIdentify(allFormData)
          this.calltouchCommit(allFormData)
        }
      }
    },

    clearErrors (value) {
      if (value) {
        this.form[value].errors = []
      } else {
        for (const item in this.form) {
          if (this.form[item].errors !== undefined) {
            this.form[item].errors = []
          }
        }
      }
    },

    addError (value, text) {
      this.form[value].errors.push(text)
    },
  },
}
</script>

<style lang="scss" scoped>
.career-form {
  display: grid;
  grid-gap: 30px;

  @include mq($bp-small) {
    grid-template-columns: minmax(150px, 260px) 300px;
    grid-gap: 50px;
  }

  @include mq($bp-medium) {
    grid-template-columns: auto;
    grid-gap: 30px;
  }

  &__title {
    @include h5;

    margin-bottom: 10px;

    @include mq($bp-small) {
      @include h3;

      margin-bottom: 15px;
    }
  }

  &__text {
    @include text_small;

    @include mq($bp-small) {
      @include text_big;
    }
  }

  &__inputs {
    display: grid;
    grid-gap: 30px;

    @include mq($bp-small) {
      grid-gap: 20px;
    }

    &_row {
      @include mq($bp-medium) {
        grid-template-columns: 1fr 1fr;
      }
    }
  }

  &__upload {
    display: grid;
    grid-gap: 15px;
    color: var(--blackLight);

    &-label {
      @include text_medium;
    }

    &-br {
      @include mq($bp-medium) {
        display: none;
      }
    }

    &-files {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      padding: 5px;
      border: 1px solid var(--grayDolphin);
      border-radius: 4px;

      &_error {
        border-color: var(--error);
      }
    }

    &-file {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 70px;
      padding: 10px;
      margin: 10px;
      cursor: pointer;
      border: 1px solid var(--blackLight);
      border-radius: 5px;

      &::before {
        position: absolute;
        top: -1px;
        right: -1px;
        content: '';
        border-color: var(--blackLight) #fff;
        border-style: solid;
        border-width: 0 14px 14px 0;
      }

      &:hover:not(.career-form__upload-file_add) {
        &::before {
          display: none;
        }

        .career-form__upload-trash {
          opacity: 1;
        }
      }

      & :deep(.icon__path) {
        stroke: var(--blackLight);
      }

      &_add {
        border-color: var(--grayDark);

        &::before {
          border-color: var(--grayDark) #fff;
        }

        input {
          display: none;
        }

        & :deep(.icon__path) {
          stroke: var(--grayDark);
        }
      }
    }

    &-name {
      width: 100%;
      height: 17px;
      margin-top: 5px;
      overflow: hidden;
      font-size: 8px;
      line-height: 8px;
      text-align: center;
    }

    &-trash {
      position: absolute;
      top: 1px;
      right: 1px;
      bottom: 1px;
      left: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      opacity: 0;

      & :deep(.icon) {
        width: 40px;
        height: 40px;
      }
    }

    &-limit {
      @include disclaimer;

      display: flex;
      align-items: center;
      justify-content: space-between;

      &_error {
        color: var(--error);
      }
    }
  }

  &__submit {
    margin-top: 30px;
  }
}
</style>
