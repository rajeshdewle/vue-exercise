import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import CountrySelector from "../views/CountrySelectors.vue";
import CountryProfile from "@/views/CountryProfile.vue";
import HomeView from "@/views/HomeView.vue";
import UniversityList from "@/views/UniversityList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/',
          component: CountryProfile,
        },
        {
          path: '/university-list',
          component: UniversityList
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/country-selector',
      name: 'countrySelector',
      component: CountrySelector,
    }
  ],
});

function isAuthenticated() {
  const username = sessionStorage.getItem('username');
  if (username) {
    return true;
  }
  return false;
};

router.beforeEach((to, from, next) => {
  console.log('hello', isAuthenticated());
  
  if (to.name !== 'login' && !isAuthenticated()) next({ name: 'login' })
  if (to.name === 'login' && isAuthenticated()) next({ name: 'countrySelector' })
  else next()
})

export default router;
