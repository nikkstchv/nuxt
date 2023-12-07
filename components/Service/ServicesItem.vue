<template>
  <li class="services-item">
    <component
      :is="componentIs || params.code3 ? 'span' : 'router-link'"
      class="services-item__name"
      :to="params.code2
        ? `/service/${params.code}/${params.code2}/${code}/`
        : `/service/${params.code}/${code}/`"
    >
      {{ name }}
    </component>
    <span v-if="price && price !== '0'" class="services-item__price">от {{ price }}₽</span>
    <UIBaseButton
      big
      class="services-item__button"
      text="Записаться"
      @click="onOpenService"
    />
  </li>
</template>

<script setup>
const { params } = useRoute()

defineProps({
  name: {
    type: String,
    required: true,
    default: '',
  },
  code: {
    type: String,
    required: true,
    default: '',
  },
  price: {
    type: String,
    required: false,
    default: '',
  },
})
const componentIs = inject('componentIs', '')
const router = useRouter()
const onOpenService = () => router.push('/service/online/')
</script>

<style lang="scss" scoped>
.services-item {
  display: grid;
  grid-gap: 15px 10px;
  align-items: center;
  padding: 20px;
  background: var(--grayLight);
  border-radius: 6px;

  @include mq($bp-small-medium) {
    grid-gap: 10px 15px;
  }

  @include mq($bp-small) {
    grid-template-columns: 1fr;
    grid-auto-flow: column;
    grid-gap: 10px;
  }

  &__name {
    @include text_medium_regular;

    color: var(--blackLight);

    @include mq($bp-small-medium) {
      @include text_big_regular;
    }
  }

  &__price {
    @include label_small;

    grid-column-start: 2;
    justify-self: flex-end;

    @include mq($bp-small-medium) {
      @include label;
    }

    @include mq($bp-small) {
      grid-column-start: initial;
      justify-self: initial;
      min-width: 140px;
    }
  }

  &__button {
    @include text_medium_small;

    padding: 12px 30px;

    @include mq($bp-small) {
      justify-self: flex-end;
    }
  }
}
</style>
