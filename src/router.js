import { createRouter, createWebHistory } from "vue-router"
import LoginComponent from './pages/LoginComponent.vue'
import SignUp from './pages/SignUp.vue'
import MovieList from './pages/MovieList.vue'


const routes = [
    { path: '/login', component: LoginComponent },
    { path: '/signup', component: SignUp },
    {
        path: '/movie_list',
        component: MovieList,
        meta: { requiresAuth: true } // Requires authentication
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = window.$cookies.get('auth_token')
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        // If the route requires authentication and the user is not authenticated, redirect to the login page
        next('/login');
    } else {
        next(); // Continue navigation
    }
});

export default router;