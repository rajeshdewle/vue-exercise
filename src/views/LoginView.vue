<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter();

const username = ref('');
function login() {
  sessionStorage.setItem('username', username.value);
  router.push({name: 'countrySelector'});
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="w-96">
      <form action="#" @submit.prevent="login">
        <input
          type="text"
          name="username"
          v-model="username"
          placeholder="Enter your name"
          class="block p-4 w-full rounded border border-gray-800 text-gray-900 text-xl placeholder-gray-400"
          required
        />
        <button
          type="submit"
          class="block p-4 my-4 w-full bg-gray-900 rounded text-xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >Login</button>
      </form>
    </div>
  </div>
</template>
