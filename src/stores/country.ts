import { defineStore } from "pinia";
import axios from 'axios';

export const useCountryStore = defineStore({
  id: "country",
  state: () => ({
    countries: [],
    loading: false,
  }),
  getters: {
  },
  actions: {
    async fetchCountries() {
      this.loading = true;
      await axios.get('https://restcountries.com/v3.1/all').then((res) => {
        this.countries = res.data;
      });
      this.loading = false;
    },
  },
});
