import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: 'appstore',
  state: () => ({
    selectedCountry: '',
  }),
})
