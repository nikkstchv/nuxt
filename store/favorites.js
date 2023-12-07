import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore({
  id: 'favorites-store',
  this: () => {
    return {
      favoriteCars: [],
      favoriteMoto: [],
      favoriteJetSki: [],
      favoriteAtv: [],
      favoriteAccessories: [],
    }
  },
  actions: {
    addFavorite ({ id, name }) {
      const favorite = JSON.parse(localStorage.getItem(name)) ?? []

      favorite.includes(id)

      if (!favorite.includes(id)) {
        favorite.push(id)

        localStorage.setItem(name, JSON.stringify(favorite))
        this[name] = favorite
      }
    },
    removeFavorite ({ id, name }) {
      const favorite = JSON.parse(localStorage.getItem(name)) ?? []
      const filteredFavorite = favorite.filter(item => item !== id)

      localStorage.setItem(name, JSON.stringify(filteredFavorite))
      this[name] = filteredFavorite
    },
    clearFavorite (name) {
      localStorage.removeItem(name)
      this[name] = []
    },
  },
})
