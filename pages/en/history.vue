<template>
  <div class="history">
    <AboutHistoryList>
      <AboutHistoryItem
        v-for="item in historyItems"
        :key="item.imageSrc"
        :text="item.text"
        :image-src="item.imageSrc"
        :year="item.year"
      />
    </AboutHistoryList>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'english',
})
const runtimeConfig = useRuntimeConfig()
const cdnUrl = runtimeConfig.public.cdnUrl
const historyItems = [
  {
    text: 'Foundation of the company.',
    imageSrc: `${cdnUrl}/about/history/db7ac637271cc4998630f5566aaa5e0d.jpg`,
    year: '1992',
  },
  {
    text: 'Getting the status of the BMW dealer official status. BMW vehicles service station launched.',
    imageSrc: `${cdnUrl}/about/history/60a6a5ecc6fd985ac20a1f57a3d8cef8.jpg`,
    year: '1993',
  },
  {
    text: 'Moscow International Motor Show 1994: AVTODOM won the Prize for the “Best exponent of the exhibition BMW series”.',
    imageSrc: `${cdnUrl}/about/history/0598526b523154c8afd5610a416f947e.jpg`,
    year: '1994',
  },
  {
    text: 'AVTODOM is the first general sponsor of the Road Patrol television program.',
    imageSrc: `${cdnUrl}/about/history/1fc8be65ea3bf921c9ed107d4e21a1af.jpg`,
    year: '1995',
  },
  {
    text: 'A spacecraft was launched from the Baikonur cosmodrome with the AVTODOM company logo on board.',
    imageSrc: `${cdnUrl}/about/history/9d7123bfa61f917d9051317183100271.jpg`,
    year: '1996',
  },
  {
    text: 'Unique project "AUTODOM Elbrus":for the first time a production vehicle Land Rover has stormed the highest mountain peak in Russia.',
    imageSrc: `${cdnUrl}/about/history/f651e57dfdb395df966fa7f51362897f.jpg`,
    year: '1997',
  },
  {
    text: 'First time ever in Russia ABTODOM offers tuning services for BMW cars.',
    imageSrc: `${cdnUrl}/about/history/b993795c2e2b19b384228eae579d557e.jpg`,
    year: '1998',
  },
  {
    text: 'WEBsite AVTODOM launched.',
    imageSrc: `${cdnUrl}/about/history/52cee48a56a0331afab30b52d4e86c50.jpg`,
    year: '1999',
  },
  {
    text: 'Successful start of the AC Racing team from the Lublin branch office of the AVTODOM.',
    imageSrc: `${cdnUrl}/about/history/b6e36f58a76fec84bfc5661351afb604.jpg`,
    year: '2000',
  },
  {
    text: 'First time ever in Russia ABTODOM offers round-the-clock service for BMW cars and Motorbikes.',
    imageSrc: `${cdnUrl}/about/history/a29cf07894f8e2fd3f387ac5900d4ec2.jpg`,
    year: '2001',
  },
  {
    text: 'First and the only authorized MINI dealership in Russia.',
    imageSrc: `${cdnUrl}/about/history/880238fa5ff663f283fbc0050d6c2d99.jpg`,
    year: '2002',
  },
  {
    text: 'Largest BMW motorcycle showroom in Eastern Europe. First company in Russia to start offering Trade-in. Completion of the buildings reconstruction of the Zorge dealer center.',
    imageSrc: `${cdnUrl}/about/history/c4bd32d83aa0f37030e1ba53ebaa020d.jpg`,
    year: '2003',
  },
  {
    text: 'AVTODOM is the first company to offer Trade-in type of the deal.',
    imageSrc: `${cdnUrl}/about/history/cf7301946bb00d1694845a337336d106.jpg`,
    year: '',
  },
  {
    text: 'AVTODOM gets the leading position in BMW, MINI and Motorrad sales.',
    imageSrc: `${cdnUrl}/about/history/b45a543dafa16ef3ee2ce0e2ae7fd2af.jpg`,
    year: '2004',
  },
  {
    text: 'New BMW Center on MCAD. First ALPINA Dealer Contract in Russia.',
    imageSrc: `${cdnUrl}/about/history/8effc30f97488fc64adc18c336fd6e55.jpg`,
    year: '2006',
  },
  {
    text: 'New BMW Center on MCAD. First ALPINA Dealer Contract in Russia.',
    imageSrc: `${cdnUrl}/about/history/c6d6de4bdb4f115e5e0e555ebb118d88.jpg`,
    year: '2007',
  },
  {
    text: 'The State Academic Bolshoi Theater hosted the second charitable Easter matinee of the AVTODOM company for children from orphanages and children with disabilities.',
    imageSrc: `${cdnUrl}/about/history/74e4017dfe33fc45ed425d49de924327.jpg`,
    year: '',
  },
  {
    text: "The first children's Christmas party took place in the dealership in Zorge Center.",
    imageSrc: `${cdnUrl}/about/history/0ffeaf45ad2bc0a52daf3afec19fdc22.jpg`,
    year: '',
  },
  {
    text: 'VIP showroom AVTODOM opened on Kutuzovsky Ave.',
    imageSrc: `${cdnUrl}/about/history/b3b9265c4e2f047c4825cbaded27fb54.jpg`,
    year: '2008',
  },
  {
    text: 'AVTODOM Travel a new business direction was introduced.',
    imageSrc: `${cdnUrl}/about/history/1ed7f461a4c5551cddf32b4debb389ed.jpg`,
    year: '',
  },
  {
    text: 'The only concert of Kylie Minogue with the sponsorship of AVTODOM took place in Moscow.',
    imageSrc: `${cdnUrl}/about/history/3f6ffe0f699fd3159ea2a9c7a009965c.jpg`,
    year: '',
  },
  {
    text: 'A new AVTODOM center established in Saint Petersburg.',
    imageSrc: `${cdnUrl}/about/history/3970abd52575cf02de8053db5618b86d.jpg`,
    year: '',
  },
  {
    text: 'The beginning of AVTODOM’s cooperation with Mikhailovsky Theater.',
    imageSrc: `${cdnUrl}/about/history/bd4426963a39ffb2ee9c1c4e2bddc94d.jpg`,
    year: '2009',
  },
  {
    text: 'AVTODOM Travel has opened a new direction of car trainings in the form of extreme travel. A team of brave travelers set off for exploring distant Namibia for the first time by BMW X5.',
    imageSrc: `${cdnUrl}/about/history/b0479983d91be86627806c982184e5a3.jpg`,
    year: '',
  },
  {
    text: 'A big test drive took place in AVTODOM Zorge Center. For the first time of BMW in Russia anyone had the opportunity to test each product of the Bavarian concern.',
    imageSrc: `${cdnUrl}/about/history/311bb3e042851a70d0bdca1cfefef698.jpg`,
    year: '2010',
  },
  {
    text: 'AVTODOM became the first and only Russian dealer included in the first part of the list of 50 best companies in the world in terms of BMW motorcycle sales .',
    imageSrc: `${cdnUrl}/about/history/4d0325f9e23d7781e6dcf8c76849670b.jpg`,
    year: '',
  },
  {
    text: "MINI cars from AVTODOM took part in the traditional party of the Vogue magazine Fashion's Night Out. It is held with incredible success all over the world.",
    imageSrc: `${cdnUrl}/about/history/e519a2fda0ca32f61bc6f96cf3421458.jpg`,
    year: '',
  },
  {
    text: 'AVTODOM becomes the first BMW dealer in Russia certified for BMW M series sales and service.',
    imageSrc: `${cdnUrl}/about/history/853413700a58683f4ac6721db57949e5.jpg`,
    year: '',
  },
  {
    text: "Pilot's Assistance – is a new unique roadside assistance program introduced by AVTODOM.",
    imageSrc: `${cdnUrl}/about/history/582656d643014fe6482cf038ce906f92.jpg`,
    year: '2011',
  },
  {
    text: 'New MINI Boutique opens on Kutuzovsky Ave.',
    imageSrc: `${cdnUrl}/about/history/ab4980e0e5783f8eb9b474773492ae7b.jpg`,
    year: '',
  },
  {
    text: 'The best customer satisfaction index (CSI) in the service sector among Russian dealers - AVTODOM.',
    imageSrc: `${cdnUrl}/about/history/2011-3_sm.jpg`,
    year: '',
  },
  {
    text: 'Successful financial evaluation of the AVTODOM Performance: AVTODOM’s turnover of the company reached 15 billion rubles. Shares in most brands increased and let AVTODOM become number one BMW and MINI seller.',
    imageSrc: `${cdnUrl}/about/history/2011-4_sm.jpg`,
    year: '',
  },
  {
    text: 'Service Director Mr. Pletnev won the Grand Prix Castrol Professional Leadership Award in the name of AVTODOM.',
    imageSrc: `${cdnUrl}/about/history/2012-1_sm.jpg`,
    year: '2012',
  },
  {
    text: 'AVTODOM got the 4th place in BMW Motorrad sales worldwide.',
    imageSrc: `${cdnUrl}/about/history/2013-2_sm.jpg`,
    year: '2013',
  },
  {
    text: 'AVTODOM Saint Petersburg was honored to be named the Best BMW Dealer.',
    imageSrc: `${cdnUrl}/about/history/2013-3_sm.jpg`,
    year: '',
  },
  {
    text: 'Exclusive Lamborghini dealership for Russia.',
    imageSrc: `${cdnUrl}/about/history/2013-4_sm.jpg`,
    year: '',
  },
  {
    text: 'New Showroom opening for BMW I series.',
    imageSrc: `${cdnUrl}/about/history/2014-1_sm.jpg`,
    year: '2014',
  },
  {
    text: 'AVTODOM was honored to be named the Best MINI and Motorrad Dealer.',
    imageSrc: `${cdnUrl}/about/history/2015-1_sm.jpg`,
    year: '2015',
  },
  {
    text: 'Merge deal in St. Petersburg two dealer Centers: Mercedes Pulkovo & Porsche Pulkovo.',
    imageSrc: `${cdnUrl}/about/history/2016-1_sm.jpg`,
    year: '2016',
  },
  {
    text: 'Second Lamborghini showroom in Moscow opening — the first full-service dealership in Russia.',
    imageSrc: `${cdnUrl}/about/history/9aiu20tew2ang9hkvz4i8pdh20zfpmnj.jpg`,
    year: '2018',
  },
  {
    text:
        'AUDI, Volvo, JLR showrooms opening at 85 km of the Moscow Ring Road, the total area of new dealerships is more than 26 000 square meters.\n' +
    '\n' +
    'New BMW dealership on “Shmitovsky” was opened.',
    imageSrc: `${cdnUrl}/about/history/360c39a3aa42cb4022c73ee6cee01230.jpg`,
    year: '2019',
  },
  {
    text:
        'A new showroom of BMW, MINI was opened in Moscow near International Airport Vnukovo on Kievskoye highway.\n' +
    '\n' +
    'Ducati was also officially introduced in Altufevo Dealer Center in 2020 in Moscow. The company is negotiating the opportunity to enrich its brand portfolio through the acquisition of several premium brand dealerships.',
    imageSrc: `${cdnUrl}/about/history/e21565dc36ac8a37c2a637b5880d6b84.jpg`,
    year: '2020',
  },
  {
    text: 'Three Audi dealerships (Audi Center Taganka, Audi Center Varshavka and Audi Center Vostok) and a Porsche dealership - Porsche Center Leninsky were included in the Avtodom portfolio. Opening three KTM dealerships in Moscow and a Ducati dealerships in Krasnodar is completed. Own car subscription service Avtodom Subscription launched under the Avtodom trademark.',
    imageSrc: `${cdnUrl}/about/history/lipidi12rmlqv351uriyupwu1qpn0r70.jpg`,
    year: '2021',
  },
  {
    text: "Dealership agreement with the Aurus brand was signed. The opening of the brand's largest gallery is planned in St. Petersburg. Avtodom was included in the list of backbone organizations of the Russian economy in the field of industry.",
    imageSrc: `${cdnUrl}/about/history/ommu5e9otd1hcgbvy29d3o7quldr0i1r.jpg`,
    year: '2022',
  },
]
</script>

<style lang="scss" scoped>
.history {
  display: grid;
  grid-gap: 20px;
  width: 100%;
  height: fit-content;
}
</style>
