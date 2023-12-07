<template>
  <section v-if="hasInfo" class="drawings">
    <div v-if="hasSideInfo" class="drawing drawing_side">
      <div
        :style="{
          backgroundImage: `url(${sideView})`,
        }"
        class="drawing__car drawing__car_side"
      />
      <div
        v-if="height"
        class="drawing__deminsion drawing__deminsion_side_left"
      >
        <IconArrowSmall
          width="12"
          right
          class="drawing__arrow drawing__arrow_side_height drawing__arrow_side_height_top"
        />
        <div class="drawing__deminsion-inner">
          {{ height }} мм
        </div>
        <IconArrowSmall
          width="12"
          left
          class="drawing__arrow drawing__arrow_side_height drawing__arrow_side_height_bottom"
        />
      </div>
      <div
        v-if="width"
        class="drawing__deminsion drawing__deminsion_side_bottom"
      >
        <IconArrowSmall
          width="62"
          right
          class="drawing__arrow drawing__arrow_side_width drawing__arrow_side_width_right"
        />
        <span class="drawing__deminsion-inner"> {{ width }} мм </span>
        <IconArrowSmall
          width="57"
          left
          class="drawing__arrow drawing__arrow_side_width drawing__arrow_side_width_left"
        />
      </div>
      <div
        v-if="groundClearance"
        class="drawing__deminsion drawing__deminsion_side_right"
      >
        <IconArrowSmall
          width="8"
          right
          class="drawing__arrow drawing__arrow_side_ground drawing__arrow_side_ground_top"
        />
        <span class="drawing__deminsion-inner"> {{ groundClearance }} мм </span>
        <IconArrowSmall
          width="8"
          left
          class="drawing__arrow drawing__arrow_side_ground drawing__arrow_side_ground_bottom"
        />
      </div>
    </div>
    <div v-if="widthFront" class="drawing">
      <div
        :style="{
          backgroundImage: `url(${frontView})`,
        }"
        class="drawing__car drawing__car_front"
      />
      <div class="drawing__deminsion drawing__deminsion_front_bottom">
        <IconArrowSmall
          width="25"
          left
          class="drawing__arrow drawing__arrow_front_left"
        />
        <span class="drawing__deminsion-inner"> {{ widthFront }} мм </span>
        <IconArrowSmall
          width="19"
          right
          class="drawing__arrow drawing__arrow_front_right"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    widthFront: {
      type: Number || String,
      required: false,
      default: '',
    },
    width: {
      type: Number || String,
      required: false,
      default: '',
    },
    height: {
      type: Number || String,
      required: false,
      default: '',
    },
    groundClearance: {
      type: Number || String,
      required: false,
      default: '',
    },
    frontView: {
      type: String,
      required: false,
      default: '',
    },
    sideView: {
      type: String,
      required: false,
      default: '@/assets/images/drawing-side.png',
    },
  },
  computed: {
    hasInfo () {
      return this.hasSideInfo || this.width
    },
    hasSideInfo () {
      return this.height || this.width || this.groundClearance
    },
  },
}
</script>

<style lang="scss" scoped>
.drawings {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (max-width: $bp-super-small) {
    justify-content: space-between;
  }

  @include mq($bp-super-small) {
    grid-gap: 30px;
  }

  @include mq($bp-small-medium) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @include mq($bp-small) {
    grid-gap: 40px;
  }

  @include mq(700px) {
    grid-gap: 50px;
  }

  @include mq($bp-medium) {
    grid-gap: 40px;
  }

  @include mq(1500px) {
    grid-gap: 9.5%;
  }
}

