const routes = [
    {path: '/', component: Vue.component('home')},
    {path: '/categories', component: Vue.component('categories')},
    {path: '/articles', component: Vue.component('articles')},
    {path: '/category/:id', component: Vue.component('category-details')},
    {path: '/articles/new', component: Vue.component('article-new'), meta: {auth: true}},
    {path: '/article/:id', component: Vue.component('article-details')},
    {path: '/article/:id/edit', component: Vue.component('article-edit'), meta: { auth: true }},
    {path: '/article/:id/history', component: Vue.component('article-history')},
    {path: '/profile/:id', component: Vue.component('profile') },
    {path: '/login', component: Vue.component('login')},
    {path: '/register', component: Vue.component('register')},
    {path: '/logout', beforeEnter: auth.logout.bind(auth)}
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.auth);
    if (requiresAuth && !auth.state.logged) {
        next('/login');
    } else {
        next();
    }
});