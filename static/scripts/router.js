const routes = [
    {path: '/', component: Vue.component('home')},
    {path: '/categories', component: Vue.component('categories')},
    {path: '/articles', component: Vue.component('articles')},
];

const router = new VueRouter({
    routes
});