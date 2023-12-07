<template>
  <div class="compliance">
    <div class="compliance__card">
      <img
        class="compliance__card-icon"
        src="@/assets/icons/compliance/program.svg"
        alt="логотип"
      >
      <h3 class="compliance__card-title">
        Compliance program
      </h3>
      <UIBaseButton
        secondary
        text="Read"
        @click="
          onPushLink(
            `${cdnUrl}/en/compliance/AVTODOM_Compliance_Program_ENG.docx`
          )
        "
      />
    </div>
    <div class="compliance__card">
      <img
        class="compliance__card-icon"
        src="@/assets/icons/compliance/policy.svg"
        alt="логотип"
      >
      <h3 class="compliance__card-title">
        Compliance policy
      </h3>
      <UIBaseButton
        secondary
        text="Read"
        @click="
          onPushLink(
            `${cdnUrl}/en/compliance/AVTODOM_Compliance_Policy_ENG.docx`
          )
        "
      />
    </div>
    <div class="compliance__card">
      <img
        class="compliance__card-icon"
        src="@/assets/icons/compliance/ethics.svg"
        alt="логотип"
      >
      <h3 class="compliance__card-title">
        Code of corporate ethics
      </h3>
      <UIBaseButton
        secondary
        text="Read"
        @click="
          onPushLink(`${cdnUrl}/en/compliance/AVTODOM_Code_of_Ethics_ENG.docx`)
        "
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'english',
})

const runtimeConfig = useRuntimeConfig()
const cdnUrl = runtimeConfig.public.cdnUrl

const onPushLink = (route) => {
  window.location.href = route
}
</script>

<style lang="scss" scoped>
.compliance {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  grid-gap: 35px;
  width: 100%;
  height: fit-content;

  @include mq($bp-small-medium) {
    grid-template-columns: repeat(auto-fill, minmax(377px, 1fr));
    grid-gap: 20px;
  }

  &__card {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-gap: 30px;
    padding: 20px;
    background-color: var(--grayLight);

    @include mq($bp-small-medium) {
      padding: 30px;
    }

    &-title {
      @include text_big_bold;

      @include mq($bp-small-medium) {
        @include h4;
      }
    }

    &-icon {
      position: absolute;
      top: 20px;
      right: 20px;

      @include mq($bp-small-medium) {
        top: 30px;
        right: 30px;
      }
    }
  }
}
</style>
