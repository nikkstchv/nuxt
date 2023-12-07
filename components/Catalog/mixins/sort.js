import { mapActions, mapState } from 'pinia'
import { useCatalogStore } from '~/store/catalog'

export const sort = {
  computed: {
    activeSort () {
      if (this.sort) {
        const activeSort = this.sort.find(item => item.isActive)

        return activeSort?.query ?? 'popular-desc'
      }
      return this.$route.query.sort ?? 'popular-desc'
    },
    ...mapState(useCatalogStore, {
      catalogSort: 'sort',
    }),
  },
  methods: {
    getHasActiveSort (name) {
      const sort = this.$route.query?.sort
      const sortStringDesc = name + '-desc'
      const sortStringAsc = name + '-asc'
      const isQueryDesc = sort === sortStringDesc
      const isQueryAsc = sort === sortStringAsc
      return isQueryDesc || isQueryAsc
    },
    onSetSort (sort) {
      this.sort = sort
      this.setQuery()
      this.setSortInStorage()
    },
    onSetInitSort (sort) {
      this.sort = sort
      this.setSortInStorage()
    },
    setSortInStorage () {
      this.onSetSortCatalog(this.activeSort)
    },
    setStartSort () {
      const querySort = this.$route.query?.sort
      const queryOrCatalogSort = querySort ?? this.catalogSort ?? ''
      const isPopular =
        queryOrCatalogSort && queryOrCatalogSort?.includes('popular')
      const isEmptyQuery = !querySort
      const sort = [
        {
          name: 'По популярности',
          isActive: isEmptyQuery,
          query: 'popular-desc',
        },
        {
          name: 'По цене',
          isActive: this.getHasActiveSort('price'),
          query: 'price-asc',
          hasToggle: true,
        },
        {
          name: 'По пробегу',
          isActive: this.getHasActiveSort('total-trip'),
          query: 'total-trip-asc',
          hasToggle: true,
        },
        {
          name: 'По году выпуска',
          isActive: this.getHasActiveSort('year'),
          query: 'year-asc',
          hasToggle: true,
        },
        {
          name: 'По наименованию',
          isActive: this.getHasActiveSort('concat'),
          query: 'concat-desc',
          hasToggle: true,
        },
        {
          name: 'По дате поступления',
          isActive: this.getHasActiveSort('newest'),
          query: 'newest-desc',
          hasToggle: true,
        },
      ]

      sort.find((item) => {
        const isPopularItemName = item.name === 'По популярности'
        if (item.isActive && !isPopular && !isPopularItemName) {
          item.query = querySort

          return true
        } else if (isPopularItemName && !item.isActive) {
          item.query = 'popular-desc'
          item.isActive = isPopular
        }
        return false
      })

      this.onSetInitSort(sort)
    },
    ...mapActions(useCatalogStore, {
      onSetSortCatalog: 'onSetSort',
    }),
  },
}
