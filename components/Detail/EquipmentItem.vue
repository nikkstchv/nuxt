<template>
  <div
    v-show="getArray.length"
    :class="['equipment-item', { 'equipment-item_open': isOpen }]"
  >
    <div class="equipment-item__head" @click="toggleBox()">
      <span class="equipment-item__label">{{ groupName || 'Опции' }}</span>

      <UIArrowButton
        :arrow-direction-right="!isOpen"
        :disable="!isOpen"
        class="equipment-item__arrow"
      />
    </div>

    <div ref="detailEquipmentBox" class="equipment-item__box">
      <ul
        v-show="getArray.length"
        ref="detailEquipmentList"
        class="equipment-item__list"
      >
        <li
          v-for="(child, c) in getArray"
          :key="c"
          :class="[
            'equipment-item__item',
            {
              'equipment-item__item_additional': child.standardOption === 0,
            },
          ]"
        >
          <span class="equipment-item__option-name">
            {{ child.optionName }}
          </span>

          <span
            v-if="!child.optionCode.includes('maxp')"
            class="equipment-item__option-code"
          >
            {{ child.optionCode }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import UIArrowButton from '@/components/UI/ArrowButton.vue'

export default {
  name: 'EquipmentItem',
  components: {
    UIArrowButton,
  },
  props: {
    item: {
      type: Array,
      default: () => {},
    },
    groupName: {
      type: String,
      default: '',
    },
    activeTab: {
      type: String,
      default: '',
    },
    activeIndex: {
      type: Number,
      required: true,
    },
    itemIndex: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      isOpen: false,
    }
  },
  computed: {
    getArray () {
      return this.item.filter((item) => {
        const isBase = item.standardOption === 1
        const isAdditional = item.standardOption === 0
        const hasName = item.optionName
        switch (this.activeTab) {
          case 'base':
            return isBase && hasName
          case 'additional':
            return isAdditional && hasName
          default:
            return hasName
        }
      })
    },
  },
  watch: {
    activeTab () {
      if (this.isOpen) {
        this.open()
      }
    },
    activeIndex () {
      if (this.isOpen && this.activeIndex !== this.itemIndex) {
        this.close()
      } else if (this.activeIndex === this.itemIndex) {
        this.open()
      }
    },
  },
  mounted () {
    if (this.activeIndex === this.itemIndex) {
      this.open()
    }
  },
  methods: {
    toggleBox () {
      const ref = this.$refs.detailEquipmentBox

      if (this.isOpen) {
        ref.style = 'height: 0px'
      } else {
        ref.style = `height: ${ref.scrollHeight}px`
      }

      this.isOpen = !this.isOpen

      this.$emit('setActiveItemIndex')
    },

    open () {
      this.isOpen = true
      const box = this.$refs.detailEquipmentBox
      setTimeout(() => {
        if (this.isOpen) {
          box.style = `height: ${this.$refs.detailEquipmentList?.scrollHeight}px`
        }
      }, 500)
    },

    close () {
      this.isOpen = false
      const box = this.$refs.detailEquipmentBox
      box.style = 'height: 0px'
    },
  },
}
</script>

<style lang="scss" scoped>
.equipment-item {
  display: flex;
  flex-direction: column;
  margin-right: -15px;
  margin-left: -15px;
  border-radius: 12px;

  @include mq($bp-small-medium) {
    margin-right: -20px;
    margin-left: -20px;
  }

  @include mq($bp-medium-big) {
    margin-right: -30px;
    margin-left: -30px;
  }

  &_open {
    background: rgb(37 84 255 / 4%);

    .equipment-item {
      &__label {
        color: var(--black);
      }
    }
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 15px;
    cursor: pointer;

    @include mq($bp-small-medium) {
      padding: 20px;
    }

    @include mq($bp-medium-big) {
      padding: 20px 30px;
    }
  }

  &__label {
    @include h5;

    color: var(--blackLight);

    @include mq($bp-super-small) {
      @include h4;
    }

    @include mq($bp-small) {
      @include h3;
    }
  }

  &__arrow {
    grid-gap: 0;
    width: 30px;
    height: 30px;

    @include mq($bp-super-small) {
      width: 34px;
      height: 34px;
    }

    @include mq($bp-small-medium) {
      width: 38px;
      height: 38px;
    }

    @include mq($bp-small) {
      width: 42px;
      height: 42px;
    }

    & :deep(.arrow-button__icon) {
      width: 100%;
      height: 100%;
    }
  }

  &__box {
    height: 0;
    overflow: hidden;
    transition: height 0.3s;
  }

  &__list {
    @include text_medium;

    display: flex;
    flex-wrap: wrap;
    padding: 10px 15px 0;

    @include mq($bp-small-medium) {
      @include text_big;

      padding: 10px 20px;
    }

    @include mq($bp-small) {
      padding: 15px 20px 20px;
    }

    @include mq($bp-medium-big) {
      padding: 15px 30px 20px;
    }
  }

  &__item {
    display: flex;
    flex: 0 0 100%;
    align-items: flex-start;
    margin-bottom: 20px;

    @include mq($bp-small) {
      flex: 0 0 50%;
      padding-right: 50px;
    }

    @include mq($bp-medium) {
      flex: 0 0 100%;
    }

    @include mq($bp-medium-big) {
      flex: 0 0 50%;
      padding-right: 70px;
    }

    &_additional {
      .equipment-item__option-name {
        &::before {
          position: absolute;
          top: 10px;
          bottom: 0;
          left: -11px;
          width: 6px;
          height: 6px;
          content: '';
          background: var(--neonBlue);
          border-radius: 50%;

          @include mq($bp-small) {
            top: 8px;
            left: -12px;
            width: 8px;
            height: 8px;
          }

          @include mq($bp-medium-big) {
            left: -16px;
          }
        }
      }
    }
  }

  &__option-name {
    position: relative;
    margin-right: 15px;
  }

  &__option-code {
    color: var(--grayDark);
  }
}
</style>
