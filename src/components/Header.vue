<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useRouter } from 'vue-router'

const router = useRouter();

function logout() {
  sessionStorage.clear();
  router.push({name: 'login'});
}
</script>

<template>
  <header class="border-b border-gray-800 py-6 text-lg">
    <div class="container mx-auto">
      <div class="flex justify-between">
      <nav>
        <RouterLink to="/" class="mx-2 hover:underline" exactActiveClass="font-semibold" >Country Profile</RouterLink>
        <RouterLink to="/university-list" class="mx-2 hover:underline" exactActiveClass="font-semibold" >University List</RouterLink>
      </nav>
      <div class="">
        <span>Hello Mr. Username</span>
        <button
          @click="logout"
          type="button"
          class="p-2 px-10 ml-4 bg-gray-900 rounded text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >Logout</button>
      </div>
      </div>
    </div>
  </header>
</template>