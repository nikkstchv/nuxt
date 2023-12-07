<template>
  <section class="career">
    <div class="career__container">
      <h2 class="career__subtitle">
        Уважаемые соискатели!
      </h2>

      <div class="career__description">
        <p class="career__text">
          В данном разделе вы можете ознакомиться с актуальными вакансиями нашей
          компании.
        </p>
        <p class="career__text">
          В случае отсутствия на сегодняшний день интересующей вас вакансии
          предлагаем, отправить нам свое резюме. Ваши данные будут занесены в
          резервную базу. В случае открытия вакансии, соответствующей вашему
          опыту и знаниям, мы свяжемся с вами и пригласим на собеседование.
        </p>
        <p class="career__text">
          Отдел персонала готов ответить на вопросы, связанные с вакансиями, с
          10-00 до 16-30 ежедневно, кроме субботы и воскресенья.
        </p>
      </div>
    </div>

    <div class="career__cols">
      <div class="career__col">
        <div class="career__widget">
          <div class="hh-script" />
        </div>

        <UIBaseButton
          href="https://hh.ru/employer/5569"
          rel="nofollow"
          target="_blank"
          primary
          large
          text="Посмотреть вакансии"
          class="career__btn"
        />
      </div>

      <div class="career__col">
        <AboutCareerForm class="career__form" />
      </div>
    </div>

    <div class="career__container">
      <p class="career__note">
        В соответствии с требованиями Федерального закона от 28.12.2013 года, N
        426-ФЗ "О специальной оценке условий труда", на рабочих местах Филиала
        проведена плановая специальная оценка по условиям труда (СОУТ) в период
        с 13 мая 2019 года по 15 июля 2019 года. Результаты СОУТ сведены в
        Сводную ведомость. На основании результатов СОУТ разработан Перечень
        рекомендуемых мероприятий по улучшению труда.
      </p>

      <ul class="career__links">
        <li class="career__link">
          <a
            :href="`${cdnUrl}/about/career/Сводная%20ведомость.pdf`"
            target="_blank"
          >
            Сводная ведомость
          </a>
        </li>
        <li class="career__link">
          <a
            :href="`${cdnUrl}/about/career/Перечень%20рекомендуемых%20мероприятий.pdf`"
            target="_blank"
          >
            Перечень рекомендуемых мероприятий
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const cdnUrl = runtimeConfig.public.cdnUrl

onMounted(() => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.rel = 'nofollow'
  script.src =
      'https://api.hh.ru/widgets/vacancies/employer?employer_id=5569&locale=RU&links_color=2554ff&border_color=2554ff'
  script.async = true
  script.id = 'hh_widget'
  document.body.appendChild(script)
})

onBeforeUnmount(() => {
  document.querySelectorAll('script#hh_widget').forEach((item) => {
    item.remove()
    delete window.hhScriptCounter
  })
})
</script>

<style lang="scss" scoped>
.career {
  padding-bottom: 40px;

  @include mq($bp-small-medium) {
    padding-bottom: 0;
  }

  &__container {
    width: 100%;
    max-width: 794px;
  }

  &__subtitle {
    @include h5;

    margin-bottom: 15px;

    @include mq($bp-small-medium) {
      @include h4;
    }

    @include mq($bp-small) {
      @include h3;

      margin-bottom: 20px;
    }
  }

  &__text {
    @include text_medium;

    margin-bottom: 21px;
    color: var(--blackLight);

    &:last-child {
      margin-bottom: 0;
    }

    @include mq($bp-small-medium) {
      @include text_big;

      margin-bottom: 24px;
    }
  }

  &__cols {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: auto;

    @include mq($bp-medium) {
      display: grid;
      grid-template-columns: minmax(300px, 443px) minmax(300px, 443px);
      grid-gap: 70px;
      margin-bottom: 60px;
    }

    @include mq($bp-medium-big) {
      grid-gap: 100px;
    }
  }

  &__col {
    width: 100%;
    margin-bottom: 40px;

    @include mq($bp-small) {
      margin-bottom: 50px;
    }

    @include mq($bp-medium) {
      margin-bottom: 60px;
    }

    &:first-child {
      @include mq($bp-small) {
        max-width: 443px;
      }

      @include mq($bp-medium) {
        margin-bottom: 0;
      }
    }

    &:last-child {
      @include mq($bp-small) {
        max-width: 100%;
      }

      @include mq($bp-medium) {
        max-width: 350px;
      }
    }
  }

  &__description {
    @include mq($bp-small) {
      margin-bottom: 30px;
    }

    margin-bottom: 40px;
  }

  &__widget {
    margin-bottom: 30px;
  }

  &__btn {
    margin-bottom: 30px;

    @include mq($bp-medium) {
      margin-bottom: 0;
    }
  }

  &__note {
    @include text_small;

    margin-bottom: 20px;
    color: var(--grayDolphin);

    @include mq($bp-small-medium) {
      @include text_medium;

      margin-bottom: 30px;
    }
  }

  &__links {
    display: flex;
    flex-direction: column;
    grid-gap: 15px;
  }

  &__link {
    @include text_medium_small;

    color: var(--neonBlue);
  }
}
</style>