.drawing {
  position: relative;
  width: fit-content;

  &_side {
    padding-left: 15px;

    @include mq($bp-small) {
      padding-left: 25px;
    }

    @include mq($bp-medium) {
      padding-left: 20px;
    }

    @include mq($bp-medium-big) {
      padding-left: 25px;
    }

    @include mq($bp-big) {
      margin-bottom: 40px;
    }
  }

  &__car {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: contain;

    &_side {
      width: 167px;
      height: 68px;
      margin-bottom: -5px;

      @include mq($bp-super-small) {
        width: 241px;
        height: 86px;
      }

      @include mq($bp-small-medium) {
        width: 228px;
        height: 86px;
      }

      @include mq($bp-small) {
        width: 321px;
        height: 170px;
      }

      @include mq($bp-medium) {
        width: 256px;
        height: 115px;
      }

      @include mq($bp-medium-big) {
        width: 325px;
        height: 145px;
      }

      @include mq($bp-big) {
        width: 419px;
        height: 151px;
      }
    }

    &_front {
      width: 72px;
      height: 68px;

      @include mq($bp-super-small) {
        width: 102px;
        height: 88px;
        margin-bottom: 15px;
      }

      @include mq($bp-small) {
        width: 150px;
        height: 170px;
      }

      @include mq($bp-medium) {
        width: 113px;
        height: 115px;
      }

      @include mq($bp-medium-big) {
        width: 142px;
        height: 145px;
      }

      @include mq($bp-big) {
        width: 195px;
        height: 151px;
        margin-bottom: 0;
      }
    }
  }

  &__deminsion {
    position: absolute;

    &-inner {
      display: inline-block;
      font-size: 10px;
      line-height: 10px;

      @include mq($bp-super-small) {
        font-size: 13.7838px;
        line-height: 14px;
      }

      @include mq($bp-small) {
        font-size: 20.2703px;
        line-height: 20px;
      }

      @include mq($bp-medium) {
        font-size: 11.0625px;
        line-height: 19px;
      }

      @include mq($bp-medium-big) {
        font-size: 13.9875px;
        line-height: 24px;
      }

      @include mq($bp-big) {
        font-size: 18px;
        line-height: 31px;
      }
    }

    &_side {
      &_right {
        top: 35px;
        right: -27px;
        transform: rotate(-90deg);

        @include mq($bp-super-small) {
          top: 47px;
          right: -29px;
        }

        @include mq($bp-small) {
          top: 116px;
          right: -49px;
        }

        @include mq($bp-medium) {
          top: 80px;
          right: -27px;
        }

        @include mq($bp-medium-big) {
          top: 102px;
          right: -36px;
        }

        @include mq($bp-big) {
          top: 100px;
          right: -48px;
        }
      }

      &_left {
        top: 19px;
        left: -16px;
        transform: rotate(-90deg);

        @include mq($bp-super-small) {
          top: 30px;
          left: -23px;
        }

        @include mq($bp-small) {
          top: 74px;
          left: -27px;
        }

        @include mq($bp-medium) {
          top: 45px;
          left: -14px;
        }

        @include mq($bp-medium-big) {
          top: 60px;
          left: -16px;
        }

        @include mq($bp-big) {
          top: 80px;
          left: -21px;
        }
      }

      &_bottom {
        bottom: -19px;
        left: 40%;

        @include mq($bp-super-small) {
          bottom: -25px;
        }

        @include mq($bp-small-medium) {
          bottom: -7px;
          left: 39%;
        }

        @include mq($bp-small) {
          bottom: -10px;
          left: 38%;
        }

        @include mq($bp-medium) {
          bottom: 0;
          left: 43%;
        }

        @include mq($bp-medium-big) {
          bottom: -7px;
        }

        @include mq($bp-big) {
          bottom: -32px;
        }
      }
    }

    &_front_bottom {
      right: 10px;
      bottom: -19px;
      left: 17px;

      @include mq($bp-super-small) {
        right: 11px;
        bottom: -6px;
        left: 25px;
      }

      @include mq($bp-small) {
        right: 11px;
        bottom: -10px;
        left: 41px;
      }

      @include mq($bp-medium) {
        right: 10px;
        bottom: 0;
        left: 33px;
      }

      @include mq($bp-medium-big) {
        right: 10px;
        bottom: -7px;
        left: 47px;
      }

      @include mq($bp-big) {
        right: 10px;
        bottom: 10px;
        left: 64px;
      }
    }
  }

  &__arrow {
    position: absolute;
    bottom: 6px;

    &_front {
      &_left {
        left: -19px;
        width: 19px;

        @include mq($bp-super-small) {
          bottom: 5px;
          left: -27px;
          width: 27px;
        }

        @include mq($bp-small) {
          bottom: 6px;
          left: -39px;
          width: 38px;
        }

        @include mq($bp-medium) {
          bottom: 6px;
          left: -36px;
          width: 29px;
        }

        @include mq($bp-medium-big) {
          bottom: 5px;
          left: -46px;
          width: 36px;
        }

        @include mq($bp-big) {
          bottom: 6px;
          left: -67px;
          width: 51px;
        }
      }

      &_right {
        right: -15px;
        width: 17px;

        @include mq($bp-super-small) {
          right: -13px;
          bottom: 5px;
          width: 20px;
        }

        @include mq($bp-small) {
          right: -19px;
          bottom: 7px;
          width: 29px;
        }

        @include mq($bp-medium) {
          right: -9px;
          bottom: 5px;
          width: 26px;
        }

        @include mq($bp-medium-big) {
          right: -18px;
          bottom: 6px;
          width: 33px;
        }

        @include mq($bp-big) {
          right: -7px;
          bottom: 5px;
          width: 38px;
        }
      }
    }

    &_side {
      &_ground {
        top: 5px;
        width: 8px;

        &_top {
          top: 1px;
          left: 3px;

          @include mq($bp-small) {
            top: -5px;
            left: 7px;
          }

          @include mq($bp-medium) {
            top: 0;
            left: 4px;
            width: 9px;
          }

          @include mq($bp-medium-big) {
            top: -4px;
            left: 6px;
            width: 9px;
          }

          @include mq($bp-big) {
            top: -7px;
            left: 8px;
            width: 12px;
          }
        }

        &_bottom {
          top: 1px;
          left: -3px;

          @include mq($bp-small) {
            top: -5px;
            left: -1px;
          }

          @include mq($bp-medium) {
            top: 0;
            left: 0;
            width: 9px;
          }

          @include mq($bp-medium-big) {
            top: -4px;
            left: 0;
            width: 9px;
          }

          @include mq($bp-big) {
            top: -7px;
            left: 0;
            width: 12px;
          }
        }
      }

      &_width {
        bottom: 6px;
        width: 60px;

        @include mq($bp-super-small) {
          bottom: 5px;
        }

        &_left {
          left: -61px;
          width: 58px;

          @include mq($bp-super-small) {
            left: -90px;
            width: 81px;
          }

          @include mq($bp-small) {
            bottom: 5px;
            left: -120px;
            width: 118px;
          }

          @include mq($bp-medium) {
            bottom: 4px;
            left: -102px;
            width: 90px;
          }

          @include mq($bp-medium-big) {
            bottom: 5px;
            left: -129px;
            width: 113px;
          }

          @include mq($bp-big) {
            bottom: 6px;
            left: -164px;
            width: 144px;
          }
        }

        &_right {
          right: -65px;
          width: 63px;

          @include mq($bp-super-small) {
            right: -89px;
            width: 88px;
          }

          @include mq($bp-small) {
            right: -132px;
            bottom: 5px;
            width: 128px;
          }

          @include mq($bp-medium) {
            right: -110px;
            bottom: 5px;
            width: 98px;
          }

          @include mq($bp-medium-big) {
            right: -139px;
            bottom: 5px;
            width: 123px;
          }

          @include mq($bp-big) {
            bottom: 7px;
            left: 97px;
            width: 158px;
          }
        }
      }

      &_height {
        bottom: 6px;
        width: 12px;

        &_top {
          left: 41px;
          width: 12px;

          @include mq($bp-super-small) {
            left: 60px;
          }

          @include mq($bp-small) {
            left: 85px;
            width: 21px;
          }

          @include mq($bp-medium) {
            left: 48px;
            width: 17px;
          }

          @include mq($bp-medium-big) {
            left: 59px;
            width: 21px;
          }

          @include mq($bp-big) {
            bottom: 8px;
            left: 78px;
            width: 27px;
          }
        }

        &_bottom {
          right: 40px;

          @include mq($bp-super-small) {
            left: -17px;
          }

          @include mq($bp-small) {
            right: 84px;
            left: auto;
            width: 21px;
          }

          @include mq($bp-medium) {
            right: 46px;
            bottom: 6px;
            width: 17px;
          }

          @include mq($bp-medium-big) {
            right: 57px;
            bottom: 6px;
            width: 21px;
          }

          @include mq($bp-big) {
            right: 76px;
            bottom: 8px;
            width: 25px;
          }
        }
      }
    }
  }
}
</style>
