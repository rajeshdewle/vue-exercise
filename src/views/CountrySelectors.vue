
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/solid";
import { useCountryStore } from "@/stores/country";
import { useAppStore } from "@/stores/app";

const countryStore = useCountryStore();
const appStore = useAppStore();
const router = useRouter();

let selected = ref("");
let query = ref("");
onMounted(() => {
  countryStore.fetchCountries();
});

let filteredCountries = computed(() =>
  query.value === ""
    ? countryStore.countries
    : countryStore.countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      ));

function setSelectedCountry() {
  appStore.selectedCountry = selected.value;
  router.push('/')
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="w-96">
      <Combobox v-model="selected">
        <div class="relative">
          <div class="">
            <ComboboxInput
              placeholder="Select Country"
              class="
                block
                p-4
                w-full
                rounded
                border border-gray-800
                text-gray-900 text-xl
                placeholder-gray-400
              "
              :displayValue="(country) => country?.name?.common"
              @change="query = $event.target.value"
            />
            <ComboboxButton
              class="absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <ChevronDownIcon
                class="h-6 w-6 text-gray-600"
                aria-hidden="true"
              />
            </ComboboxButton>
          </div>
          <TransitionRoot
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            @after-leave="query = ''"
          >
            <ComboboxOptions
              class="
                absolute
                mt-1
                max-h-60
                w-full
                overflow-auto
                rounded-md
                bg-white
                py-1
                text-base
                shadow-lg
                ring-1 ring-black ring-opacity-5
                focus:outline-none
                sm:text-sm
              "
            >
              <div
                v-if="filteredCountries.length === 0 && query !== ''"
                class="
                  relative
                  cursor-default
                  select-none
                  py-2
                  px-4
                  text-gray-700
                "
              >
                Nothing found.
              </div>

              <ComboboxOption
                v-for="country in filteredCountries"
                as="template"
                :key="`${country}`"
                :value="country"
                v-slot="{ selected, active }"
              >
                <li
                  class="relative cursor-default select-none py-2 pl-10 pr-4"
                  :class="{
                    'bg-gray-800 text-white': active,
                    'text-gray-900': !active,
                  }"
                >
                  <span
                    class="block truncate"
                    :class="{
                      'font-medium': selected,
                      'font-normal': !selected,
                    }"
                  >
                    {{ country.name.common }}
                  </span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3"
                    :class="{ 'text-white': active, 'text-teal-600': !active }"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </TransitionRoot>
        </div>
      </Combobox>
      <button
        type="button"
        @click="setSelectedCountry"
        class="block p-4 my-5 w-full bg-gray-900 rounded text-xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
      <!-- <svg class="absolute animate-spin mt-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg> -->
      Proceed</button>
    </div>
  </div>
</template>